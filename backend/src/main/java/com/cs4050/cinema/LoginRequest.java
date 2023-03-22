package com.cs4050.cinema;

import org.springframework.stereotype.Component;

@Component
public class LoginRequest {
    private String email;
    private String password;

    public String getEmail() {
        return email;
    } // getEmail

    public void setEmail(String email) {
        this.email = email;
    } // setEmail

    public String getPassword() {
        return password;
    } // setPassword

    public void setPassword(String password) {
        this.password = password;
    } // setPassword
} // LoginRequest