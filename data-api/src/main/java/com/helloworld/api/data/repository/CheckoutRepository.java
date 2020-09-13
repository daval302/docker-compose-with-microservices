package com.helloworld.api.data.repository;

import com.helloworld.api.data.model.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Integer>
{
    List<Checkout> findAllByState(String state);
}
