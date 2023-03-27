package com.cs4050.cinema;

import java.util.List;

import javax.security.sasl.AuthenticationException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    private final EmailService emailService;

    public UserController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    } // UserController

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody CreateUserRequest request) {
        User user = request.getUser();
        PaymentInfo paymentInfo = request.getPaymentInfo();
        Address address = request.getAddress();

        user.setVerificationCode(UserService.generateVerificationCode(8));
        User newUser = userService.createUser(user);

        if (paymentInfo != null) {
            userService.addPaymentCard(newUser, paymentInfo);
        } // if

        if (address != null) {
            userService.addBillingAddress(newUser, address);
        } // if

        emailService.sendEmail(newUser.getEmail(), "Verify Email Address", "Here is your" +
        " verification code: " + newUser.getVerificationCode());
        return ResponseEntity.ok(newUser);
    } // createUser

    // Currently the user is being found in the frontend, which should not be the case
    @PutMapping("/verify-email/{id}")
    public ResponseEntity<User> verifyEmail(@PathVariable Long id, @RequestBody User user) throws Exception {
        if (user == null) {
            throw new Exception("User not found");
        } else {
            return ResponseEntity.ok(userService.verifyUser(user));
        } // if
    } // ResponseEntity

    @GetMapping("/getUser/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    } // getUserById

    @PutMapping("/changePassword/{id}")
    public ResponseEntity<User> changePassword(@PathVariable Long id, @RequestBody User newUser) {
        User oldUser = userService.getUserById(id);
        return ResponseEntity.ok(userService.changePassword(oldUser, newUser));
    } // changePassword

    @PutMapping("/editProfile/{id}") 
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User newUser) throws Exception{
        User oldUser = userService.getUserById(id);
        if (oldUser == null) {
            throw new Exception("User with id " + id + " not found");
        } else if (newUser == null) {
            throw new Exception("User not found: Invalid Request Body");
        } else {
            emailService.sendEmail(oldUser.getEmail(), "Updated Profile", "Dear user, your profile has been updated.");
            return ResponseEntity.ok(userService.updateUser(oldUser, newUser));
        }
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
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest) throws Exception {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        User user = userService.getUserByEmail(email);
        if (user == null) {
            throw new AuthenticationException("User with email " + email + " not found");
        } // if

        if (userService.authenticate(email, password)) {
            return ResponseEntity.ok(user);
        } else {
            throw new AuthenticationException("Incorrect password.");
        } // if
    } // login
} // UserController
