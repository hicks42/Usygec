<?php

namespace App\Controller\Ezreview;

use App\Form\UserType;
use League\Csv\Reader;
use App\Form\TargetType;
use App\Form\EmailCsvType;
use App\Form\BadReviewType;
use App\Service\MailJetService;
use App\Service\SendMailService;
use App\Repository\StructureRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\String\Slugger\SluggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/ezreview")
 */
class EzreviewController extends AbstractController
{
    private $security;
    private $mailService;
    private $structureRepo;
    private $mjDkimKeyPath;

    public function __construct(MailJetService $mailService, StructureRepository $structureRepo, Security $security)
    {
        $this->security = $security;
        $this->mailService = $mailService;
        $this->structureRepo = $structureRepo;
    }

    /**
     * @Route("/", name="ezreview_hp")
     * @IsGranted("ROLE_USER")
     * @IgnoreAnnotation("Security")
     */
    public function show(Request $request, SluggerInterface $slugger): Response
    {
        $user = $this->security->getUser();

        $form = $this->createForm(EmailCsvType::class);
        $form->handleRequest($request);

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
     * @Route("/settings", name="ezreview_settings")
     * @IsGranted("ROLE_USER")
     * @IgnoreAnnotation("Security")
     */
    public function editEzreviewUser(Request $request, EntityManagerInterface $em): Response
    {
        $user = $this->security->getUser();

        $form = $this->createForm(UserType::class, $user, [
            'method' => 'POST',
        ]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $structures = $user->getStructures();

            foreach ($structures as $key => $structure) {

                $structure->setUser($user);
                $structures->set($key, $structure);
            }

            $em->flush();

            $this->addFlash('success', 'Modification enregistrée.');

            return $this->redirectToRoute('ezreview_settings');
        }

        return $this->render('ezreview/ezreview_settings.html.twig', [
            'form' => $form->createView(),
            'user' => $user
        ]);
    }

    /**
     * @Route("/{id<\d+>}/survey ", name="survey")
     */
    public function survey(Request $request, $id): Response
    {
        $structure = $this->structureRepo->findOneById($id);
        $badRevUrl = $structure->getBadRevUrl();
        $GooglUrl = "https://search.google.com/local/writereview?placeid=" . $structure->getPid();
        $image = $structure->getImageName();

        return $this->render('ezreview/ezreview_survey.html.twig', [
            'structure' => $structure,
            'badRevUrl' => $badRevUrl,
            'GooglUrl' => $GooglUrl,
            'image' => $image,
        ]);
    }

    /**
     * @Route("/{id<\d+>}/enquete/", name="enquete")
     * @IsGranted("ROLE_USER")
     * @IgnoreAnnotation("Security")
     */
    public function sendOneEmail(Request $request, MessageBusInterface $bus, $id): Response
    {
        $baseUrl = $request->getSchemeAndHttpHost();
        $form = $this->createForm(TargetType::class);
        $target = $form->handleRequest($request)->get('email')->getData();

        if ($form->isSubmitted() && $form->isValid()) {

            $this->mailService->send($baseUrl, $target, $id);

            $this->addFlash('success', 'Le mail a bien été envoyé !');
            return $this->redirectToRoute('enquete', ['id' => $id]);
        }
        return $this->render('ezreview/target_form.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/badreview/{structureId}", name="badreview")
     */
    public function badreview(Request $request, SendMailService $sendMailService, $structureId): Response
    {
        $form = $this->createForm(BadReviewType::class);
        $badreview = $form->handleRequest($request);
        $structure = $this->structureRepo->findOneById($structureId);
        $userMail = $structure->getUser()->getEmail();
        if ($form->isSubmitted() && $form->isValid()) {
            $context = [
                'note' => $badreview->get('note')->getData(),
                'lieu_rdv' => $structure->getName(),
                'date_rdv' => $badreview->get('date_rdv')->getData(),
                'message' => $badreview->get('message')->getData(),
            ];

            $sendMailService->send(
                'noreply@usygec.fr',                     //from
                $userMail,                              //to
                'Retour de l\'enquète de satisfaction', //subject
                'badreview_template',                   //template
                $context                                //context
            );
            $this->addFlash('success', 'Votre mail a bien été envoyé');
            return $this->redirectToRoute('exit');
        }

        return $this->render('ezreview/badreview_form.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/exit ", name="exit")
     */
    public function exit(): Response
    {
        return $this->render('ezreview/exit.html.twig');
    }

    /**
     * @Route("/landding", name="ezreview_landing")
     * @IsGranted("ROLE_USER")
     * @IgnoreAnnotation("Security")
     */
    public function ezreview(): Response
    {
        return $this->redirectToRoute('ezreview_hp');
    }

    /******************************************************************************/

    private function getEmailsArray($newFilename)
    {
        $reader = Reader::createFromPath('uploads/csv/' . $newFilename, 'r');
        $emailpattern = '/[a-z0-9_\-\+\.]+@[a-z0-9\-]+\.([a-z]{2,4})(?:\.[a-z]{2})?/i';
        preg_match_all($emailpattern, $reader, $matches);
        $emails = $matches[0];

        return $emails;
    }

    private function deleteFile(string $filename)
    {
        $filesystem = new Filesystem();
        $filesystem->remove(['uploads/csv/' . $filename]);
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
}
