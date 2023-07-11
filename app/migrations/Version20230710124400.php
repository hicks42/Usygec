<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230710124400 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE customers ADD handler_id INT NOT NULL');
        $this->addSql('ALTER TABLE customers ADD CONSTRAINT FK_62534E21A6E82043 FOREIGN KEY (handler_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_62534E21A6E82043 ON customers (handler_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE customers DROP FOREIGN KEY FK_62534E21A6E82043');
        $this->addSql('DROP INDEX IDX_62534E21A6E82043 ON customers');
        $this->addSql('ALTER TABLE customers DROP handler_id');
    }
}
