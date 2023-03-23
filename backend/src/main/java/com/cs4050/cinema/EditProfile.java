package com.cs4050.cinema;

import org.springframework.web.bind.annotation.PathVariable;

public class EditProfile {
    private User user;
    private final UserService userService;
   
    public EditProfile(UserService userService, String email) {
        this.userService = userService;
        this.user = userService.getUserByEmail(email);
    }
    
    public void editUser(@PathVariable String firstName, @PathVariable String lastName, 
    @PathVariable String billingAddress, @PathVariable String paymentCard, @PathVariable boolean promotionStatus) {
        if (firstName !=null) 
         user.setFirstName(firstName);
         if (lastName !=null) 
         user.setLastName(lastName);
         user.setPromotionStatus(promotionStatus);
         /*
         paymentCard and billing address to be added to user class
         if (billingAddress !=null) 
         user.setBillingAddress(billingAddress);
         if ( paymentCard!=null) 
         user.setPaymentCard(paymentCard);
         */
         userService.save(user);
    } //editUser

    // public void changePassword(@PathVariable String oldPassword, @PathVariable String newPassword) {
    //     if (user.getPassword().equals(userService.encoder(oldPassword)))     //checks password
    //       user.setPassword(userService.encoder(newPassword));                // sets password and encodes it
    //     userService.save(user);
    // }
       

    
} //EditProfile
