package com.cs4050.cinema;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{
    User findByEmail(String email);

    User findByEmailIgnoreCase(String email);
} // UserRepository
