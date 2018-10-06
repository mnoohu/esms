package org.iqra.esms.repository;

import org.iqra.esms.domain.SponsorDetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SponsorDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SponsorDetailsRepository extends JpaRepository<SponsorDetails, Long> {

}
