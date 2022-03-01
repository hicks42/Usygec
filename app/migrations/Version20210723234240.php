<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210723234240 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sd_produits ADD category_id INT');
        $this->addSql('ALTER TABLE sd_produits ADD CONSTRAINT FK_BE2DDF8C12469DE2 FOREIGN KEY (category_id) REFERENCES sd_category (id)');
        $this->addSql('CREATE INDEX IDX_BE2DDF8C12469DE2 ON sd_produits (category_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sd_produits DROP FOREIGN KEY FK_BE2DDF8C12469DE2');
        $this->addSql('DROP INDEX IDX_BE2DDF8C12469DE2 ON sd_produits');
        $this->addSql('ALTER TABLE sd_produits DROP category_id');
    }
}
