package com.cs4050.cinema.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.cs4050.cinema.Model.*;
import com.cs4050.cinema.Repository.*;

@Service
public class OrderService {
    
    private final OrderRepository orderRepository;
    private final ShowSeatRepository showSeatRepository;
    
    public OrderService(OrderRepository orderRepository, ShowSeatRepository showSeatRepository) {
        this.orderRepository = orderRepository;
        this.showSeatRepository = showSeatRepository;
    } // OrderService

    public boolean createOrder(User user, Order order) {
        if ((order.getAdultTickets() + order.getChildTickets() + order.getSeniorTickets()) != order.getNumTickets()) {
            return false;
        } // if

        order.setOrderTotal((5.95 * order.getChildTickets()) + (10.95 * order.getSeniorTickets()) + (12.95 * order.getAdultTickets()));

        if (order.isPromoApplied()) {
            order.setOrderTotal(order.getOrderTotal() * ((double) order.getPromoAmount() * 0.01));
        } // if

        user.getOrders().add(order);
        order.setUser(user);
        orderRepository.save(order);
        return true;
    } // createOrder


    public List<Order> getOrdersById(Long userId) {
        List<Order> orders = orderRepository.findAll();
        for (int i = 0; i < orders.size(); i++) {
            if (orders.get(i).getUser().getUserId() != userId) {
                orders.remove(i);
            } // if
        } // for
        return orders;
    } // getOrdersById

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
            .orElseThrow(() -> new NoSuchElementException("No order found with id: " + orderId));
    } // getOrderById

    public List<ShowSeat> getShowSeatsByOrder(Order order) {
        List<ShowSeat> seats = showSeatRepository.findAll();
        for (int i = 0; i < seats.size(); i++) {
            if (seats.get(i).getOrder().getOrderId() != order.getOrderId()) {
                seats.remove(i);
            } // if
        } // for
        return seats;
    } // getShowSeatsByOrder
} // OrderService
