package com.cs4050.cinema.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs4050.cinema.Entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
    User findByEmail(String email);

} // UserRepository
