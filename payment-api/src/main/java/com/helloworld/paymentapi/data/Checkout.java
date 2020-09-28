package com.helloworld.paymentapi.data;

public class Checkout
{
    private String state;
    private int quantity;
    private float ammount;
    private Integer itemid;

    public String getState()
    {
        return state;
    }

    public void setState(String state)
    {
        this.state = state;
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

    @Override
    public String toString()
    {
        return "Checkout{" +
                "state='" + state + '\'' +
                ", quantity=" + quantity +
                ", ammount=" + ammount +
                ", itemid=" + itemid +
                '}';
    }
}
