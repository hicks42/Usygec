<?php

namespace App\EventListener;

use Symfony\Component\Security\Http\Event\LogoutEvent;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class LogoutListener
{
    private $session;

    public function __construct(SessionInterface $session)
    {
        $this->session = $session;
    }

    public function onSecurityLogout(LogoutEvent $event)
    {
        // Nettoyer la session à la déconnexion
        $this->session->clear();
    }
}
