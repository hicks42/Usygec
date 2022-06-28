<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Structure;
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
        // dd($user);
        return $this->render('ezreview/account.html.twig', [
            'controller_name' => 'AccountController',
            'user' => $user,
        ]);
    }

    /**
     * @Route("/ezreview/account/create", name="account_create", methods={"GET", "POST"})
     * @IsGranted("IS_AUTHENTICATED_FULLY") and ("IS_ADMIN"))
     */
    public function create(Request $request, EntityManagerInterface $em): Response
    {
        $user = new User;

        $form = $this->createForm(UserType::class, $user, [
            'method' => 'POST',
        ]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            // $structures = $user->getStructures();
            // foreach ($structures as $key => $structure) {
            //     $structure->setUser($user);
            //     $structures->set($key, $structure);
            // }

            $em->persist($user);
            $em->flush();

            $this->addFlash('success', 'Account updated successfully!');

            return $this->redirectToRoute('account');
        }

        return $this->render('ezreview/account_create.html.twig', [
            'form' => $form->createView()
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
            // $structures = $user->getStructures();
            // foreach ($structures as $key => $structure) {
            //     $structure->setUser($user);
            //     $structures->set($key, $structure);
            // }

            $em->flush();

            $this->addFlash('success', 'Account updated successfully!');

            return $this->redirectToRoute('account');
        }

        return $this->render('ezreview/account_edit.html.twig', [
            'form' => $form->createView(),
            'user' => $user
        ]);
    }
}
