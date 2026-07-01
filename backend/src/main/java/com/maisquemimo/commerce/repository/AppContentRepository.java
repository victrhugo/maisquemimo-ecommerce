package com.maisquemimo.commerce.repository;

import com.maisquemimo.commerce.entity.AppContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AppContentRepository extends JpaRepository<AppContent, UUID> {
    Optional<AppContent> findByContentKey(String contentKey);
}
