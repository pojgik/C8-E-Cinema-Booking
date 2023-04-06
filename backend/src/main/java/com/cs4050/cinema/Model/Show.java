package com.cs4050.cinema.Model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
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

    @OneToOne
    @JoinColumn(name="movieId")
    private Movie movie;

    @ManyToOne
    @JoinColumn(name="roomId")
    private Room room;

    @Column(name = "showTime")
    private Timestamp showTime;

} // Show