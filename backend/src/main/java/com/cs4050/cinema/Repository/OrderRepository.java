package com.cs4050.cinema.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs4050.cinema.Model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    
} // IrderRepository
