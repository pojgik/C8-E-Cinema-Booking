package com.cs4050.cinema.Controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cs4050.cinema.Model.Address;
import com.cs4050.cinema.Model.CustomerStatus;
import com.cs4050.cinema.Model.PaymentInfo;
import com.cs4050.cinema.Model.User;
import com.cs4050.cinema.Request.LoginRequest;
import com.cs4050.cinema.Request.UserRequest;
import com.cs4050.cinema.Service.*;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final UserService userService;
    private final PaymentService paymentService;
    private final EmailService emailService;

    public UserController(UserService userService, EmailService emailService, PaymentService paymentService) {
        this.userService = userService;
        this.emailService = emailService;
        this.paymentService = paymentService;
    } // UserController

    @PostMapping("/register")
    public ResponseEntity<Long> createUser(@RequestBody UserRequest request) {
        User user = request.getUser();
        PaymentInfo paymentInfo = request.getPaymentInfo();
        Address address = request.getAddress();

        user.setVerificationCode(UserService.generateVerificationCode(8));
        User newUser = userService.createUser(user);

        if (paymentInfo != null) {
            paymentService.addPaymentCard(newUser, paymentInfo);
        } // if

        if (address != null) {
            userService.addBillingAddress(newUser, address);
        } // if

        emailService.sendEmail(newUser.getEmail(), "Verify Email Address", "Here is your" +
        " verification code: " + newUser.getVerificationCode());
        return ResponseEntity.ok(newUser.getUserId());
    } // createUser

    // Currently the user is being found in the frontend, which should not be the case
    @PutMapping("/verify-email/{id}")
    public HttpStatus verifyEmail(@PathVariable Long id, @RequestBody String code) {
        System.out.println(code);
        User user = userService.getUserById(id);
        if (user == null) {
            return HttpStatus.NOT_FOUND;
        } else {
            if (userService.verifyUser(user, code)) {
                return HttpStatus.OK;
            } else {
                return HttpStatus.BAD_REQUEST;
            } // if
        } // if
    } // ResponseEntity

    @GetMapping("/getUser/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    } // getUserById

    @GetMapping("/getTest")
    public ResponseEntity<String> getTest() {
        return ResponseEntity.ok("Hello");
    } // getUserById


    @PutMapping("/changePassword/{id}")
    public HttpStatus changePassword(@PathVariable Long id, @RequestParam String newPassword, @RequestParam(required = false) String currentPassword) {
        User user = userService.getUserById(id);
        boolean update = userService.changePassword(user, currentPassword, newPassword);
        if (!update) {
            return HttpStatus.UNAUTHORIZED;
        } else {
            return HttpStatus.OK;
        } // if
    } // changePassword

    @PutMapping("/editProfile/{id}") 
    public HttpStatus updateUser(@PathVariable Long id, @RequestBody UserRequest request) {
        User currentUser = userService.getUserById(id);
        User updatedUser = request.getUser();
        PaymentInfo paymentInfo = request.getPaymentInfo();
        Address billingAddress = request.getAddress();

        if (currentUser == null) {
            return HttpStatus.NOT_FOUND;
        } else if (updatedUser == null) {
            System.out.println("Here is the request: " + request);
            return HttpStatus.BAD_REQUEST;
        } else {
            userService.updateUser(currentUser, updatedUser, paymentInfo, billingAddress);
            emailService.sendEmail(currentUser.getEmail(), "Updated Profile", "Dear user, your profile has been updated.");
            return HttpStatus.OK;
        } // if
    } // updateUser

    @GetMapping("/delete/{id}")
    public HttpStatus deleteUser(@PathVariable Long id) {
        if (userService.getUserById(id) != null) {
            userService.deleteUser(id);
            return HttpStatus.OK;
        } else {
            return HttpStatus.BAD_REQUEST;
        } // if
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
        }

        if (userService.authenticate(email, password)) {
            if (user.getCustomerStatus() == CustomerStatus.SUSPENDED) {
                throw new AuthenticationException("User is suspended");
            } // if
            return ResponseEntity.ok(user);
        } else {
            throw new AuthenticationException("Incorrect password.");
        } // if
    } // login

    @PutMapping("/suspend/{id}") 
    public HttpStatus suspendUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return HttpStatus.NOT_FOUND;
        } // if
        try {
            userService.suspendUser(user);
        } catch (IllegalAccessException IAE) {
            return HttpStatus.BAD_REQUEST;
        } // catch
        return HttpStatus.OK;
    } // suspendUser
} // UserController
