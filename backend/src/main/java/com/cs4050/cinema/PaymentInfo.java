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

// import javax.crypto.Cipher;
// import javax.crypto.KeyGenerator;
// import javax.crypto.SecretKey;
// import java.nio.charset.StandardCharsets;
// import java.io.FileInputStream;
// import java.security.KeyStore;

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
    private String cardNumber;

    @Column(name = "expDate", nullable = false)
    private Date expDate;

    @Column(name = "cvv", nullable = false)
    private String cvv;

    @Column(name = "cardName", nullable = false)
    private String cardName;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    // private static final String ALIAS = "mykey";
    // private static final String STORE_PASSWORD = "mystorepassword";
    // private static final String KEY_PASSWORD = "mykeypassword";
    // private static final String KEYSTORE_FILE = "mykeystore.jks";
    // private static final String ALGORITHM = "AES/CBC/PKCS5Padding";

    // private void encryptData(byte[] cardNumber, byte[] cvc) throws Exception {
    //     KeyStore keyStore = KeyStore.getInstance("JCEKS");
    //     try (FileInputStream fis = new FileInputStream(KEYSTORE_FILE)) {
    //         keyStore.load(fis, STORE_PASSWORD.toCharArray());
    //     } // try
    //     KeyStore.ProtectionParameter keyProtector = new KeyStore.PasswordProtection(KEY_PASSWORD.toCharArray());
    //     KeyStore.SecretKeyEntry keyEntry = (KeyStore.SecretKeyEntry) keyStore.getEntry(ALIAS, keyProtector);
    //     SecretKey secretKey = keyEntry.getSecretKey();

    //     Cipher cipher = Cipher.getInstance(ALGORITHM);
    //     cipher.init(Cipher.ENCRYPT_MODE, secretKey);
    //     this.cardNumber = cipher.doFinal(cardNumber.getBytes(StandardCharsets.UTF_8));

    //     cipher.init(Cipher.ENCRYPT_MODE, secretKey);
    //     this.cvc = cipher.doFinal(cvc.getBytes(StandardCharsets.UTF_8));
    // }

    // public String decryptCardNumber(SecretKey secretKey) throws Exception {
    //     // Decrypt the card number
    //     Cipher cipher = Cipher.getInstance(ALGORITHM);
    //     cipher.init(Cipher.DECRYPT_MODE, secretKey);
    //     byte[] decryptedCardNumber = cipher.doFinal(this.cardNumber);
    //     return new String(decryptedCardNumber, StandardCharsets.UTF_8);
    // } // decryptCardNumber

    // public String decryptCvc(SecretKey secretKey) throws Exception {
    //     // Decrypt the cvc
    //     Cipher cipher = Cipher.getInstance(ALGORITHM);
    //     cipher.init(Cipher.DECRYPT_MODE, secretKey);
    //     byte[] decryptedCvc = cipher.doFinal(this.cvc);
    //     return new String(decryptedCvc, StandardCharsets.UTF_8);
    // } // decryptCvc
} // PaymentInfo
