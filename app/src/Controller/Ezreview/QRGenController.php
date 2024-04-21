<?php

namespace App\Controller\Ezreview;

use Endroid\QrCode\QrCode;
use Endroid\QrCode\Logo\Logo;
use Endroid\QrCode\Color\Color;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Encoding\Encoding;
use App\Repository\StructureRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelLow;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class QRGenController extends AbstractController
{
  /**
   * @Route("/ezreview/{id<[0-9]+>}/qr_gen", name="qr_gen")
   * @IsGranted("ROLE_USER")
   * @IgnoreAnnotation("Security")
   */
  public function qrGen(StructureRepository $structureRepo, $id): Response
  {
    $url = $this->generateUrl('survey', ['id' => $id], UrlGeneratorInterface::ABSOLUTE_URL);
    $structure = $structureRepo->findOneById($id);
    $writer = new PngWriter();
    $qrCode = QrCode::create($url)
      ->setEncoding(new Encoding('UTF-8'))
      ->setErrorCorrectionLevel(new ErrorCorrectionLevelLow())
      ->setSize(120)
      ->setMargin(0)
      ->setForegroundColor(new Color(0, 0, 0))
      ->setBackgroundColor(new Color(255, 255, 255));
    $logo = Logo::create('images/companies/tny-logo-usygec.png')
      ->setResizeToWidth(60);

    $qrCode->setSize(400)->setForegroundColor(new Color(0, 0, 0))->setBackgroundColor(new Color(255, 255, 255));
    $myqrcode = $writer->write(
      $qrCode,
    )->getDataUri();

    return $this->render('ezreview/qr_gen.html.twig', [
      'structure' => $structure,
      'myqrcode' => $myqrcode,
    ]);
  }
}
