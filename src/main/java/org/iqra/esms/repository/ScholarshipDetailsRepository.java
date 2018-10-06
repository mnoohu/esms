package org.iqra.esms.repository;

import org.iqra.esms.domain.ScholarshipDetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ScholarshipDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ScholarshipDetailsRepository extends JpaRepository<ScholarshipDetails, Long> {

}
