<?php

namespace App\Controller;

use App\Entity\Activity;
use App\Entity\Customer;
use App\Form\ClientType;
use App\Form\ActivityType;
use App\Form\CustomerType;
use App\Repository\ActivityRepository;
use App\Repository\CustomerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/customers")
 */
class CustomerController extends AbstractController
{

  private $security;

  public function __construct(Security $security)
  {
    $this->security = $security;
  }

  /**
   * @Route("/", name="cam", methods={"GET"})
   */
  public function index(CustomerRepository $customerRepository, ActivityRepository $activityRepository): Response
  {
    $customers = $customerRepository->findAll();
    $customerActiveActivityCounts = [];
    $customerActivityDueCounts = [];
    $customerActivitiesCount = 0;

    foreach ($customers as $customer) {
      $activeActivityCount = 0;
      $activityDueCount = 0;

      // Vérifier s'il y a des activités pour le client
      if ($customer->getActivities()->count() > 0) {
        $customerActivitiesCount = $customer->getActivities()->count();
        $activeActivityCount = $activityRepository->countActiveActivitiesByCustomer($customer);
        $activityDueCount = $activityRepository->countActivitiesDueWithin5Days($customer);
      }

      $customerActiveActivityCounts[$customer->getId()] = $activeActivityCount;
      $customerActivityDueCounts[$customer->getId()] = $activityDueCount;
    }

    return $this->render('customers/index.html.twig', [
      'customers' => $customerRepository->findAll(),
      'customerActiveActivityCounts' => $customerActiveActivityCounts,
      'customerActivityDueCounts' => $customerActivityDueCounts,
      'customerActivitiesCount' => $customerActivitiesCount,
    ]);
  }

  /**
   * @Route("/new", name="app_customers_new", methods={"GET", "POST"})
   */
  public function new(Request $request, CustomerRepository $customerRepository): Response
  {
    $customer = new Customer();
    $form = $this->createForm(CustomerType::class, $customer);
    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {
      $customer->setHandler($this->security->getUser());

      $customerRepository->add($customer, true);
      return $this->redirectToRoute('cam', [], Response::HTTP_SEE_OTHER);
    }

    return $this->renderForm('customers/new.html.twig', [
      'customer' => $customer,
      'form' => $form,
    ]);
  }

  /**
   * @Route("/{id}", name="app_customers_show", methods={"GET", "POST"})
   */
  public function show(Customer $customer, Request $request, EntityManagerInterface $em, ActivityRepository $activityRepository, $id): Response
  {
    $activity = new Activity();
    $activities = $activityRepository->findBy(['customer' => $customer]);
    $form = $this->createForm(ClientType::class, $customer, ['method' => 'POST']);

    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {
      $activities = $customer->getActivities();

      foreach ($activities as $key => $activity) {
        $activity->setCustomer($customer);
        $activities->set($key, $activity);
      }

      $activityRepository->add($activity, true);

      $this->addFlash('success', 'Situation Enregistrée');
      return $this->redirectToRoute('app_customers_show', ["id" => $id], Response::HTTP_SEE_OTHER);
    }

    return $this->renderForm('customers/show.html.twig', [
      'form' => $form,
      'customer' => $customer,
    ]);
  }

  /**
   * @Route("/{id}/edit", name="app_customers_edit", methods={"GET", "POST"})
   */
  public function edit(Request $request, Customer $customer, CustomerRepository $customerRepository, $id): Response
  {
    $form = $this->createForm(CustomerType::class, $customer);
    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {
      $customerRepository->add($customer, true);

      return $this->redirectToRoute('app_customers_show', ["id" => $id], Response::HTTP_SEE_OTHER);
    }

    return $this->renderForm('customers/edit.html.twig', [
      'customer' => $customer,
      'form' => $form,
    ]);
  }

  /**
   * @Route("/{id}", name="app_customers_delete", methods={"POST"})
   */
  public function delete(Request $request, Customer $customer, CustomerRepository $customerRepository): Response
  {
    if ($this->isCsrfTokenValid('delete' . $customer->getId(), $request->request->get('_token'))) {
      $customerRepository->remove($customer, true);
    }

    return $this->redirectToRoute('cam', [], Response::HTTP_SEE_OTHER);
  }
}
