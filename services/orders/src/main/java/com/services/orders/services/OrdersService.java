package com.services.orders.services;

import com.services.orders.dtos.OrderItemsDto;
import com.services.orders.dtos.PlaceOrderRequestDto;
import com.services.orders.entities.OrderEntity;
import com.services.orders.entities.OrderItemEntity;
import com.services.orders.entities.ProductEntity;
import com.services.orders.repositories.OrderRepository;
import com.services.orders.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class OrdersService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    OrderRepository orderRepository;

    public OrderEntity placeOrder(PlaceOrderRequestDto input, Integer userId) {

            List<OrderItemEntity> orderItems = new ArrayList<>();

            OrderEntity orderEntity = new OrderEntity();
            input.getItems().forEach(item -> {
                Optional<ProductEntity> productResult = this.productRepository.findById(Long.valueOf(item.getProductId()));

                if(productResult.isEmpty()) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No encontramos el producto con id: " + item.getProductId());
                }
                if(item.getQuantity() > productResult.get().getAvailability()) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No tenemos suficiente stock para el producto ["+productResult.get().getTitle() +"] revisa tu carrito");
                }
                orderItems.add(getOrderEntity(item.getQuantity(), productResult.get().getPrice(), orderEntity, productResult.get()));
            });
            orderEntity.setUserId(userId);
            orderEntity.setShippingAddress(input.getShippingAddress());
            orderEntity.setOrderTotal(orderItems.stream().map(OrderItemEntity::getItemPriceTotal).reduce((float) 0, Float::sum));
            orderEntity.setOrderItems(orderItems);

            return this.orderRepository.save(orderEntity);

    }

    private OrderItemEntity getOrderEntity(Integer quantity, Float price, OrderEntity order, ProductEntity productEntity) {
        OrderItemEntity orderItemEntity = new OrderItemEntity();
        orderItemEntity.setProduct(productEntity);
        orderItemEntity.setPrice(price);
        orderItemEntity.setQuantity(quantity);
        orderItemEntity.setOrder(order);

        return orderItemEntity;
    }

    public List<OrderEntity> getCustomerOrders(Integer userId) {
        List<OrderEntity> allByUserId = this.orderRepository.findAllByUserId(userId);
        allByUserId.sort(Comparator.comparing(OrderEntity::getCreatedAt).reversed());
        return allByUserId;
    }

}
