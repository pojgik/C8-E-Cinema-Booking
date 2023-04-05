package com.cs4050.cinema.Service;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.cs4050.cinema.Model.*;
import com.cs4050.cinema.Repository.*;

import java.util.List;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    } // movieService

    /*
     * Adds Movie movie to the database.
     * 
     * @return movie returns Movie on success
     */
    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    } // createMovie

     /*
     * Returns a Movie in the database whose movieId matches the specified id.
     * 
     * @Throws NoSuchElementException when a movie with the specified id cannot be found
     * 
     * @Param movieId The movie id to look for
     * 
     * @Return movie The movie found from the database
     */
    public Movie getMovieById(Long movieId) {
        return movieRepository.findById(movieId)
            .orElseThrow(() -> new NoSuchElementException("Movie not found with id: " + movieId));
    } // getMovieById

    /*
     * Returns a List of Movies whose category matches the specified category.
     * 
     * @Throws NoSuchElementException when no movies with the specified category are found
     * 
     * @Param category The movie category to look for
     * 
     * @Return movies List of movies found from the database
     */
    public List<Movie> getMoviesByCategory(String category) {
        List<Movie> movies= movieRepository.findByCategory(category);
        if (movies == null)
            throw new NoSuchElementException("No movies found in category: " + category);
            return movies;
    } // getMovieByCategory

    /*
     * Returns a List of movie whose titles match the specified title
     * 
     * @Throws NoSuchElementException when a movie with the specified title cannot be found
     * 
     * @Param title The title to look for
     * 
     * @Return movies List of Movies found from the database
     */
    public List<Movie> getMoviesByTitle(String title) throws NoSuchElementException {
        List<Movie> movies = movieRepository.findByTitle(title);
        if (movies == null) {
            throw new NoSuchElementException("No movies found with title: " + title);
        } // if
        return movies;
    } // getMovieByTitle

     /*
     * Returns a list of all movies saved in the database.
     * 
     * @Return List<Movie> List of every movie
     */
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    } // getAllMovies

    /*
     * Deletes a movie from the database.
     * Does not need to be implemented for deliverable 3
     * 
     */
    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    } // deleteMovie

} // movieService
