<?php

namespace App\Tests\Unit;

use App\Entity\User;
use App\Entity\Structure;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class StructureTest extends KernelTestCase
{
    public function testStructureEntity()
    {
        // (1) boot the Symfony kernel
        self::bootKernel();

        // (2) use static::getContainer() to access the service container
        $container = static::getContainer();

        $structure = new Structure();
        $structure->setName('Structure N°1')
          ->setImageName('Image1 S1')
          ->setAdresse1('Addresse1 S1')
          ->setAdresse2('Addresse2 S1')
          ->setCp(42000)
          ->setCity('City S1')
          ->setCountry('Country S1')
          ->setPhone('Phone S1')
          ->setUser(new User())
          ->setPid('Pid S1')
          ->setBadRevUrl('Bad review URL S1')
          ;

        $errors = $container->get('validator')->validate($structure);
        $this->assertCount(0, $errors);

        // (3) run some service & test the result
        // $newsletterGenerator = $container->get(NewsletterGenerator::class);
        // $newsletter = $newsletterGenerator->generateMonthlyNews(/* ... */);

        // $this->assertEquals('...', $newsletter->getContent());
    }
}
