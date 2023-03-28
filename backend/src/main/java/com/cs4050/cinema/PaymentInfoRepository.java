package com.cs4050.cinema;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentInfoRepository extends JpaRepository<PaymentInfo, Long>{
    //PaymentInfo findById(Long id);
} // paymentInfoRepository