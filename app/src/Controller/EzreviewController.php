<?php

namespace App\Controller;

use App\Form\TargetType;
use App\Entity\Structure;
use App\Mails\EnqueteMail;
use App\Form\BadReviewType;
use App\Service\SendMailService;
use App\Repository\StructureRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Messenger\MessageBusInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class EzreviewController extends AbstractController
{
    public function __construct(SessionInterface $session, SendMailService $mailService, StructureRepository $structureRepo)
    {
        $this->session = $session;
        $this->mailService = $mailService;
        $this->structureRepo = $structureRepo;
    }

    /**
     * @Route("/{id<\d+>}/survey ", name="survey")
     */
    public function survey(Request $request, $id): Response
    {
        $structure = $this->structureRepo->findOneById($id);
        $badRevUrl = $structure->getBadRevUrl();
        $GooglUrl = $structure->getGooglUrl();

			return $this->render('ezreview/ezreview_survey.html.twig', [
                'structure' => $structure,
                'badRevUrl' => $badRevUrl,
                'GooglUrl' => $GooglUrl,
            ]);
    }

    /**
     * @Route("/{id<\d+>}/enquete/", name="enquete")
     * @Security("is_granted('ROLE_USER')")
     */
    public function sendOneEmail(Request $request, MessageBusInterface $bus, $id): Response
    {
        $form = $this->createForm(TargetType::class);
        $target = $form->handleRequest($request)->get('email')->getData();
        $structureId = $id;
        $baseUrl = $request->getSchemeAndHttpHost();
        // $user = $this->getUser();
        // $structure = $this->structureRepo->findOneById($structureId);

        if ($form->isSubmitted() && $form->isValid()) {

            $this->mailService->sendToTarget($target, $structureId, $baseUrl);

            // $bus->dispatch(new EnqueteMail($target, $structureId, $baseUrl));

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
    public function badreview(Request $request, $structureId): Response
    {
        $form = $this->createForm(BadReviewType::class);
        $badreview = $form->handleRequest($request);
        $structure = $this->structureRepo->findOneById($structureId);
        $userMail = $structure->getUser()->getEmail();
        if ($form->isSubmitted() && $form->isValid()) {
            $context = [
                // 'mail' => $badreview->get('email')->getData(),
                'note' => $badreview->get('note')->getData(),
                'lieu_rdv' => $structure->getName(),
                'date_rdv' => $badreview->get('date_rdv')->getData(),
                'message' => $badreview->get('message')->getData(),
            ];

            $this->mailService->sendToTarget(
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
     * @Route("/ezreview/", name="ezreview")
     */
    public function ezreview(): Response
    {
        return $this->redirectToRoute('account');
    }
}
