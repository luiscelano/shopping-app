package com.service.products.services;

import com.service.products.entities.ProductEntity;
import com.service.products.repositories.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductsService {

    @Autowired
    ProductsRepository productsRepository;

    public List<ProductEntity> getProducts() {
        return this.productsRepository.findAll();
    }
}
