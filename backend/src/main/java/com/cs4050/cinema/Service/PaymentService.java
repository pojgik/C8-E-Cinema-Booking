package com.cs4050.cinema.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.jasypt.util.text.BasicTextEncryptor;
import org.springframework.stereotype.Service;

import com.cs4050.cinema.Model.*;
import com.cs4050.cinema.Repository.*;

@Service
public class PaymentService {

    private final PaymentInfoRepository paymentInfoRepository;

    public PaymentService(PaymentInfoRepository paymentInfoRepository) {
        this.paymentInfoRepository = paymentInfoRepository;
    } // paymentService

    /*
     * Encrypts credit card info of payment info, assigns it to the user, and 
     * adds it to the database.
     * 
     * @Param user the user to whom the payment card is to be added
     * @Param paymentInfo the paymentInfo to be added
     * 
     * @Return paymentInfo returns the paymentInfo on success
     */
    public PaymentInfo addPaymentCard(User user, PaymentInfo paymentInfo) {
        if (paymentInfo.getCardNumber() != null || paymentInfo.getCvv() != null) {
                paymentInfo = encryptPaymentInfo(paymentInfo);
        } // if
        paymentInfo.setUser(user);
        user.getPaymentCards().add(paymentInfo);
        paymentInfoRepository.save(paymentInfo);
        return paymentInfo;
    } // addPaymentCard

    /*
     * Encrypts the credit card information of the specified paymentInfo.
     * 
     * @Param paymentInfo the paymentInfo to be encrypted
     * 
     * @Return returns the paymentInfo upon success
     */
    protected PaymentInfo encryptPaymentInfo(PaymentInfo paymentInfo) {
        BasicTextEncryptor encryptor = new BasicTextEncryptor();
        encryptor.setPassword("MyKey");

        if (paymentInfo.getCardNumber() != null) {
            String encryptedCardNumber = encryptor.encrypt(paymentInfo.getCardNumber());
            paymentInfo.setEncryptedCardNumber(encryptedCardNumber);
            paymentInfo.setCardNumber(null);
        } // if

        if (paymentInfo.getCvv() != null) {
            String encryptedCvv = encryptor.encrypt(paymentInfo.getCvv());
            paymentInfo.setEncryptedCvv(encryptedCvv);
            paymentInfo.setCvv(null);
        } // if

        return paymentInfo;
    } // encryptPaymentInfo

    /*
     * Deletes a payment card from the database.
     * 
     */
    public void deleteCard(Long id) {
        paymentInfoRepository.deleteById(id);
    } // deleteCard

    /*
     * Returns a specific payment card in the database whose paymentId matches the specified id.
     * 
     * @Throws NoSuchElementException when a payment card with the specified id cannot be found
     * 
     * @Param id The paymentId to look for
     * 
     * @Return PaymentInfo the payment card found from the database
     */
    public PaymentInfo getPaymentInfoById(Long id) {
        return paymentInfoRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Payment info not found with id: " + id));
    } // getPaymentInfoById

    public List<PaymentInfo> getAllCardsByUser(User user) {
        List<PaymentInfo> cards = paymentInfoRepository.findAll();
        for (int i = 0; i < cards.size(); i++) {
            if (cards.get(i).getUser().getUserId() != user.getUserId()) {
                cards.remove(i);
            } // if
        } // for
        return cards;
    } // getALlCardsByUser
    
} // paymentService
