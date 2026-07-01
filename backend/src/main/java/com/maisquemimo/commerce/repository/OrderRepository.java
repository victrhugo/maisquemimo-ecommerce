package com.maisquemimo.commerce.repository;

import com.maisquemimo.commerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findAllByOrderByCreatedAtDesc();
    List<Order> findByStatusOrderByCreatedAtDesc(Order.OrderStatus status);
    List<Order> findByCustomerEmailOrderByCreatedAtDesc(String email);
    List<Order> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}
