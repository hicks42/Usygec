<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230716121911 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE categories (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE companies ADD category_id INT NOT NULL');
        $this->addSql('ALTER TABLE companies ADD CONSTRAINT FK_8244AA3A12469DE2 FOREIGN KEY (category_id) REFERENCES categories (id)');
        $this->addSql('CREATE INDEX IDX_8244AA3A12469DE2 ON companies (category_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE companies DROP FOREIGN KEY FK_8244AA3A12469DE2');
        $this->addSql('DROP TABLE categories');
        $this->addSql('DROP INDEX IDX_8244AA3A12469DE2 ON companies');
        $this->addSql('ALTER TABLE companies DROP category_id');
    }
}
