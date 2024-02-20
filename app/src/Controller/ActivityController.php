<?php

namespace App\Controller;

use App\Entity\Company;
use App\Entity\Activity;
use App\Form\ActivityType;
use App\Repository\ActivityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/activities")
 */
class ActivityController extends AbstractController
{

  private $security;
  private $user;
  private $logger;

  public function __construct(Security $security)
  {
    $this->security = $security;
    $this->user = $this->security->getUser();
  }

  /**
   * @Route("/", name="app_activities", methods={"GET"})
   * @IsGranted("ROLE_USER")
   */
  public function index(ActivityRepository $activityRepository, Request $request, PaginatorInterface $paginator): Response
  {
    $keyword = $request->query->get('keyword');
    $sortBy = $request->query->get('sort_by', 'reminder'); // Default to sorting by reminder
    $sortOrder = $request->query->get('sort_order', 'asc'); // Default to ascending order

    // $activities = $activityRepository->findByKeyword($this->user, $keyword, $sortBy, $sortOrder);
    $activities = $activityRepository->findByKeywordWithCustomSorting($this->user, $keyword, $sortBy, $sortOrder);

    $now = new \DateTime();
    $fiveDaysFromNow = (clone $now)->modify('+5 days');

    $activActivities = [];
    foreach ($activities as $activity) {
      //
      if ($activity->getReminder()) {
        $reminderDate = $activity->getReminder();
        $nowDate = $now->setTime(0, 0, 0);
        $reminderDateOnly = $reminderDate->setTime(0, 0, 0);

        $daysToReminder = $reminderDateOnly->diff($nowDate)->days;

        // Add "+" in front of $daysToReminder if it is in the past
        if ($reminderDate < $now) {
          $daysToReminder = "+" . $daysToReminder;
        }

        if ($daysToReminder <= 10) {
          $activActivities[] = [
            'activity' => $activity,
            'daysToReminder' => $daysToReminder,
          ];
        } else {
          $activActivities[] = [
            'activity' => $activity,
            'daysToReminder' => null,
          ];
        }
      } else {
        $activActivities[] = [
          'activity' => $activity,
          'daysToReminder' => null,
        ];
      }
    }

    // Paginate the filtered result
    $pagination = $paginator->paginate(
      $activActivities, // Query or result to paginate
      $request->query->getInt('page', 1), // Current page number
      10 // Number of items per page
    );

    return $this->render('activities/index.html.twig', [
      'pagination' => $pagination,
      'keyword' => $keyword,
      'sort_by' => $sortBy,
      'sort_order' => $sortOrder,
    ]);
  }

  /**
   * @Route("/api/json", name="app_activities_api", methods={"GET", "POST"})
   * @IsGranted("ROLE_USER")
   */
  public function ajaxSortActivities(ActivityRepository $activityRepository, Request $request, PaginatorInterface $paginator): Response
  {
    // Ajoutez ce code pour enregistrer le contenu de l'en-tête Authorization dans les logs
    // $authorizationHeader = $request->headers->get('Authorization');
    // $url = $request->getUri();
    // $this->logger->info('Authorization Header : ' . $authorizationHeader, ['url' => $url]);

    $headers = $request->headers->all();
    $this->logger->info('Request Headers: ' . json_encode($headers));

    $keyword = $request->query->get('keyword');
    $sortBy = $request->query->get('sort_by', 'reminder'); // Default to sorting by name
    $sortOrder = $request->query->get('sort_order', 'desc'); // Default to ascending order

    $activities = $activityRepository->findByKeyword($this->user, $keyword, $sortBy, $sortOrder);

    if ($activities) {
      $now = new \DateTime();
      $daysToReminder = null;
      $activActivities = [];
      $urgentActivities = [];

      foreach ($activities as $activity) {
        //
        if ($activity->getReminder()) {
          $reminderDate = $activity->getReminder();
          $nowDate = $now->setTime(0, 0, 0);
          $reminderDateOnly = $reminderDate->setTime(0, 0, 0);

          $daysToReminder = $reminderDateOnly->diff($nowDate)->days;

          // Add "+" in front of $daysToReminder if it is in the past
          if ($reminderDate < $now) {
            $daysToReminder = "+" . $daysToReminder;
          }

          if ($daysToReminder <= 10) {
            $urgentActivities[] = [
              'activity' => $activity,
              'daysToReminder' => $daysToReminder,
            ];
          } else {
            $reminderActivities[] = [
              'activity' => $activity,
              'daysToReminder' => null,
            ];
          }
        } else {
          $activActivities[] = [
            'activity' => $activity,
            'daysToReminder' => null,
          ];
        }
      }
      $allActivities = array_merge(array_reverse($urgentActivities), $reminderActivities, $activActivities);

      // Create an array of data to be returned as JSON
      $responseData = [];

      foreach ($allActivities as $item) {
        $activity = $item['activity'];
        $daysToReminder = $item['daysToReminder'];

        $responseData[] = [
          'id' => $activity->getId(),
          'isActive' => $activity->isActive(),
          'name' => $activity->getName(),
          'company' => $activity->getCompany()->getName(),
          'description' => $activity->getDescription(),
          'dueDate' => $activity->getDueDate(),
          'reminder' => $activity->getReminder(),
          'createdAt' => $activity->getCreatedAt(),
          'updatedAt' => $activity->getUpdatedAt(),
          'daysToReminder' => $daysToReminder,
        ];
      }
      return new JsonResponse($responseData);
    }
    return new JsonResponse('No data');
  }

  /**
   * @Route("/{id<[0-9]+>}/add-activity", name="app_add_activity", methods={"GET", "POST"})
   * @IsGranted("ROLE_USER")
   */
  public function new(Request $request, EntityManagerInterface $em, ActivityRepository $activityRepository, $id): Response
  {
    $activity = new Activity();
    $form = $this->createForm(ActivityType::class, $activity);
    $form->handleRequest($request);
    $company = $em->getRepository(Company::class)->findOneById($id);

    if ($form->isSubmitted() && $form->isValid()) {
      $activity->setCompany($company);
      $activityRepository->add($activity, true);

      return $this->redirectToRoute('app_company_activities', ["id" => $id], Response::HTTP_SEE_OTHER);
    }

    return $this->renderForm('activities/new.html.twig', [
      'activity' => $activity,
      'form' => $form,
      'company' => $company,
    ]);
  }

  /**
   * @Route("/{id<[0-9]+>}", name="app_activities_show", methods={"GET"})
   * @IsGranted("ROLE_USER")
   */
  public function show(Activity $activity): Response
  {
    return $this->render('activities/show.html.twig', [
      'activity' => $activity,
    ]);
  }

  /**
   * @Route("/{id}/edit", name="app_activities_edit", methods={"GET", "POST"})
   * @IsGranted("ROLE_USER")
   */
  public function edit(Request $request, EntityManagerInterface $em, Activity $activity, ActivityRepository $activityRepository): Response
  {
    $form = $this->createForm(ActivityType::class, $activity);
    $form->handleRequest($request);
    $company = $activity->getCompany();

    if ($form->isSubmitted() && $form->isValid()) {
      $activityRepository->add($activity, true);

      return $this->redirectToRoute('app_companies_show', ["id" => $company->getId()], Response::HTTP_SEE_OTHER);
    }

    return $this->renderForm('activities/edit.html.twig', [
      'activity' => $activity,
      'company' => $company,
      'form' => $form,
    ]);
  }

  /**
   * @Route("/{id}", name="app_activities_delete", methods={"POST"})
   * @IsGranted("ROLE_USER")
   */
  public function delete(Request $request, Activity $activity, ActivityRepository $activityRepository): Response
  {
    $companyId = $activity->getCompany()->getId();
    if ($this->isCsrfTokenValid('delete' . $activity->getId(), $request->request->get('_token'))) {
      $activityRepository->remove($activity, true);
    }

    return $this->redirectToRoute('app_company_activities', ["id" => $companyId], Response::HTTP_SEE_OTHER);
  }
}
