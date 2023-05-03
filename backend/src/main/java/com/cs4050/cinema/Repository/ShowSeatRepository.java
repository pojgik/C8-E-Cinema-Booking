package com.cs4050.cinema.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs4050.cinema.Model.ShowSeat;

public interface ShowSeatRepository extends JpaRepository<ShowSeat, Long>{

    <S extends ShowSeat> S save(ShowSeat showSeat);
   
} // ShowRepository
