package com.example.service.drink;

import com.example.dto.drink.IDrinkDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface IDrinkService {
    Page<IDrinkDto> findAllDrink(Pageable pageable, String nameSearch);

    Optional<IDrinkDto> findDrinkById(int id);
}
