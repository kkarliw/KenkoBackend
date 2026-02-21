package com.kenko.demo.patient.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePatientRequestDto {

    @NotNull(message = "Id del usuario es requerido")
    private Long userId;

    private String documentNumber;

    private String documentType;

    private LocalDate dateOfBirth;

    private String gender;

    private String bloodType;

    private String emergencyContactName;

    private String emergencyContactPhone;

    @Size(max = 5000, message = "Historial médico no puede exceder 5000 caracteres")
    private String medicalHistory;

    @Size(max = 1000, message = "Alergias no puede exceder 1000 caracteres")
    private String allergies;

    @Size(max = 1000, message = "Medicamentos no puede exceder 1000 caracteres")
    private String currentMedications;
}