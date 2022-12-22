package com.example.service;

import com.example.model.Promotion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IPromotionService {

    Page<Promotion> findAll(Pageable pageable, String name);
}
