package com.cs4050.cinema.Model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "showroom")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roomId")
    private Long roomId;

    @Column(name = "numSeats")
    private int numSeats;

    @Column(name = "numRows")
    private int numRows;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "room")
    private List<Show> shows = new ArrayList<>();
}
