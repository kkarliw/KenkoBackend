package com.kenko.demo.medical.repository;

import com.kenko.demo.medical.entity.MedicalRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {

    Page<MedicalRecord> findByPatientIdAndOrgId(Long patientId, Long orgId, Pageable pageable);

    Page<MedicalRecord> findByDoctorIdAndOrgId(Long doctorId, Long orgId, Pageable pageable);

    List<MedicalRecord> findByPatientId(Long patientId);

    Page<MedicalRecord> findByOrgId(Long orgId, Pageable pageable);
}
