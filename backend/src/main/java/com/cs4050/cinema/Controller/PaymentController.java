package com.cs4050.cinema.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("addCard/{userId}")
    public HttpStatus addPaymentCard(@PathVariable Long userId, @RequestBody PaymentInfo paymentInfo) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return HttpStatus.NOT_FOUND;
        } // if

        paymentService.addPaymentCard(user, paymentInfo);
        return HttpStatus.CREATED;
    } // addPaymentCard

    @GetMapping("removeCard/{id}") 
        public HttpStatus removeCard(@PathVariable Long id) {
            if (paymentService.getPaymentInfoById(id) != null) {
                paymentService.deleteCard(id);
                return HttpStatus.OK;
            } else {
                return HttpStatus.BAD_REQUEST;
            } // if
        } //removeCard
} // PaymentController
