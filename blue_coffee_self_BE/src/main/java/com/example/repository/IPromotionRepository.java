package com.example.repository;

import com.example.model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPromotionRepository extends JpaRepository<Promotion, Integer> {
}
