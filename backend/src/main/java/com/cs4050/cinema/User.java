package com.cs4050.cinema;

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
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId", nullable = false)
    private int userId;

    @Column(name="userType", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int userType;

    @Column(name="customerStatus", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int customerStatus;

    @Column(name = "firstName", nullable = false)
    private String firstName;

    @Column(name = "lastName", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "userType", referencedColumnName = "typeId", insertable = false, updatable = false)
    private UserType userTypeEntity;

    @ManyToOne
    @JoinColumn(name = "customerStatus", referencedColumnName = "statusCode", insertable = false, updatable = false)
    private CustomerStatus customerStatusEntity;
} // user
