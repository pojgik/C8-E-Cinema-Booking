package com.cs4050.cinema.Service;

import java.util.NoSuchElementException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;

import com.cs4050.cinema.Model.*;
import com.cs4050.cinema.Repository.*;

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
        //This is for if it changes input time for time zones
        show.setShowTime(timestamp);
        show.setMovie(movie);
        show.setRoom(room);
        // Potential bug if shows is not populated when app starts
        List<Show> shows = room.getShows();
       long timeDif = 0;
       int duration;
       for (Show s : shows) {
        duration = movie.getDuration();
        Date date1 = new Date(s.getShowTime().getTime());
        Date date2 = new Date(timestamp.getTime()); 
        if (date1.equals(date2)) { 
          //  if (s.getShowTime().toString().substring(0, 10).equals(timestamp.toString().substring(0, 10))) { this works too
            timeDif = show.getShowTime().getTime() - s.getShowTime().getTime();
                if (show.getMovie().getDuration() < s.getMovie().getDuration())
                duration = s.getMovie().getDuration();
            if (Math.abs(timeDif) < (duration * 60 * 1000)){
                //checks if the two times fall within the movie duration time window.
                throw new DataIntegrityViolationException("Timeslot is full");
            } // if
        } // if
        } // for
        room.getShows().add(show);
        return showRepository.save(show);
    } // createShow


    public void test(Show show, List<Show> shows, int i) {
        for (Show s : shows) {
            System.out.println(s);
        }
        System.out.println("Done testing\n\n");
    }

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