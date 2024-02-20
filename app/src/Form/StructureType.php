<?php

namespace App\Form;

use App\Entity\Structure;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Vich\UploaderBundle\Form\Type\VichImageType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class StructureType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => 'Nom',
                'row_attr' => ['class' => 'mt-4'],
                'attr' => [
                    'placeholder' => 'Nom de l\'établissement',
                    'class' => 'form-control'
                ]
            ])
            ->add('imageFile', VichImageType::class, [
                'label' => 'Image de l\'établissement',
                'required' => false,
                'allow_delete' => true,
                'delete_label' => 'Supprimer l\'image',
                'download_uri' => false,
                'imagine_pattern' => 'company_image_banner',
                'row_attr' => ['class' => 'mt-4'],
                'attr' => [
                    'placeholder' => 'Image au format jpg ou png',
                    'class' => 'form-control'
                ]
            ])
            // ->add('googlUrl', TextareaType::class, [
            //     'label' => 'Indiquez l\'URL pour un avis positif (Google) :'
            // ])
            ->add('Pid', TextType::class, [
                'required' => false,
                // 'mapped' => false,
                'row_attr' => ['class' => 'mt-4'],
                'attr' => ['class' => 'form-control'],
            ])
            ->add('badRevUrl', TextareaType::class, [
                'label' => 'Indiquez l\'URL pour un avis negatif :',
                'required' => false,
                'row_attr' => ['class' => 'mt-4'],
                'attr' => [
                    'placeholder' => '(optionelle)',
                    'class' => 'form-control'
                ]
            ])
            ->add('adresse1', TextType::class, [
                'label' => 'Adresse 1',
                'attr' => [
                    'placeholder' => 'Indiquez l\'addresse',
                    'class' => 'form-control'
                ]
            ])
            ->add('adresse2', TextType::class, [
                'label' => 'Adresse 2',
                'required' => false,
                'attr' => [
                    'placeholder' => '(optionelle)',
                    'class' => 'form-control'
                ]
            ])
            ->add('cp', IntegerType::class, [
                'label' => 'Code postal',
                'attr' => [
                    'placeholder' => 'Indiquez le code postal',
                    'class' => 'form-control'
                ]
            ])
            ->add('city', TextType::class, [
                'label' => 'Ville',
                'attr' => [
                    'placeholder' => 'Indiquez la ville',
                    'class' => 'form-control'
                ]
            ])
            ->add('country', TextType::class, [
                'label' => 'Pays',
                'attr' => [
                    'placeholder' => 'Indiquez le pays',
                    'class' => 'form-control'
                ]
            ])
            ->add('phone', TelType::class, [
                'label' => 'Téléphone',
                'attr' => [
                    'placeholder' => 'Le téléphone du contact',
                    'class' => 'form-control'
                ]
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Structure::class,
        ]);
    }
}
