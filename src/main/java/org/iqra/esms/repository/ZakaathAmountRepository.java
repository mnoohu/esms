package org.iqra.esms.repository;

import org.iqra.esms.domain.ZakaathAmount;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ZakaathAmount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ZakaathAmountRepository extends JpaRepository<ZakaathAmount, Long> {

}
