package com.kenko.demo.task.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTaskRequestDto {

    @NotBlank(message = "Título es requerido")
    private String title;

    private String description;

    @NotNull(message = "ID del asignado es requerido")
    private Long assignedToId;

    private LocalDate dueDate;
}