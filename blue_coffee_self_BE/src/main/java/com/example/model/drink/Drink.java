package com.example.model.drink;

import com.example.model.Promotion;

import javax.persistence.*;

@Entity
public class Drink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String image;
    private Integer price;
    private boolean isDelete;

    @ManyToOne
    @JoinColumn(name = "drink_type_id", referencedColumnName = "id")
    private DrinkType drinkType;

    @ManyToOne
    @JoinColumn(name = "promotion_id", referencedColumnName = "id")
    private Promotion promotion;

    public Drink() {
    }

    public Drink(Integer id, String name, String image, Integer price, boolean isDelete, DrinkType drinkType, Promotion promotion) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.isDelete = isDelete;
        this.drinkType = drinkType;
        this.promotion = promotion;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public DrinkType getDrinkType() {
        return drinkType;
    }

    public void setDrinkType(DrinkType drinkType) {
        this.drinkType = drinkType;
    }

    public Promotion getPromotion() {
        return promotion;
    }

    public void setPromotion(Promotion promotion) {
        this.promotion = promotion;
    }
}
