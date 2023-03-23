package com.cs4050.cinema;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

import lombok.Data;

@Entity
@Data
@Table(name="paymentInfo")
public class PaymentInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentId", nullable = false)
    private Long paymentId;

    @Column(name = "cardType", nullable = false)
    private String cardType;

    @Column(name = "cardNumber", nullable = false)
    private byte[] cardNumber;

    @Column(name = "expDate", nullable = false)
    private Date expDate;

    @Column(name = "cvc", nullable = false)
    private byte[] cvc;

    @Column(name = "cardName", nullable = false)
    private String cardName;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    private static final String ALGORITHM = "AES";
    private static final int KEY_SIZE = 128;

    private void encryptData(String cardNumber, String cvc) throws Exception {
        KeyGenerator keyGenerator = KeyGenerator.getInstance(ALGORITHM);
        keyGenerator.init(KEY_SIZE);
        SecretKey secretKey = keyGenerator.generateKey();

        // Encrypt the card number
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        this.cardNumber = cipher.doFinal(cardNumber.getBytes(StandardCharsets.UTF_8));

        // Encrypt the cvc
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        this.cvc = cipher.doFinal(cvc.getBytes(StandardCharsets.UTF_8));
    }

    public String decryptCardNumber(SecretKey secretKey) throws Exception {
        // Decrypt the card number
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] decryptedCardNumber = cipher.doFinal(this.cardNumber);
        return new String(decryptedCardNumber, StandardCharsets.UTF_8);
    } // decryptCardNumber

    public String decryptCvc(SecretKey secretKey) throws Exception {
        // Decrypt the cvc
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] decryptedCvc = cipher.doFinal(this.cvc);
        return new String(decryptedCvc, StandardCharsets.UTF_8);
    } // decryptCvc
} // PaymentInfo
