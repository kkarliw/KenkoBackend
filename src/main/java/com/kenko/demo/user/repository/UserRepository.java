package com.kenko.demo.user.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.kenko.demo.user.entity.User;
import com.kenko.demo.user.entity.User.UserRole;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndOrgId(String email, Long orgId);
    List<User> findByOrgIdAndRole(Long orgId, UserRole role);
    Page<User> findByOrgId(Long orgId, Pageable pageable);
    Page<User> findByOrgIdAndFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
            Long orgId, String firstName, String lastName, Pageable pageable
    );
}