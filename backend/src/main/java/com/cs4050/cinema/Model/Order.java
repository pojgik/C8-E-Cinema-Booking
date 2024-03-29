package com.cs4050.cinema.Model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="orders")
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderId", nullable = false)
    private Long orderId;

    @Column(name = "numTickets", nullable = false)
    private int numTickets;

    @Column(name = "childTickets", nullable = false)
    private int childTickets;

    @Column(name = "adultTickets", nullable = false)
    private int adultTickets;

    @Column(name = "seniorTickets", nullable = false)
    private int seniorTickets;

    @Column(name = "promoApplied", nullable = false)
    private boolean promoApplied = false;

    @Column(name = "promoAmount")
    private int promoAmount;

    @Column(name = "orderTotal")
    private double orderTotal;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "movieId")
    private Movie movie;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "showSeatId")
    private List<ShowSeat> showSeats;
} // Order
