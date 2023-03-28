package com.cs4050.cinema.Service;

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
        user.getPaymentCards().add(paymentInfo);
        paymentInfo.setUser(user);
        return paymentInfoRepository.save(paymentInfo);
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

        String encryptedCardNumber = encryptor.encrypt(paymentInfo.getCardNumber());
        String encryptedCvv = encryptor.encrypt(paymentInfo.getCvv());

        paymentInfo.setEncryptedCardNumber(encryptedCardNumber);
        paymentInfo.setEncryptedCvv(encryptedCvv);

        paymentInfo.setCardNumber(null);
        paymentInfo.setCvv(null);

        return paymentInfo;
    } // encryptPaymentInfo
    
} // paymentService
