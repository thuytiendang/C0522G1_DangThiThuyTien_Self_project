package com.example.service;

import com.example.dto.IOrderDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IOrderService {
    List<IOrderDto> findCartByUser( Integer id);

    void addOrder( Integer quantity, Integer customerId, Integer drinkId);

    void deleteCart( Integer id);

    void ascQuantity( Integer id);

    void descQuantity(Integer id);

    Optional<IOrderDto> countDrink( Integer customerId);

    void payedCart(Integer id);

    Page<IOrderDto> findHistoryByUser(Integer id, Pageable pageable);
}
