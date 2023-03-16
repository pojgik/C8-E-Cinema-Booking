package com.cs4050.cinema;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="customerstatus")
public class UserType {
    @Id
    @Column(name="typeId")
    private int typeId;

    @Column(name="userType", nullable = false)
    private String userType;
}
