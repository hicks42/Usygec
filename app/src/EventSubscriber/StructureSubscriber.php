<?php

namespace App\EventSubscriber;

use App\Entity\Structure;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use EasyCorp\Bundle\EasyAdminBundle\Event\BeforeEntityPersistedEvent;

class StructureSubscriber implements EventSubscriberInterface
{
    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            BeforeEntityPersistedEvent::class => ['setUser'],
        ];
    }

    public function setUser(BeforeEntityPersistedEvent $event)
    {
        $entity = $event->getEntityInstance();
        if ($entity instanceof Structure) {
            $entity->setUser($this->security->getUser());
        }
    }
}
