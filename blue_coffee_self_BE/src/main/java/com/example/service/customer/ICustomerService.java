package com.example.service.customer;


import com.example.dto.ICustomerDto;
import com.example.model.Customer;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ICustomerService {

    Customer findFakeMail(String email);

    int saveCreateGmail(Customer customer);

    Customer findCustomerByUsername( String username);

}
