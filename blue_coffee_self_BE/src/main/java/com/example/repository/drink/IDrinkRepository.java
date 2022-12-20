package com.example.repository.drink;

import com.example.dto.drink.IDrinkDto;
import com.example.model.drink.Drink;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IDrinkRepository extends JpaRepository<Drink, Integer> {

    @Query(value = "select drink.name as name, drink.image as image, drink.price as price," +
            "drink.price * (100 - ifnull(promotion.discount, 0))/100 as discount, " +
            "drink_type.name as drinkTypeName " +
            "from drink " +
            "join drink_type on drink_type.id = drink.drink_type_id " +
            "join promotion on promotion.id = drink.promotion_id " +
            "where drink.is_delete = 0 and drink.name like %:nameSearch% " +
            "order by drink_type.name",
            countQuery = "select count(*) from drink" +
                    " join drink_type on drink_type.id = drink.drink_type_id" +
                    " join promotion on promotion.id = drink.promotion_id " +
                    "where drink.is_delete = 0 and drink.name like %:nameSearch% " +
                    "order by drink_type.name", nativeQuery = true )
    Page<IDrinkDto> findAllDrink(Pageable pageable, @Param("nameSearch") String nameSearch);
}
