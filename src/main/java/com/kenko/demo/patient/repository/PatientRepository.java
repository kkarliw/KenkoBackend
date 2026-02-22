package com.kenko.demo.patient.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.kenko.demo.patient.entity.Patient;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    Optional<Patient> findByUserIdAndOrgId(Long userId, Long orgId);
    Optional<Patient> findByDocumentNumber(String documentNumber);
    Page<Patient> findByOrgId(Long orgId, Pageable pageable);

    /**
     * Buscar pacientes por nombre (firstName o lastName del usuario asociado)
     */
    @Query("SELECT p FROM Patient p " +
            "JOIN User u ON p.userId = u.id " +
            "WHERE p.orgId = :orgId " +
            "AND (LOWER(u.firstName) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(u.email) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<Patient> findByOrgIdAndUserNameContaining(
            @Param("orgId") Long orgId,
            @Param("query") String query,
            Pageable pageable
    );
}