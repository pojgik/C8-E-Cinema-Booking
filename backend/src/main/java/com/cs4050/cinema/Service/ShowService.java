package com.cs4050.cinema.Service;

import java.util.NoSuchElementException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;

import com.cs4050.cinema.Model.*;
import com.cs4050.cinema.Repository.*;

import java.util.ArrayList;
import java.util.Calendar;
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
    } // showService

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
        Timestamp timestamp = show.getShowTime(); // Set timestamp
        // Adjust timezone
        Calendar cal = Calendar.getInstance();
        cal.setTime(timestamp);
        cal.add(Calendar.HOUR, 5);
        timestamp = new Timestamp(cal.getTimeInMillis());

        show.setShowTime(timestamp);
        show.setMovie(movie);
        show.setRoom(room);

        List<Show> shows = showRepository.findAll();
        for (Show s : shows) {
            Date showDate = new Date(s.getShowTime().getTime());
            Date newDate = new Date(timestamp.getTime());
            
            if (room.equals(s.getRoom()) && showDate.toString().equals(newDate.toString())) {
               // System.out.printf("GetRoom is same %b:\n", room.equals(s.getRoom()) );
                Calendar start = Calendar.getInstance();
                Calendar end = Calendar.getInstance();
                start.setTime(s.getShowTime());
                end.setTime(s.getShowTime());
                end.add(Calendar.MINUTE, movie.getDuration());
                //System.out.printf("CAL START: %d\ns Show start: %d\n\n",cal.getTimeInMillis(), start.getTimeInMillis());
                if (cal.getTimeInMillis() >= start.getTimeInMillis() && cal.getTimeInMillis() <= end.getTimeInMillis()) {
                    throw new DataIntegrityViolationException("Timeslot already full");
                } // if
                if ((cal.getTimeInMillis() + (movie.getDuration() * 60000))>= start.getTimeInMillis() && (cal.getTimeInMillis() + (movie.getDuration() * 60000)) <= end.getTimeInMillis()) {
                    throw new DataIntegrityViolationException("Timeslot already full");
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

    public List<Show> getShowingsForMovie(Long movieId) {
        List<Show> shows = showRepository.findAll();
        List<Show> showsByMovie = new ArrayList<Show>();
        for (Show show : shows) {
            if (show.getMovie().getMovieId() == movieId) {
                showsByMovie.add(show);
            } // if
        } // for
        return showsByMovie;
    } // getShowingsForMovie

} // ShowService