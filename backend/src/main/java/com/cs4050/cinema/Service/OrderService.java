package com.cs4050.cinema.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cs4050.cinema.Model.*;
import com.cs4050.cinema.Repository.*;

@Service
public class OrderService {
    
    private final OrderRepository orderRepository;
    
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
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
        for (Order order : orders) {
            if (order.getUser().getUserId() != userId) {
                orders.remove(order);
            } // if
        } // for
        return orders;
    } // getOrdersById
} // OrderService
