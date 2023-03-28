package com.cs4050.cinema.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs4050.cinema.Entity.PaymentInfo;

public interface PaymentInfoRepository extends JpaRepository<PaymentInfo, Long>{
    //PaymentInfo findById(Long id);
} // paymentInfoRepository