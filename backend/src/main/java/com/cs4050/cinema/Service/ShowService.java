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
    ShowSeatRepository showSeatRepository;
    public ShowService(ShowRepository showRepository, RoomRepository roomRepository, MovieRepository movieRepository, ShowSeatRepository showSeatRepository) {
        this.showRepository = showRepository;
        this.roomRepository = roomRepository;
        this.movieRepository = movieRepository;
        this.showSeatRepository = showSeatRepository;
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
        showRepository.save(show);
        //This gives show a showId to be used in createShowSeats
        //Causes errors without
       show.setShowSeats(createShowSeats(show, room));
        room.getShows().add(show);
        return showRepository.save(show);
    } // createShow

    /*
     * Returns a List of newly created ShowSeats for the specified show  
     * The row is denoted by letters A, B, ... and seat number 1, 2, ...
     * 
     * @Param show The Show which the seats are added to
     * @Param room The Room which the seats are modeled after
     *  
     * @Return showSeats A list of showSeats which is saved to the DB
     */
    public List<ShowSeat> createShowSeats(Show show, Room room) {
        String str;
      
        List<ShowSeat> showSeats= new ArrayList<ShowSeat>();
        for (char i = 'A'; i < 'A' + room.getNumRows(); i++) {
            //Increments seat letter each row
            for (int j = 1; j <= room.getNumSeats()/room.getNumRows(); j++) {
                str = "" + i + j; 
                ShowSeat temp = new ShowSeat(show, str);
                showSeats.add(temp);
                showSeatRepository.save(temp);
            }
        }
         //System.out.println("Success");
        return showSeats;
        } // createShowSeats
        
     /*
     * Returns a List of Movies whose show date matches the specified date.   
     * 
     * @throws NoSuchElementException when no movies were found
     * 
     * @Param date The date of shows to look for formatted as sql.Date.toString()
     * 
     * @Return movies List of movies with shows database
     */
    public List<Movie> getMoviesByDate(String date){
        //date will never be null because the submitted result will contain whatever 
        //base format the toString has
        List<Show> shows = showRepository.findAll();
        List<Movie> movies = new ArrayList<Movie>(); 
        for (Show s : shows) {
            Date showDate = new Date(s.getShowTime().getTime());
            if (showDate.toString().equals(date))
                movies.add(s.getMovie());   
        }
        if (movies.size() == 0)
            throw new NoSuchElementException("No showings on the date: " + date);
        return movies;
    } // getMovieByShow

    /* Returns a List of ShowSeats from a show of a specified id.   
     * 
     * @throws NoSuchElementException when no shows were found
     * 
     * returns showSeats A list of showSeats for the show
     */
    public List<ShowSeat> getShowSeats(Long showId) {
        Show show = showRepository.findById(showId)
        .orElseThrow(() -> new NoSuchElementException("Show not found with id: " + showId));
        return show.getShowSeats();
    }


    public ShowSeat bookShowSeats(Long showSeatId, Long firstSeat) {
         ShowSeat showSeat = showSeatRepository.findById(showSeatId)
            .orElseThrow(() -> new NoSuchElementException("ShowSeat not found with id: " + showSeatId));
         Show show = showSeat.getShow();
            List<ShowSeat> oldShowSeats = show.getShowSeats();
        
        if (showSeat.isStatus()) {
           throw new IllegalArgumentException("The following seat is already booked: " + showSeat.getSeatNum());
       }
       showSeat.setStatus(true);
       showSeatRepository.save(showSeat);
       oldShowSeats.set((int)(showSeat.getShowSeatId() - firstSeat), showSeat);
       show.setShowSeats(oldShowSeats);
        // System.out.println("GETS HERE\n\n\n\n\n");
         
        return showSeatRepository.save(showSeat);
    }
    
    // public void updateShowSeat(Long showSeatId) {
    //     ShowSeat showSeat = showSeatRepository.findById(showSeatId)
    //     .orElseThrow(null);
    //     showSeat.setStatus(true);
    //     showSeatRepository.save(showSeat);
    //     System.out.println("Worked");
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