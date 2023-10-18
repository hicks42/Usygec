<?php

namespace App\Tests\Unit;

use App\Entity\User;
use App\Entity\Structure;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class UserTest extends KernelTestCase
{
    public function testUserEntity(): void
    {
        self::bootKernel();

        $container = static::getContainer();

        $user = new User();
        $user->setEmail('email@domain.com')
          ->setRoles(['USER'])
          ->setPassword('Password U1')
          ->setCompany('Company U1')
          ;

        $errors = $container->get('validator')->validate($user);
        $this->assertCount(0, $errors);
    }
}
