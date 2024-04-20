<?php

namespace App\Controller;

use App\Form\CsvType;
use App\Form\UserType;
use App\Service\ScraperService;
use App\Service\CompanyCsvManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * @Route("/ezreview/settings", name="ezreview_settings")
     * @IsGranted("ROLE_USER")
     */
    public function editEzreviewUser(Request $request, EntityManagerInterface $em): Response
    {
        $user = $this->security->getUser();

        $form = $this->createForm(UserType::class, $user, [
            'method' => 'POST',
        ]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $structures = $user->getStructures();

            foreach ($structures as $key => $structure) {

                $structure->setUser($user);
                $structures->set($key, $structure);
            }

            $em->flush();

            $this->addFlash('success', 'Modification enregistrée.');

            return $this->redirectToRoute('ezreview_settings');
        }

        return $this->render('ezreview/ezreview_settings.html.twig', [
            'form' => $form->createView(),
            'user' => $user
        ]);
    }

    /**
     * @Route("/usygec/settings", name="usygec_settings")
     * @IsGranted("ROLE_USER")
     */ /////
    public function editUsygecUser(Request $request, CompanyCsvManager $companyCsvImporter): Response
    {
        $user = $this->security->getUser();

        $formcsv = $this->createForm(CsvType::class);
        $formcsv->handleRequest($request);

        if ($formcsv->isSubmitted() && $formcsv->isValid()) {

            /** @var UploadedFile */
            $csvFile = $formcsv->get('csvFile')->getData();
            if ($csvFile) {

                $companyCsvImporter->importCompaniesFromCsv($csvFile, $user);

                $this->addFlash('success', 'Sociétés Enregistrée');
                return $this->redirectToRoute('app_companies', ["user" => $user], Response::HTTP_SEE_OTHER);
            }
            $this->addFlash('error', 'Fichier non conforme');
            return $this->redirectToRoute('ezreview_hp', ["user" => $user], Response::HTTP_SEE_OTHER);
        }

        return $this->render('main/usygec_settings.html.twig', [
            'formcsv' => $formcsv->createView(),
            'user' => $user,
        ]);
    }

    private function getNewFileName($csvFile, $slugger)
    {
        $originalFilename = pathinfo($csvFile->getClientOriginalName(), PATHINFO_FILENAME);

        $safeFilename = $slugger->slug($originalFilename);
        $newFilename = $safeFilename . '-' . uniqid() . '.' . $csvFile->guessExtension();

        $csvFile->move(
            $this->getParameter('csv_directory'),
            $newFilename
        );
        return $newFilename;
    }
}
