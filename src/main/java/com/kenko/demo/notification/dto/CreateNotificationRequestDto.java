package com.kenko.demo.notification.dto;

import com.kenko.demo.notification.entity.Notification.NotificationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateNotificationRequestDto {

    @NotNull(message = "ID del destinatario es requerido")
    private Long recipientId;

    @NotBlank(message = "Título es requerido")
    private String title;

    @NotBlank(message = "Mensaje es requerido")
    private String message;

    @NotNull(message = "Tipo es requerido")
    private NotificationType type;

    private Long relatedEntityId;
    private String relatedEntityType;
}