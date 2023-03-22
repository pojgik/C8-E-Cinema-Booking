package com.cs4050.cinema;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


import lombok.Data;

@Entity
@Data
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId", nullable = false)
    private Long userId;

    @Column(name = "firstName", nullable = false)
    private String firstName;

    @Column(name = "lastName", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name="userType", nullable = false)
    private UserType userType = UserType.CUSTOMER;

    @Enumerated(EnumType.STRING)
    @Column(name="customerStatus", nullable = false)
    private CustomerStatus customerStatus = CustomerStatus.INACTIVE;

    @Column(name = "verificationCode", nullable = true)
    private String verificationCode;

    @Column(name = "promotionStatus", nullable = false) 
    private boolean promotionStatus = false;

    @ManyToOne
    @JoinColumn(name="paymentId") 
    private List<PaymentInfo> paymentCards;
} // User
