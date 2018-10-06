package org.iqra.esms.repository;

import org.iqra.esms.domain.PettyCash;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PettyCash entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PettyCashRepository extends JpaRepository<PettyCash, Long> {

}
