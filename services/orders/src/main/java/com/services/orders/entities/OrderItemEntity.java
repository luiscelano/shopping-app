package com.services.orders.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "orderItems")
public class OrderItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderItemId;

    @Column(insertable=false, updatable=false)
    private Integer productId;

    @Column
    private Float price;

    @Column
    private Integer quantity;

//    @Column(insertable=false, updatable=false)
//    private Integer orderId;

    @ManyToOne
    @JoinColumn(name = "orderId")
    private OrderEntity order;

    @ManyToOne
    @JoinColumn(name = "productId")
    private ProductEntity product;

    public void setProduct(ProductEntity product) {
        this.product = product;
    }

    public ProductEntity getProduct() {
        return product;
    }

    public Integer getOrderItemId() {
        return orderItemId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Float getPrice() {
        return price;
    }

    public Float getItemPriceTotal () {
        return quantity * price;
    }
}
