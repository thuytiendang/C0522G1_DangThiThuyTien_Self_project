package com.example.service.customer;


import com.example.dto.ICustomerDto;
import com.example.model.Customer;

import java.util.Optional;

public interface ICustomerService {

    Customer findFakeMail(String email);

    int saveCreateGmail(Customer customer);

    Optional<ICustomerDto> findCustomerByUsername(String username);

}
