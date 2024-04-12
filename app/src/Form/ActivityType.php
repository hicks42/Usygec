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
				],
				'row_attr' => [
					'class' => 'my-1'
				]
			])
			->add('description', TextareaType::class, [
				'label' => false,
				'required' => true,
				'attr' => [
					'placeholder' => 'Description',
					'class' => 'activ-description form-control d-inline-flex'
				]
			])
			->add('reminder', DateType::class, [
				'label' => 'Rappel : ',
				'required' => false,
				'html5' => false,
				'widget' => 'single_text',
				'format' => 'dd-MM-yyyy',
				'row_attr' => [
					'class' => 'float-start'
				],
				'label_attr' => [
					'class' => 'text-nowrap w-25 align-self-center',
				],
				'attr' => [
					'placeholder' => 'jj/mm/aaaa',
					'class' => 'flatpickr form-control me-md-5 me-1',
				]
			])
			->add('dueDate', DateType::class, [
				'label' => 'Limite : ',
				'required' => false,
				'html5' => false,
				'widget' => 'single_text',
				'format' => 'dd-MM-yyyy',
				'row_attr' => [
					'class' => 'float-start'
				],
				'label_attr' => [
					'class' => 'text-nowrap w-25 align-self-center',
				],
				'attr' => [
					'placeholder' => 'jj/mm/aaaa',
					'class' => 'flatpickr form-control me-md-5 me-1',
				]
			])
			->add('isActive', CheckboxType::class, [
				'label' => 'En cours : ',
				'label_attr' => [
					'class' => 'text-nowrap',
				],
				'required' => false,
				'row_attr' => [
					'class' => 'form-switch float-end me-2'
				],
				'attr' => [
					'class' => 'is-active form-check-input ms-2',
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
