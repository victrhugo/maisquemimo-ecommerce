package com.maisquemimo.commerce.controller;

import com.maisquemimo.commerce.dto.StoreOrderItemResponse;
import com.maisquemimo.commerce.dto.StoreOrderResponse;
import com.maisquemimo.commerce.entity.Order;
import com.maisquemimo.commerce.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository orderRepository;

    @GetMapping("/orders")
    public ResponseEntity<List<StoreOrderResponse>> listOrders(Authentication authentication) {
        if (authentication == null || authentication.getName() == null || authentication.getName().isBlank()) {
            return ResponseEntity.ok(List.of());
        }

        List<StoreOrderResponse> orders = orderRepository.findByCustomerEmailOrderByCreatedAtDesc(authentication.getName()).stream()
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(orders);
    }

    private StoreOrderResponse toResponse(Order order) {
        List<StoreOrderItemResponse> items = order.getItems().stream()
                .map(item -> new StoreOrderItemResponse(
                        item.getProduct().getId().toString(),
                        item.getProduct().getName(),
                        item.getProduct().getImageUrl(),
                        moneyToCents(item.getPriceAtPurchase()),
                        item.getQuantity() == null ? 0 : item.getQuantity(),
                        moneyToCents(item.getTotalPrice())
                ))
                .toList();

        return new StoreOrderResponse(
                order.getId().toString(),
                order.getOrderNumber(),
                order.getStatus().name(),
                items,
                moneyToCents(order.getSubtotal()),
                moneyToCents(order.getDiscount()),
                moneyToCents(order.getShippingCost()),
                moneyToCents(order.getTotal()),
                order.getCreatedAt().toString(),
                order.getUpdatedAt().toString(),
                new StoreOrderResponse.Customer(order.getCustomer().getName(), order.getCustomer().getEmail()),
                order.getShippingAddress() == null
                        ? null
                        : new StoreOrderResponse.Address(
                        order.getShippingAddress().getStreet(),
                        order.getShippingAddress().getNumber(),
                        order.getShippingAddress().getComplement(),
                        order.getShippingAddress().getNeighborhood(),
                        order.getShippingAddress().getCity(),
                        order.getShippingAddress().getState(),
                        order.getShippingAddress().getZipCode()
                ),
                order.getTrackingCode()
        );
    }

    private long moneyToCents(BigDecimal value) {
        if (value == null) {
            return 0L;
        }
        return value.multiply(BigDecimal.valueOf(100)).longValue();
    }
}
