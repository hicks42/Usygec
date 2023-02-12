<?php

namespace App\Service;

// require 'vendor/autoload.php';

use Mailjet\Client;
use Mailjet\Resources;
use App\Entity\Structure;
use Doctrine\ORM\EntityManagerInterface;

class MailJetService
{
  private EntityManagerInterface $em;

  protected $mailjet_key_public;
  protected $mailjet_key_private;

  public function __construct(EntityManagerInterface $em, $mailjet_key_public, $mailjet_key_private)
  {
      $this->em = $em;
      $this->mailjet_key_public = $mailjet_key_public;
      $this->mailjet_key_private = $mailjet_key_private;
  }

  // public function send($target, $structureName, $baseUrl)
  public function send($target, $structureName, $GooglUrl, $badUrl, $imageUrl)
  {

    // $structure = $this->em->find(Structure::class, $structureId);

    $mj = new Client($this->mailjet_key_public, $this->mailjet_key_private, true, ["version" => 'v3.1']);

    $body = [
      'Messages' => [
        [
          'From' => [
            'Email' => "agence@usygec.fr",
            'Name' => 'Isadora de ' . $structureName,
          ],
          'To' => [
            [
              'Email' => $target,
              'Name' => "Patrice",
            ]
          ],
          'TemplateID' => 4577295,
          'TemplateLanguage' => true,
          'Subject' => "Enquete de satisfaction de " . $structureName,
          'Variables' => json_decode('{
            "structureName": "'.$structureName.'",
            "imageUrl": "'.$imageUrl.'",
            "badUrl": "'.$badUrl.'",
            "googleUrl": "'.$GooglUrl.'"
          }', true)
        ]
      ]
    ];
    $response = $mj->post(Resources::$Email, ['body' => $body]);
    $response->success();
  }
}
