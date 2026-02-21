package com.kenko.demo.medical.service;

import com.kenko.demo.common.exception.ApplicationException;
import com.kenko.demo.medical.dto.MedicalRecordRequestDto;
import com.kenko.demo.medical.dto.MedicalRecordResponseDto;
import com.kenko.demo.medical.entity.MedicalRecord;
import com.kenko.demo.medical.repository.MedicalRecordRepository;
import com.kenko.demo.user.entity.User;
import com.kenko.demo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final UserRepository userRepository;

    @Transactional
    public MedicalRecordResponseDto createRecord(MedicalRecordRequestDto request, Long doctorId, Long orgId) {
        MedicalRecord record = MedicalRecord.builder()
                .patientId(request.getPatientId())
                .doctorId(doctorId)
                .orgId(orgId)
                .appointmentId(request.getAppointmentId())
                .reasonForConsultation(request.getReasonForConsultation())
                .physicalExamination(request.getPhysicalExamination())
                .diagnosis(request.getDiagnosis())
                .treatmentPlan(request.getTreatmentPlan())
                .internalNotes(request.getInternalNotes())
                .build();

        record = medicalRecordRepository.save(record);
        return convertToDto(record);
    }

    public MedicalRecordResponseDto getRecordById(Long id, Long orgId) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new ApplicationException("Historia clínica no encontrada", HttpStatus.NOT_FOUND));

        if (!record.getOrgId().equals(orgId)) {
            throw new ApplicationException("No tiene permiso para ver esta historia clínica", HttpStatus.FORBIDDEN);
        }

        return convertToDto(record);
    }

    public Page<MedicalRecordResponseDto> getPatientRecords(Long patientId, Long orgId, Pageable pageable) {
        return medicalRecordRepository.findByPatientIdAndOrgId(patientId, orgId, pageable)
                .map(this::convertToDto);
    }

    public Page<MedicalRecordResponseDto> getOrgRecords(Long orgId, Pageable pageable) {
        return medicalRecordRepository.findByOrgId(orgId, pageable)
                .map(this::convertToDto);
    }

    @Transactional
    public MedicalRecordResponseDto updateRecord(Long id, MedicalRecordRequestDto request, Long orgId) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new ApplicationException("Historia clínica no encontrada", HttpStatus.NOT_FOUND));

        if (!record.getOrgId().equals(orgId)) {
            throw new ApplicationException("No tiene permiso para editar esta historia clínica", HttpStatus.FORBIDDEN);
        }

        record.setReasonForConsultation(request.getReasonForConsultation());
        record.setPhysicalExamination(request.getPhysicalExamination());
        record.setDiagnosis(request.getDiagnosis());
        record.setTreatmentPlan(request.getTreatmentPlan());
        record.setInternalNotes(request.getInternalNotes());

        record = medicalRecordRepository.save(record);
        return convertToDto(record);
    }

    @Transactional
    public void deleteRecord(Long id, Long orgId) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new ApplicationException("Historia clínica no encontrada", HttpStatus.NOT_FOUND));

        if (!record.getOrgId().equals(orgId)) {
            throw new ApplicationException("No tiene permiso para eliminar esta historia clínica",
                    HttpStatus.FORBIDDEN);
        }

        medicalRecordRepository.delete(record);
    }

    private MedicalRecordResponseDto convertToDto(MedicalRecord record) {
        User patient = userRepository.findById(record.getPatientId()).orElse(null);
        User doctor = userRepository.findById(record.getDoctorId()).orElse(null);

        return MedicalRecordResponseDto.builder()
                .id(record.getId())
                .patientId(record.getPatientId())
                .patientName(
                        patient != null ? patient.getFirstName() + " " + patient.getLastName() : "Paciente Desconocido")
                .doctorId(record.getDoctorId())
                .doctorName(doctor != null ? doctor.getFirstName() + " " + doctor.getLastName() : "Doctor Desconocido")
                .orgId(record.getOrgId())
                .appointmentId(record.getAppointmentId())
                .reasonForConsultation(record.getReasonForConsultation())
                .physicalExamination(record.getPhysicalExamination())
                .diagnosis(record.getDiagnosis())
                .treatmentPlan(record.getTreatmentPlan())
                .internalNotes(record.getInternalNotes())
                .createdAt(record.getCreatedAt())
                .updatedAt(record.getUpdatedAt())
                .build();
    }
}
