-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 26, 2024 at 10:32 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `telemedicine`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int(11) NOT NULL,
  `patientUsername` varchar(20) NOT NULL,
  `patientName` varchar(50) NOT NULL,
  `patientEmail` varchar(50) NOT NULL,
  `patientAge` varchar(10) NOT NULL,
  `patientGender` varchar(10) NOT NULL,
  `doctorName` varchar(20) NOT NULL,
  `staffNumber` varchar(20) NOT NULL,
  `appointmentDate` varchar(20) NOT NULL,
  `appointmentTime` varchar(20) NOT NULL,
  `appointmentReason` varchar(500) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `patientUsername`, `patientName`, `patientEmail`, `patientAge`, `patientGender`, `doctorName`, `staffNumber`, `appointmentDate`, `appointmentTime`, `appointmentReason`, `status`) VALUES
(11, 'patient1', 'stan steve', '2345sssd@gmail.com', '23', 'male', 'test doctor', '123456', '2024-05-17', '02:04', ' I hahysdvsd sdiidfibdf ', 'approved'),
(15, 'patient1', 'stan steve', '2345sssd@gmail.com', '23', 'male', 'Dr Smith', '654321', '2024-05-16', '12:58', 'I feel traumas affecting me lately', 'pending'),
(16, 'patient1', 'stan steve', '2345sssd@gmail.com', '23', 'male', 'Dr. Michael', '123457', '2024-05-10', '23:12', 'I am really feeling akward inmy stomach', 'pending'),
(17, 'patient1', 'stan steve', '2345sssd@gmail.com', '23', 'male', 'Dr. Michael', '123457', '2024-05-10', '11:28', 'I need your help in curing this headache', 'pending'),
(18, 'patient1', 'stan steve', '2345sssd@gmail.com', '23', 'male', 'test doctor', '123456', '2019-02-26', '05:47', 'I would like a checkup', 'approved'),
(19, 'patient1', 'stan steve', '2345sssd@gmail.com', '23', 'male', 'test doctor', '123456', '2020-02-05', '04:18', 'I am not well and I want your assistance', 'approved');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `staffNumber` int(11) NOT NULL,
  `doctor_name` varchar(50) NOT NULL,
  `doctor_email` varchar(50) DEFAULT NULL,
  `doctor_password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`staffNumber`, `doctor_name`, `doctor_email`, `doctor_password`) VALUES
(123456, 'test doctor', 'test@gmail.com', 'test'),
(123457, 'Dr. Michael', 'michael@gmail.com', 'michael123'),
(654321, 'Dr Smith', 'smith@gmail.com', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `patientUsername` varchar(50) NOT NULL,
  `patient_name` varchar(50) NOT NULL,
  `patient_age` int(11) DEFAULT NULL,
  `patient_phone` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `patient_email` varchar(50) NOT NULL,
  `patient_gender` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`patientUsername`, `patient_name`, `patient_age`, `patient_phone`, `password`, `patient_email`, `patient_gender`) VALUES
('mike1', 'Michael Allan', 14, '355234567878', 'patient1', 'mike@gmail.com', 'male'),
('nicolas1', 'nicolas cage', 5, '355123456789', 'nicolas123', 'nocolas@gmail.com', 'male'),
('patient1', 'stan steve', 23, '01234567890', 'patient1', '2345sssd@gmail.com', 'male'),
('Rael1', 'Rael Faith', 2, '355242537475', 'rael1', 'rael@gmail.com', 'female');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL,
  `staffNumber` int(11) NOT NULL,
  `scheduleDate` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `availability` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `treatment`
--

CREATE TABLE `treatment` (
  `id` int(11) NOT NULL,
  `staffNumber` varchar(20) NOT NULL,
  `doctorName` varchar(50) NOT NULL,
  `patientUsername` varchar(20) NOT NULL,
  `patientName` varchar(50) NOT NULL,
  `patientAge` varchar(10) NOT NULL,
  `patientEmail` varchar(50) NOT NULL,
  `dat` varchar(100) NOT NULL,
  `symptoms` varchar(500) NOT NULL,
  `diagnosis` varchar(500) NOT NULL,
  `dose` varchar(20) NOT NULL,
  `ussage` varchar(10) NOT NULL,
  `bill` varchar(20) NOT NULL,
  `medicaid` varchar(10) NOT NULL,
  `rating` varchar(10) DEFAULT NULL,
  `review` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `treatment`
--

INSERT INTO `treatment` (`id`, `staffNumber`, `doctorName`, `patientUsername`, `patientName`, `patientAge`, `patientEmail`, `dat`, `symptoms`, `diagnosis`, `dose`, `ussage`, `bill`, `medicaid`, `rating`, `review`) VALUES
(4, '123456', 'test doctor', 'patient1', 'stan steve', '23', '2345sssd@gmail.com', '2024-05-12T12:25:47.415Z', 'you had severe headache', 'MAlaria \nand Fatigue', 'Fascida', '2', '234', 'yes', '5', 'I was happy about how I feel right now after your Assistance.'),
(6, '123456', 'test doctor', 'patient1', 'stan steve', '23', '2345sssd@gmail.com', '2024-05-16T16:00:45.981Z', 'Headache\nFever', 'Malaria', 'Glycomodelo', '2', '200', 'yes', NULL, NULL),
(7, '123456', 'test doctor', 'patient1', 'stan steve', '23', '2345sssd@gmail.com', '2024-05-16T23:49:51.442Z', 'migrane\ndiarrhoea', 'Gastritis', 'Mycorpidea', '3', '23000', 'yes', '4', 'Than you for your assistance. I feel wonderful now'),
(8, '123456', 'test doctor', 'patient1', 'stan steve', '23', '2345sssd@gmail.com', '2024-05-17T01:19:36.900Z', 'fever \nheadache\ncough', 'Malaria', 'Malaria Tablets', '3', '25', 'yes', '5', 'Thank you for treating me Malaria.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`staffNumber`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`patientUsername`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `treatment`
--
ALTER TABLE `treatment`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `treatment`
--
ALTER TABLE `treatment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
