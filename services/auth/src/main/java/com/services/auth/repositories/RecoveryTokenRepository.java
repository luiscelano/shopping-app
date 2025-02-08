package com.services.auth.repositories;

import com.services.auth.entities.RecoveryTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecoveryTokenRepository extends JpaRepository<RecoveryTokenEntity, Long> {
    Optional<RecoveryTokenEntity> findByToken(String token);
}
