<?php

namespace App\Service;

use App\Entity\Structure;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

class SendMailService
{
    private MailerInterface $mailer;
    private EntityManagerInterface $em;

    public function __construct(MailerInterface $mailer, EntityManagerInterface $em)
    {
        $this->mailer = $mailer;
        $this->em = $em;
    }

    public function sendmail($structureId)
    {
        $structure = $this->em->find(Structure::class, $structureId);
        $userMail = $structure->getUser()->getEmail();

        $context = [
            'mail' => 'info@usygec.fr',
            'structure' => $structure->getName(),
            'subject' => 'Enquète de satisfaction',
            'structureId' => $structureId,
        ];

        $seconds = rand(2, 7);
        sleep($seconds);

        $this->send(
            'info@usygec.fr',                   //from
            $userMail,                          //to
            'Enquète de satisfaction ',         //subject
            'ezreview_template',                //template
            $context                            //context
        );
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

        //Pour faire passer le mail par mailjet
        // $email->getHeaders()->addTextHeader('X-Transport', 'mailjet');

        // On envoie le mail
        $this->mailer->send($email);
    }
}
