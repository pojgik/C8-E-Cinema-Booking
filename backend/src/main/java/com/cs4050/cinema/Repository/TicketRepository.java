package com.cs4050.cinema.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs4050.cinema.Model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    
} // IrderRepository
