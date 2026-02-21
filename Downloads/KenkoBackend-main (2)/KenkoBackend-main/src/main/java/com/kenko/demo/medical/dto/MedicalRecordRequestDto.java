package com.kenko.demo.medical.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalRecordRequestDto {

    @NotNull(message = "El ID del paciente es obligatorio")
    private Long patientId;

    private Long appointmentId;

    private String reasonForConsultation;
    private String physicalExamination;
    private String diagnosis;
    private String treatmentPlan;
    private String internalNotes;
}
