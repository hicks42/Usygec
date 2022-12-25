<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Vich\UploaderBundle\Form\Type\VichFileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;

class CsvType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('csvFile', VichFileType::class, [
                'label' => false,
                'mapped' => false,
                'required' => false,
                'allow_delete' => false,
                'download_uri' => true,
                // 'download_label' => false,
                // 'asset_helper' => false,
                // 'constraints' => [
                //     new File([
                //         'maxSize' => '8M',
                //         'mimeTypes' => [
                //             'text/csv',
                //         ],
                //         'mimeTypesMessage' => 'Merci d\'indiquer un document csv ',
                //     ])
                // ],
            ])
            ->add('structureId', IntegerType::class, [
                'label' => false,
                'mapped' => false,
                'required' => false,
                // 'empty_data' => '1',
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
