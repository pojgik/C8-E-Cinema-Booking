package com.cs4050.cinema.Service;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.cs4050.cinema.Model.Address;
import com.cs4050.cinema.Model.CustomerStatus;
import com.cs4050.cinema.Model.PaymentInfo;
import com.cs4050.cinema.Model.User;
import com.cs4050.cinema.Repository.AddressRepository;
import com.cs4050.cinema.Repository.UserRepository;

import java.util.NoSuchElementException;

import javax.security.sasl.AuthenticationException;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final PaymentService paymentService;
    private final AddressRepository billingAddressRepository;

    public UserService(UserRepository userRepository, PaymentService paymentService, AddressRepository billingAddressRepository) {
        this.userRepository = userRepository;
        this.paymentService = paymentService;
        this.billingAddressRepository = billingAddressRepository;
    } // UserService

    /*
     * Returns a list of all users saved in the database.
     * 
     * @Return List<User> List of every user
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    } // getAllUsers

    /*
     * Returns a specific user in the database whose userId matches the specified id.
     * 
     * @Throws NoSuchElementException when a user with the specified id cannot be found
     * 
     * @Param id The user id to look for
     * 
     * @Return User the user found from the database
     */
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("User not found with id: " + id));
    } // getUserById

    /*
     * Returns a specific user whose email matches the specified email
     * 
     * @Throws NoSuchElementException when a user with the specified email cannot be found
     * 
     * @Param email The email to look for
     * 
     * @Return User the user found from the database
     */
    public User getUserByEmail(String email) throws NoSuchElementException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new NoSuchElementException("User with email " + email + " not found");
        } // if
        return user;
    } // getUserByEmail

    /*
     * Creates a new user with the properties of the user passed in and adds the user to the database.
     * Checks that the user has a unique email address (there is not a user with the emaila address already in the database),
     * and hashes the password using BCrypt.
     * 
     * @Throws IllegalArgumentException when the user contains a duplicate email address
     * 
     * @Param user the User object containing the required fields to be added to the database
     * 
     * @Return user returns the added user upon success
     */
    public User createUser(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("User with that email already exists.");
        } // if

        user.setPassword(encodePassword(user.getPassword()));
        return userRepository.save(user);
    } // getUserById

    /*
     * Takes in an existing user, a new user containing the updated fields (with fields not to be updated set to null),
     * and optionally a new paymentInfo and address to be added/changed. If the new user contains a field
     * that exists (!= null) and is not the same as the one in the existing user, the existing user's attribute is
     * set to that of the new user. The same is done with the existing user's paymentInfo and address.
     * 
     * @Param currentUser The existing user
     * @Param newUser the updated user
     * @Param paymentInfo the updated paymentInfo
     * @Param address the updated address
     * 
     * @Return user returns the updated user upon success
     */
    public User updateUser(User currentUser, User newUser, PaymentInfo paymentInfo, Address address) {
        if (!currentUser.getFirstName().equals(newUser.getFirstName()) && newUser.getFirstName() != null) {
            currentUser.setFirstName(newUser.getFirstName());
        } // if

        if (!currentUser.getLastName().equals(newUser.getLastName()) && newUser.getLastName() != null) {
            currentUser.setLastName(newUser.getLastName());
        } // if

        if (currentUser.getPromotionStatus() != newUser.getPromotionStatus()) {
            currentUser.setPromotionStatus(newUser.getPromotionStatus());
        } // if

        if (!currentUser.getPhone().equals(newUser.getPhone()) && newUser.getPhone() != null) {
            currentUser.setPhone(newUser.getPhone());
        } // if

        if (paymentInfo != null && !currentUser.getPaymentCards().contains(paymentInfo)) {
            paymentService.addPaymentCard(currentUser, paymentInfo);
        } // if
        
        if (address != null && !address.equals(currentUser.getBillingAddress())) {
            addBillingAddress(currentUser, address);
        } // if

        return userRepository.save(currentUser);
    } // updateUser

    /*
     * Takes in an existing user and an updated user containing the new password. The new password is hashed
     * and the password of the existing user is set to that of the new hashed password, and then the 
     * updated user is saved to the database.
     * 
     * @Param currentUser the existing user
     * @Param newUser the new user with the updated password
     * 
     * @Return returns the updated user upon success
     */
    public boolean changePassword(User user, String currentPassword, String newPassword) {
        if (currentPassword == null || BCrypt.checkpw(currentPassword, user.getPassword())) {
            user.setPassword(encodePassword(newPassword));
            save(user);
            return true;
        } else {
            return false;
        } // if
    } // changePassword

    /*
     * Deletes a user from the database.
     * 
     * @Param id the id of the user to be deleted
     */
    public void deleteUser(Long id) {
        User user = getUserById(id);
        if (user.getBillingAddress() != null) {
            billingAddressRepository.deleteById(user.getBillingAddress().getAddressId());
        } // if
        if (!user.getPaymentCards().isEmpty()) {
            for (PaymentInfo card : user.getPaymentCards()) {
                paymentService.deleteCard(card.getPaymentId());
            } // for
        } // if
        userRepository.deleteById(id);
    } // deleteUser

    /*
     * Hashes a password string using Bcrypt
     * 
     * @Param password the raw password to be encoded
     * 
     * @Return encrypted the new hashed password
     */
    public String encodePassword(String password) {
        String salt = BCrypt.gensalt();
        String encrypted = BCrypt.hashpw(password, salt);
        return encrypted;
    } // encodePassword

    /*
     * Authenticates a user by verifying that the supplied email and password both correspond to those of a user in the database.
     * 
     * @Throws AuthenticationException if no user is found with the correct email
     * 
     * @Param email the specified email
     * @Param password the specified password
     * 
     * @Return true if the passwords match, false if they do not
     */
    public boolean authenticate(String email, String password) throws AuthenticationException {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new AuthenticationException("Invalid email");
            //return false;
        } // if

        return BCrypt.checkpw(password, user.getPassword());
    } // authenticate


    /*
     * Generates a random verification code to send upon account creation
     * 
     * @Param length the length of the code
     * 
     * @return code the code
     */
    public static String generateVerificationCode(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int index = (int) (Math.random() * chars.length());
            code.append(chars.charAt(index));
        }
        return code.toString();
    } // generateVerificationCode

    /*
     * Activates a user account and deletes the verification code
     * 
     * @Param user the user to activate
     * 
     * @Return user returns the user upon success
     */
    public boolean verifyUser(User user, String code) {
        if (code.equals(user.getVerificationCode())) {
            user.setCustomerStatus(CustomerStatus.ACTIVE);
            user.setVerificationCode(null);
            userRepository.save(user);
            return true;
        } else {
            return false;
        } // if
    } // verifyUser

    /*
     * Add a new billing address to the repository and link it to the specified user.
     * 
     * @Param user the user to whom the billing address is to be linked
     * @Param billingAddress the address to add to the database
     * 
     * @Return returns the address upon success
     */
    public Address addBillingAddress(User user, Address billingAddress) {
        user.setBillingAddress(billingAddress);
        billingAddressRepository.save(billingAddress);
        userRepository.save(user);
        return billingAddress;
    } // addBillingAddress

    public User suspendUser(User user) throws IllegalAccessException{
        if (user.getCustomerStatus() == CustomerStatus.ACTIVE) {
            user.setCustomerStatus(CustomerStatus.SUSPENDED);
        } else if (user.getCustomerStatus() == CustomerStatus.SUSPENDED) {
            user.setCustomerStatus(CustomerStatus.ACTIVE);
        } else {
            throw new IllegalAccessException("Customer is not currently active or suspended");
        } // if
        save(user);
        return user;
    } // suspendUser

    /*
     * Saves a user to the database.
     * 
     * @Param user the user to be saved
     */
    public void save(User user) {
        userRepository.save(user);
    } // save


} // UserService