package com.cs4050.cinema.Model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="paymentInfo")
public class PaymentInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentId", nullable = false)
    private Long paymentId;

    @Column(name = "cardType", nullable = false)
    private String cardType;

    @Column(name = "cardNumber", nullable = true)
    private String cardNumber;

    @Column(name = "expDate", nullable = false)
    private String expDate;

    @Column(name = "cvv", nullable = true)
    private String cvv;

    @Column(name = "encryptedCardNumber", nullable = false)
    private String encryptedCardNumber;

    @Column(name = "encryptedCvv", nullable = false)
    private String encryptedCvv;

    @Column(name = "cardName", nullable = false)
    private String cardName;

    @ManyToOne 
    @JoinColumn(name = "userId")
    private User user;
} // PaymentInfo
