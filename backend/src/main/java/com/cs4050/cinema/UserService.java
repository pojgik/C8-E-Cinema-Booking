package com.cs4050.cinema;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import java.util.NoSuchElementException;

import javax.naming.AuthenticationException;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final PaymentInfoRepository paymentInfoRepository;
    private final AddressRepository billingAddressRepository;

    public UserService(UserRepository userRepository, PaymentInfoRepository paymentInfoRepository, AddressRepository billingAddressRepository) {
        this.userRepository = userRepository;
        this.paymentInfoRepository = paymentInfoRepository;
        this.billingAddressRepository = billingAddressRepository;
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

    public User updateUser(User oldUser, User newUser) {
        if (!oldUser.getFirstName().equals(newUser.getFirstName()) && newUser.getFirstName() != null) {
            oldUser.setFirstName(newUser.getFirstName());
        } // if
        if (!oldUser.getLastName().equals(newUser.getLastName()) && newUser.getLastName() != null) {
            oldUser.setLastName(newUser.getLastName());
        } // if
        if (oldUser.getPromotionStatus() != newUser.getPromotionStatus()) {
            oldUser.setPromotionStatus(newUser.getPromotionStatus());
        } // if
        if (!oldUser.getPhone().equals(newUser.getPhone()) && newUser.getPhone() != null) {
            oldUser.setPhone(newUser.getPhone());
        } // if
        if (!oldUser.getPaymentCards().equals(newUser.getPaymentCards()) && !newUser.getPaymentCards().isEmpty()) {
            oldUser.setPaymentCards(newUser.getPaymentCards());
        } // if
        if (oldUser.getBillingAddress().getAddressId() != newUser.getBillingAddress().getAddressId()) {
            oldUser.setBillingAddress(newUser.getBillingAddress());
        } // if
        return userRepository.save(oldUser);
    } // updateUser

    public User changePassword(User oldUser, User newUser) {
        oldUser.setPassword(encodePassword(newUser.getPassword()));
        return userRepository.save(oldUser);
    } // changePassword

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    } // deleteUser

    public String encodePassword(String password) {
        String salt = BCrypt.gensalt(10);
        String encrypted = BCrypt.hashpw(password, salt);
        return encrypted;
    }

    public boolean authenticate(String email, String password) throws AuthenticationException {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new AuthenticationException("Invalid email");
            //return false;
        } // if

        return BCrypt.checkpw(password, user.getPassword());
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

    public User verifyUser(User user) {
        user.setCustomerStatus(CustomerStatus.ACTIVE);
        user.setVerificationCode(null);
        return userRepository.save(user);
    } // verifyUser

    public void addPaymentCard(User user, PaymentInfo paymentInfo) {
        user.getPaymentCards().add(paymentInfo);
        paymentInfoRepository.save(paymentInfo);
    } // addPaymentCard

    public void addBillingAddress(User user, Address billingAddress) {
        user.setBillingAddress(billingAddress);
        billingAddressRepository.save(billingAddress);
    }
    
    public void save(User user) {
        userRepository.save(user);
    } // save


} // UserService