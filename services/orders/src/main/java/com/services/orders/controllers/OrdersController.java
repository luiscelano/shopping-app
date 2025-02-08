package com.services.orders.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrdersController {

    @GetMapping
    List<String> getOrders() {
        List<String> orders = new ArrayList<String>();
        orders.add("test orders");

        return orders;
    }
}
