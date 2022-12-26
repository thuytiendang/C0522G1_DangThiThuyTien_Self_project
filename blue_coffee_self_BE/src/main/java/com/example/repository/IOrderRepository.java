package com.example.repository;

import com.example.dto.IOrderDto;
import com.example.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface IOrderRepository extends JpaRepository<Orders, Integer> {

    @Modifying
    @Transactional
    @Query(value = "update orders set quantity = :quantity where status = 0 and " +
            "customer_id = :customerId " +
            "and drink_id = :drinkId", nativeQuery = true)
    void setQuantityDrink(@Param("quantity") Integer quantity,
                           @Param("customerId") Integer customerId,
                           @Param("drinkId") Integer drinkId);

    @Query(value = "select orders.id as id, drink.price as price, promotion.discount as discount, " +
            "orders.quantity as quantity, drink.image as image, drink.name as nameDrink " +
            "from orders " +
            "join customer on customer.id = orders.customer_id " +
            "join drink on drink.id = orders.drink_id " +
            "join promotion on promotion.id = drink.promotion_id " +
            "where orders.is_delete = 0 and orders.status = 0 and orders.quantity > 0 " +
            "and orders.customer_id = :id", nativeQuery = true)
    List<IOrderDto> findCartByUser(@Param("id") Integer id);

    @Modifying
    @Transactional
    @Query(value = "insert into orders (date_payment , quantity, customer_id,drink_id) " +
            "value (now(),:quantity,:customerId,:drinkId) ", nativeQuery = true)
    void addOrder(@Param("quantity") Integer quantity,
                  @Param("customerId") Integer customerId,
                  @Param("drinkId") Integer drinkId);

    @Query(value = "select * from orders where status = 0 and is_delete = 0 and customer_id = :customerId " +
            "and drink_id = :drinkId", nativeQuery = true)
    Optional<Orders> getOderCart(@Param("customerId") Integer customerId,
                                 @Param("drinkId") Integer drinkId);

    @Modifying
    @Transactional
    @Query(value = "update orders set is_delete = 1 where id = :id", nativeQuery = true)
    void deleteCart(@Param("id") Integer id);


    @Modifying
    @Transactional
    @Query(value = "update orders set date_payment = now(), status = 1 where status = 0 and customer_id = :id",
            nativeQuery = true)
    void payedCart(@Param("id") Integer id);


    @Modifying
    @Transactional
    @Query(value = "update orders set quantity = (quantity + 1) where id = :id", nativeQuery = true)
    void ascQuantity(@Param("id") Integer id);

    @Modifying
    @Transactional
    @Query(value = "update orders set quantity = (quantity - 1) where id = :id", nativeQuery = true)
    void descQuantity(@Param("id") Integer id);


    @Query(value = "select count(id) as countDrink from orders where orders.customer_id = :customerId " +
            "and orders.is_delete = 0 and status = 0", nativeQuery = true)
    Optional<IOrderDto> countDrink(@Param("customerId") Integer customerId);
}
