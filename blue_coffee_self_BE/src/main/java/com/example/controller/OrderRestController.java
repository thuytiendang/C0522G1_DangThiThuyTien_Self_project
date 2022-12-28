package com.example.controller;


import com.example.dto.IOrderDto;
import com.example.model.Customer;
import com.example.model.Orders;
import com.example.service.IOrderService;
import com.example.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/order")
public class OrderRestController {

    @Autowired
    private IOrderService iOrderService;

    @Autowired
    private ICustomerService customerService;


    @GetMapping("/list-cart/{id}")
    public ResponseEntity<List<IOrderDto>> showCartByUser(@PathVariable("id") Integer id) {
        List<IOrderDto> cart = iOrderService.findCartByUser(id);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @GetMapping("/find-all-customer/{username}")
    public ResponseEntity<?> findAllCustomer(@PathVariable(value = "username") String username) {
        Customer customer = customerService.findCustomerByUsername(username);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @GetMapping("/add-cart/{quantity}&{customerId}&{drinkId}")
    public ResponseEntity<Orders> addCart(@PathVariable("quantity") Integer quantity,
                                          @PathVariable("customerId") Integer customerId,
                                          @PathVariable("drinkId") Integer drinkId) {
        iOrderService.addOrder(quantity, customerId, drinkId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/delete-cart/{id}")
    public ResponseEntity<Orders> deleteCart(@PathVariable("id") Integer id) {
        iOrderService.deleteCart(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/asc-quantity/{id}")
    public ResponseEntity<Orders> ascQuantity(@PathVariable("id") Integer id) {
        iOrderService.ascQuantity(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/desc-quantity/{id}")
    public ResponseEntity<Orders> descQuantity(@PathVariable("id") Integer id) {
        iOrderService.descQuantity(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/count-drink/{customerId}")
    public ResponseEntity<IOrderDto> countDrink(@PathVariable("customerId") Integer customerId) {
        Optional<IOrderDto> countDrink = iOrderService.countDrink(customerId);
        if (countDrink.isPresent()) {
            return new ResponseEntity<>(countDrink.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/payment/{customerId}")
    public ResponseEntity<Orders> paymentDrink(@PathVariable("customerId") Integer customerId) {
        iOrderService.payedCart(customerId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/history/{id}")
    public ResponseEntity<Page<IOrderDto>> showHistory(@PageableDefault(value = 3) Pageable pageable,
                                                       @PathVariable("id") Integer id) {
        Page<IOrderDto> list = iOrderService.findHistoryByUser(id, pageable);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
