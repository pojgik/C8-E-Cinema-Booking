package com.cs4050.cinema.Request;

import org.springframework.stereotype.Component;

import com.cs4050.cinema.Entity.Address;
import com.cs4050.cinema.Entity.PaymentInfo;
import com.cs4050.cinema.Entity.User;

@Component
public class UserRequest {
    private User user;
    private PaymentInfo paymentInfo;
    private Address address;

    public void setUser (User user) {
        this.user = user;
    } // setUser

    public void setPaymentInfo (PaymentInfo paymentInfo) {
        this.paymentInfo = paymentInfo;
    } // setPaymentInfo

    public void setAddress (Address address) {
        this.address = address;
    } // setAddress

    public User getUser() {
        return user;
    } // getUser

    public PaymentInfo getPaymentInfo() {
        return paymentInfo;
    } // getPaymentInfo

    public Address getAddress() {
        return address;
    } // getAddress

} // CreateUserRequest
