<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230712101526 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE activities DROP FOREIGN KEY FK_B5F1AFE59395C3F3');
        $this->addSql('CREATE TABLE companies (id INT AUTO_INCREMENT NOT NULL, handler_id INT NOT NULL, name VARCHAR(255) NOT NULL, address1 VARCHAR(255) DEFAULT NULL, address2 VARCHAR(255) DEFAULT NULL, cp INT DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, phone VARCHAR(255) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, INDEX IDX_8244AA3AA6E82043 (handler_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE companies ADD CONSTRAINT FK_8244AA3AA6E82043 FOREIGN KEY (handler_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE customers DROP FOREIGN KEY FK_62534E21A6E82043');
        $this->addSql('DROP TABLE customers');
        $this->addSql('DROP INDEX IDX_B5F1AFE59395C3F3 ON activities');
        $this->addSql('ALTER TABLE activities CHANGE customer_id company_id INT NOT NULL');
        $this->addSql('ALTER TABLE activities ADD CONSTRAINT FK_B5F1AFE5979B1AD6 FOREIGN KEY (company_id) REFERENCES companies (id)');
        $this->addSql('CREATE INDEX IDX_B5F1AFE5979B1AD6 ON activities (company_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE activities DROP FOREIGN KEY FK_B5F1AFE5979B1AD6');
        $this->addSql('CREATE TABLE customers (id INT AUTO_INCREMENT NOT NULL, handler_id INT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, address1 VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, address2 VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, cp INT DEFAULT NULL, city VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, phone VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, email VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, INDEX IDX_62534E21A6E82043 (handler_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE customers ADD CONSTRAINT FK_62534E21A6E82043 FOREIGN KEY (handler_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE companies DROP FOREIGN KEY FK_8244AA3AA6E82043');
        $this->addSql('DROP TABLE companies');
        $this->addSql('DROP INDEX IDX_B5F1AFE5979B1AD6 ON activities');
        $this->addSql('ALTER TABLE activities CHANGE company_id customer_id INT NOT NULL');
        $this->addSql('ALTER TABLE activities ADD CONSTRAINT FK_B5F1AFE59395C3F3 FOREIGN KEY (customer_id) REFERENCES customers (id)');
        $this->addSql('CREATE INDEX IDX_B5F1AFE59395C3F3 ON activities (customer_id)');
    }
}
