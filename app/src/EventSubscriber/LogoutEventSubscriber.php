<?php

namespace App\EventSubscriber;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Http\Event\LogoutEvent;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class LogoutEventSubscriber implements EventSubscriberInterface
{
    private $urlGenerator;

    public function __construct(UrlGeneratorInterface $urlGenerator)
    {
        $this->urlGenerator = $urlGenerator;
    }

    public function onLogoutEvent(LogoutEvent $event)
    {

        // $response = new Response();
        // $response->headers->clearCookie('jwt_token');
        // $response->send();

        $event->getRequest()->getSession()->getFlashBag()->add(
            'success',
            'Deconnexion réussie!'
        );

        $event->setResponse(new RedirectResponse($this->urlGenerator->generate('app_login')));
    }

    public static function getSubscribedEvents()
    {
        return [
            LogoutEvent::class => 'onLogoutEvent',
        ];
    }
}
