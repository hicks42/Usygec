<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Form\RegistrationFormType;
use App\Repository\UserRepository;
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
    public function show(Security $security): Response
    {
        $user = $security->getUser();
        return $this->render('ezreview/account.html.twig', [
            'controller_name' => 'AccountController',
            'user' => $user,
        ]);
    }

    //     /**
    //      * @Route("/ezreview/account/create", name="account_create", methods={"GET", "POST"})
    //      * @IsGranted("IS_AUTHENTICATED_FULLY") and ("IS_ADMIN"))
    //      */
    //     public function create(Request $request, EntityManagerInterface $em): Response
    //     {
    //         $user = new User;

    //         $form = $this->createForm(UserType::class, $user, [
    //             'method' => 'POST',
    //         ]);

    //         $form->handleRequest($request);

    //         if ($form->isSubmitted() && $form->isValid()) {

    //             // $structures = $user->getStructures();
    //             // foreach ($structures as $key => $structure) {
    //             //     $structure->setUser($user);
    //             //     $structures->set($key, $structure);
    //             // }

    //             $em->persist($user);
    //             $em->flush();

    //             $this->addFlash('success', 'Account updated successfully!');

    //             return $this->redirectToRoute('account');
    //         }

    //         return $this->render('ezreview/account_create.html.twig', [
    //             'form' => $form->createView()
    //         ]);
    //     }

}
