<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Company;
use App\Entity\Activity;
use App\Entity\Category;
use App\Form\ClientType;
use App\Form\CompanyType;
use App\Form\ActivityType;
use App\Form\CsvType;
use App\Repository\UserRepository;
use App\Service\CompanyCsvManager;
use App\Repository\CompanyRepository;
use App\Repository\ActivityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\VarDumper\VarDumper;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/companies")
 */
class CompanyController extends AbstractController
{

  private $security;
  private $user;
  private $managerRegistry;

  public function __construct(Security $security, ManagerRegistry $managerRegistry)
  {
    $this->security = $security;
    $this->user = $this->security->getUser();
    $this->managerRegistry = $managerRegistry;
  }

  /**
   * @Route("/", name="app_companies", methods={"GET"})
   * @IsGranted("ROLE_USER")
   */
  public function index(CompanyRepository $companyRepository, Request $request, PaginatorInterface $paginator): Response
  {
    // $userCompanies = $companyRepository->findBy(['handler' => $this->user], ['name' => 'ASC']);

    ////////  search bar  /////////////////////////
    $searchName = $request->query->get('name');
    $searchCategory = $request->query->get('category');
    $sortBy = $request->query->get('sort_by', 'name'); // Default to sorting by name
    $sortOrder = $request->query->get('sort_order', 'asc'); // Default to ascending order


    // Determine the order for sorting companies by name
    $nameSortOrder = $sortOrder === 'asc' ? 'desc' : 'asc';

    $searchResult = $companyRepository->findBySearchCriteria($this->user, $searchName, $searchCategory, $sortBy, $sortOrder);

    ///////////////////////// toggle page : index / searchResult /////////////////////////
    if (!empty($searchName) || !empty($searchCategory)) {
      $userCompanies = $searchResult;
    } else {
      $userCompanies = $companyRepository->findBy(['handler' => $this->user], ['name' => $sortOrder]);
    }

    // Sort the $userCompanies array based on the selected criteria
    if ($sortBy === 'activitiesCount') {
      usort($userCompanies, function ($a, $b) use ($sortOrder) {
        $aActiveCount = count(array_filter($a->getActivities()->toArray(), function ($activity) {
          return $activity->isActive();
        }));
        $bActiveCount = count(array_filter($b->getActivities()->toArray(), function ($activity) {
          return $activity->isActive();
        }));

        if ($sortOrder === 'asc') {
          return $aActiveCount - $bActiveCount;
        } else {
          return $bActiveCount - $aActiveCount;
        }
      });
    } elseif ($sortBy === 'name') {
      usort($userCompanies, function ($a, $b) use ($sortOrder) {
        return strcasecmp($a->getName(), $b->getName()) * ($sortOrder === 'asc' ? 1 : -1);
      });
    }

    ///////////////////////// Category search select /////////////////////////
    $categories = $this->managerRegistry->getRepository(Category::class)->findAll();
    $categoryNames = [];
    foreach ($categories as $category) {
      $categoryNames[] = $category->getName();
    }

    $filteredResult = [];
    // foreach ($result['allUserCompanies'] as $company) {
    foreach ($userCompanies as $company) {
      $activitiesCount = 0;

      foreach ($company->getActivities() as $activity) {
        if ($activity->isActive()) {
          $activitiesCount++;
        }
      }

      $filteredResult[$company->getId()] = [
        'company' => $company,
        'activitiesCount' => $activitiesCount,
      ];
    }


    // Paginate the filtered result
    $pagination = $paginator->paginate(
      $filteredResult, // Query or result to paginate
      $request->query->getInt('page', 1), // Current page number
      10 // Number of items per page
    );

    return $this->render('bam/companies/index.html.twig', [
      'pagination' => $pagination,
      'categories' => $categories,
      'sort_order' => $sortOrder,
      'sort_by' => $sortBy,
      'name_sort_order' => $nameSortOrder,
    ]);
  }

  /**
   * @Route("/json", name="app_ajax_sort", methods={"GET", "POST"})
   * @IsGranted("ROLE_USER")
   */
  public function ajaxSort(Request $request, CompanyRepository $companyRepository): JsonResponse
  {
    $user = $this->user;
    $sortBy = $request->query->get('sort_by', 'name');
    $sortOrder = $request->query->get('sort_order', 'asc');

    // Fetch user companies
    $userCompanies = $companyRepository->findBy(['handler' => $user], ['name' => $sortOrder]);

    // Sort the userCompanies array based on the selected criteria
    if ($sortBy === 'name') {
      usort($userCompanies, function ($a, $b) use ($sortOrder) {
        return strcasecmp($a->getName(), $b->getName()) * ($sortOrder === 'asc' ? 1 : -1);
      });
    }

    // Create an array of data to be returned as JSON
    $responseData = [];

    foreach ($userCompanies as $company) {
      // Populate the data array with company information
      $responseData[] = [
        'category' => $company->getCategory()->getName(),
        'id' => $company->getId(),
        'name' => $company->getName(),
        'phone' => $company->getPhone(),
        'contactFirstName' => $company->getContactFirstName(),
        'contactLastName' => $company->getContactLastName(),
        'mobile' => $company->getMobile(),
        'email' => $company->getEmail(),
        // 'activitiesCount' => $company->getActivitiesCount(),
      ];
    }

    return new JsonResponse($responseData);
  }

  /**
   * @Route("/new", name="app_companies_new", methods={"GET", "POST"})
   * @IsGranted("ROLE_USER")
   */
  public function new(Request $request, CompanyRepository $companyRepository): Response
  {
    $company = new Company();
    $form = $this->createForm(CompanyType::class, $company);
    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {
      $company->setHandler($this->security->getUser());

      $companyRepository->add($company, true);

      // Get the generated ID of the new company
      $companyId = $company->getId();

      return $this->redirectToRoute('app_companies_show', ['id' => $companyId], Response::HTTP_SEE_OTHER);
    }

    return $this->renderForm('bam/companies/new.html.twig', [
      'company' => $company,
      'form' => $form,
    ]);
  }

  /**
   * @Route("/{id}/show", name="app_companies_show", methods={"GET", "POST"})
   * @IsGranted("ROLE_USER")
   */
  public function show(Company $company, Request $request, EntityManagerInterface $em, ActivityRepository $activityRepository, $id): Response
  {
    $activity = new Activity();
    // $dbactivities = $activityRepository->findBy(['company' => $company]);
    $form = $this->createForm(ClientType::class, $company, ['method' => 'POST']);
    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {
      $activities = $company->getActivities();
      if (count($activities) === 0) {
        $company->resetActivities();
      } else {
        foreach ($activities as $key => $activity) {
          $activity->setCompany($company);
          $activities->set($key, $activity);
        }
        $activityRepository->add($activity, true);
      }

      $em->flush();

      $this->addFlash('success', 'Situation Enregistrée');
      return $this->redirectToRoute('app_companies_show', ["id" => $id], Response::HTTP_SEE_OTHER);
    }

    return $this->renderForm('bam/companies/show.html.twig', [
      'form' => $form,
      'company' => $company,
    ]);
  }

  /**
   * @Route("/{id<[0-9]+>}/edit", name="app_companies_edit", methods={"GET", "POST"})
   * @IsGranted("ROLE_USER")
   */
  public function edit(Request $request, Company $company, CompanyRepository $companyRepository, $id): Response
  {
    $form = $this->createForm(CompanyType::class, $company);
    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {
      $companyRepository->add($company, true);

      return $this->redirectToRoute('app_companies_show', ["id" => $id], Response::HTTP_SEE_OTHER);
    }

    return $this->renderForm('bam/companies/edit.html.twig', [
      'company' => $company,
      'form' => $form,
    ]);
  }

  /**
   * @Route("/csv/export", name="csv_export")
   * @IsGranted("ROLE_USER")
   */
  public function exportCompanies(CompanyCsvManager $companyCsvExporter): Response
  {
    return $companyCsvExporter->exportCompaniesToCsv($this->user);
  }

  /**
   * @Route("/{id<[0-9]+>}/delete", name="app_companies_delete", methods={"POST"})
   * @IsGranted("ROLE_USER")
   */
  public function delete(Request $request, Company $company, CompanyRepository $companyRepository): Response
  {
    if ($this->isCsrfTokenValid('delete' . $company->getId(), $request->request->get('_token'))) {
      $companyRepository->remove($company, true);
    }

    return $this->redirectToRoute('app_activities', [], Response::HTTP_SEE_OTHER);
  }
}
