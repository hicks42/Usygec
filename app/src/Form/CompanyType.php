<?php

namespace App\Form;

use App\Entity\Company;
use App\Entity\Category;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class CompanyType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => 'Nom de la société : ',
                'attr' => [
                    'placeholder' => 'Société',
                    'class' => 'form-control'
                ]
            ])
            ->add('category', EntityType::class, [
                'class' => Category::class,
                'label' => 'Type : ',
                'attr' => [
                    'class' => 'form-select',
                ],
                'choice_label' => function ($category) {
                    return $category->getName();
                }
            ])
            ->add('civ', ChoiceType::class, [
                'required' => false,
                'label' => 'Civilité : ',
                'choices' => [
                    'Monsieur' => 'Mr',
                    'Madame' => 'Mme',
                    'Mademoiselle' => 'Mlle',
                ],
                'placeholder' => 'Civilité',
                'attr' => [
                    'class' => 'form-select',
                ],
            ])
            ->add('contactFirstName', TextType::class, [
                'label' => 'Prénom du contact : ',
                'required' => false,
                'attr' => [
                    'placeholder' => 'Prénom',
                    'class' => 'form-control'
                ]
            ])
            ->add('contactLastName', TextType::class, [
                'label' => 'Nom du contact : ',
                'required' => false,
                'attr' => [
                    'placeholder' => 'Nom',
                    'class' => 'form-control'
                ]
            ])
            ->add('address1', TextType::class, [
                'label' => 'Adresse 1 : ',
                'required' => false,
                'attr' => [
                    'placeholder' => 'Addresse 1',
                    'class' => 'form-control'
                ]
            ])
            ->add('address2', TextType::class, [
                'label' => 'Adresse 2 : ',
                'required' => false,
                'attr' => [
                    'placeholder' => 'Addresse 2',
                    'class' => 'form-control'
                ]
            ])
            ->add('cp', TextType::class, [
                'label' => 'Code postal : ',
                'required' => false,
                'attr' => [
                    'placeholder' => 'Code postal',
                    'class' => 'form-control'
                ]
            ])
            ->add('city', TextType::class, [
                'label' => 'Ville : ',
                'required' => false,
                'attr' => [
                    'placeholder' => 'Ville',
                    'class' => 'form-control'
                ]
            ])
            ->add('phone', TelType::class, [
                'label' => 'Téléphone société : ',
                'required' => false,
                'attr' => [
                    'placeholder' => 'Téléphone',
                    'class' => 'form-control'
                ]
            ])
            ->add('mobile', TelType::class, [
                'label' => 'Portable du contact : ',
                'required' => false,
                'attr' => [
                    'placeholder' => 'Portable',
                    'class' => 'form-control'
                ]
            ])
            ->add('email', EmailType::class, [
                'label' => 'E-mail du contact : ',
                'required' => false,
                'attr' => [
                    'placeholder' => 'E-mail',
                    'class' => 'form-control'
                ]
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Company::class,
        ]);
    }
}
