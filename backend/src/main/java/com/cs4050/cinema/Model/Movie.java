package com.cs4050.cinema.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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

    @Column(name = "category", nullable = true)
    private String category;

    @Column(name = "cast", nullable = true)
    private String cast;

    @Column(name = "director", nullable = true)
    private String director; 

    @Column(name = "producer", nullable = true)
    private String producer; 

    @Column(name = "trailerURL", nullable = true)
    private String trailerURL;
    
    @Column(name = "coverURL", nullable = true)
    private String coverURL;
    
    @Column(name = "synopsis", nullable = true)
    private String synopsis; 
    
    // @Column(name = "reviews", nullable = true)
    // private String reviews;
    //This can just be one big string including all reviews or an array

    @Column(name = "rating", nullable = true)
    private String rating;

 } // Movie