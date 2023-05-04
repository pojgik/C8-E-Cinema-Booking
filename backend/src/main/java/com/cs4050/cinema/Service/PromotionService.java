package com.cs4050.cinema.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cs4050.cinema.Model.*;
import com.cs4050.cinema.Repository.*;

@Service
public class PromotionService {
    private final PromotionRepository promotionRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public PromotionService(PromotionRepository promotionRepository, UserRepository userRepository, EmailService emailService) {
        this.promotionRepository = promotionRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    } // PromotionService

    /*
     * Adds a new promotion to the database. First goes through each user in the database, and if they have signed up for
     * promotions, sends them an email containing the promotion information and the promotion code.
     * 
     * @Param promotion the promotion to be added to the database
     * @Param movie the movie for which the promotion is to apply
     * 
     * @Return promotion upon success the newly added promotion is returned
     */
    public Promotion addPromotion(Promotion promotion, Movie movie) {
        List<User> users = userRepository.findAll();
        String subject = "New promotion for " + movie.getTitle() + "!";
        String message ="We have just added a new promotion for the upcoming movie " + movie.getTitle();
        message = message + "!, add the below code at checkout to get " + promotion.getDiscountRate() + "% off your purchase ";
        message = message + "of tickets for this movie!\n\nPromotion code: " + promotion.getPromoCode(); 
        for (User user : users) {
            if (user.getPromotionStatus()) {
                String userMessage = "Hi " + user.getFirstName() + "!\n\n" + message;
                emailService.sendEmail(user.getEmail(), subject, userMessage);
            } // if
        } // for
        promotion.setMovieApplied(movie);
        return promotionRepository.save(promotion);
    } // addPromotion

    public Promotion getPromotionByCode(String promoCode) {
        List<Promotion> promotions = promotionRepository.findAll();
        for (Promotion promo : promotions) {
            if (promo.getPromoCode().equals(promoCode)) {
                return promo;
            } // if
        } // for
        return null;
    } // getPromotionByCode
} // PromotionService
