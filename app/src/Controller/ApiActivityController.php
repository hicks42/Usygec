<?php

namespace App\Controller;

use App\Entity\Company;
use App\Entity\Activity;
use App\Form\ActivityType;
use Psr\Log\LoggerInterface;
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
 * @Route("/api")
 */
class ApiActivityController extends AbstractController
{

  private $security;
  private $user;
  private $logger;

  public function __construct(Security $security, LoggerInterface $logger)
  {
    $this->security = $security;
    $this->logger = $logger;
    $this->user = $this->security->getUser();
  }

  /**
   * @Route("/activities", name="api_activities_api", methods={"GET"})
   * @IsGranted("ROLE_USER")
   */
  public function ajaxSortActivities(ActivityRepository $activityRepository, Request $request): Response
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
   * @Route("/activity/", name="api_add_activity", methods={"POST"})
   * @IsGranted("ROLE_USER")
   */
  public function new(Request $request, EntityManagerInterface $em, SerializerInterface $serializer, ActivityRepository $activityRepository, $id): Response
  {
    $apiInput = $serializer->deserialize($request->getContent(), ApiInput::class, 'json');
    dd($apiInput);
    $company = $this->user->getCompany();

    $activity = new Activity();

    $activity->setName($request->request->get('name'));
    $activity->setDescription($request->request->get('description'));
    $activity->setCompany($request->request->get('company'));
    $activity->setReminder($request->request->get('reminder'));
    $activity->setDueDate($request->request->get('dueDate'));
    $activity->setIsActive($request->request->get('isActive'));

    $activityRepository->add($activity, true);

    return $this->redirectToRoute('app_company_activities', ["id" => $id], Response::HTTP_SEE_OTHER);
  }


  /**
   * @Route("/activity/{id<[0-9]+>}", name="api_activities_show", methods={"GET"})
   * @IsGranted("ROLE_USER")
   */
  public function show(Activity $activity): Response
  {
    return $this->render('bam/activities/show.html.twig', [
      'activity' => $activity,
    ]);
  }

  /**
   * @Route("/{id}/edit", name="api_activities_edit", methods={"PATCH"})
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

    return $this->renderForm('bam/activities/edit.html.twig', [
      'activity' => $activity,
      'company' => $company,
      'form' => $form,
    ]);
  }

  /**
   * @Route("/{id}", name="api_activities_delete", methods={"POST"})
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
