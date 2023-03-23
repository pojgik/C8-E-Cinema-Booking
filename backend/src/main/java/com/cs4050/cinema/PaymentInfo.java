package com.cs4050.cinema;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PostLoad;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;

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

    @Column(name = "cardNumber", nullable = true)
    private String cardNumber;

    @Column(name = "expDate", nullable = false)
    private Date expDate;

    @Column(name = "cvv", nullable = true)
    private String cvv;

    @Column(name = "encryptedCardNumber", nullable = false)
    private String encryptedCardNumber;

    @Column(name = "encryptedCvv", nullable = false)
    private String encryptedCvv;

    @Column(name = "cardName", nullable = false)
    private String cardName;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    private KeyGenerator keyGen;
    private SecretKey secretKey;

    @PrePersist
    @PreUpdate
    public void encryptCardNumber() throws Exception {
        if (this.cardNumber != null) {
            this.keyGen = KeyGenerator.getInstance("AES");
            keyGen.init(256, new SecureRandom());
            this.secretKey = keyGen.generateKey();

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] encryptedCardNumberBytes = cipher.doFinal(this.cardNumber.getBytes(StandardCharsets.UTF_8));
            this.encryptedCardNumber = new String(encryptedCardNumberBytes, StandardCharsets.ISO_8859_1);

            this.cardNumber = null;
            this.cvv = null;
        }
    }

    @PostLoad
    public void decryptCardNumber() throws Exception {
        if (this.encryptedCardNumber != null) {

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, secretKey);

            byte[] decryptedCardNumberBytes = cipher.doFinal(this.encryptedCardNumber.getBytes(StandardCharsets.ISO_8859_1));
            byte[] decryptedCvvBytes = cipher.doFinal(this.encryptedCvv.getBytes(StandardCharsets.ISO_8859_1));

            this.cardNumber = new String(decryptedCardNumberBytes, StandardCharsets.UTF_8);
            this.cvv = new String(decryptedCvvBytes, StandardCharsets.UTF_8);
        }
    }
    
} // PaymentInfo
