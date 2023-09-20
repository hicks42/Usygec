<?php

namespace App\Form;

use App\Entity\Activity;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class ActivityType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => false,
                'required' => false,
                'attr' => [
                    'placeholder' => 'Nom',
                    'class' => 'form-control'
                ]
            ])
            ->add('description', TextareaType::class, [
                'label' => false,
                'required' => true,
                'attr' => [
                    'placeholder' => 'Description',
                    'class' => 'activ-description form-control'
                ]
            ])
            ->add('reminder', DateType::class, [
                'label' => 'Rappel : ',
                'required' => false,
                'html5' => false,
                'widget' => 'single_text',
                'format' => 'dd-MM-yyyy',
                'attr' => [
                    'placeholder' => 'jj/mm/aaaa',
                    'class' => 'flatpickr ms-2',
                ],
                'label_attr' => [
                    'class' => 'mt-2 my-1',
                ],
                'row_attr' => [
                    'class' => 'input-group',
                ],
                // 'input'  => 'datetime_immutable',
            ])
            ->add('dueDate', DateType::class, [
                'label' => 'Date limite : ',
                'required' => false,
                'html5' => false,
                'widget' => 'single_text',
                'format' => 'dd-MM-yyyy',
                'attr' => [
                    'placeholder' => 'jj/mm/aaaa',
                    'class' => 'flatpickr ms-2',
                ],
                'label_attr' => [
                    'class' => 'mt-2 my-1',
                ],
                'row_attr' => [
                    'class' => 'input-group',
                ],
                // 'input'  => 'datetime_immutable',
            ])
            ->add('isActive', CheckboxType::class, [
                'label' => 'En cours : ',
                'required' => false,
                'row_attr' => [
                    'class' => 'form-switch d-flex justify-content-around pt-1 text-nowrap'
                ],
                'attr' => [
                    'class' => 'is-active fs-6 form-check-input',
                    'data-toggle' => 'toggle',
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Activity::class,
            // 'block_prefix' => 'activity',
        ]);
    }
}
