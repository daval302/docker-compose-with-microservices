package com.helloworld.api.data.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "checkouts")
public class Checkout
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Basic
    @Column(name = "quantity")
    private int quantity;

    @Basic
    @Column(name = "ammount")
    private float ammount;

    @Column(name = "itemid")
    private Integer itemid;

    @ManyToOne
    @MapsId("itemid")
    @JoinColumn(name = "itemid", referencedColumnName = "id", nullable = false)
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

    public float getAmmount()
    {
        return ammount;
    }

    public void setAmmount(float ammount)
    {
        this.ammount = ammount;
    }

    public Integer getItemid()
    {
        return itemid;
    }

    public void setItemid(Integer itemid)
    {
        this.itemid = itemid;
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
