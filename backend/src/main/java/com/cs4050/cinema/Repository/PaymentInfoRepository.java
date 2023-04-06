package com.cs4050.cinema.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs4050.cinema.Model.PaymentInfo;

public interface PaymentInfoRepository extends JpaRepository<PaymentInfo, Long>{

    <S extends PaymentInfo> S save(PaymentInfo paymentInfo);

} // paymentInfoRepository