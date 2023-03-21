package com.cs4050.cinema;

import java.util.List;

import javax.security.sasl.AuthenticationException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    private final EmailService emailService;

    public UserController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    } // UserController

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        user.setVerificationCode(UserService.generateVerificationCode(8));
        User newUser = userService.createUser(user);
        emailService.sendEmail(newUser.getEmail(), "Verify Email Address", "Here is your" +
        " verification code: " + newUser.getVerificationCode());
        return ResponseEntity.ok(newUser);
    } // createUser

    @PostMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam String email, @RequestParam String code) {
        User user = userService.getUserByEmail(email);
        System.out.println("email is: " + email);
        if (user == null) {
            System.out.println("User not found for email: " + email);
            return ResponseEntity.badRequest().body("User not found");
        } else if (!user.getVerificationCode().equals(code)) {
            System.out.println("Invalid verification code for email: " + email);
            return ResponseEntity.badRequest().body("Invalid verification code");
        } else {
            userService.verifyUser(user);
            return ResponseEntity.ok("Email verified successfully");
        } // if
    } // ResponseEntity

    @GetMapping("/getUser/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    } // getUserById

    @PutMapping("/editProfile/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        return ResponseEntity.ok(updatedUser);
    } // updateUser

    @GetMapping("/delete/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    } // deleteUser
    
    @GetMapping("/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    } // getAllUsers

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest) throws AuthenticationException {
        if (userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword())) {
            // Handle login request
        } else {
            throw new AuthenticationException("Authentication Failed");
        } // if
        return ResponseEntity.ok().build(); // Replace with user object who just logged in
    } // login
} // UserController
