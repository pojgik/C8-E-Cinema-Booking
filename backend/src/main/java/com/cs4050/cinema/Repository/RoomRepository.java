package com.cs4050.cinema.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs4050.cinema.Model.Room;

public interface RoomRepository extends JpaRepository<Room, Long>{
   
} // RoomRepository
