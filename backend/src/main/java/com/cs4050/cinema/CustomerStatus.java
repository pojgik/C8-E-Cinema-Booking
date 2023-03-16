package com.cs4050.cinema;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="customerstatus")
public class CustomerStatus {
    @Id
    @Column(name="statusCode")
    private int statusCode;

    @Column(name="status", nullable = false)
    private int status;
} // CustomerStatus
