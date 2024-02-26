-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: localhost    Database: pinpon
-- ------------------------------------------------------
-- Server version	8.2.0

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

CREATE DATABASE IF NOT EXISTS pinpon
--
-- Table structure for table `FireStationRobots`
--

USE `pinpon`;

DROP TABLE IF EXISTS `FireStationRobots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FireStationRobots` (
  `fireStationId` int unsigned NOT NULL,
  `robotId` int unsigned NOT NULL,
  PRIMARY KEY (`fireStationId`,`robotId`),
  KEY `robotId` (`robotId`),
  CONSTRAINT `firestationrobots_ibfk_1` FOREIGN KEY (`fireStationId`) REFERENCES `firestations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `firestationrobots_ibfk_2` FOREIGN KEY (`robotId`) REFERENCES `robots` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FireStationRobots`
--

LOCK TABLES `FireStationRobots` WRITE;
/*!40000 ALTER TABLE `FireStationRobots` DISABLE KEYS */;
/*!40000 ALTER TABLE `FireStationRobots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `firestations`
--

DROP TABLE IF EXISTS `firestations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `firestations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `locationGps` point DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `firestations`
--

LOCK TABLES `firestations` WRITE;
/*!40000 ALTER TABLE `firestations` DISABLE KEYS */;
/*!40000 ALTER TABLE `firestations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obstacles`
--

DROP TABLE IF EXISTS `obstacles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `obstacles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('Mer','Terre','Foret') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obstacles`
--

LOCK TABLES `obstacles` WRITE;
/*!40000 ALTER TABLE `obstacles` DISABLE KEYS */;
INSERT INTO `obstacles` VALUES (1,'Mer'),(2,'Foret');
/*!40000 ALTER TABLE `obstacles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RobotObstacles`
--

DROP TABLE IF EXISTS `RobotObstacles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RobotObstacles` (
  `robotId` int unsigned NOT NULL,
  `obstacleId` int unsigned NOT NULL,
  PRIMARY KEY (`robotId`,`obstacleId`),
  KEY `obstacleId` (`obstacleId`),
  CONSTRAINT `robotobstacles_ibfk_1` FOREIGN KEY (`robotId`) REFERENCES `robots` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `robotobstacles_ibfk_2` FOREIGN KEY (`obstacleId`) REFERENCES `obstacles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RobotObstacles`
--

LOCK TABLES `RobotObstacles` WRITE;
/*!40000 ALTER TABLE `RobotObstacles` DISABLE KEYS */;
/*!40000 ALTER TABLE `RobotObstacles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `robots`
--

DROP TABLE IF EXISTS `robots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `robots` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `isHome` tinyint(1) DEFAULT NULL,
  `speed` int DEFAULT NULL,
  `mobility` varchar(128) DEFAULT NULL,
  `type` varchar(128) DEFAULT NULL,
  `firespread` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `robots`
--

LOCK TABLES `robots` WRITE;
/*!40000 ALTER TABLE `robots` DISABLE KEYS */;
INSERT INTO `robots` VALUES (1,'Michello',1,5,'Wheeled','Service Robot');
/*!40000 ALTER TABLE `robots` ENABLE KEYS */;
INSERT INTO `robots` VALUES (2,'Reparing',1,3,'Ramping','Repair Robot');
INSERT INTO `robots` VALUES (3,'Michello',1,50,'Swimming','Malade Mentale');

UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-19 10:07:31