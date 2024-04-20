<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils, UserInterface $user = null): Response
    {
        if ($user instanceof UserInterface) {

            // Redirect the authenticated user to the "lobby" route
            $response = $this->render('lobby/index.html.twig', ['user' => $user]);
            // $response->headers->setCookie($cookie);
            return $response;
        }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('main/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
        // return $this->redirect('http://localhost:3000');
    }

    /**
     * @Route("/api/auth", name="api_auth", methods={"GET","POST"})
     */
    public function apiAuth(Request $request, UserPasswordHasherInterface $passwordHasher, ManagerRegistry $registry): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        // Vérifiez si les données requises sont présentes
        if (!isset($data['email']) || !isset($data['password'])) {
            return new JsonResponse(['message' => 'Les données requises sont manquantes'], 400);
        }

        // Recherchez l'utilisateur par son e-mail
        $user = $registry->getRepository(User::class)->findOneBy(['email' => $data['email']]);

        // Vérifiez si l'utilisateur existe et si le mot de passe est correct
        if (!$user || !$passwordHasher->isPasswordValid($user, $data['password'])) {
            throw new BadCredentialsException('Identifiants invalides');
        }

        // Créez une réponse JSON avec un message de succès
        $response = new JsonResponse(['message' => 'Connecté avec succès']);

        return $response;
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
