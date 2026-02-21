package com.kenko.demo.organization.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.kenko.demo.organization.entity.Organization;
import java.util.Optional;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    Optional<Organization> findByOrgId(String orgId);
    Optional<Organization> findByEmail(String email);
}