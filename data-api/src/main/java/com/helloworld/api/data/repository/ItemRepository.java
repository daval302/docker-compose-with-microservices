package com.helloworld.api.data.repository;

import com.helloworld.api.data.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Integer>
{
    Optional<Item> findById(Integer id);
}
