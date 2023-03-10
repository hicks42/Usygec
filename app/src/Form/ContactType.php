<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => 'Votre nom :'
            ])
            ->add('subject', TextType::class, [
                'label' => 'Sujet :'
            ])
            ->add('email', EmailType::class, [
                'label' => 'Votre email :'
            ])
            ->add('phone', TextType::class, [
                'label' => 'Votre téléphone :'
            ])
            ->add('message', TextareaType::class, [
                'label' => 'Votre message :'
            ])
            ->add('envoyer', SubmitType::class, [
                'attr' => [
                    'class' => 'btn mt-3'
                ]
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
