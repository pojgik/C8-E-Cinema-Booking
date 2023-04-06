package com.cs4050.cinema.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import com.cs4050.cinema.Model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long>{
    List<Movie> findByTitle(String title);
    //returns a List of all movies with that category
    List<Movie> findByCategory(String category);
} // MovieRepository
