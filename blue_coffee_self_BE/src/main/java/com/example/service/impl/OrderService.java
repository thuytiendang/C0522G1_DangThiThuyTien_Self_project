package com.example.service.impl;

import com.example.dto.IOrderDto;
import com.example.model.Orders;
import com.example.repository.IOrderRepository;
import com.example.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService implements IOrderService {
    @Autowired
    private IOrderRepository iOrderRepository;

    @Override
    public List<IOrderDto> findCartByUser(Integer id) {
        return iOrderRepository.findCartByUser(id);
    }

    @Override
    public void addOrder(Integer quantity, Integer customerId, Integer drinkId) {
        Optional<Orders> orders = iOrderRepository.getOderCart(customerId, drinkId);
        if (orders.isPresent()) {
            iOrderRepository.setQuantityDrink(orders.get().getQuantity() + quantity, customerId, drinkId);
        } else {
            iOrderRepository.addOrder(quantity, customerId, drinkId);
        }
    }

    @Override
    public void deleteCart(Integer id) {
        iOrderRepository.deleteCart(id);
    }

    @Override
    public void ascQuantity(Integer id) {
        iOrderRepository.ascQuantity(id);
    }

    @Override
    public void descQuantity(Integer id) {
        iOrderRepository.descQuantity(id);
    }

    @Override
    public Optional<IOrderDto> countDrink(Integer customerId) {
        return iOrderRepository.countDrink(customerId);
    }

    @Override
    public void payedCart(Integer id) {
        iOrderRepository.payedCart(id);
    }

    @Override
    public Page<IOrderDto> findHistoryByUser(Integer id, Pageable pageable) {
        return iOrderRepository.findHistoryByUser(id, pageable);
    }
}
