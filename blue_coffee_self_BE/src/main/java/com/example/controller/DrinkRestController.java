package com.example.controller;

import com.example.dto.drink.IDrinkDto;
import com.example.service.drink.IDrinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/drink")
public class DrinkRestController {

    @Autowired
    private IDrinkService iDrinkService;

    @GetMapping("/list")
    public ResponseEntity<Page<IDrinkDto>> findAllDrink (
            @PageableDefault(value = 8) Pageable pageable,
            @RequestParam(value = "nameSearch", defaultValue = "",required = false) String nameSearch){
        Page<IDrinkDto> drinkList = iDrinkService.findAllDrink(pageable, nameSearch);
        if (drinkList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(drinkList, HttpStatus.OK);
    }
}
