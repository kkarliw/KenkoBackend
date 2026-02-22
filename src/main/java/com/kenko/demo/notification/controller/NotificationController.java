package com.kenko.demo.notification.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.kenko.demo.notification.dto.CreateNotificationRequestDto;
import com.kenko.demo.notification.dto.NotificationResponseDto;
import com.kenko.demo.notification.service.NotificationService;
import com.kenko.demo.common.dto.ApiResponse;
import com.kenko.demo.common.dto.PaginationDto;
import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

        private final NotificationService notificationService;

        @GetMapping("/{userId}")
        public ResponseEntity<ApiResponse<PaginationDto<NotificationResponseDto>>> getNotifications(
                        @PathVariable Long userId,
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                Page<NotificationResponseDto> notifications = notificationService.getNotifications(userId, orgId, page,
                                size);

                PaginationDto<NotificationResponseDto> response = PaginationDto.<NotificationResponseDto>builder()
                                .content(notifications.getContent())
                                .pageNumber(notifications.getNumber())
                                .pageSize(notifications.getSize())
                                .totalElements(notifications.getTotalElements())
                                .totalPages(notifications.getTotalPages())
                                .last(notifications.isLast())
                                .build();

                return ResponseEntity.ok(
                                ApiResponse.ok(response, "Notificaciones obtenidas"));
        }

        @GetMapping("/{userId}/no-leidas")
        public ResponseEntity<ApiResponse<List<NotificationResponseDto>>> getUnreadNotifications(
                        @PathVariable Long userId,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                List<NotificationResponseDto> notifications = notificationService.getUnreadNotifications(userId, orgId);

                return ResponseEntity.ok(
                                ApiResponse.ok(notifications, "Notificaciones no leídas obtenidas"));
        }

        @PostMapping
        public ResponseEntity<ApiResponse<NotificationResponseDto>> createNotification(
                        @Valid @RequestBody CreateNotificationRequestDto request,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                NotificationResponseDto response = notificationService.createNotification(request, orgId);

                return ResponseEntity.status(HttpStatus.CREATED)
                                .body(ApiResponse.ok(response, "Notificación creada exitosamente"));
        }

        @PutMapping("/{id}/read")
        public ResponseEntity<ApiResponse<NotificationResponseDto>> markAsRead(
                        @PathVariable Long id,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                NotificationResponseDto response = notificationService.markAsRead(id, orgId);

                return ResponseEntity.ok(
                                ApiResponse.ok(response, "Notificación marcada como leída"));
        }

        @PutMapping("/marcar-todas-leidas")
        public ResponseEntity<ApiResponse<String>> markAllAsRead(
                        HttpServletRequest httpRequest) {
                Long userId = (Long) httpRequest.getAttribute("userId");
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                notificationService.markAllAsRead(userId, orgId);

                return ResponseEntity.ok(
                                ApiResponse.ok("Todas las notificaciones marcadas como leídas", ""));
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<ApiResponse<String>> deleteNotification(
                        @PathVariable Long id,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                notificationService.deleteNotification(id, orgId);

                return ResponseEntity.ok(
                                ApiResponse.ok("Notificación eliminada", ""));
        }
}