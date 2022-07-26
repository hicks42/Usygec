<?php

namespace App\Service;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

class SendMailService
{
    private $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function send(
        string $from,
        string $to,
        string $subject,
        string $template,
        array $context
    ): void {
        // On crée le mail
        $email = (new TemplatedEmail())
            ->from($from)
            ->to($to)
            ->subject($subject)
            ->htmlTemplate("emails/$template.html.twig")
            ->context($context);
        // On envoie le mail
        $this->mailer->send($email);
    }

    public function sendToTarget($user, $target, $structure)
    {
        $context = [
            'mail' => $target,
            'company' => $user->getCompany(),
            'structure' => $structure->getName(),
            'imageName' => $structure->getImageName(),
            'googleUrl' => $structure->getGooglUrl(),
            'badRevUrl' => $structure->getBadRevUrl(),
            'subject' => 'Enquète de satisfaction',
            'structureId' => $structure->getId(),
            // 'baseUrl' => $request->getSchemeAndHttpHost(),
        ];
        $seconds = rand(2, 7);
        sleep($seconds);
        $this->send(
            $user->getEmail(),                  //from
            $target,                            //to
            'Enquète de satisfaction ',         //subject
            'ezreview_template',                //template
            $context                            //context
        );
    }
}
