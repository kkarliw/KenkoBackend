package com.kenko.demo.patient.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
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
        // Validar que el usuario exista y pertenezca a la organización
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ApplicationException("Usuario no encontrado", HttpStatus.NOT_FOUND));

        if (!user.getOrgId().equals(orgId)) {
            throw new ApplicationException("Usuario no pertenece a esta organización", HttpStatus.FORBIDDEN);
        }

        // Validar que no exista un paciente para este usuario en esta organización
        if (patientRepository.findByUserIdAndOrgId(request.getUserId(), orgId).isPresent()) {
            throw new ApplicationException("Ya existe un paciente para este usuario", HttpStatus.CONFLICT);
        }

        // Validar que el documentNumber sea único si se proporciona
        if (request.getDocumentNumber() != null && !request.getDocumentNumber().isEmpty()) {
            if (patientRepository.findByDocumentNumber(request.getDocumentNumber()).isPresent()) {
                throw new ApplicationException("Número de documento ya registrado", HttpStatus.CONFLICT);
            }
        }

        // Crear paciente
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
        log.info("Paciente creado: ID={}, UserId={}, OrgId={}", patient.getId(), patient.getUserId(), orgId);

        return convertToDto(patient, user);
    }

    /**
     * Obtener paciente por ID
     */
    public PatientResponseDto getPatientById(Long patientId, Long orgId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new PatientNotFoundException("Paciente no encontrado"));

        // Validar que pertenezca a la organización
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
     * Buscar pacientes
     */
    public Page<PatientResponseDto> searchPatients(Long orgId, String query, Pageable pageable) {
        Page<User> users = userRepository.findByOrgIdAndFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
                orgId, query, query, pageable
        );

        return (Page<PatientResponseDto>) users.map(user -> {
            try {
                Patient patient = patientRepository.findByUserIdAndOrgId(user.getId(), orgId)
                        .orElse(null);
                if (patient != null) {
                    return convertToDto(patient, user);
                }
            } catch (Exception e) {
                log.warn("Error convirtiendo paciente para usuario {}", user.getId());
            }
            return null;
        }).filter(p -> p != null);
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