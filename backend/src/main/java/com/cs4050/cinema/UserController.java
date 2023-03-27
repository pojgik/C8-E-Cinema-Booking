package com.cs4050.cinema;

import java.util.List;

import javax.security.sasl.AuthenticationException;

import org.apache.catalina.connector.Response;
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

    public UserController(UserService userService, EmailService emailService, LoginRequest loginRequest) {
        this.userService = userService;
        this.emailService = emailService;
    } // UserController

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user, @RequestBody(required = false) PaymentInfo paymentInfo, @RequestBody(required=false) Address address) {
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

    @PutMapping("/verify-email/{id}")
    public ResponseEntity<User> verifyEmail(@PathVariable Long id, @RequestBody User user) throws Exception {
        if (user == null) {
            throw new Exception("User not found");
        } else {
            User verifiedUser = userService.verifyUser(user);
            return ResponseEntity.ok(verifiedUser);
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
        System.out.println("1");
        User oldUser = userService.getUserById(id);
        if (oldUser == null) {
            System.out.println("1");
            throw new Exception("User with id " + id + " not found");
        } else if (newUser == null) {
            System.out.println("1");
            throw new Exception("User not found: Invalid Request Body");
        } else {
            System.out.println("HELLO");
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

    // @PutMapping("/addPaymentInfo/{id}")
    // public ResponseEntity<String> addPaymentInfo(@PathVariable Long id, @RequestBody PaymentInfo paymentCard) {
    //     User user = userService.getUserById(id);
    //     userService.addPaymentCard(user, paymentCard);
    //     return ResponseEntity.ok("Successfully added paymentCard");
    // } // paymentInfo

    // @PutMapping("/addBillingAddress/{id}") 
    // public ResponseEntity<Address> addAddress(@PathVariable Long id, @RequestBody Address billingAddress) {
    //     User user = userService.getUserById(id);
    //     return ResponseEntity.ok(userService.addBillingAddress(user, billingAddress));
    // } // billingAddress
} // UserController
