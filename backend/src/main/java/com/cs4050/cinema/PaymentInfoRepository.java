package com.cs4050.cinema;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentInfoRepository extends JpaRepository<PaymentInfo, Long>{
    Optional<PaymentInfo> findById(Long id);
} // paymentInfoRepository