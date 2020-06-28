package com.helloworld.storeapi.data.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "checkouts")
public class Checkout
{
    @Id
    @Column(name = "item")
    private Integer id;

    @Basic
    @Column(name = "quantity")
    private int quantity;

    @Basic
    @Column(name = "ammount")
    private double ammount;

    @OneToOne
    @JoinColumn(name = "item", referencedColumnName = "id", nullable = false)
    private Item item;

    public Integer getId()
    {
        return id;
    }

    public void setId(Integer id)
    {
        this.id = id;
    }

    public int getQuantity()
    {
        return quantity;
    }

    public void setQuantity(int quantity)
    {
        this.quantity = quantity;
    }

    public double getAmmount()
    {
        return ammount;
    }

    public void setAmmount(double ammount)
    {
        this.ammount = ammount;
    }

    public Item getItem()
    {
        return item;
    }

    public void setItem(Item item)
    {
        this.item = item;
    }
}
