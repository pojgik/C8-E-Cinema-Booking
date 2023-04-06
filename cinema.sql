-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: cinemaebooking
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `addressId` int NOT NULL AUTO_INCREMENT,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`addressId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (2,'123 Baxter st','Athens','Georiga','United States','30609'),(3,'123 Baxter st','Athens','Georiga','United States','30609');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `bookingId` int NOT NULL AUTO_INCREMENT,
  `customer` int NOT NULL COMMENT 'Customer who made the booking - fk to customer id',
  `showId` int NOT NULL COMMENT 'fk to showing id',
  `paymentId` int NOT NULL COMMENT 'fk to payment info id',
  `promoId` int DEFAULT NULL COMMENT 'fk to promotion id',
  `numTickets` int DEFAULT NULL COMMENT 'number of tickets',
  `total` decimal(8,2) DEFAULT NULL COMMENT 'total price',
  PRIMARY KEY (`bookingId`),
  KEY `customer` (`customer`),
  KEY `showId` (`showId`),
  KEY `paymentId` (`paymentId`),
  KEY `promoId` (`promoId`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`customer`) REFERENCES `user` (`userId`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`showId`) REFERENCES `showing` (`showId`),
  CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`paymentId`) REFERENCES `paymentinfo` (`paymentId`),
  CONSTRAINT `booking_ibfk_4` FOREIGN KEY (`promoId`) REFERENCES `promotion` (`promoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customerstatus`
--

DROP TABLE IF EXISTS `customerstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customerstatus` (
  `statusCode` int NOT NULL,
  `status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`statusCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customerstatus`
--

LOCK TABLES `customerstatus` WRITE;
/*!40000 ALTER TABLE `customerstatus` DISABLE KEYS */;
INSERT INTO `customerstatus` VALUES (0,'INACTIVE'),(1,'ACTIVE'),(2,'SUSPENDED');
/*!40000 ALTER TABLE `customerstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `movieId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `cast` varchar(255) DEFAULT NULL,
  `director` varchar(255) DEFAULT NULL,
  `producer` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Producer',
  `synopsis` varchar(1024) DEFAULT NULL,
  `trailerURL` varchar(255) DEFAULT NULL,
  `coverURL` varchar(255) DEFAULT NULL,
  `rating` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Rating',
  PRIMARY KEY (`movieId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,'John Wick',NULL,NULL,NULL,NULL,NULL,'youtube.com','JohnWick.JPEG','PG-13');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentinfo`
--

DROP TABLE IF EXISTS `paymentinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentinfo` (
  `paymentId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL COMMENT 'fk to user with whom payment info is associated',
  `cardNumber` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Credit Card number',
  `cardType` varchar(255) DEFAULT NULL,
  `expDate` varchar(10) DEFAULT NULL,
  `cardName` varchar(255) DEFAULT NULL,
  `cvv` varchar(3) DEFAULT NULL,
  `encryptedCardNumber` varchar(255) DEFAULT NULL,
  `encryptedCvv` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`paymentId`),
  UNIQUE KEY `paymentId` (`paymentId`),
  KEY `userId` (`userId`),
  CONSTRAINT `paymentinfo_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentinfo`
--

LOCK TABLES `paymentinfo` WRITE;
/*!40000 ALTER TABLE `paymentinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `paymentinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion` (
  `promoId` int NOT NULL AUTO_INCREMENT,
  `promoCode` varchar(255) DEFAULT NULL,
  `promoExp` datetime DEFAULT NULL COMMENT 'Promotion expiration date',
  `movieApplied` int DEFAULT NULL COMMENT 'fk to movie for which promotion applies',
  `discountRate` int NOT NULL COMMENT 'Discount rate',
  PRIMARY KEY (`promoId`),
  KEY `movieApplied` (`movieApplied`),
  CONSTRAINT `promotion_ibfk_1` FOREIGN KEY (`movieApplied`) REFERENCES `movie` (`movieId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `showing`
--

DROP TABLE IF EXISTS `showing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `showing` (
  `showId` int NOT NULL AUTO_INCREMENT,
  `movieId` int NOT NULL COMMENT 'fk to movie for showing',
  `roomId` int NOT NULL COMMENT 'fk for show room',
  `showTime` datetime NOT NULL COMMENT 'time of show',
  PRIMARY KEY (`showId`),
  KEY `movieId` (`movieId`),
  KEY `roomId` (`roomId`),
  CONSTRAINT `showing_ibfk_1` FOREIGN KEY (`movieId`) REFERENCES `movie` (`movieId`),
  CONSTRAINT `showing_ibfk_2` FOREIGN KEY (`roomId`) REFERENCES `showroom` (`roomId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `showing`
--

LOCK TABLES `showing` WRITE;
/*!40000 ALTER TABLE `showing` DISABLE KEYS */;
/*!40000 ALTER TABLE `showing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `showroom`
--

DROP TABLE IF EXISTS `showroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `showroom` (
  `roomId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `numSeats` int NOT NULL,
  PRIMARY KEY (`roomId`),
  UNIQUE KEY `roomId` (`roomId`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `showroom`
--

LOCK TABLES `showroom` WRITE;
/*!40000 ALTER TABLE `showroom` DISABLE KEYS */;
INSERT INTO `showroom` VALUES (1,'Royal',100),(2,'Boyd',50),(3,'SG',10);
/*!40000 ALTER TABLE `showroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `ticketId` int NOT NULL AUTO_INCREMENT,
  `typeId` int NOT NULL COMMENT '1 - adult 2 - senior 3 - child',
  `bookingId` int NOT NULL COMMENT 'fk to booking associated with ticket',
  `seatNumber` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'seat number',
  PRIMARY KEY (`ticketId`),
  KEY `typeId` (`typeId`),
  KEY `bookingId` (`bookingId`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `tickettype` (`typeId`),
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`bookingId`) REFERENCES `booking` (`bookingId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickettype`
--

DROP TABLE IF EXISTS `tickettype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickettype` (
  `typeId` int NOT NULL,
  `ticketType` varchar(255) DEFAULT NULL,
  `price` decimal(5,2) NOT NULL,
  PRIMARY KEY (`typeId`),
  UNIQUE KEY `typeId` (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickettype`
--

LOCK TABLES `tickettype` WRITE;
/*!40000 ALTER TABLE `tickettype` DISABLE KEYS */;
INSERT INTO `tickettype` VALUES (1,'Adult',10.00),(2,'Senior',8.00),(3,'Child',5.00);
/*!40000 ALTER TABLE `tickettype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `userType` enum('ADMIN','CUSTOMER') NOT NULL DEFAULT 'CUSTOMER',
  `customerStatus` enum('INACTIVE','ACTIVE','SUSPENDED') NOT NULL DEFAULT 'INACTIVE',
  `verificationCode` varchar(255) DEFAULT NULL,
  `promotionStatus` tinyint(1) NOT NULL DEFAULT '0',
  `phone` varchar(10) DEFAULT NULL,
  `addressId` int DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `address_fk` (`addressId`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`addressId`) REFERENCES `address` (`addressId`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (76,'Luke','Dinkla','pojgik@gmail.com','$2a$10$8IA5hZ5Uu1tcufQBJS1BhORo4w.QLpe8AkfYP09f4rW.EmhyUgky2','CUSTOMER','ACTIVE',NULL,0,'6786305328',NULL),(84,'Tristan','Dominy','tristandominy413@gmail.com','$2a$10$XGsjTzk/R9r.TkRuYTnBq.gF/a2iEHS9UupEspOHyPwSc.0ivm6ei','ADMIN','ACTIVE',NULL,1,'7708648980',3),(85,'John','Doe','tgd40502@uga.edu','$2a$10$e1el7D9EdmJXCGMjl61vLuygYKa/bEGJ7S8BLSZi8yXH3PLo7wCqy','CUSTOMER','ACTIVE',NULL,1,'1234567890',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertype`
--

DROP TABLE IF EXISTS `usertype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertype` (
  `typeId` int NOT NULL,
  `userType` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertype`
--

LOCK TABLES `usertype` WRITE;
/*!40000 ALTER TABLE `usertype` DISABLE KEYS */;
INSERT INTO `usertype` VALUES (0,'Customer'),(1,'Admin');
/*!40000 ALTER TABLE `usertype` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-06 15:29:36
