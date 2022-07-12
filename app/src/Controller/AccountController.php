<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\CsvType;
use League\Csv\Reader;
use App\Entity\Structure;
use App\Service\SendMailService;
use App\Form\RegistrationFormType;
use App\Repository\UserRepository;
use Vich\UploaderBundle\Entity\File;
use App\Repository\StructureRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class AccountController extends AbstractController
{
    public function __construct(Security $security, SendMailService $mailService, StructureRepository $structureRepo)
    {
        $this->mailService = $mailService;
        $this->structureRepo = $structureRepo;
        $this->user = $security->getUser();
    }

    /**
     * @Route("/ezreview/accounts", name="accounts_index")
     */
    public function index(UserRepository $userRepo): Response
    {
        $users = $userRepo->findBy([], ['email' => 'DESC']);

        return $this->render('ezreview/account_index.html.twig', compact('users'));
    }

    /**
     * @Route("/ezreview/account/{id<[0-9]+>}/edit", name="account_edit", methods={"GET", "POST"})
     * @IsGranted("IS_AUTHENTICATED_FULLY"))
     */
    public function edit(Request $request, EntityManagerInterface $em, User $user): Response
    {
        $form = $this->createForm(RegistrationFormType::class, $user, [
            'method' => 'POST',
        ]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $em->flush();

            $this->addFlash('success', 'Votre compte a été modifié !');

            return $this->redirectToRoute('account');
        }

        return $this->render('ezreview/account_edit.html.twig', [
            'form' => $form->createView(),
            'user' => $user
        ]);
    }

    /**
     * @Route("/ezreview/account/{id<\d+>}/delete", name="account_delete", methods={"POST"})
     */
    public function delete(Request $request, User $user, EntityManagerInterface $em): Response
    {
        if ($this->isCsrfTokenValid('user_deletion_' . $user->getId(), $request->request->get('csrf_token'))) {
            $em->remove($user);
            $em->flush();

            $this->addFlash('info', 'Utilisateur supprimé !!!');
        }

        return $this->redirectToRoute('account');
    }

    /**
     * @Route("/ezreview/account", name="account")
     */
    public function show(Request $request, Security $security, SluggerInterface $slugger): Response
    {
        $user = $this->user;

        $form = $this->createForm(CsvType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var UploadedFile $csvFile */
            // upload le csv
            $csvFile = $form['csvFile']->getData();
            // get la structure via l ID
            $structureId = $form['structureId']->getData();
            $structure = $this->structureRepo->findOneById($structureId);

            if ($csvFile) {
                $newFilename = $this->getNewFileName($csvFile, $slugger);
                // get un array de tous les mails du csv
                $targets =  $this->getEmailsArray($newFilename);

                foreach ($targets as $target) {
                    $this->mailService->sendToTarget($user, $target, $structure);
                    $seconds = rand(2, 7);
                    sleep($seconds);
                }
                $this->deleteFile($newFilename);
            }
            $this->addFlash('success', 'Ficier csv traité !');
        }
        return $this->render('ezreview/account.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

    private function getNewFileName($csvFile, $slugger)
    {
        $originalFilename = pathinfo($csvFile->getClientOriginalName(), PATHINFO_FILENAME);
        // this is needed to safely include the file name as part of the URL
        $safeFilename = $slugger->slug($originalFilename);
        $newFilename = $safeFilename . '-' . uniqid() . '.' . $csvFile->guessExtension();
        // Move the file to the directory where csvs are stored
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
