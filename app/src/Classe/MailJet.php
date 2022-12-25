<?php

namespace App\Classe;

// require 'vendor/autoload.php';

use Mailjet\Client;
use Mailjet\Resources;
use App\Entity\Structure;
use Doctrine\ORM\EntityManagerInterface;


class MailJet
{
    private EntityManagerInterface $em;

    private $api_key = "2ee6ab00b79772edb1f214fba6072f1f";
    private $api_key_private = "e80d4553e2b1eb4a037f2f88c8103e02";

    // public function __construct(EntityManagerInterface $em)
    // {
    //     $this->em = $em;
    // }

    public function send($target, $structureId, $baseUrl)
    {

        // $structure = $this->em->find(Structure::class, $structureId);

        $mj = new Client($this->api_key, $this->api_key_private, true, ["version" => 'v3.1']);
        // $body = [
        //     'Messages' => [
        //         [
        //             'From' => [
        //                 'Email' => "agence@usygec.fr",
        //                 'Name' => "Johanna"
        //             ],
        //             'To' => [
        //                 [
        //                     'Email' => $target,
        //                     'Name' => "Client"
        //                 ]
        //             ],
        //             'TemplateID' => 4101270,
        //             'TemplateLanguage' => true,
        //             'Subject' => "Enquete de satisfaction",
        //             // 'Variables' => [
        //             //     'mail' => $target,
        //             //     'baseUrl' => $baseUrl,
        //             //     'structure' => $structure->getName(),
        //             //     'imageName' => $structure->getImageName(),
        //             //     'googleUrl' => $structure->getGooglUrl(),
        //             //     'badRevUrl' => $structure->getBadRevUrl(),
        //             //     'subject' => 'Enquète de satisfaction MailJet',
        //             //     'structureId' => $structureId,
        //             // ]
        //         ]
        //     ]
        // ];
        $body = [
            'Messages' => [
                [
                    'From' => [
                        'Email' => "agence@usygec.fr",
                        'Name' => "Patrice"
                    ],
                    'To' => [
                        [
                            'Email' => "agence@usygec.fr",
                            'Name' => "Patrice"
                        ]
                    ],
                    'Subject' => "Greetings from Mailjet.",
                    'TextPart' => "My first Mailjet email",
                    'HTMLPart' => "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
                    'CustomID' => "AppGettingStartedTest"
                ]
            ]
        ];
        $response = $mj->post(Resources::$Email, ['body' => $body]);
        $response->success() && var_dump($response->getData());
    }
}
