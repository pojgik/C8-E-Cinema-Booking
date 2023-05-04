package com.cs4050.cinema.Controller;

import java.util.List;
import java.util.NoSuchElementException;

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

import com.cs4050.cinema.Model.*;
import com.cs4050.cinema.Service.OrderService;
import com.cs4050.cinema.Service.ShowService;
import com.cs4050.cinema.Service.EmailService;
import com.cs4050.cinema.Service.MovieService;
import com.cs4050.cinema.Service.UserService;

@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {

    private final UserService userService;
    private final EmailService emailService;
    private final OrderService orderService;
    private final MovieService movieService;
    private final ShowService showService;

    public OrderController(EmailService emailService, UserService userService, OrderService orderService, MovieService movieService, ShowService showService) {
        this.userService = userService;
        this.emailService = emailService;
        this.orderService = orderService;
        this.movieService = movieService;
        this.showService = showService;
    } // OrderController

    @PostMapping("/createOrder/{userId}/{movieTitle}")
    public ResponseEntity<Order> createOrder(@PathVariable Long userId, @PathVariable String movieTitle, @RequestBody Order order) {
        User user = userService.getUserById(userId);
        order.setMovie(movieService.getMovieByTitle(movieTitle));
        if (user == null) {
            return ResponseEntity.notFound().build();
        } // if

        boolean success = orderService.createOrder(user, order);

        if (success) {
            String message = "This email is to confirm your order of " + order.getNumTickets() + " tickets to " + movieTitle + ".\n\n\n\n";
            message = message + order.getChildTickets() + " Child Tickets: $" + ((double) order.getChildTickets() * 5.95) + "\n";
            message = message + order.getAdultTickets() + " Adult Tickets: $" + ((double) order.getAdultTickets() * 12.95) + "\n";
            message = message + order.getSeniorTickets() + " Senior Tickets: $" + ((double) order.getSeniorTickets() * 10.95) + "\n\n";
            message = message + "Order total: $" + order.getOrderTotal() + "\n\n\n";
            message = message + "Thank you for your business, have a great day!";
            emailService.sendEmail(user.getEmail(), "Order Confirmation", message);
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.badRequest().build();
        } // if
    } // createOrder

    @GetMapping("/getOrdersById/{userId}")
    public ResponseEntity<List<Order>> getOrdersById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        } else {
            List<Order> orders = orderService.getOrdersById(userId);
            return ResponseEntity.ok().body(orders);
        } // if
    } // getOrdersById

    @PutMapping("/setSeatOrder/{seatId}/{orderId}")
    public HttpStatus setSeatOrder(@PathVariable Long seatId, @PathVariable Long orderId) {
        try {
            showService.setSeatOrder(seatId, orderId);
            return HttpStatus.OK;
        } catch (NoSuchElementException NSEE) {
            return HttpStatus.NOT_FOUND;
        } // try
    } // setSeatOrder

    @GetMapping("/getSeatsByOrderId/{orderId}")
    public ResponseEntity<List<ShowSeat>> getSeatsByOrderId(@PathVariable Long orderId) {
        Order order;
        try {
            order = orderService.getOrderById(orderId);
        } catch (NoSuchElementException NSEE) {
            return ResponseEntity.notFound().build();
        } // try
        List<ShowSeat> seats = orderService.getShowSeatsByOrder(order);
        return ResponseEntity.ok(seats);
    } // getSeatsByOrderId

} // OrderController
