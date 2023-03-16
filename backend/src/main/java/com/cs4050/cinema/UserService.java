package com.cs4050.cinema;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    } // getAllUsers

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    } // getUserById

    public User createUser(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("User with that email already exists.");
        } // if

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    } // getUserById

    public User updateUser(Long id, User user) {
        // Implement updateUser logic here
        return userRepository.save(user);
    } // updateUser

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    } // deleteUser

    public boolean authenticate(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            return false;
        } // if

        return passwordEncoder.matches(password, user.getPassword());
    } // authenticate
} // UserService
