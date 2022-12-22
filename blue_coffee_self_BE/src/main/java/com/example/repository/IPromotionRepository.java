package com.example.repository;

import com.example.model.Promotion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IPromotionRepository extends JpaRepository<Promotion, Integer> {

    @Query(value = "SELECT promotion.name, promotion.detail, promotion.start_time, promotion.end_time," +
            " promotion.discount, promotion.id, promotion.image, promotion.is_delete " +
            "FROM promotion " +
            "WHERE promotion.name LIKE %:name% " +
            "AND promotion.is_delete = 0 " +
            "ORDER BY promotion.id DESC"
            , countQuery = "SELECT count(*) " +
            "FROM promotion " +
            "WHERE promotion.name LIKE %:name% " +
            "AND promotion.is_delete = 0 " +
            "ORDER BY promotion.id DESC"
            , nativeQuery = true)
    Page<Promotion> findAllPromotion(Pageable pageable, @Param("name") String name);

}
