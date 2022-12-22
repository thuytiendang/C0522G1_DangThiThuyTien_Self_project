package com.example.service.impl;

import com.example.model.Promotion;
import com.example.repository.IPromotionRepository;
import com.example.service.IPromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PromotionService implements IPromotionService {

    @Autowired
    private IPromotionRepository iPromotionRepository;

    @Override
    public Page<Promotion> findAll(Pageable pageable, String name) {
        return iPromotionRepository.findAllPromotion(pageable, name);
    }
}
