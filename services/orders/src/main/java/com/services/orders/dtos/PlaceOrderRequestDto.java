package com.services.orders.dtos;

import java.util.ArrayList;
import java.util.List;

public class PlaceOrderRequestDto {
    private String shippingAddress;
    private List<OrderItemsDto> items;

    public String getShippingAddress() {
        return shippingAddress;
    }

    public List<OrderItemsDto> getItems() {
        return items;
    }
}
