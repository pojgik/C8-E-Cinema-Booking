package com.cs4050.cinema.Model;

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
@Table(name = "ticket")
public class Ticket {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticketId", nullable = false)
    private Long ticketId;

    @Enumerated(EnumType.STRING)
    @Column(name = "ticketType", nullable = false)
    private TicketType ticketType;

    @Column(name = "seatNumber", nullable = false)
    private String seatNumber;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
    
} // Ticket
