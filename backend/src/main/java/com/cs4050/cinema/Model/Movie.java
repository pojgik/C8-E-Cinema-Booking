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

@Entity
@Data
@Table(name="movie")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movieId", nullable = false)
    private Long movieId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "cast", nullable = false)
    private String cast;

    @Column(name = "director", nullable = false)
    private String director; 

    @Column(name = "producer", nullable = false)
    private String producer; 

    @Column(name = "trailerURL", nullable = false)
    private String trailerURL; 
    
    @Column(name = "synopsis", nullable = false)
    private String synopsis; 
    
    @Column(name = "reviews", nullable = false)
    private String reviews;
    //This can just be one big string including all reviews or an array

    @Column(name = "rating", nullable = false)
    private String rating;

    //Movie's Shows
    @OneToMany(mappedBy = "movieId", cascade = CascadeType.ALL)
    private List<Show> shows = new ArrayList<>();

 } // Movie