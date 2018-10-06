package org.iqra.esms.repository;

import org.iqra.esms.domain.SponsorCommitments;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SponsorCommitments entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SponsorCommitmentsRepository extends JpaRepository<SponsorCommitments, Long> {

}
