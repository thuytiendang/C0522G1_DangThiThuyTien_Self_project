package com.example.repository.drink;

import com.example.model.drink.DrinkType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IDrinkTypeRepository extends JpaRepository<DrinkType, Integer> {

    @Query(value = "select id, name, is_delete" +
            " from drink_type  where is_delete = 0", nativeQuery = true)
    List<DrinkType> findAllDrinkType();
}
