package com.cs4050.cinema;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import java.util.NoSuchElementException;

@Service
public class UserService {
    
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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

        user.setPassword(encodePassword(user.getPassword()));
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

    public User changePassword(Long id, User user, String oldPassword, String newPassword) {
        
        if (user.getPassword().equals(passwordEncoder.encode(oldPassword)))     //checks password
          user.setPassword(passwordEncoder.encode(newPassword));                // sets password and encodes it
        return userRepository.save(user);
    }
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    } // deleteUser

    public String encodePassword(String password) {
        String salt = BCrypt.gensalt(10);
        String encrypted = BCrypt.hashpw(password, salt);
        return encrypted;
    }

    public boolean authenticate(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            return false;
        } // if

        return user.getPassword().equals(encodePassword(password));
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
    
    public void save(User user) {
        userRepository.save(user);
    } // save

} // UserService