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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    private final EmailService emailService;

    public UserController(UserService userService, EmailService emailService, LoginRequest loginRequest) {
        this.userService = userService;
        this.emailService = emailService;
    } // UserController

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user, @RequestBody(required = false) PaymentInfo paymentInfo, @RequestBody Address address) {
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
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestParam(required    = false) String firstName, @RequestParam(required = false) String lastName) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(userService.updateUser(id, user, firstName, lastName));
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
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest) throws AuthenticationException, javax.naming.AuthenticationException {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        User user = userService.getUserByEmail(email);
        if (user == null) {
            throw new AuthenticationException("User with email " + email + " not found");
        } // if

        if (userService.authenticate(email, password)) {
            return ResponseEntity.ok(user);
        } else {
            throw new AuthenticationException("Authentication failure: Invalid email or password.");
        } // if
    } // login
} // UserController
