<?php

namespace App\Repository;

use App\Entity\Activity;
use App\Entity\Customer;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<Activity>
 *
 * @method Activity|null find($id, $lockMode = null, $lockVersion = null)
 * @method Activity|null findOneBy(array $criteria, array $orderBy = null)
 * @method Activity[]    findAll()
 * @method Activity[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ActivityRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Activity::class);
    }

    public function add(Activity $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Activity $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function countActiveActivitiesByCustomer(Customer $customer): int
    {
        return $this->createQueryBuilder('a')
            ->select('COUNT(a.id)')
            ->andWhere('a.customer = :customer')
            ->andWhere('a.isActive = :isActive')
            ->setParameter('customer', $customer)
            ->setParameter('isActive', true)
            ->getQuery()
            ->getSingleScalarResult();
    }

    public function countActivitiesDueWithin5Days(Customer $customer): int
    {
        $now = new \DateTime();
        $fiveDaysFromNow = (clone $now)->modify('+5 days');

        return $this->createQueryBuilder('a')
            ->select('COUNT(a.id)')
            ->andWhere('a.customer = :customer')
            ->andWhere('a.dueDate BETWEEN :start AND :end')
            ->setParameter('customer', $customer)
            ->setParameter('start', $now)
            ->setParameter('end', $fiveDaysFromNow)
            ->getQuery()
            ->getSingleScalarResult();
    }
    //    /**
    //     * @return Activity[] Returns an array of Activity objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('a.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Activity
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
