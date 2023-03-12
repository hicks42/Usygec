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
                'attr' => [
                    'placeholder' => 'Nom de l\'établissement'
                ]
            ])
            ->add('imageFile', VichImageType::class, [
                'label' => 'Image au format jpg ou png',
                'required' => false,
                'allow_delete' => true,
                'delete_label' => 'Supprimer l\'image',
                'download_uri' => false,
                'imagine_pattern' => 'company_image_banner',
            ])
            // ->add('googlUrl', TextareaType::class, [
            //     'label' => 'Indiquez l\'URL pour un avis positif (Google) :'
            // ])
            ->add('Pid', TextType::class, [
                'required' => false,
                // 'mapped' => false,
                // 'attr' => ['autocomplete' => 'fullGooglUrl'],
            ])
            ->add('badRevUrl', TextareaType::class, [
                'label' => 'Indiquez l\'URL pour un avis negatif :',
                'required' => false,
                'attr' => [
                    'placeholder' => '(optionelle)'
                ]
            ])
            ->add('adresse1', TextType::class, [
                'label' => 'Adresse 1',
                'attr' => [
                    'placeholder' => 'Indiquez l\'addresse'
                ]
            ])
            ->add('adresse2', TextType::class, [
                'label' => 'Adresse 2',
                'required' => false,
                'attr' => [
                    'placeholder' => '(optionelle)'
                ]
            ])
            ->add('cp', IntegerType::class, [
                'label' => 'Code postal',
                'attr' => [
                    'placeholder' => 'Indiquez le code postal'
                ]
            ])
            ->add('city', TextType::class, [
                'label' => 'Ville',
                'attr' => [
                    'placeholder' => 'Indiquez la ville'
                ]
            ])
            ->add('country', TextType::class, [
                'label' => 'Pays',
                'attr' => [
                    'placeholder' => 'Indiquez le pays'
                ]
            ])
            ->add('phone', TelType::class, [
                'label' => 'Téléphone',
                'attr' => [
                    'placeholder' => 'Le téléphone du contact'
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
