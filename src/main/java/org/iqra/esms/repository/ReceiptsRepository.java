package org.iqra.esms.repository;

import org.iqra.esms.domain.Receipts;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Receipts entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReceiptsRepository extends JpaRepository<Receipts, Long> {

}
