package com.kenko.demo.task.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskResponseDto {

    private Long id;
    private Long orgId;
    private String title;
    private String description;
    private Long assignedToId;
    private Long createdByUserId;
    private LocalDate dueDate;
    private String status;
    private String assignedNombre;
    private String createdPorNombre;
}