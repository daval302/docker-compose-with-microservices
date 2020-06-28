package com.helloworld.storeapi.data.repository;

import com.helloworld.storeapi.data.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Integer>
{
    Optional<Item> findById(Integer id);
}
