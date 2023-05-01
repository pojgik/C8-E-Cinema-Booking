package com.cs4050.cinema.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cs4050.cinema.Model.*;
import com.cs4050.cinema.Service.OrderService;
import com.cs4050.cinema.Service.PaymentService;
import com.cs4050.cinema.Service.UserService;

@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {

    private final UserService userService;
    private final PaymentService paymentService;
    private final OrderService orderService;

    public OrderController(PaymentService paymentService, UserService userService, OrderService orderService) {
        this.userService = userService;
        this.paymentService = paymentService;
        this.orderService = orderService;
    } // OrderController

    @PostMapping("createOrder/{userId}")
    public HttpStatus createOrder(@PathVariable Long userId, @RequestBody Order order) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return HttpStatus.NOT_FOUND;
        } // if

        boolean success = orderService.createOrder(user, order);

        if (success) {
            return HttpStatus.CREATED;
        } else {
            return HttpStatus.BAD_REQUEST;
        } // if
    } // createOrder

    @GetMapping("getOrdersById/{userId}")
    public ResponseEntity<List<Order>> getOrdersById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        } else {
            List<Order> orders = orderService.getOrdersById(userId);
            return ResponseEntity.ok().body(orders);
        } // if
    } // getOrdersById

} // OrderController
