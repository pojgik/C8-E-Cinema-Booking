package com.cs4050.cinema.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs4050.cinema.Model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long>{
    Movie findByTitle(String title);
} // MovieRepository
