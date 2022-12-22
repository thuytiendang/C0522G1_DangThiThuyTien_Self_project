package com.example.controller;

import com.example.model.Promotion;
import com.example.service.IPromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/promotion")
@CrossOrigin("*")
public class PromotionRestController {

    @Autowired
    private IPromotionService iPromotionService;

    @GetMapping("/list")
    public ResponseEntity<Page<Promotion>> showPromotion(@RequestParam(value = "name", defaultValue = "",required = false) String name,
                                                         @PageableDefault(value = 8) Pageable pageable) {
        Page<Promotion> promotions = iPromotionService.findAll(pageable, name);
        if (promotions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(promotions, HttpStatus.OK);
        }
    }
}
