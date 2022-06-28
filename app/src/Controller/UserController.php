<?php

namespace App\Controller;

use App\Form\UserType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    /**
     * @Route("/user/edit", name="user_edit")
     */
    public function edit(Request $request, EntityManagerInterface $em): Response
    {
        $user = $this->getUser();

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

            $this->addFlash('success', 'Account updated successfully!');

            return $this->redirectToRoute('account');
        }

        return $this->render('ezreview/account_edit.html.twig', [
            'form' => $form->createView(),
            'user' => $user
        ]);
    }
}
