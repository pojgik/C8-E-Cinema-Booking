package com.cs4050.cinema.Service;

import java.util.NoSuchElementException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.cs4050.cinema.Model.*;
import com.cs4050.cinema.Repository.*;

import java.security.Timestamp;
import java.util.List;

@Service
public class ShowService {
    ShowRepository showRepository;
    RoomRepository roomRepository;
    MovieRepository movieRepository;

    public ShowService(ShowRepository showRepository, RoomRepository roomRepository, MovieRepository movieRepository) {
        this.showRepository = showRepository;
        this.roomRepository = roomRepository;
        this.movieRepository = movieRepository;
    }
    /*
     * Adds a showTime to the cooresponding movie and room 
     * and checks if timeslot is taken for the room.
     * Adds the new showTime to movie and room show Lists
     * 
     * @Param show the show to be added
     * 
     * @Return show returns the new show on success
     */
    public Show createShow(Show show) {
        Timestamp timestamp = show.getShowTime();
        timestamp.setHours(timestamp.getHours() + 4);
        show.setShowTime(timestamp);
        Movie movie = movieRepository.findById(show.getMovieId())
        .orElseThrow(() -> new NoSuchElementException("Movie with ID " + show.getMovieId() + " not found"));
        Room room = roomRepository.findById(show.getRoomId())
        .orElseThrow(() -> new NoSuchElementException("Room with ID " + show.getRoomId() + " not found"));
        List<Show> shows = room.getShows();
        for (int i = 0; i < shows.size(); i++){
            if (shows.get(i).getShowTime().toString().equals(show.getShowTime().toString())) {
                throw new DataIntegrityViolationException("Timeslot already full");
            }
        } // for
        movie.getShows().add(show);
        room.getShows().add(show);
        roomRepository.save(room);
        return showRepository.save(show);
    } // createShow

    // public void test(Show show, List<Show> shows, int i) {
    //     System.out.println("\n1: "+show.getShowTime() + "\n2: " + shows.get(i).getShowTime() +
    //             "\nShows size: " + shows.size());
    //     System.out.println("Are the two strings the same? " + shows.get(i).getShowTime().equals(show.getShowTime()));
    // }

    /*
     * Probably not needed.
     */
    public Show getShowById(Long showId) {
        return showRepository.findById(showId)
            .orElseThrow(() -> new NoSuchElementException("Show not found with id: " + showId));
    } // getShowById

} // ShowService