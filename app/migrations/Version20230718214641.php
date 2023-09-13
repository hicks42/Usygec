<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230718214641 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE companies ADD contact_first_name VARCHAR(255) DEFAULT NULL, ADD contact_last_name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE companies ADD CONSTRAINT FK_8244AA3A12469DE2 FOREIGN KEY (category_id) REFERENCES categories (id)');
        $this->addSql('CREATE INDEX IDX_8244AA3A12469DE2 ON companies (category_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE companies DROP FOREIGN KEY FK_8244AA3A12469DE2');
        $this->addSql('DROP INDEX IDX_8244AA3A12469DE2 ON companies');
        $this->addSql('ALTER TABLE companies DROP contact_first_name, DROP contact_last_name');
    }
}
