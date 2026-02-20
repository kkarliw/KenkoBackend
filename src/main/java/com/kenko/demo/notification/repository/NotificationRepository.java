package com.kenko.demo.notification.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.kenko.demo.notification.entity.Notification;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    Page<Notification> findByRecipientIdAndOrgIdOrderByCreatedAtDesc(
            Long recipientId, Long orgId, Pageable pageable
    );

    List<Notification> findByRecipientIdAndOrgIdAndIsReadFalseOrderByCreatedAtDesc(
            Long recipientId, Long orgId
    );

    long countByRecipientIdAndOrgIdAndIsReadFalse(Long recipientId, Long orgId);
}