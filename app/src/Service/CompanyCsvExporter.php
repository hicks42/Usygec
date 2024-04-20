<?php

namespace App\Service;

use League\Csv\Writer as CsvWriter;
use App\Repository\CompanyRepository;
use Symfony\Component\HttpFoundation\Response;
use League\Csv\Configuration as CsvConfiguration;

class CompanyCsvExporter
{
  private $companyRepository;

  public function __construct(CompanyRepository $companyRepository)
  {
    $this->companyRepository = $companyRepository;
  }

  public function exportCompaniesToCsv($user): Response
  {
    $userCompanies = $this->companyRepository->findBy(['handler' => $user]);

    $fileName = 'ExportUsygec.csv';

    $csvWriter = $this->getCsvWriter($fileName);

    $csvWriter->insertOne(['Civ', 'Prénom du contact', 'Nom du contact', 'Société', 'Categorie', 'Téléphone', 'Mobile', 'Mail', 'Adresse 1', 'Adresse 2', 'CP', 'Ville']);

    foreach ($userCompanies as $company) {
      $csvWriter->insertOne([
        $company->getCiv(),
        $company->getContactFirstName(),
        $company->getContactLastName(),
        $company->getName(),
        $company->getCategoryAsString(),
        $company->getPhone(),
        $company->getMobile(),
        $company->getEmail(),
        $company->getAddress1(),
        $company->getAddress2(),
        $company->getCp(),
        $company->getCity(),
      ]);
    }

    $response = new Response($csvWriter->toString(), Response::HTTP_OK);

    $response->headers->set('Content-Type', 'text/csv');
    $response->headers->set('Content-Disposition', 'attachment; filename="' . $fileName . '"');

    return $response;
  }

  private function getCsvWriter(string $fileName): CsvWriter
  {
    // Create the CSV writer
    $csvWriter = CsvWriter::createFromPath('php://memory', 'w+');
    $csvWriter->setOutputBOM(CsvWriter::BOM_UTF8); // Set the encoding to UTF-8 if needed
    $csvWriter->setDelimiter(';'); // Set the delimiter character if needed

    return $csvWriter;
  }
}
