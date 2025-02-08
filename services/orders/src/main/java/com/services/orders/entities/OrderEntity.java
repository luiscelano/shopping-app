package com.services.orders.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderId;

    @Column(nullable = false)
    private Integer userId;

    @Column(nullable = false)
    private Float orderTotal;

    @Column(nullable = false)
    private String shippingAddress;

    public Float getOrderTotal() {
        return orderTotal;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public List<OrderItemEntity> getOrderItems() {
        return orderItems;
    }

    @Column(nullable = false)
    private String orderStatus =  "PENDIENTE";

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItemEntity> orderItems;

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setOrderTotal(Float orderTotal) {
        this.orderTotal = orderTotal;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public void setOrderItems(List<OrderItemEntity> orderItems) {
        this.orderItems = orderItems;
    }

    public Integer getOrderId() {
        return orderId;
    }
}
