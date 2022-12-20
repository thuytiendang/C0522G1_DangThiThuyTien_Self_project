package com.example.dto;

import com.example.model.Customer;
import com.example.model.drink.Drink;

public class OrderDto {
    private Integer id;
    private boolean isDelete;
    private Integer quantity;
    private String datePayment;
    private Customer customer;
    private Drink drink;

    public OrderDto() {
    }

    public OrderDto(Integer id, boolean isDelete, Integer quantity, String datePayment, Customer customer, Drink drink) {
        this.id = id;
        this.isDelete = isDelete;
        this.quantity = quantity;
        this.datePayment = datePayment;
        this.customer = customer;
        this.drink = drink;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getDatePayment() {
        return datePayment;
    }

    public void setDatePayment(String datePayment) {
        this.datePayment = datePayment;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Drink getDrink() {
        return drink;
    }

    public void setDrink(Drink drink) {
        this.drink = drink;
    }
}
