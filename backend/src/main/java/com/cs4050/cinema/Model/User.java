package com.cs4050.cinema.Model;

import java.util.List;
import java.util.ArrayList;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Data
@Table(name = "user")
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
    @Column(name = "userType", nullable = false)
    private UserType userType = UserType.CUSTOMER;

    @Enumerated(EnumType.STRING)
    @Column(name = "customerStatus", nullable = false)
    private CustomerStatus customerStatus = CustomerStatus.INACTIVE;

    @Column(name = "verificationCode", nullable = true)
    private String verificationCode;

    @Column(name = "promotionStatus", nullable = false) 
    private boolean promotionStatus = false;    

    @Column(name = "phone", nullable = false)
    private String phone;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "paymentId")
    private List<PaymentInfo> paymentCards = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "orderId")
    private List<Order> orders = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "addressId")
    private Address billingAddress;

    public boolean getPromotionStatus() {
        return this.promotionStatus;
    } // getPromotionStatus

    public void setPromotionStatus(boolean status) {
        this.promotionStatus = status;
    } // setPromotionStatus

    public Long getUserId() {
        return userId;
    }

    @JsonIgnore 
    public List<Order> getOrders() {
        return orders;
    }
} // User
