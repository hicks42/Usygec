<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils, JWTTokenManagerInterface $jwtManager, UserInterface $user = null): Response
    {
        if ($user) {
            // Generate a JWT token using the authenticated user
            $token = $jwtManager->create($user);

            // Create an HttpOnly cookie with the token
            $cookie = Cookie::create('jwt_token', $token)
                ->withHttpOnly(true)
                ->withSecure(true) // If served over HTTPS
                ->withSameSite('strict');

            // Redirect the authenticated user to the "lobby" route
            $response = $this->render('lobby/index.html.twig', ['user' => $user]);
            $response->headers->setCookie($cookie);
            return $response;
        }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('ezreview/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
