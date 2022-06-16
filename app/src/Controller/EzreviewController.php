<?php

namespace App\Controller;

use App\Form\TargetType;
use App\Form\BadReviewType;
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
     * @Route("/ezreview", name="ezreview")
     * @Security("is_granted('ROLE_USER')")
     */
    public function sendEmail(SendMailService $mailService, Request $request): Response
    {
        $form = $this->createForm(TargetType::class);
        $target = $form->handleRequest($request);
        $user = $this->getUser();
        $user->getEmail();

        if ($form->isSubmitted() && $form->isValid()) {
            $context = [
                'mail' => $target->get('email')->getData(),
                'company' => $user->getCompany(),
                'googleUrl' => $user->getGooglUrl(),
                'badRevUrl' => $user->getBadRevUrl(),
                'subject' => 'Enquète de satisfaction',
                'returnMail' => $user->getEmail(),
            ];

            $mailService->send(
                $user->getEmail(),                  //from
                $target->get('email')->getData(),   //to
                'Enquète de satisfaction ',         //subject
                'ezreview_template',                //template
                $context                            //context
            );

            $this->addFlash('success', 'Votre mail a bien été envoyé');
            return $this->redirectToRoute('ezreview');
        }

        return $this->render('ezreview/target_form.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/badreview/{returnMail} ", name="badreview")
     */
    public function badreview(SendMailService $mailService, Request $request, $returnMail): Response
    {
        $form = $this->createForm(BadReviewType::class);
        $badreview = $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $context = [
                // 'mail' => $badreview->get('email')->getData(),
                'note' => $badreview->get('note')->getData(),
                'lieu_rdv' => $badreview->get('lieu_rdv')->getData(),
                'date_rdv' => $badreview->get('date_rdv')->getData(),
                'message' => $badreview->get('message')->getData(),
            ];

            $mailService->send(
                'patouseul@yahoo.fr',                   //from
                $returnMail,                            //to
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
}
