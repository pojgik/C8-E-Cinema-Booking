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

    // /*
    //  * Adds show to movie and creates the show
    //  * 
    //  * @Param movie the movie for which the show is added
    //  * @Param show the show to be added
    //  * 
    //  * @Return show returns the new show on success
    //  */
    // public Show addShow(Movie movie, Show show) {
    //     movie.getShows().add(show);
    //     show.setMovie(movie);
    //     return ShowRepository.save(show);
    // } // addShow

      /*
     * Returns a Movie in the database whose movieId matches the specified id.
     * 
     * @Throws NoSuchElementException when a movie with the specified id cannot be found
     * 
     * @Param movieId The movie id to look for
     * 
     * @Return Movie the movie found from the database
     */
    public Movie getMovieById(Long movieId) {
        return movieRepository.findById(movieId)
            .orElseThrow(() -> new NoSuchElementException("Movie not found with id: " + movieId));
    } // getMovieById

    /*
     * Returns a movie whose title matches the specified title
     * 
     * @Throws NoSuchElementException when a movie with the specified title cannot be found
     * 
     * @Param title The title to look for
     * 
     * @Return Movie the movie found from the database
     */
    public Movie getMovieByTitle(String title) throws NoSuchElementException {
        Movie movie = movieRepository.findByTitle(title);
        if (movie == null) {
            throw new NoSuchElementException("Movie with title " + title + " not found");
        } // if
        return movie;
    } // getMovieByTitle

     /*
     * Returns a list of all users saved in the database.
     * 
     * @Return List<User> List of every user
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
