<?php

namespace App\Controller;

use App\Form\UserType;
use App\Service\ScraperService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    /**
     * @Route("/user/edit", name="user_edit")
     * @IsGranted("ROLE_USER")
     */
    public function edit(Request $request, EntityManagerInterface $em, ValidatorInterface $validator, ScraperService $scraperService): Response
    {
        $user = $this->getUser();

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

            // scraping (not working)
            // $structureName = $structure->getName();
            // $cp = $structure->getCp();
            // $pid = $structure->getPid();

            // $pid = $scraperService->getPid( $structureName, $cp );
            // $fullGooglUrl = "https://search.google.com/local/writereview?placeid=" . $pid ;
            $em->flush();

            $this->addFlash('success', 'Account updated successfully!');

            return $this->redirectToRoute('user_edit');
        }

        return $this->render('ezreview/user_edit.html.twig', [
            'form' => $form->createView(),
            'user' => $user
        ]);
    }
}
