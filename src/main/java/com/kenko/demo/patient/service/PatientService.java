package com.kenko.demo.patient.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.kenko.demo.patient.dto.CreatePatientRequestDto;
import com.kenko.demo.patient.dto.PatientResponseDto;
import com.kenko.demo.patient.entity.Patient;
import com.kenko.demo.patient.exception.PatientNotFoundException;
import com.kenko.demo.patient.repository.PatientRepository;
import com.kenko.demo.user.entity.User;
import com.kenko.demo.user.repository.UserRepository;
import com.kenko.demo.common.exception.ApplicationException;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    /**
     * Crear paciente
     */
    public PatientResponseDto createPatient(CreatePatientRequestDto request, Long orgId) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ApplicationException("Usuario no encontrado", HttpStatus.NOT_FOUND));

        if (!user.getOrgId().equals(orgId)) {
            throw new ApplicationException("Usuario no pertenece a esta organización", HttpStatus.FORBIDDEN);
        }

        if (patientRepository.findByUserIdAndOrgId(request.getUserId(), orgId).isPresent()) {
            throw new ApplicationException("Ya existe un paciente para este usuario", HttpStatus.CONFLICT);
        }

        if (request.getDocumentNumber() != null && !request.getDocumentNumber().isEmpty()) {
            if (patientRepository.findByDocumentNumber(request.getDocumentNumber()).isPresent()) {
                throw new ApplicationException("Número de documento ya registrado", HttpStatus.CONFLICT);
            }
        }

        Patient patient = Patient.builder()
                .userId(request.getUserId())
                .orgId(orgId)
                .documentNumber(request.getDocumentNumber())
                .documentType(request.getDocumentType())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .bloodType(request.getBloodType())
                .emergencyContactName(request.getEmergencyContactName())
                .emergencyContactPhone(request.getEmergencyContactPhone())
                .medicalHistory(request.getMedicalHistory())
                .allergies(request.getAllergies())
                .currentMedications(request.getCurrentMedications())
                .build();

        patient = patientRepository.save(patient);
        log.info("Paciente creado: ID={}", patient.getId());

        return convertToDto(patient, user);
    }

    /**
     * Obtener paciente por ID
     */
    public PatientResponseDto getPatientById(Long patientId, Long orgId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new PatientNotFoundException("Paciente no encontrado"));

        if (!patient.getOrgId().equals(orgId)) {
            throw new PatientNotFoundException("Paciente no encontrado");
        }

        User user = userRepository.findById(patient.getUserId()).orElse(null);
        return convertToDto(patient, user);
    }

    /**
     * Obtener paciente por ID de usuario
     */
    public PatientResponseDto getPatientByUserId(Long userId, Long orgId) {
        Patient patient = patientRepository.findByUserIdAndOrgId(userId, orgId)
                .orElseThrow(() -> new PatientNotFoundException("Paciente no encontrado"));

        User user = userRepository.findById(userId).orElse(null);
        return convertToDto(patient, user);
    }

    /**
     * Buscar/listar pacientes
     */
    public Page<PatientResponseDto> searchPatients(Long orgId, String query, Pageable pageable) {
        List<Patient> patients = patientRepository.findAll();

        List<Patient> filteredPatients = patients.stream()
                .filter(p -> p.getOrgId().equals(orgId))
                .filter(p -> {
                    if (query == null || query.trim().isEmpty()) {
                        return true;
                    }
                    User user = userRepository.findById(p.getUserId()).orElse(null);
                    if (user == null) return false;

                    String searchLower = query.toLowerCase();
                    return user.getFirstName().toLowerCase().contains(searchLower) ||
                            user.getLastName().toLowerCase().contains(searchLower) ||
                            user.getEmail().toLowerCase().contains(searchLower);
                })
                .collect(Collectors.toList());

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), filteredPatients.size());
        List<PatientResponseDto> pageContent = filteredPatients.subList(start, end)
                .stream()
                .map(p -> {
                    User user = userRepository.findById(p.getUserId()).orElse(null);
                    return convertToDto(p, user);
                })
                .collect(Collectors.toList());

        return new PageImpl<>(pageContent, pageable, filteredPatients.size());
    }

    /**
     * Actualizar paciente
     */
    public PatientResponseDto updatePatient(Long patientId, CreatePatientRequestDto request, Long orgId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new PatientNotFoundException("Paciente no encontrado"));

        if (!patient.getOrgId().equals(orgId)) {
            throw new PatientNotFoundException("Paciente no encontrado");
        }

        if (request.getDocumentNumber() != null) {
            patientRepository.findByDocumentNumber(request.getDocumentNumber())
                    .ifPresent(p -> {
                        if (!p.getId().equals(patientId)) {
                            throw new ApplicationException("Número de documento ya registrado", HttpStatus.CONFLICT);
                        }
                    });
            patient.setDocumentNumber(request.getDocumentNumber());
        }

        if (request.getDocumentType() != null) patient.setDocumentType(request.getDocumentType());
        if (request.getDateOfBirth() != null) patient.setDateOfBirth(request.getDateOfBirth());
        if (request.getGender() != null) patient.setGender(request.getGender());
        if (request.getBloodType() != null) patient.setBloodType(request.getBloodType());
        if (request.getEmergencyContactName() != null) patient.setEmergencyContactName(request.getEmergencyContactName());
        if (request.getEmergencyContactPhone() != null) patient.setEmergencyContactPhone(request.getEmergencyContactPhone());
        if (request.getMedicalHistory() != null) patient.setMedicalHistory(request.getMedicalHistory());
        if (request.getAllergies() != null) patient.setAllergies(request.getAllergies());
        if (request.getCurrentMedications() != null) patient.setCurrentMedications(request.getCurrentMedications());

        patient = patientRepository.save(patient);
        log.info("Paciente actualizado: ID={}", patientId);

        User user = userRepository.findById(patient.getUserId()).orElse(null);
        return convertToDto(patient, user);
    }

    /**
     * Eliminar paciente
     */
    public void deletePatient(Long patientId, Long orgId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new PatientNotFoundException("Paciente no encontrado"));

        if (!patient.getOrgId().equals(orgId)) {
            throw new PatientNotFoundException("Paciente no encontrado");
        }

        patientRepository.delete(patient);
        log.info("Paciente eliminado: ID={}", patientId);
    }

    /**
     * Convertir entidad a DTO
     */
    private PatientResponseDto convertToDto(Patient patient, User user) {
        return PatientResponseDto.builder()
                .id(patient.getId())
                .userId(patient.getUserId())
                .firstName(user != null ? user.getFirstName() : "")
                .lastName(user != null ? user.getLastName() : "")
                .email(user != null ? user.getEmail() : "")
                .phone(user != null ? user.getPhone() : "")
                .documentNumber(patient.getDocumentNumber())
                .documentType(patient.getDocumentType())
                .dateOfBirth(patient.getDateOfBirth())
                .gender(patient.getGender())
                .bloodType(patient.getBloodType())
                .emergencyContactName(patient.getEmergencyContactName())
                .emergencyContactPhone(patient.getEmergencyContactPhone())
                .medicalHistory(patient.getMedicalHistory())
                .allergies(patient.getAllergies())
                .currentMedications(patient.getCurrentMedications())
                .build();
    }
}