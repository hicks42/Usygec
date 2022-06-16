<?php

namespace App\Controller;

use App\Form\UserType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AccountController extends AbstractController
{
    /**
     * @Route("/ezreview/account", name="account")
     */
    public function show(Security $security): Response
    {
        $user = $security->getUser();
        return $this->render('ezreview/account.html.twig', [
            'controller_name' => 'AccountController',
            'user' => $user
        ]);
    }

    /**
     * @Route("/ezreview/account/edit", name="account_edit", methods={"GET", "POST"})
     * @IsGranted("IS_AUTHENTICATED_FULLY"))
     */
    public function edit(Request $request, EntityManagerInterface $em): Response
    {
        $user = $this->getUser();

        $form = $this->createForm(UserType::class, $user, [
            'method' => 'POST',
        ]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->flush();

            $this->addFlash('success', 'Account updated successfully!');

            return $this->redirectToRoute('account');
        }

        return $this->render('ezreview/account_edit.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
