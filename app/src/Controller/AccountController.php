<?php

namespace App\Controller;

use App\Entity\User;
use League\Csv\Reader;
use App\Form\EmailCsvType;
use App\Mails\EnqueteMail;
use App\Service\MailJetService;
use App\Form\ChangeMailFormType;
use App\Service\SendMailService;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AccountController extends AbstractController
{
  private $mailService;
  private $structureRepo;
  private $userId;

  public function __construct(Security $security, MailJetService $mailService)
  {
    $this->mailService = $mailService;
    $this->userId = $security->getUser()->getId();
  }

  /**
   * @Route("/ezreview/accounts", name="accounts_index")
   * @IsGranted("ROLE_ADMIN")
   */
  public function index(UserRepository $userRepo): Response
  {
    $users = $userRepo->findBy([], ['email' => 'DESC']);

    return $this->render('main/account/account_index.html.twig', compact('users'));
  }

  /**
   * @Route("/ezreview/account/{id<[0-9]+>}/edit", name="account_edit", methods={"GET", "POST"})
   * @IsGranted("ROLE_ADMIN")
   */
  public function edit(Request $request, EntityManagerInterface $em, User $user): Response
  {
    $form = $this->createForm(ChangeMailFormType::class, $user, [
      'method' => 'POST',
    ]);

    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {

      $em->flush();

      $this->addFlash('success', 'Votre compte a été modifié !');

      return $this->redirectToRoute('accounts_index');
    }

    return $this->render('ezreview/account/account_edit.html.twig', [
      'form' => $form->createView(),
      'user' => $user
    ]);
  }

  /**
   * @Route("ezreview/", name="ezreview_hp")
   * @IsGranted("ROLE_USER")
   */
  public function show(Request $request, SluggerInterface $slugger, MessageBusInterface $bus, Security $security): Response
  {
    $user = $security->getUser();

    $form = $this->createForm(EmailCsvType::class);
    $form->handleRequest($request);

    // dd(unserialize(""));
    if ($form->isSubmitted() && $form->isValid()) {
      /** @var UploadedFile $csvFile */

      $csvFile = $form['csvFile']->getData();
      $structureId = $form['structureId']->getData();
      if ($csvFile) {
        $baseUrl = $request->getSchemeAndHttpHost();

        $newFilename = $this->getNewFileName($csvFile, $slugger);
        // get un array de tous les mails du csv
        $targets = $this->getEmailsArray($newFilename);

        foreach ($targets as $target) {
          $this->mailService->send($baseUrl, $target, $structureId);
          // $bus->dispatch(new EnqueteMail($target, $structureId, $baseUrl));
        }
        $this->deleteFile($newFilename);
      }
      $this->addFlash('success', 'Ficier csv traité !');
      return $this->redirectToRoute('ezreview_hp');
    }
    return $this->render('ezreview/ezreview_hp.html.twig', [
      'user' => $user,
      'form' => $form->createView(),
    ]);
  }

  /**
   * @Route("/ezreview/account/{id<\d+>}/delete", name="account_delete", methods={"POST"})
   * @IsGranted("ROLE_ADMIN")
   */
  public function delete(Request $request, EntityManagerInterface $em, User $user): Response
  {
    if ($this->isCsrfTokenValid('user_deletion_' . $user->getId(), $request->request->get('csrf_token'))) {
      $em->remove($user);
      $em->flush();

      $this->addFlash('info', 'Utilisateur supprimé !!!');
    }

    return $this->redirectToRoute('accounts_index');
  }

  private function getNewFileName($csvFile, $slugger)
  {
    $originalFilename = pathinfo($csvFile->getClientOriginalName(), PATHINFO_FILENAME);

    $safeFilename = $slugger->slug($originalFilename);
    $newFilename = $safeFilename . '-' . uniqid() . '.' . $csvFile->guessExtension();

    $csvFile->move(
      $this->getParameter('csv_directory'),
      $newFilename
    );
    return $newFilename;
  }

  private function getEmailsArray($newFilename)
  {
    $reader = Reader::createFromPath('uploads/csv/' . $newFilename, 'r');
    $emailpattern = '/[a-z0-9_\-\+\.]+@[a-z0-9\-]+\.([a-z]{2,4})(?:\.[a-z]{2})?/i';
    // $emailpattern = '/[a-z0-9_\-\+\.]+@[a-z0-9\-]+\.([a-z]{2,4})(?:\.[a-z]{2})?/i';
    preg_match_all($emailpattern, $reader, $matches);
    $emails = $matches[0];

    return $emails;
  }

  private function deleteFile(string $filename)
  {
    $filesystem = new Filesystem();
    $filesystem->remove(['uploads/csv/' . $filename]);
  }
}
