package com.kenko.demo.notification.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.kenko.demo.notification.dto.CreateNotificationRequestDto;
import com.kenko.demo.notification.dto.NotificationResponseDto;
import com.kenko.demo.notification.entity.Notification;
import com.kenko.demo.notification.repository.NotificationRepository;
import com.kenko.demo.common.exception.ApplicationException;
import org.springframework.http.HttpStatus;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public Page<NotificationResponseDto> getNotifications(Long userId, Long orgId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return notificationRepository.findByRecipientIdAndOrgIdOrderByCreatedAtDesc(userId, orgId, pageable)
                .map(this::convertToDto);
    }

    public List<NotificationResponseDto> getUnreadNotifications(Long userId, Long orgId) {
        return notificationRepository.findByRecipientIdAndOrgIdAndIsReadFalseOrderByCreatedAtDesc(userId, orgId)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public long getUnreadCount(Long userId, Long orgId) {
        return notificationRepository.countByRecipientIdAndOrgIdAndIsReadFalse(userId, orgId);
    }

    public NotificationResponseDto createNotification(CreateNotificationRequestDto request, Long orgId) {
        Notification notification = Notification.builder()
                .recipientId(request.getRecipientId())
                .orgId(orgId)
                .title(request.getTitle())
                .message(request.getMessage())
                .type(request.getType())
                .relatedEntityId(request.getRelatedEntityId())
                .relatedEntityType(request.getRelatedEntityType())
                .isRead(false)
                .build();

        notification = notificationRepository.save(notification);
        log.info("Notificación creada: ID={}, Destinatario={}, Tipo={}",
                notification.getId(), notification.getRecipientId(), notification.getType());

        return convertToDto(notification);
    }

    public NotificationResponseDto markAsRead(Long notificationId, Long orgId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ApplicationException("Notificación no encontrada", HttpStatus.NOT_FOUND));

        if (!notification.getOrgId().equals(orgId)) {
            throw new ApplicationException("Notificación no pertenece a esta organización", HttpStatus.FORBIDDEN);
        }

        notification.setRead(true);
        notification.setReadAt(LocalDateTime.now());
        notification = notificationRepository.save(notification);

        log.info("Notificación marcada como leída: ID={}", notificationId);

        return convertToDto(notification);
    }

    @Transactional
    public void markAllAsRead(Long userId, Long orgId) {
        List<Notification> unread = notificationRepository
                .findByRecipientIdAndOrgIdAndIsReadFalseOrderByCreatedAtDesc(userId, orgId);

        LocalDateTime now = LocalDateTime.now();
        for (Notification notification : unread) {
            notification.setRead(true);
            notification.setReadAt(now);
        }

        notificationRepository.saveAll(unread);
        log.info("Todas las notificaciones marcadas como leídas para usuario: {}", userId);
    }

    public void deleteNotification(Long notificationId, Long orgId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ApplicationException("Notificación no encontrada", HttpStatus.NOT_FOUND));

        if (!notification.getOrgId().equals(orgId)) {
            throw new ApplicationException("Notificación no pertenece a esta organización", HttpStatus.FORBIDDEN);
        }

        notificationRepository.delete(notification);
        log.info("Notificación eliminada: ID={}", notificationId);
    }

    private NotificationResponseDto convertToDto(Notification notification) {
        return NotificationResponseDto.builder()
                .id(notification.getId())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .type(notification.getType())
                .isRead(notification.isRead())
                .relatedEntityId(notification.getRelatedEntityId())
                .relatedEntityType(notification.getRelatedEntityType())
                .createdAt(notification.getCreatedAt())
                .readAt(notification.getReadAt())
                .build();
    }
}