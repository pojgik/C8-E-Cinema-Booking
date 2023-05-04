package com.cs4050.cinema.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GenerationType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
@Table(name = "showSeat")
public class ShowSeat {
 
    public ShowSeat() {}
    //Needed for JSON for some reason
    
    public ShowSeat(Show show, String seatNum) {
        this.show = show;
        this.seatNum = seatNum;
    } //Constructor

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "showSeatId")
    private Long showSeatId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "showId")
    private Show show;

    @Column(name = "seatNum")
    private String seatNum;

    @Column(name = "status")
    private boolean status;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "orderId")
    private Order order;
    
}
