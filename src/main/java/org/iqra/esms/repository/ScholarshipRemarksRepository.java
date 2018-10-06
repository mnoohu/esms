package org.iqra.esms.repository;

import org.iqra.esms.domain.ScholarshipRemarks;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ScholarshipRemarks entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ScholarshipRemarksRepository extends JpaRepository<ScholarshipRemarks, Long> {

}
