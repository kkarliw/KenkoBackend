package com.kenko.demo.medical.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalRecordResponseDto {
    private Long id;
    private Long patientId;
    private String patientName;
    private Long doctorId;
    private String doctorName;
    private Long orgId;
    private Long appointmentId;
    private String reasonForConsultation;
    private String physicalExamination;
    private String diagnosis;
    private String treatmentPlan;
    private String internalNotes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
