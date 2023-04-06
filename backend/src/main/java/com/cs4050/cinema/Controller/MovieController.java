package com.cs4050.cinema.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.cs4050.cinema.Model.Movie;
import com.cs4050.cinema.Model.Show;
import com.cs4050.cinema.Service.MovieService;
import com.cs4050.cinema.Service.ShowService;

@RestController
@RequestMapping("/movies")
@CrossOrigin
public class MovieController {
    private final MovieService movieService;
    private final ShowService showService;

    public MovieController (MovieService movieService, ShowService showService) {
        this.movieService = movieService;
        this.showService = showService;
    } //constructor

    @GetMapping("/getTest")
    public ResponseEntity<String> getTest() {
        return ResponseEntity.ok("Hello");
    } // getTest

    @PostMapping("/addMovie")
    public HttpStatus createMovie(@RequestBody Movie movie) {
        if (movie == null) {
            return HttpStatus.NOT_FOUND;
        } // if
        movieService.createMovie(movie);
        return HttpStatus.CREATED;
    } // createMovie

    @PostMapping("/addShow")
    public HttpStatus createShow(@RequestBody Show show) {
        if (show == null) {
            return HttpStatus.NOT_FOUND;
        } // if
        showService.createShow(show);
        return HttpStatus.CREATED;
    } // createShow

    @GetMapping("/getShow/{id}")
    public ResponseEntity<Show> getShow(@PathVariable Long id) {
        Show show = showService.getShowById(id);
        return ResponseEntity.ok(show);
    } // getShow

    @GetMapping("/getAllMovies")
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movies = movieService.getAllMovies();
        return ResponseEntity.ok(movies);
    } // getAllMovies

    @GetMapping("/getMovie/{id}")
    public ResponseEntity<Movie> getMovie(@PathVariable Long id) {
        Movie movie = movieService.getMovieById(id);
        return ResponseEntity.ok(movie);
    } // getMovie

} // MovieController