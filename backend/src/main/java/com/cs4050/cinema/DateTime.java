package com.cs4050.cinema;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="dateTime")
public class DateTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dateTimeId", nullable = false)
    private Long dateTimeId;

    @Column(name = "time", nullable = false)
    private int time;
    //Can separate into hour and minute, recommend using military time

    @Column(name = "date", nullable = false)
    private Date date;
    //Can and prob

    public void setDate(String dateString) throws ParseException{
        SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
        //This can be changed to whatever format you prefer
        java.util.Date utilDate = format.parse(dateString);
        this.date = new Date(utilDate.getTime()); 
        //Takes formatted dateString and converts to ms which is used to make date
    }
    @ManyToOne
    @JoinColumn(name = "MovieId")
    private Movie movie;
} // DateTime
