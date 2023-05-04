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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
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
  `reviews` varchar(500) DEFAULT NULL,
  `duration` int NOT NULL DEFAULT '240',
  `nowPlaying` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`movieId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (6,'The Smurfs','comedy','Neil Patrick Harris','Raja Gosnell','Raja Gosnell','Evil wizard Gargamel (Hank Azaria) has plagued the happy, peaceful Smurfs for a very long time. Finally, he succeeds in chasing the little blue people from their village and through a magic portal -- which transports them to Manhattan and into the life of ad executive Patrick Winslow (Neil Patrick Harris). Only three apples high and lost in the Big Apple, the Smurfs (Jonathan Winters, Alan Cumming, Katy Perry) must find a way back to their world before Gargamel tracks them down.','https://www.youtube.com/embed/yhBpgqXwrt8','https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRJbvvqnGnehSYpYRB4xRMpHGEAMU7fEyRbquVLAFv-BY0VRv5R','pg','This movie has been a really big impact on my life and now the Smurfs are a very big part of my life and who I am, I loved it to pieces when I first saw it.',240,1),(7,'The Super Mario Bros. Movie','adventure','Chris Pratt','Michael Jelenic','Chris Meledandri','With help from Princess Peach, Mario gets ready to square off against the all-powerful Bowser to stop his plans from conquering the world.','https://www.youtube.com/embed/TnGl01FkMMo','https://upload.wikimedia.org/wikipedia/en/4/44/The_Super_Mario_Bros._Movie_poster.jpg','pg','The Super Mario Bros movie may be one of the most fun experiences i’ve had in a cinema as a Mario fan and an animation fan.',240,1),(8,'Dungeons & Dragons: Honor Among Thieves','fantasy','Chris Pine','Jonathan Goldstein','Nick Meyer','A charming thief and a band of unlikely adventurers embark on an epic quest to retrieve a long lost relic, but their charming adventure goes dangerously awry when they run afoul of the wrong people.','https://www.youtube.com/embed/IiMinixSXII','https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRG4rnATu8Hhszixtr0UV4PDdbMd7hGlJ56UenTg6eryQ9GzAIz','pg13','A Masterpiece of Fantasy: Dungeons and Dragons: Honor Among Thieves There are rare moments in cinema when a film manages to captivate and enthrall audiences, and Dungeons and Dragons: Honor Among Thieves does just that. ',240,1),(9,'Renfield','horror','Nicholas Cage','Chris McKay','Chris McKay','Renfield, the tortured aide to his narcissistic boss, Dracula, is forced to procure his master\'s prey and do his every bidding. However, after centuries of servitude, he\'s ready to see if there\'s a life outside the shadow of the Prince of Darkness.','https://www.youtube.com/embed/ICydLkeXq3w','https://dx35vtwkllhj9.cloudfront.net/universalstudios/renfield/images/regions/us/onesheet.jpg','r','While it is no groundbreaking Dracula story, Renfield is a genuinely hilarious twist on the all-too-familiar vampire narrative.',240,1),(10,'Star Wars: Episode IV – A New Hope','scifi','Harrison Ford','George Lucas','George Lucas','The Imperial Forces -- under orders from cruel Darth Vader (David Prowse) -- hold Princess Leia (Carrie Fisher) hostage, in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker (Mark Hamill) and Han Solo (Harrison Ford), captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 (Kenny Baker) and C-3PO (Anthony Daniels) to rescue the beautiful princess, help the Rebel Alliance, and restore freedom and justice to the Galaxy.','https://www.youtube.com/embed/L-_xHEv0l-w','https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSivwhA7pSNEMKFs_CmDbg9xhshhQdUGWeLUPlejL2qjm2LDwZg','pg','Well, here I am again, revisiting the timeless cinema classic that would go on to spark a whole universe of action, politics, space, religion (If you compare the Jedi Order to it) and so much more.',240,1),(11,'The Adventures of Tintin','mystery','Andy Serkis, Jamie Bell','Steven Spielberg','Peter Jackson','While shopping at an outdoor market, young reporter Tintin (Steven Spielberg), accompanied by his faithful dog, Snowy, buys a model of an old ship called the Unicorn. A shady character named Sakharine (Edgar Wright) and later an American named Barnaby (Peter Jackson) try to buy the model from him, but Tintin refuses.','https://www.youtube.com/embed/LTnCE_SaU38','https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQSh7x4LY9MUVLHWHVdyAjp9co80idz1oJca8KzKjxqGubQ8sdZ','pg','Tintin arguably serves as a better Indiana Jones 4 than Kingdom of The Crystal Skull. The score, cinematography, and progressively intriguing plot make this film such a joy to watch.',240,1);
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `numTickets` int NOT NULL,
  `childTickets` int NOT NULL,
  `adultTickets` int NOT NULL,
  `seniorTickets` int NOT NULL,
  `promoApplied` tinyint(1) NOT NULL DEFAULT '0',
  `promoAmount` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `orderTotal` decimal(6,2) DEFAULT NULL,
  `movieId` int DEFAULT NULL,
  PRIMARY KEY (`orderId`),
  KEY `userId` (`userId`),
  KEY `movie_fk` (`movieId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`movieId`) REFERENCES `movie` (`movieId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (13,2,0,2,0,0,0,85,25.90,6),(14,3,3,0,0,0,0,85,17.85,6),(15,3,0,3,0,0,0,85,38.85,6),(16,1,0,1,0,0,0,85,12.95,6);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
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
  `expDate` varchar(6) DEFAULT NULL,
  `cardName` varchar(255) DEFAULT NULL,
  `cvv` varchar(3) DEFAULT NULL,
  `encryptedCardNumber` varchar(255) DEFAULT NULL,
  `encryptedCvv` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`paymentId`),
  UNIQUE KEY `paymentId` (`paymentId`),
  KEY `userId` (`userId`),
  CONSTRAINT `paymentinfo_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentinfo`
--

LOCK TABLES `paymentinfo` WRITE;
/*!40000 ALTER TABLE `paymentinfo` DISABLE KEYS */;
INSERT INTO `paymentinfo` VALUES (102,85,NULL,'DISCOVER','04/25','Tristan',NULL,'CUaum7arEqKOf9tOEgKmXuTD2b5o9NGLRxrs0dRLC8s=','123'),(103,85,NULL,'AMEX','06/27','Tristan Dominy',NULL,'ICVCa2fVOjipFcJl+rtk/mE2xFHLO7zj8xW2xJ3FHHU=','123');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
INSERT INTO `promotion` VALUES (4,'smurfs50','2023-05-06 00:00:00',6,50),(5,'smurfs25','2023-05-06 00:00:00',6,25),(7,'mario30','2023-05-09 00:00:00',7,30);
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `showing`
--

LOCK TABLES `showing` WRITE;
/*!40000 ALTER TABLE `showing` DISABLE KEYS */;
INSERT INTO `showing` VALUES (40,9,2,'2022-06-24 16:30:00'),(41,6,3,'2022-06-24 16:30:00');
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
  `numRows` int DEFAULT '10',
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
INSERT INTO `showroom` VALUES (1,'Royal',100,10),(2,'Boyd',50,10),(3,'SG',10,2);
/*!40000 ALTER TABLE `showroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `showseat`
--

DROP TABLE IF EXISTS `showseat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `showseat` (
  `showSeatId` int NOT NULL AUTO_INCREMENT,
  `showId` int NOT NULL,
  `seatNum` varchar(3) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `orderId` int DEFAULT NULL,
  PRIMARY KEY (`showSeatId`),
  KEY `FK_showseat_show` (`showId`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `FK_showseat_show` FOREIGN KEY (`showId`) REFERENCES `showing` (`showId`),
  CONSTRAINT `showseat_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `showseat`
--

LOCK TABLES `showseat` WRITE;
/*!40000 ALTER TABLE `showseat` DISABLE KEYS */;
INSERT INTO `showseat` VALUES (72,40,'A1',0,NULL),(73,40,'A2',0,NULL),(74,40,'A3',0,NULL),(75,40,'A4',0,NULL),(76,40,'A5',0,NULL),(77,40,'B1',0,NULL),(78,40,'B2',0,NULL),(79,40,'B3',0,NULL),(80,40,'B4',0,NULL),(81,40,'B5',0,NULL),(82,40,'C1',0,NULL),(83,40,'C2',0,NULL),(84,40,'C3',0,NULL),(85,40,'C4',0,NULL),(86,40,'C5',0,NULL),(87,40,'D1',0,NULL),(88,40,'D2',0,NULL),(89,40,'D3',0,NULL),(90,40,'D4',0,NULL),(91,40,'D5',0,NULL),(92,40,'E1',0,NULL),(93,40,'E2',0,NULL),(94,40,'E3',0,NULL),(95,40,'E4',0,NULL),(96,40,'E5',0,NULL),(97,40,'F1',0,NULL),(98,40,'F2',0,NULL),(99,40,'F3',0,NULL),(100,40,'F4',0,NULL),(101,40,'F5',0,NULL),(102,40,'G1',0,NULL),(103,40,'G2',0,NULL),(104,40,'G3',0,NULL),(105,40,'G4',0,NULL),(106,40,'G5',0,NULL),(107,40,'H1',0,NULL),(108,40,'H2',0,NULL),(109,40,'H3',0,NULL),(110,40,'H4',0,NULL),(111,40,'H5',0,NULL),(112,40,'I1',0,NULL),(113,40,'I2',0,NULL),(114,40,'I3',0,NULL),(115,40,'I4',0,NULL),(116,40,'I5',0,NULL),(117,40,'J1',0,NULL),(118,40,'J2',0,NULL),(119,40,'J3',0,NULL),(120,40,'J4',0,NULL),(121,40,'J5',0,NULL),(122,41,'A1',1,NULL),(123,41,'A2',1,NULL),(124,41,'A3',1,NULL),(125,41,'A4',0,NULL),(126,41,'A5',0,NULL),(127,41,'B1',0,NULL),(128,41,'B2',0,NULL),(129,41,'B3',1,NULL),(130,41,'B4',0,NULL),(131,41,'B5',1,NULL);
/*!40000 ALTER TABLE `showseat` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (76,'Luke','Dinkla','pojgik@gmail.com','$2a$10$8IA5hZ5Uu1tcufQBJS1BhORo4w.QLpe8AkfYP09f4rW.EmhyUgky2','ADMIN','ACTIVE',NULL,0,'6786305328',NULL),(84,'Luke','Dinkla','luke.dinkla@gmail.com','$2a$10$dWq.pcX3Lslmi5EwrvA0Q.LcwLWkcyjNA4Vcpw6j7OZ.24h1vkcly','CUSTOMER','ACTIVE',NULL,1,'1234567890',NULL),(85,'Tristan','Dominy','tristandominy413@gmail.com','$2a$10$ZSHuq41EV9wkOfxdkaEUn.naMWnUdUeguHyzr5uNR1hXLpp8REo3u','ADMIN','ACTIVE',NULL,0,'7708648980',NULL);
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

-- Dump completed on 2023-05-03 22:35:42
