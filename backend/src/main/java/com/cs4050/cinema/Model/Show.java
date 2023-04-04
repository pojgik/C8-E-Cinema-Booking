package com.cs4050.cinema.Model;

import java.sql.Timestamp;
//This extends sql.Date and should be the one including time
//I'm just going to test with Date for now though

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "showing")
public class Show {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "showId")
    private Long showId;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "movieId")
    // private Movie movie;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "roomId")
    // private Room room;

    @Column(name = "movieId")
    private Long movieId;

    @Column(name = "roomId")
    private Long roomId;

    @Column(name = "showTime")
    private Timestamp showTime;

} // Show