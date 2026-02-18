package com.kenko.demo.patient.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.kenko.demo.patient.entity.Patient;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    Optional<Patient> findByUserIdAndOrgId(Long userId, Long orgId);
    Optional<Patient> findByDocumentNumber(String documentNumber);
    Page<Patient> findByOrgId(Long orgId, Pageable pageable);
}