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
            ->add('name', TextType::class,[
                'attr' => [
                    'placeholder' => 'Société',
                    'class' => 'form-control'
                ]
            ])
            ->add('category', EntityType::class, [
                'class' => Category::class,
                'attr' => [
                    'class' => 'form-select',
                ],
                'choice_label' => function ($category) {
                  return $category->getName();
                }
              ])
              ->add('civ', ChoiceType::class, [
                'required' => false,
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
            ->add('contactFirstName', TextType::class,[
                'required' => false,
                'attr' => [
                    'placeholder' => 'Prénom',
                    'class' => 'form-control'
                ]
            ])
            ->add('contactLastName', TextType::class,[
                'required' => false,
                'attr' => [
                    'placeholder' => 'Nom',
                    'class' => 'form-control'
                ]
            ])
            ->add('address1', TextType::class,[
                'required' => false,
                'attr' => [
                    'placeholder' => 'Addresse 1',
                    'class' => 'form-control'
                ]
            ])
            ->add('address2', TextType::class,[
                'required' => false,
                'attr' => [
                    'placeholder' => 'Addresse 2',
                    'class' => 'form-control'
                ]
            ])
            ->add('cp', TextType::class,[
                'required' => false,
                'attr' => [
                    'placeholder' => 'Code postal',
                    'class' => 'form-control'
                ]
            ])
            ->add('city', TextType::class,[
                'required' => false,
                'attr' => [
                    'placeholder' => 'Ville',
                    'class' => 'form-control'
                ]
            ])
            ->add('phone', TelType::class,[
                'required' => false,
                'attr' => [
                    'placeholder' => 'Téléphone',
                    'class' => 'form-control'
                ]
            ])
            ->add('mobile', TelType::class,[
                'required' => false,
                'attr' => [
                    'placeholder' => 'Portable',
                    'class' => 'form-control'
                ]
            ])
            ->add('email', EmailType::class,[
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
