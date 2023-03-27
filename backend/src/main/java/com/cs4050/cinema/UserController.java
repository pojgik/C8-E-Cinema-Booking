package com.cs4050.cinema;

import java.util.List;
import java.util.NoSuchElementException;

import javax.security.sasl.AuthenticationException;

import org.springframework.http.HttpStatus;
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
    public HttpStatus createUser(@RequestBody User user) {
        // User user = request.getUser();
        // PaymentInfo paymentInfo = request.getPaymentInfo();
        // Address address = request.getAddress();

        user.setVerificationCode(UserService.generateVerificationCode(8));
        User newUser = userService.createUser(user);

        // if (paymentInfo != null) {
        //     userService.addPaymentCard(newUser, paymentInfo);
        // } // if

        // if (address != null) {
        //     userService.addBillingAddress(newUser, address);
        // } // if

        emailService.sendEmail(newUser.getEmail(), "Verify Email Address", "Here is your" +
        " verification code: " + newUser.getVerificationCode());
        return HttpStatus.CREATED;
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
    public HttpStatus changePassword(@PathVariable Long id, @RequestBody User newUser) {
        User oldUser = userService.getUserById(id);
        userService.changePassword(oldUser, newUser);
        return HttpStatus.OK;
    } // changePassword

    @PutMapping("/editProfile/{id}") 
    public HttpStatus updateUser(@PathVariable Long id, @RequestBody UserRequest request) {
        User oldUser = userService.getUserById(id);
        User newUser = request.getUser();
        PaymentInfo paymentInfo = request.getPaymentInfo();
        Address billingAddress = request.getAddress();

        if (oldUser == null) {
            return HttpStatus.NOT_FOUND;
        } else if (newUser == null) {
            return HttpStatus.BAD_REQUEST;
        } else {
            userService.updateUser(oldUser, newUser, paymentInfo, billingAddress);
            emailService.sendEmail(oldUser.getEmail(), "Updated Profile", "Dear user, your profile has been updated.");
            return HttpStatus.OK;
        } // if
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
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        User user;
        try {
            user = userService.getUserByEmail(email);
        } catch (NoSuchElementException NEE) {
            return ResponseEntity.badRequest().build();
        } // try
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
