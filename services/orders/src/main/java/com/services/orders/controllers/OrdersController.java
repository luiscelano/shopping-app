package com.services.orders.controllers;

import com.services.orders.dtos.PlaceOrderRequestDto;
import com.services.orders.entities.OrderEntity;
import com.services.orders.services.OrdersService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrdersController {

    @Autowired
    OrdersService ordersService;

    @GetMapping
    List<OrderEntity> getOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Claims claims = (Claims) authentication.getDetails();
        return this.ordersService.getCustomerOrders(Integer.parseInt(claims.get("userId").toString()));
    }

    @PostMapping
    public OrderEntity placeOrder(@RequestBody PlaceOrderRequestDto request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Claims claims = (Claims) authentication.getDetails();
        return this.ordersService.placeOrder(request, Integer.parseInt(claims.get("userId").toString()));
    }
}
