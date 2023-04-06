package com.cs4050.cinema.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.sql.Date;

import lombok.Data;

@Entity
@Data
@Table(name="promotion")
public class Promotion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "promotionId", nullable = false)
    private Long promotionId;

    @Column(name="promoCode", nullable = false)
    private String promoCode;

    @Column(name="promoExp", nullable = false)
    private Date promoExp;

    @OneToOne
    @JoinColumn(name="movieApplied")
    private Movie movieApplied;

    @Column(name="discountRate", nullable = false)
    private int discountRate;
} // Promotion
