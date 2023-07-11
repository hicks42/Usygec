<?php

namespace App\Controller;

use App\Entity\Activity;
use App\Entity\Customer;
use App\Form\ActivityType;
use App\Repository\ActivityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/activities")
 */
class ActivityController extends AbstractController
{
    /**
     * @Route("/{id<[0-9]+>}/activities", name="app_customer_activities", methods={"GET"})
     */
    public function index(ActivityRepository $activityRepository, EntityManagerInterface $em, $id): Response
    {
        $customer = $em->getRepository(Customer::class)->findOneById($id);

        $activities = $activityRepository->findBy(['customer' => $customer], ['createdAt' => 'DESC']);

        return $this->render('activities/index.html.twig', [
            'activities' => $activities,
            'customer' => $customer,
        ]);
    }

    /**
     * @Route("/{id<[0-9]+>}/add-activity", name="app_add_activity", methods={"GET", "POST"})
     */
    public function new(Request $request, EntityManagerInterface $em, ActivityRepository $activityRepository, $id): Response
    {
        $activity = new Activity();
        $form = $this->createForm(ActivityType::class, $activity);
        $form->handleRequest($request);
        $customer = $em->getRepository(Customer::class)->findOneById($id);

        if ($form->isSubmitted() && $form->isValid()) {
            $activity->setCustomer($customer);
            $activityRepository->add($activity, true);

            return $this->redirectToRoute('app_customer_activities', ["id" => $id], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('activities/new.html.twig', [
            'activity' => $activity,
            'form' => $form,
            'customer' => $customer,
        ]);
    }

    /**
     * @Route("/{id<[0-9]+>}", name="app_activities_show", methods={"GET"})
     */
    public function show(Activity $activity): Response
    {
        return $this->render('activities/show.html.twig', [
            'activity' => $activity,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="app_activities_edit", methods={"GET", "POST"})
     */
    public function edit(Request $request, EntityManagerInterface $em, Activity $activity, ActivityRepository $activityRepository, $id): Response
    {
        $form = $this->createForm(ActivityType::class, $activity);
        $form->handleRequest($request);
        $customer = $activity->getCustomer();

        if ($form->isSubmitted() && $form->isValid()) {
            $activityRepository->add($activity, true);

            return $this->redirectToRoute('app_customer_activities', ["id" => $customer->getId()], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('activities/edit.html.twig', [
            'activity' => $activity,
            'form' => $form,
            'customer' => $customer,
        ]);
    }

    /**
     * @Route("/{id}", name="app_activities_delete", methods={"POST"})
     */
    public function delete(Request $request, Activity $activity, ActivityRepository $activityRepository): Response
    {
        $customerId = $activity->getCustomer()->getId();
        if ($this->isCsrfTokenValid('delete' . $activity->getId(), $request->request->get('_token'))) {
            $activityRepository->remove($activity, true);
        }

        return $this->redirectToRoute('app_customer_activities', ["id" => $customerId], Response::HTTP_SEE_OTHER);
    }
}
