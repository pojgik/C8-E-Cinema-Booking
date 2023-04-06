package com.cs4050.cinema.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs4050.cinema.Model.Show;

public interface ShowRepository extends JpaRepository<Show, Long>{

    <S extends Show> S save(Show show);
   
} // ShowRepository
