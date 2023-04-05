package com.cs4050.cinema.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs4050.cinema.Model.Promotion;

public interface PromotionRepository extends JpaRepository<Promotion, Long>{
        Promotion save(Promotion promotion);
        
} // PromotionRepository
