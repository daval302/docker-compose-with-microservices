package com.helloworld.storeapi.data.repository;

import com.helloworld.storeapi.data.model.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckoutRepository extends JpaRepository<Checkout, Integer>
{
}
