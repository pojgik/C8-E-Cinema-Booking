package com.cs4050.cinema.Service;

import java.util.NoSuchElementException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;

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
    public Show createShow(Show show, Movie movie, Room room) {
        Timestamp timestamp = show.getShowTime();
        // timestamp.setHours(timestamp.getHours() + 4);
        show.setShowTime(timestamp);
        show.setMovie(movie);
        show.setRoom(room);
        // Potential bug if shows is not populated when app starts
        List<Show> shows = room.getShows();
        for (Show s : shows) {
            if (s.getShowTime().equals(timestamp)) {
                throw new DataIntegrityViolationException("Timeslot is full");
            } // if
        } // for
        room.getShows().add(show);
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

    public Room getRoomById(Long roomId) {
        return roomRepository.findById(roomId)
            .orElseThrow(() -> new NoSuchElementException("Room not found with id: " + roomId));
    } // getRoomById

} // ShowService