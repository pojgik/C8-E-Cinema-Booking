package com.cs4050.cinema;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.NoSuchElementException;

@Service
public class UserService {
    
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    } // UserService

    public List<User> getAllUsers() {
        return userRepository.findAll();
    } // getAllUsers

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User not found with id: " + id));
    } // getUserById

    public User getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            System.out.println("User not found for email: " + email);
        }
        return user;
    } // getUserByEmail

    public User createUser(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("User with that email already exists.");
        } // if

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    } // getUserById

    public User updateUser(Long id, User user, String firstName, String lastName,
    PaymentInfo paymentCard, Address billingAddress, boolean promotionStatus) {
        if (firstName != null) {
            user.setFirstName(firstName);
        } // if
        if (lastName != null) {
            user.setLastName(lastName);
        } // if
        if (billingAddress !=null) {
            user.setBillingAddress(billingAddress); 
        } // if
        if ( paymentCard!=null) {
            user.setPaymentCard(paymentCard);
        } // if        
        user.setPromotionStatus(promotionStatus);
        return userRepository.save(user);
    } // updateUser

    public void changePassword(Long id, User user, String oldPassword, String newPassword) {
        
        if (user.getPassword().equals(passwordEncoder.encode(oldPassword)))     //checks password
          user.setPassword(passwordEncoder.encode(newPassword));                // sets password and encodes it
        userRepository.save(user);
    }
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    } // deleteUser

    public boolean authenticate(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            return false;
        } // if

        return passwordEncoder.matches(password, user.getPassword());
    } // authenticate

    public static String generateVerificationCode(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int index = (int) (Math.random() * chars.length());
            code.append(chars.charAt(index));
        }
        return code.toString();
    } // generateVerificationCode

    public void verifyUser(User user) {
        user.setCustomerStatus(CustomerStatus.ACTIVE);
        user.setVerificationCode(null);
        save(user);
    } // verifyUser
    
    public String encoder(String str) {
        return passwordEncoder.encode(str);
    }
    public void save(User user) {
        userRepository.save(user);
    } // save

} // UserService