<?php

namespace App\Service;

use Twig\Environment;
use App\Entity\Structure;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Crypto\DkimSigner;
use Symfony\Component\Mime\Crypto\DkimOptions;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class SendMailService
{
    private $twig;
    private MailerInterface $mailer;
    private EntityManagerInterface $em;
    private $dkim_key_path;
    private $project_dir;
    private $parameterBag;

    public function __construct(MailerInterface $mailer, EntityManagerInterface $em, Environment $twig, $dkim_key_path, $project_dir, ParameterBagInterface $parameterBag)
    {
        $this->mailer = $mailer;
        $this->em = $em;
        $this->twig = $twig;
        $this->project_dir = $project_dir;
        $this->parameterBag = $parameterBag;
        $this->dkim_key_path = $dkim_key_path;
    }

    public function sendOne($email)
    {
        $this->send(
            'noreply@usygec.fr',                          //from
            $target,                            //to
            'Enquète de satisfaction ',         //subject
            'ezreview_template',                //template
            $context                            //context
        );
    }

    // public function sendToTarget($target, $structureId, $baseUrl)
    // {
    //     $structure = $this->em->find(Structure::class, $structureId);
    //     $userMail = $structure->getUser()->getEmail();
    //     $target = $target;

    //     $context = [
    //         'mail' => $target,
    //         'baseUrl' => $baseUrl,
    //         'structure' => $structure->getName(),
    //         'imageName' => $structure->getImageName(),
    //         'googleUrl' => $structure->getGooglUrl(),
    //         'badRevUrl' => $structure->getBadRevUrl(),
    //         'subject' => 'Enquète de satisfaction',
    //         'structureId' => $structureId,
    //     ];

    //     $seconds = rand(2, 7);
    //     sleep($seconds);

    //     $this->send(
    //         $userMail,                          //from
    //         $target,                            //to
    //         'Enquète de satisfaction ',         //subject
    //         'ezreview_template',                //template
    //         $context                            //context
    //     );
    // }

    public function send(
        string $from,
        string $to,
        string $subject,
        string $template,
        array $context
    ): void {

        $dkim_hey = file_get_contents($this->dkim_key_path);

        $email = (new TemplatedEmail())
            ->from($from)
            ->to($to)
            ->subject($subject)
            ->text('Sending emails is fun again!')
            ->html($this->twig->render(
              "ezreview/emails/" . $template . ".html.twig",
              [
                'context' => $context,
              ]
                // ->htmlTemplate("emails/" . $template . ".html.twig")
                // ->context($context);
            ));

        //Pour faire passer le mail par mailjet
        // $email->getHeaders()->addTextHeader('X-Transport', 'mailjet');
        // $signer = new DkimSigner('file://'.dirname(__DIR__).$this->dkim_key_path, 'usygec.fr', 'email');

        if ($this->parameterBag->get('kernel.environment') === 'prod') {
            $signer = new DkimSigner($dkim_hey, 'usygec.fr', 'email');
            // $signer = new DkimSigner('file://'.dirname(__DIR__).$this->dkim_key_path, 'usygec.fr', 'email');
        } else {
            $signer = new DkimSigner($dkim_hey, 'usygec.fr', 'email');
            // $signer = new DkimSigner('file://'.$this->project_dir.$this->dkim_key_path, 'usygec.fr', 'email');
        }

        $signedEmail = $signer->sign($email, (new DkimOptions())
          ->bodyCanon('relaxed')
          ->headerCanon('relaxed')
          ->headersToIgnore(['Message-ID'])
          ->toArray()
        );

        // On envoie le mail
        $this->mailer->send($signedEmail);
        // dd($signedEmail);
    }
}
