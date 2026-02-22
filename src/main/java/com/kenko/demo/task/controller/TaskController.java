package com.kenko.demo.task.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.kenko.demo.task.dto.CreateTaskRequestDto;
import com.kenko.demo.task.dto.TaskResponseDto;
import com.kenko.demo.task.service.TaskService;
import com.kenko.demo.common.dto.ApiResponse;
import com.kenko.demo.common.dto.PaginationDto;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

        private final TaskService taskService;

        /**
         * Obtener todas las tareas
         */
        @GetMapping
        public ResponseEntity<ApiResponse<PaginationDto<TaskResponseDto>>> getTasks(
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                Pageable pageable = PageRequest.of(page, size);
                Page<TaskResponseDto> tasks = taskService.getTasksByOrganization(orgId, pageable);

                PaginationDto<TaskResponseDto> response = PaginationDto.<TaskResponseDto>builder()
                                .content(tasks.getContent())
                                .pageNumber(tasks.getNumber())
                                .pageSize(tasks.getSize())
                                .totalElements(tasks.getTotalElements())
                                .totalPages(tasks.getTotalPages())
                                .last(tasks.isLast())
                                .build();

                return ResponseEntity.ok(
                                ApiResponse.ok(response, "Tareas obtenidas"));
        }

        /**
         * Crear tarea
         */
        @PostMapping
        public ResponseEntity<ApiResponse<TaskResponseDto>> createTask(
                        @Valid @RequestBody CreateTaskRequestDto request,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");
                Long userId = (Long) httpRequest.getAttribute("userId");

                TaskResponseDto response = taskService.createTask(request, orgId, userId);

                return ResponseEntity.status(HttpStatus.CREATED)
                                .body(ApiResponse.ok(response, "Tarea creada exitosamente"));
        }

        /**
         * Marcar tarea como completada
         */
        @PatchMapping("/{id}/complete")
        public ResponseEntity<ApiResponse<TaskResponseDto>> completeTask(
                        @PathVariable Long id,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                TaskResponseDto response = taskService.completeTask(id, orgId);

                return ResponseEntity.ok(
                                ApiResponse.ok(response, "Tarea completada"));
        }

        /**
         * Eliminar tarea
         */
        @DeleteMapping("/{id}")
        public ResponseEntity<ApiResponse<String>> deleteTask(
                        @PathVariable Long id,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                taskService.deleteTask(id, orgId);

                return ResponseEntity.ok(
                                ApiResponse.ok("Tarea eliminada exitosamente", "Tarea removida"));
        }
}