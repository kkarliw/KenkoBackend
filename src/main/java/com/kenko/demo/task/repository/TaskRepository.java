package com.kenko.demo.task.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.kenko.demo.task.entity.Task;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findByOrgId(Long orgId, Pageable pageable);
    List<Task> findByOrgIdAndAssignedToId(Long orgId, Long assignedToId);
    List<Task> findByOrgIdAndStatus(Long orgId, Task.TaskStatus status);
}