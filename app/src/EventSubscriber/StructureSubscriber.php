<?php

namespace App\EventSubscriber;

use Doctrine\ORM\Events;
use App\Entity\Structure;
use Symfony\Component\Security\Core\Security;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class StructureSubscriber implements EventSubscriberInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            Events::prePersist,
        ];
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();
        if ($entity instanceof Structure) {
            $entity->setUser($this->security->getUser());
        }
    }
}
