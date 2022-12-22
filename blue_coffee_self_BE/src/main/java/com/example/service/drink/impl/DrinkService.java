package com.example.service.drink.impl;

import com.example.dto.drink.IDrinkDto;
import com.example.repository.drink.IDrinkRepository;
import com.example.service.drink.IDrinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DrinkService implements IDrinkService {

    @Autowired
    private IDrinkRepository iDrinkRepository;

    @Override
    public Page<IDrinkDto> findAllDrink(Pageable pageable, String nameSearch) {
        return iDrinkRepository.findAllDrink(pageable, nameSearch);
    }

    @Override
    public Optional<IDrinkDto> findDrinkById(int id) {
        return iDrinkRepository.findDrinkById(id);
    }
}
