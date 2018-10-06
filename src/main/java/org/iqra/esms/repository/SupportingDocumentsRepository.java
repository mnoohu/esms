package org.iqra.esms.repository;

import org.iqra.esms.domain.SupportingDocuments;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SupportingDocuments entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupportingDocumentsRepository extends JpaRepository<SupportingDocuments, Long> {

}
