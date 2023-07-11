<?php

namespace App\Controller;

use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class LobbyController extends AbstractController
{
    /**
     * @Route("/lobby", name="lobby")
     */
    public function index(Security $security): Response
    {
        $user = $security->getUser();
        return $this->render('lobby/index.html.twig', [
            'user' => $user,
        ]);
    }
}
