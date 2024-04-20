<?php

namespace App\Service;

use App\Form\CsvType;
use App\Entity\Company;
use App\Entity\Category;
use App\Repository\CompanyRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use League\Csv\Writer as CsvWriter;
use Symfony\Component\HttpFoundation\Response;
use League\Csv\Configuration as CsvConfiguration;

class CompanyCsvImporter
{

  private $em;
  private $companyRepository;

  public function __construct(CompanyRepository $companyRepository, EntityManagerInterface $em)
  {
    $this->companyRepository = $companyRepository;
    $this->em = $em;
  }

  public function importCompaniesFromCsv(UploadedFile $file, $user)
  {
    $items = array();
    $row = 0;

    if (($handle = fopen($file->getPathname(), 'r')) !== false) {
      fgetcsv($handle, 1000, ";");
      while (($data = fgetcsv($handle, 1000, ";")) !== false) {
        $num = count($data);
        $row++;
        for ($c = 1; $c < $num; $c++) {
          $items[$row] = array(
            "Civ" => $data[0],
            "Prénom du contact" => $data[1],
            "Nom du contact" => $data[2],
            "Société" => $data[3],
            "Categorie" => $data[4],
            "Téléphone" => $data[5],
            "Mobile" => $data[6],
            "Mail" => $data[7],
            "Adresse 1" => $data[8],
            "Adresse 2" => $data[9],
            "CP" => intval($data[10]),
            "Ville" => $data[11],
          );
        }
      }
    }

    foreach ($items as $item) {
      $newCompany = new Company();

      $categoryName = $item["Categorie"];
      $category = $this->em->getRepository(Category::class)->findOneBy(['name' => $categoryName]);
      if (!$category) {
        throw new \Exception("La catégorie avec le nom '" . $categoryName . "' n'existe pas.");
      }

      $newCompany->setCiv($item["Civ"]);
      $newCompany->setContactFirstName($item["Prénom du contact"]);
      $newCompany->setContactLastName($item["Nom du contact"]);
      $newCompany->setName($item["Société"]);
      $newCompany->setCategory($category);
      $newCompany->setPhone($item["Téléphone"]);
      $newCompany->setMobile($item["Mobile"]);
      $newCompany->setEmail($item["Mail"]);
      $newCompany->setAddress1($item["Adresse 1"]);
      $newCompany->setAddress2($item["Adresse 2"]);
      $newCompany->setCp($item["CP"]);
      $newCompany->setCity($item["Ville"]);
      $newCompany->setHandler($user);

      $this->em->persist($newCompany);
    }
    fclose($handle);
    $this->em->flush();
  }
}
