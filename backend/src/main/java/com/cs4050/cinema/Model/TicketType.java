package com.cs4050.cinema.Model;

public enum TicketType {
    CHILD(5.00),
    SENIOR(8.00),
    ADULT(10.00);

    public final double price;

    private TicketType(double price) {
        this.price = price;
    } // TicketType

    
} // TicketType
