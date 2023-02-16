<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class BadReviewType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', HiddenType::class)
            // ->add('lieu_rdv', TextType::class, [
            //     'label' => 'Le lieu de votre rendez vous :'
            // ])
            ->add('date_rdv', DateTimeType::class, [
                'label' => false,
                'widget' => 'single_text',
                'input'  => 'datetime_immutable',
                'html5' => false,
                'attr' => [
                    'class' => 'js-datepicker'
                ],
            ])
            ->add('note', ChoiceType::class, [
                'label' => false,
                'choices' => range(0, 10),
                'placeholder' => 'de 0 à 10',
                'attr' => [
                    'class' => 'btn btn-secondary dropdown-toggle',
                ],
                'choice_attr' => function ($choice, $key, $value) {
                    return [
                        'class' => 'dropdown-item text-white text-center'
                    ];
                },
            ])

            ->add('message', TextareaType::class, [
                'label' => 'Expliquez le motif de votre mécontentement :'
            ])
            ->add('envoyer', SubmitType::class, [
                'attr' => [
                    'class' => 'btn btn-primary btn-lg btn-block my-5'
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
