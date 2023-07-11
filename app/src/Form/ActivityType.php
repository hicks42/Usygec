<?php

namespace App\Form;

use App\Entity\Activity;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class ActivityType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('description', TextareaType::class, [
                'label' => false,
                'required' => true,
                'attr' => [
                    'placeholder' => 'Description',
                    'class' => 'activ-description form-control'
                ]
            ])
            ->add('dueDate', DateType::class, [
                'label' => 'Date limite : ',
                'widget' => 'single_text',
                'required' => false,
                'label_attr' => [
                    'class' => 'mt-2 my-1',
                ],
                // 'input'  => 'datetime_immutable',
                'html5' => true,
                'row_attr' => [
                    'class' => 'col-4 my-1 m-2 input-group',
                ],
                // 'attr' => [
                //     'placeholder' => 'Date limite',
                //     'name' => 'form-control'
                // ]
            ])
            ->add('isActive', CheckboxType::class, [
                'label' => ' : En cours',
                'required' => false,
                'row_attr' => [
                    'class' => 'form-switch'
                ],
                'attr' => [
                    'class' => 'is-active fs-6 mt-3',
                    'data-toggle' => 'toggle',
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Activity::class,
        ]);
    }
}
