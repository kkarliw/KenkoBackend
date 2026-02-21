package com.kenko.demo.task.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.kenko.demo.task.dto.CreateTaskRequestDto;
import com.kenko.demo.task.dto.TaskResponseDto;
import com.kenko.demo.task.entity.Task;
import com.kenko.demo.task.repository.TaskRepository;
import com.kenko.demo.user.repository.UserRepository;
import com.kenko.demo.common.exception.ApplicationException;
import org.springframework.http.HttpStatus;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public Page<TaskResponseDto> getTasksByOrganization(Long orgId, Pageable pageable) {
        return taskRepository.findByOrgId(orgId, pageable)
                .map(this::convertToDto);
    }

    public TaskResponseDto createTask(CreateTaskRequestDto request, Long orgId, Long createdByUserId) {
        // Validar que el usuario asignado existe y pertenece a la organización
        userRepository.findById(request.getAssignedToId())
                .filter(u -> u.getOrgId().equals(orgId))
                .orElseThrow(() -> new ApplicationException("Usuario no encontrado", HttpStatus.NOT_FOUND));

        Task task = Task.builder()
                .orgId(orgId)
                .title(request.getTitle())
                .description(request.getDescription())
                .assignedToId(request.getAssignedToId())
                .createdByUserId(createdByUserId)
                .dueDate(request.getDueDate())
                .status(Task.TaskStatus.PENDING)
                .build();

        task = taskRepository.save(task);
        log.info("Tarea creada: ID={}, OrgId={}", task.getId(), orgId);

        return convertToDto(task);
    }

    public TaskResponseDto completeTask(Long taskId, Long orgId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ApplicationException("Tarea no encontrada", HttpStatus.NOT_FOUND));

        if (!task.getOrgId().equals(orgId)) {
            throw new ApplicationException("Tarea no pertenece a esta organización", HttpStatus.FORBIDDEN);
        }

        task.setStatus(Task.TaskStatus.COMPLETED);
        task = taskRepository.save(task);
        log.info("Tarea completada: ID={}", taskId);

        return convertToDto(task);
    }

    public void deleteTask(Long taskId, Long orgId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ApplicationException("Tarea no encontrada", HttpStatus.NOT_FOUND));

        if (!task.getOrgId().equals(orgId)) {
            throw new ApplicationException("Tarea no pertenece a esta organización", HttpStatus.FORBIDDEN);
        }

        taskRepository.delete(task);
        log.info("Tarea eliminada: ID={}", taskId);
    }

    private TaskResponseDto convertToDto(Task task) {
        String assignedNombre = userRepository.findById(task.getAssignedToId())
                .map(u -> u.getFirstName() + " " + u.getLastName())
                .orElse("");

        String createdPorNombre = userRepository.findById(task.getCreatedByUserId())
                .map(u -> u.getFirstName() + " " + u.getLastName())
                .orElse("");

        return TaskResponseDto.builder()
                .id(task.getId())
                .orgId(task.getOrgId())
                .title(task.getTitle())
                .description(task.getDescription())
                .assignedToId(task.getAssignedToId())
                .createdByUserId(task.getCreatedByUserId())
                .dueDate(task.getDueDate())
                .status(task.getStatus().toString())
                .assignedNombre(assignedNombre)
                .createdPorNombre(createdPorNombre)
                .build();
    }
}