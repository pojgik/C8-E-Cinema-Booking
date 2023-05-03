package com.cs4050.cinema.Controller;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.cs4050.cinema.Model.*;
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
     //   showService.createShowSeats();
        return ResponseEntity.ok("Hello");
    } // getTest

    @PostMapping("/addMovie")
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        if (movie == null) {
            return ResponseEntity.badRequest().build();
        } // if
        movieService.createMovie(movie);
        return ResponseEntity.ok(movie);
    } // createMovie

    @PostMapping("/addShow")
    public HttpStatus createShow(@RequestBody Show show, @RequestParam String movieTitle, @RequestParam Long roomId) {
        Movie movie = movieService.getMovieByTitle(movieTitle);
        Room room = showService.getRoomById(roomId);
        if (show == null || show.getShowTime() == null || roomId == null || roomId < 1 || roomId > 6) {
            return HttpStatus.BAD_REQUEST;
        } else if (movieTitle == null) {
            return HttpStatus.NOT_FOUND;
        } // if
        try {
            showService.createShow(show, movie, room);
        } catch (DataIntegrityViolationException DVE) {
            return HttpStatus.CONFLICT;
        } // try
        return HttpStatus.CREATED;
    } // createShow

    @GetMapping("/getShowSeats/{id}")
    public ResponseEntity<List<ShowSeat>> getShowSeats(@PathVariable Long id){
        List<ShowSeat> showSeats = showService.getShowSeats(id);
        return ResponseEntity.ok(showSeats);
    }

    @GetMapping("/deleteMovie/{id}")
    public HttpStatus deleteMovie(@PathVariable Long id){
        if (movieService.getMovieById(id) != null) {
            movieService.deleteMovie(id);
            return HttpStatus.OK;
        } else {
            return HttpStatus.BAD_REQUEST;
        } // if
    } // deleteMovie
    
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

    @GetMapping("/searchCategory/{category}")
    public ResponseEntity<List<Movie>> searchByCategory(@PathVariable String category) {
        List<Movie> movies = movieService.getMoviesByCategory(category);
        return ResponseEntity.ok(movies);
    } // searchCategory

    @GetMapping("/searchTitle/{title}")
    public ResponseEntity<List<Movie>> searchByTitle(@PathVariable String title) {
        System.out.println(title);
        List<Movie> movies = movieService.getMovieByTitle(title);
        return ResponseEntity.ok(movies);
    } // searchTitle

    @GetMapping("/searchDate/{date}")
    public ResponseEntity<List<Movie>> searchByShow(@PathVariable String date) {
        List<Movie> movies = showService.getMoviesByDate(date);
        //It iterates through all shows and returns matching shows' movies
        return ResponseEntity.ok(movies);
    } // searchDate

    @GetMapping("/getShowsForMovie/{title}")
    public ResponseEntity<List<Show>> findShows(@PathVariable String title) {
        if (movieService.getMovieByTitle(title) == null) {
            return ResponseEntity.badRequest().build();
        } // if
        Long movieId = movieService.getMovieByTitle(title).getMovieId();
        List<Show> shows = showService.getShowingsForMovie(movieId);
        return ResponseEntity.ok(shows);
    } // findShows

} // MovieController
