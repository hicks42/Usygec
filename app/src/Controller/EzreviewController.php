<?php

namespace App\Controller;

use App\Entity\Structure;
use App\Form\TargetType;
use App\Form\BadReviewType;
use App\Repository\StructureRepository;
use App\Service\SendMailService;
use Symfony\Component\Mime\Email;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class EzreviewController extends AbstractController
{
    public function __construct(SessionInterface $session)
    {
        $this->session = $session;
    }

    /**
     * @Route("/{id<\d+>}/enquete", name="enquete")
     * @Security("is_granted('ROLE_USER')")
     */
    public function sendEmail(SendMailService $mailService, Request $request, Structure $structure): Response
    {
        $form = $this->createForm(TargetType::class);
        $target = $form->handleRequest($request);
        $user = $this->getUser();
        $user->getEmail();

        // dd($structure->getGooglUrl());

        if ($form->isSubmitted() && $form->isValid()) {
            $context = [
                'mail' => $target->get('email')->getData(),
                'company' => $user->getCompany(),
                'structure' => $structure->getName(),
                'googleUrl' => $structure->getGooglUrl(),
                'badRevUrl' => $structure->getBadRevUrl(),
                'subject' => 'Enquète de satisfaction',
                'structureId' => $structure->getId(),
            ];

            $mailService->send(
                $user->getEmail(),                  //from
                $target->get('email')->getData(),   //to
                'Enquète de satisfaction ',         //subject
                'ezreview_template',                //template
                $context                            //context
            );

            $this->addFlash('success', 'Votre mail a bien été envoyé');
            return $this->redirectToRoute('account');
        }

        return $this->render('ezreview/target_form.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/badreview/{structureId} ", name="badreview")
     */
    public function badreview(SendMailService $mailService, Request $request, StructureRepository $structureRepo,  $structureId): Response
    {
        $form = $this->createForm(BadReviewType::class);
        $badreview = $form->handleRequest($request);
        $structure = $structureRepo->findById($structureId);
        $userMail = $structure[0]->getUser()->getEmail();

        if ($form->isSubmitted() && $form->isValid()) {
            $context = [
                // 'mail' => $badreview->get('email')->getData(),
                'note' => $badreview->get('note')->getData(),
                'lieu_rdv' => $badreview->get('lieu_rdv')->getData(),
                'date_rdv' => $badreview->get('date_rdv')->getData(),
                'message' => $badreview->get('message')->getData(),
            ];

            $mailService->send(
                'usygec@usygec.fr',                   //from
                $userMail,                            //to
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
     * @Route("/ezreview ", name="ezreview")
     */
    public function ezreview(): Response
    {
        return $this->redirectToRoute('app_login');
    }
}
