<?php

namespace App\Controller\Ezreview;

use App\Entity\Structure;
use App\Repository\StructureRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/structure")
 */
class StructureController extends AbstractController
{
    /**
     * @Route("/", name="structure_index", methods={"GET"})
     * @IsGranted("ROLE_USER")
     * @IgnoreAnnotation("Security")
     */
    public function index(StructureRepository $structureRepository): Response
    {
        return $this->render('structure/index.html.twig', [
            'structures' => $structureRepository->findAll(),
        ]);
    }

    /**
     * @Route("/{id}", name="structure_show", methods={"GET"})
     * @IsGranted("ROLE_USER")
     * @IgnoreAnnotation("Security")
     */
    public function show(Structure $structure): Response
    {
        return $this->render('structure/show.html.twig', [
            'structure' => $structure,
        ]);
    }

    /**
     * @Route("/{id}", name="structure_delete", methods={"POST"})
     * @IsGranted("ROLE_USER")
     * @IgnoreAnnotation("Security")
     */
    public function delete(Request $request, Structure $structure, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete' . $structure->getId(), $request->request->get('_token'))) {
            $entityManager->remove($structure);
            $entityManager->flush();
        }

        return $this->redirectToRoute('structure_index', [], Response::HTTP_SEE_OTHER);
    }
}
