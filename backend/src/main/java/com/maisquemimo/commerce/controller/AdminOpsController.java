package com.maisquemimo.commerce.controller;

import com.maisquemimo.commerce.dto.*;
import com.maisquemimo.commerce.entity.AppContent;
import com.maisquemimo.commerce.entity.Order;
import com.maisquemimo.commerce.entity.User;
import com.maisquemimo.commerce.repository.AppContentRepository;
import com.maisquemimo.commerce.repository.OrderRepository;
import com.maisquemimo.commerce.repository.ProductRepository;
import com.maisquemimo.commerce.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequiredArgsConstructor
public class AdminOpsController {

    private static final DateTimeFormatter ISO_DATE = DateTimeFormatter.ISO_LOCAL_DATE;

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final AppContentRepository appContentRepository;
    private final PasswordEncoder passwordEncoder;

    private static final Set<String> PUBLIC_CONTENT_KEYS = Set.of("homepage", "banners");

    @GetMapping("/admin/customers")
    public ResponseEntity<List<AdminCustomerResponse>> listCustomers() {
        Map<UUID, List<Order>> ordersByUser = new HashMap<>();
        for (Order order : orderRepository.findAllByOrderByCreatedAtDesc()) {
            ordersByUser.computeIfAbsent(order.getCustomer().getId(), key -> new ArrayList<>()).add(order);
        }

        List<AdminCustomerResponse> customers = userRepository.findAll().stream()
                .filter(user -> user.getRole() == User.Role.CUSTOMER)
                .map(user -> toCustomerResponse(user, ordersByUser.getOrDefault(user.getId(), List.of())))
                .sorted(Comparator.comparing(AdminCustomerResponse::name, String.CASE_INSENSITIVE_ORDER))
                .toList();

        return ResponseEntity.ok(customers);
    }

    @GetMapping("/admin/orders")
    public ResponseEntity<List<AdminOrderResponse>> listOrders(@RequestParam(required = false) String status) {
        List<Order> orders;
        if (status == null || status.isBlank() || "ALL".equalsIgnoreCase(status)) {
            orders = orderRepository.findAllByOrderByCreatedAtDesc();
        } else {
            orders = orderRepository.findByStatusOrderByCreatedAtDesc(parseOrderStatus(status));
        }

        List<AdminOrderResponse> response = orders.stream().map(this::toOrderResponse).toList();
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/admin/orders/{id}/status")
    public ResponseEntity<AdminOrderResponse> updateOrderStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        UUID orderId = UUID.fromString(id);
        String newStatus = body.getOrDefault("status", "").trim();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Pedido nao encontrado"));

        order.setStatus(parseOrderStatus(newStatus));
        Order saved = orderRepository.save(order);
        return ResponseEntity.ok(toOrderResponse(saved));
    }

    @GetMapping("/admin/users")
    public ResponseEntity<List<AdminUserResponse>> listUsers() {
        List<AdminUserResponse> users = userRepository.findAll().stream()
                .map(this::toUserResponse)
                .sorted(Comparator.comparing(AdminUserResponse::name, String.CASE_INSENSITIVE_ORDER))
                .toList();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/admin/users")
    public ResponseEntity<AdminUserResponse> createUser(@Valid @RequestBody AdminUserRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email ja cadastrado");
        }

        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                .role(parseRole(request.role()))
                .enabled(request.isActive() == null || request.isActive())
                .build();

        User saved = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(toUserResponse(saved));
    }

    @PutMapping("/admin/users/{id}")
    public ResponseEntity<AdminUserResponse> updateUser(@PathVariable String id, @Valid @RequestBody AdminUserRequest request) {
        UUID userId = UUID.fromString(id);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario nao encontrado"));

        if (!user.getEmail().equalsIgnoreCase(request.email()) && userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email ja cadastrado");
        }

        user.setName(request.name());
        user.setEmail(request.email());
        user.setRole(parseRole(request.role()));
        if (request.isActive() != null) {
            user.setEnabled(request.isActive());
        }

        User saved = userRepository.save(user);
        return ResponseEntity.ok(toUserResponse(saved));
    }

    @DeleteMapping("/admin/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        UUID userId = UUID.fromString(id);
        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("Usuario nao encontrado");
        }
        userRepository.deleteById(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/dashboard")
    public ResponseEntity<Map<String, Object>> dashboard() {
        List<Order> orders = orderRepository.findAllByOrderByCreatedAtDesc();
        var products = productRepository.findAll();
        var users = userRepository.findAll();
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime monthStart = now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);

        BigDecimal monthRevenue = orders.stream()
                .filter(order -> !order.getCreatedAt().isBefore(monthStart))
                .map(Order::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long totalOrders = orders.size();
        long customers = users.stream().filter(user -> user.getRole() == User.Role.CUSTOMER).count();
        long activeProducts = products.stream().filter(product -> Boolean.TRUE.equals(product.getActive())).count();

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("monthRevenue", monthRevenue);
        payload.put("ordersCount", totalOrders);
        payload.put("customersCount", customers);
        payload.put("activeProductsCount", activeProducts);
        payload.put("recentOrders", orders.stream().limit(5).map(this::toOrderResponse).toList());
        payload.put("topProducts", products.stream().filter(p -> Boolean.TRUE.equals(p.getActive())).limit(5).map(p -> Map.of(
                "id", p.getId().toString(),
                "name", p.getName(),
                "sales", p.getReviewCount() == null ? 0 : p.getReviewCount(),
                "revenue", p.getPrice() == null ? BigDecimal.ZERO : p.getPrice().multiply(BigDecimal.valueOf(p.getReviewCount() == null ? 0 : p.getReviewCount()))
        )).toList());
        payload.put("lowStock", products.stream().filter(p -> p.getStockQuantity() != null && p.getStockQuantity() <= 6).limit(5).map(p -> Map.of(
                "id", p.getId().toString(),
                "name", p.getName(),
                "stock", p.getStockQuantity()
        )).toList());

        return ResponseEntity.ok(payload);
    }

    @GetMapping("/admin/content/{key}")
    public ResponseEntity<Map<String, Object>> getContent(@PathVariable String key) {
        AppContent content = appContentRepository.findByContentKey(key)
                .orElseGet(() -> appContentRepository.save(AppContent.builder().contentKey(key).payload("{}").build()));

        return ResponseEntity.ok(Map.of(
                "key", content.getContentKey(),
                "payload", content.getPayload()
        ));
    }

    @GetMapping("/content/{key}")
    public ResponseEntity<Map<String, Object>> getPublicContent(@PathVariable String key) {
        if (!PUBLIC_CONTENT_KEYS.contains(key)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        AppContent content = appContentRepository.findByContentKey(key)
                .orElseGet(() -> AppContent.builder().contentKey(key).payload("{}").build());

        return ResponseEntity.ok(Map.of(
                "key", content.getContentKey(),
                "payload", content.getPayload()
        ));
    }

    @PutMapping("/admin/content/{key}")
    public ResponseEntity<Map<String, Object>> putContent(@PathVariable String key, @RequestBody Map<String, Object> body) {
        String payload = String.valueOf(body.getOrDefault("payload", "{}"));

        AppContent content = appContentRepository.findByContentKey(key)
                .orElseGet(() -> AppContent.builder().contentKey(key).build());
        content.setPayload(payload);
        AppContent saved = appContentRepository.save(content);

        return ResponseEntity.ok(Map.of(
                "key", saved.getContentKey(),
                "payload", saved.getPayload()
        ));
    }

    private AdminCustomerResponse toCustomerResponse(User user, List<Order> orders) {
        long totalSpent = orders.stream()
                .map(Order::getTotal)
                .filter(Objects::nonNull)
                .map(amount -> amount.multiply(BigDecimal.valueOf(100)).longValue())
                .reduce(0L, Long::sum);

        String lastOrderDate = orders.isEmpty()
                ? null
                : orders.get(0).getCreatedAt().format(ISO_DATE);

        return new AdminCustomerResponse(
                user.getId().toString(),
                user.getName(),
                user.getEmail(),
                "",
                "",
                "",
                orders.size(),
                totalSpent,
                lastOrderDate
        );
    }

    private AdminOrderResponse toOrderResponse(Order order) {
        List<AdminOrderItemResponse> items = order.getItems().stream()
                .map(item -> new AdminOrderItemResponse(
                        item.getProduct().getName(),
                        item.getQuantity() == null ? 0 : item.getQuantity(),
                        item.getPriceAtPurchase() == null ? 0L : item.getPriceAtPurchase().multiply(BigDecimal.valueOf(100)).longValue()
                ))
                .toList();

        return new AdminOrderResponse(
                order.getId().toString(),
                order.getOrderNumber(),
                order.getCustomer().getName(),
                order.getCustomer().getEmail(),
                order.getStatus().name(),
                order.getTotal().multiply(BigDecimal.valueOf(100)).longValue(),
                order.getCreatedAt().toString(),
                items
        );
    }

    private AdminUserResponse toUserResponse(User user) {
        return new AdminUserResponse(
                user.getId().toString(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                Boolean.TRUE.equals(user.getEnabled())
        );
    }

    private User.Role parseRole(String role) {
        if (role == null || role.isBlank()) {
            throw new IllegalArgumentException("Role invalida");
        }

        if ("SUPER_ADMIN".equalsIgnoreCase(role) || "ADMIN".equalsIgnoreCase(role) || "MANAGER".equalsIgnoreCase(role) || "EDITOR".equalsIgnoreCase(role)) {
            return User.Role.ADMIN;
        }

        if ("CUSTOMER".equalsIgnoreCase(role)) {
            return User.Role.CUSTOMER;
        }

        throw new IllegalArgumentException("Role invalida");
    }

    private Order.OrderStatus parseOrderStatus(String rawStatus) {
        if (rawStatus == null || rawStatus.isBlank()) {
            throw new IllegalArgumentException("Status do pedido e obrigatorio");
        }

        try {
            return Order.OrderStatus.valueOf(rawStatus.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Status do pedido invalido: " + rawStatus);
        }
    }
}
