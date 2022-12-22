package com.example.service.customer.impl;

import com.example.dto.ICustomerDto;
import com.example.model.Customer;
import com.example.repository.customer.ICustomerRepository;
import com.example.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService implements ICustomerService {

    @Autowired
    private ICustomerRepository customerRepository;

    @Override
    public Customer findFakeMail(String email) {
        return customerRepository.findFakeMail(email);
    }

    public int saveCreateGmail(Customer customer) {
        return customerRepository.saveCreateGmail(customer.getName(), customer.getEmail());
    }

    @Override
    public Customer findCustomerByUsername(String username) {
        return customerRepository.findCustomerByUsername(username);
    }


}
