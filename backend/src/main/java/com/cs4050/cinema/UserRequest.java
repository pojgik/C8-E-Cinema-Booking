package com.cs4050.cinema;

import org.springframework.stereotype.Component;

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
