package com.cs4050.cinema.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cs4050.cinema.Model.Address;
import com.cs4050.cinema.Model.PaymentInfo;
import com.cs4050.cinema.Model.User;
import com.cs4050.cinema.Service.PaymentService;
import com.cs4050.cinema.Service.UserService;

@RestController
@RequestMapping("/payment")
@CrossOrigin
public class PaymentController {

    private final UserService userService;
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService, UserService userService) {
        this.userService = userService;
        this.paymentService = paymentService;
    } // PaymentController

    @PostMapping("/addCard/{userId}")
    public HttpStatus addPaymentCard(@PathVariable Long userId, @RequestBody PaymentInfo paymentInfo) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return HttpStatus.NOT_FOUND;
        } // if
        
        if (user.getPaymentCards().size() >= 3) {
            return HttpStatus.BAD_REQUEST;
        } else {
            paymentService.addPaymentCard(user, paymentInfo);
            return HttpStatus.CREATED;
        } // if
    } // addPaymentCard

    @GetMapping("/removeCard/{id}") 
        public HttpStatus removeCard(@PathVariable Long id) {
            if (paymentService.getPaymentInfoById(id) != null) {
                paymentService.deleteCard(id);
                return HttpStatus.OK;
            } else {
                return HttpStatus.BAD_REQUEST;
            } // if
        } //removeCard

    @PostMapping("/addAddress/{userId}") 
    public HttpStatus addAddress(@PathVariable Long userId, @RequestBody Address address) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return HttpStatus.NOT_FOUND;
        } // if

        if (user.getBillingAddress() != null) {
            return HttpStatus.BAD_REQUEST;
        } else {
            userService.addBillingAddress(user, address);
            return HttpStatus.OK;
        } // if
    } // addAddress

    @GetMapping("/getCards/{userId}")
    public ResponseEntity<List<PaymentInfo>> getAllCards(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        } else if (user.getPaymentCards().isEmpty()) {
            return null;
        } // if

        return ResponseEntity.ok(user.getPaymentCards());
        
    } // getAllCards
} // PaymentController
