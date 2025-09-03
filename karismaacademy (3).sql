-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2025 at 03:48 AM
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
-- Database: `karismaacademy`
--

-- --------------------------------------------------------

--
-- Table structure for table `achievements`
--

CREATE TABLE `achievements` (
  `achievement_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `achievements`
--

INSERT INTO `achievements` (`achievement_id`, `name`, `description`, `image`) VALUES
(6, 'Master CybSec', 'Kamu telah menyelesaikan Program Bootcamp Cybersecurity Fundamentals', '1756782212672-Hack-removebg-preview.png'),
(8, 'Intermediate Designer', 'Wow, You Made it!', '1754472981454-Designn-removebg-preview.png'),
(10, 'Perfectionist', 'Perfect', '1754473014782-Perfectionist-removebg-preview.png'),
(11, 'Full-Stack Dev', 'Kamu telah menyelesaikan Program Bootcamp Full-Stack Web Dev', '1754472963237-Fullst-removebg-preview.png'),
(13, 'Golang', 'Sudah menyelesaikan program Bootcamp Back end Golang', '1754472896439-GO-removebg-preview.png'),
(14, 'Game Dev', 'Kamu telah menyelesaikan Program Bootcamp Game Development Unity', '1756782290196-Gamed-removebg-preview.png'),
(15, 'Cloud Engineer', 'Kamu telah menyelesaikan Program Bootcamp Cloud Engineer (AWS/GCP)', '1756782614217-Cloud.png'),
(16, 'UI / UX', 'Kamu telah menyelesaikan Program Bootcamp UI/UX & Product Design', '1756782705300-Ui-removebg-preview.png'),
(17, 'Mob Dev', 'Kamu telah menyelesaikan Program Bootcamp Mobile Development (Flutter)', '1756782811181-Flutt-removebg-preview.png');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_comments`
--

CREATE TABLE `blog_comments` (
  `id` int(11) NOT NULL,
  `blog_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `certificate`
--

CREATE TABLE `certificate` (
  `certificate_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `bootcamp_id` int(11) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `issued_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `admin_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `transaction_id` int(11) DEFAULT NULL,
  `enrolled_at` datetime DEFAULT current_timestamp(),
  `status` enum('pending','active','expired','suspended') DEFAULT 'pending',
  `progress` decimal(5,2) DEFAULT 0.00,
  `completed_at` datetime DEFAULT NULL,
  `certificate_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`id`, `user_id`, `program_id`, `transaction_id`, `enrolled_at`, `status`, `progress`, `completed_at`, `certificate_url`, `created_at`, `updated_at`) VALUES
(1, 8, 28, 4, '2025-08-05 01:41:46', 'pending', 0.00, NULL, NULL, '2025-08-05 01:41:46', '2025-08-05 01:41:46'),
(2, 9, 28, 5, '2025-08-05 02:25:31', 'pending', 0.00, NULL, NULL, '2025-08-05 02:25:31', '2025-08-05 02:25:31'),
(3, 11, 28, 7, '2025-08-05 14:37:32', 'pending', 0.00, NULL, NULL, '2025-08-05 07:37:32', '2025-08-05 07:37:32'),
(6, 13, 28, 10, '2025-08-05 15:25:50', 'pending', 0.00, NULL, NULL, '2025-08-05 08:25:50', '2025-08-05 08:25:50'),
(8, 14, 28, 12, '2025-08-05 15:28:40', 'pending', 0.00, NULL, NULL, '2025-08-05 08:28:40', '2025-08-05 08:28:40'),
(9, 15, 28, 13, '2025-08-05 15:32:47', 'pending', 0.00, NULL, NULL, '2025-08-05 08:32:47', '2025-08-05 08:32:47'),
(10, 16, 28, 14, '2025-08-05 15:35:15', 'pending', 0.00, NULL, NULL, '2025-08-05 08:35:15', '2025-08-05 08:35:15'),
(11, 17, 28, 15, '2025-08-05 16:14:50', 'pending', 0.00, NULL, NULL, '2025-08-05 09:14:50', '2025-08-05 09:14:50'),
(12, 18, 28, 16, '2025-08-05 16:35:13', 'pending', 0.00, NULL, NULL, '2025-08-05 09:35:13', '2025-08-05 09:35:13'),
(14, 19, 28, 18, '2025-08-05 16:36:26', 'pending', 0.00, NULL, NULL, '2025-08-05 09:36:26', '2025-08-05 09:36:26'),
(15, 20, 28, 19, '2025-08-05 16:44:28', 'active', 0.00, NULL, NULL, '2025-08-05 09:44:28', '2025-08-05 09:44:43'),
(16, 21, 28, 20, '2025-08-05 16:52:15', 'active', 0.00, NULL, NULL, '2025-08-05 09:52:15', '2025-08-05 09:52:30'),
(17, 22, 28, 21, '2025-08-05 16:56:53', 'active', 0.00, NULL, NULL, '2025-08-05 09:56:53', '2025-08-05 09:57:06'),
(18, 23, 28, 22, '2025-08-05 18:56:17', 'active', 0.00, NULL, NULL, '2025-08-05 11:56:17', '2025-08-05 11:56:34'),
(19, 23, 31, 23, '2025-08-06 08:54:44', 'active', 0.00, NULL, NULL, '2025-08-06 01:54:44', '2025-08-06 01:55:12'),
(20, 11, 31, 24, '2025-08-06 09:27:07', 'active', 0.00, NULL, NULL, '2025-08-06 02:27:07', '2025-08-06 02:27:26'),
(21, 13, 31, 25, '2025-08-06 09:27:57', 'active', 0.00, NULL, NULL, '2025-08-06 02:27:57', '2025-08-06 02:28:09'),
(22, 13, 32, 26, '2025-08-07 16:37:06', 'active', 0.00, NULL, NULL, '2025-08-07 09:37:06', '2025-08-07 09:37:25'),
(24, 23, 32, 28, '2025-08-08 08:39:50', 'active', 0.00, NULL, NULL, '2025-08-08 01:39:50', '2025-08-08 01:40:02'),
(34, 23, 35, 38, '2025-08-08 09:24:24', 'active', 0.00, NULL, NULL, '2025-08-08 02:24:24', '2025-08-08 02:24:41'),
(35, 24, 35, 39, '2025-08-08 09:38:57', 'active', 0.00, NULL, NULL, '2025-08-08 02:38:57', '2025-08-08 02:41:11'),
(36, 24, 31, 40, '2025-08-08 09:41:47', 'active', 0.00, NULL, NULL, '2025-08-08 02:41:47', '2025-08-08 02:43:06'),
(37, 24, 28, 41, '2025-08-08 09:44:41', 'active', 0.00, NULL, NULL, '2025-08-08 02:44:41', '2025-08-08 02:46:00'),
(38, 24, 33, 42, '2025-08-08 09:46:36', 'active', 0.00, NULL, NULL, '2025-08-08 02:46:36', '2025-08-08 02:50:52'),
(40, 23, 33, 44, '2025-08-29 13:20:05', 'active', 0.00, NULL, NULL, '2025-08-29 06:20:05', '2025-08-29 06:21:22'),
(41, 22, 31, 45, '2025-09-01 11:25:36', 'active', 0.00, NULL, NULL, '2025-09-01 04:25:36', '2025-09-01 04:26:05'),
(42, 22, 32, 46, '2025-09-01 11:33:56', 'active', 0.00, NULL, NULL, '2025-09-01 04:33:56', '2025-09-01 04:34:29'),
(43, 22, 33, 47, '2025-09-01 11:38:44', 'active', 0.00, NULL, NULL, '2025-09-01 04:38:44', '2025-09-01 04:39:17'),
(44, 22, 35, 48, '2025-09-01 14:04:56', 'active', 0.00, NULL, NULL, '2025-09-01 07:04:56', '2025-09-01 07:05:11'),
(45, 21, 33, 49, '2025-09-01 14:26:50', 'active', 0.00, NULL, NULL, '2025-09-01 07:26:50', '2025-09-01 07:27:07'),
(46, 25, 39, 50, '2025-09-02 10:57:43', 'active', 0.00, NULL, NULL, '2025-09-02 03:57:43', '2025-09-02 03:57:57'),
(47, 25, 38, 51, '2025-09-02 10:58:23', 'active', 0.00, NULL, NULL, '2025-09-02 03:58:23', '2025-09-02 03:58:46'),
(49, 25, 31, 53, '2025-09-02 11:07:43', 'active', 0.00, NULL, NULL, '2025-09-02 04:07:43', '2025-09-02 04:08:08'),
(50, 25, 37, 54, '2025-09-02 11:10:05', 'active', 0.00, NULL, NULL, '2025-09-02 04:10:05', '2025-09-02 04:10:48'),
(51, 25, 36, 55, '2025-09-02 11:12:53', 'active', 0.00, NULL, NULL, '2025-09-02 04:12:53', '2025-09-02 04:13:28'),
(52, 25, 35, 56, '2025-09-02 11:14:08', 'active', 0.00, NULL, NULL, '2025-09-02 04:14:08', '2025-09-02 04:14:51'),
(53, 25, 33, 57, '2025-09-02 11:15:10', 'active', 0.00, NULL, NULL, '2025-09-02 04:15:10', '2025-09-02 04:15:27'),
(54, 25, 32, 58, '2025-09-02 11:15:48', 'active', 0.00, NULL, NULL, '2025-09-02 04:15:48', '2025-09-02 04:16:01'),
(55, 25, 28, 59, '2025-09-02 11:16:24', 'active', 0.00, NULL, NULL, '2025-09-02 04:16:24', '2025-09-02 04:16:36');

-- --------------------------------------------------------

--
-- Table structure for table `inbox`
--

CREATE TABLE `inbox` (
  `message_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `instructor`
--

CREATE TABLE `instructor` (
  `instructor_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mastery` enum('Graphic Design & Branding','Full-Stack Web Development','Back-End Development: Golang','UI/UX & Product Design','Data Science & Machine Learning','Mobile Development (Flutter)','Cyber Security','Cloud Engineer (AWS/GCP)','Game Development Unity') DEFAULT NULL,
  `status` enum('Active','Unactive') NOT NULL DEFAULT 'Active',
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instructor`
--

INSERT INTO `instructor` (`instructor_id`, `name`, `email`, `mastery`, `status`, `image`) VALUES
(13, 'Jane ', 'kyoo@gmail.com', 'Full-Stack Web Development', 'Active', '1754473056697-641394984.jpg'),
(14, 'Aji', 'drown@gmail.com', 'Graphic Design & Branding', 'Active', '1754473047887-288806467.jpg'),
(16, 'Caroline', 'tes@gmail.com', 'Full-Stack Web Development', 'Active', '1754380643593-788095440.jpg'),
(17, 'Andrew', 'andrew@gmail.com', 'Back-End Development: Golang', 'Active', '1756781396526-384894477.png'),
(18, 'William', 'william@gmail.com', 'UI/UX & Product Design', 'Active', '1756781440777-130713458.jpg'),
(19, 'kipli', 'kipli@gmail.com', 'Data Science & Machine Learning', 'Active', '1756781514603-653632867.jpg'),
(20, 'Leo', 'leo@gmail.com', 'Mobile Development (Flutter)', 'Active', '1756781548882-786959566.png'),
(21, 'Sifu', 'sifu@gmail.com', 'Cyber Security', 'Active', '1756781615279-898395961.jpg'),
(22, 'Knucle', 'knucle@gmail.com', 'Cloud Engineer (AWS/GCP)', 'Active', '1756781835297-427146346.jpg'),
(23, 'Naruto', 'narto@gmail.com', 'Game Development Unity', 'Active', '1756781876575-665378587.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `jawaban`
--

CREATE TABLE `jawaban` (
  `id` int(11) NOT NULL,
  `jawaban` varchar(250) NOT NULL,
  `id_soal` int(11) NOT NULL,
  `benar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jawaban`
--

INSERT INTO `jawaban` (`id`, `jawaban`, `id_soal`, `benar`) VALUES
(9, 'Alat Design', 3, 1),
(10, 'Bahasa Pemrograman', 3, 0),
(11, 'Alat ngoding', 3, 0),
(12, 'Alat Mekanik', 3, 0),
(13, 'Alat Design Untuk Portfolio', 4, 0),
(14, 'Jawaban A & C Benar', 4, 1),
(15, 'Alat Untuk Design Mockup Website', 4, 0),
(16, 'Bahasa Pemrograman', 4, 0),
(25, 'test', 7, 0),
(26, 'ya', 7, 1),
(27, 'ntah', 7, 0),
(28, 'tidak', 7, 0),
(33, 'Ya', 9, 1),
(34, 'Ga', 9, 0),
(35, 'Yes', 9, 0),
(36, 'No', 9, 0),
(37, '1', 10, 0),
(38, '2', 10, 1),
(39, '3', 10, 0),
(40, '4', 10, 0),
(41, 'satu', 11, 0),
(42, 'dua', 11, 0),
(43, 'tiga', 11, 0),
(44, 'empat', 11, 1),
(45, 'ga', 12, 0),
(46, 'e', 12, 0),
(47, 'dd', 12, 1),
(48, 't', 12, 0),
(49, 'Benar', 13, 1),
(50, 'Salah', 13, 0),
(51, 'Hampir', 13, 0),
(52, 'Menengah', 13, 0),
(53, 'Ya', 14, 0),
(54, 'Mungkin', 14, 0),
(55, 'Tidak', 14, 0),
(56, 'Hampir', 14, 1),
(57, 'Ya', 15, 0),
(58, 'dua', 15, 1),
(59, 'tiga', 15, 0),
(60, 'empat', 15, 0),
(61, 'Alat Design', 16, 1),
(62, 'dua', 16, 0),
(63, '3', 16, 0),
(64, 'Alat Mekanik', 16, 0),
(65, 'Ya', 17, 0),
(66, 'Ga', 17, 0),
(67, 'tiga', 17, 1),
(68, '4', 17, 0),
(69, 'Alat Design', 18, 1),
(70, 'Ga', 18, 0),
(71, 'Alat ngoding', 18, 0),
(72, 'Alat Mekanik', 18, 0),
(73, 'satu', 19, 0),
(74, 'dua', 19, 1),
(75, '3', 19, 0),
(76, 'empat', 19, 0),
(77, 'satu', 20, 0),
(78, 'dua', 20, 1),
(79, 'tiga', 20, 0),
(80, 'empat', 20, 0),
(81, 'Alat Design', 21, 1),
(82, 'Bahasa Pemrograman', 21, 0),
(83, 'Alat ngoding', 21, 0),
(84, 'Alat Mekanik', 21, 0),
(85, 'Perfect', 22, 1),
(86, 'Minus', 22, 0),
(87, 'Medium', 22, 0),
(88, 'Hard', 22, 0),
(89, 'Ya', 23, 0),
(90, 'Ga', 23, 0),
(91, 'Yes', 23, 0),
(92, 'No', 23, 1),
(93, 'Alat Design', 24, 0),
(94, 'Bahasa Pemrograman', 24, 1),
(95, 'Alat ngoding', 24, 0),
(96, 'empat', 24, 0),
(97, 'Ya', 25, 0),
(98, 'Ga', 25, 0),
(99, 'Yes', 25, 1),
(100, 'No', 25, 0),
(101, 'Alat Design', 26, 1),
(102, 'Bahasa Pemrograman', 26, 0),
(103, 'Alat ngoding', 26, 0),
(104, 'Alat Mekanik', 26, 0),
(105, 'Ya', 27, 0),
(106, 'b', 27, 1),
(107, 'c', 27, 0),
(108, 'empat', 27, 0),
(109, 'a', 28, 0),
(110, 'b', 28, 0),
(111, 'c', 28, 0),
(112, 'd', 28, 1),
(113, 'Ya', 29, 0),
(114, 'Bahasa Pemrograman', 29, 1),
(115, 'tiga', 29, 0),
(116, '4', 29, 0),
(117, 'Alat Design', 30, 1),
(118, 'Bahasa Pemrograman', 30, 0),
(119, 'Alat ngoding', 30, 0),
(120, 'd', 30, 0);

-- --------------------------------------------------------

--
-- Table structure for table `pricing_benefits`
--

CREATE TABLE `pricing_benefits` (
  `benefit_id` int(11) NOT NULL,
  `pricing_id` int(11) NOT NULL,
  `benefit` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pricing_benefits`
--

INSERT INTO `pricing_benefits` (`benefit_id`, `pricing_id`, `benefit`, `created_at`) VALUES
(1, 1, 'Live Online Class intensif dan seru', '2025-08-07 14:43:57'),
(2, 1, 'Lifetime Access Materi (Modul Belajar, Video Pembelajaran)', '2025-08-07 14:43:57'),
(3, 1, 'Actual Case Study & Portofolio Development', '2025-08-07 14:43:57'),
(4, 1, 'Sesi English & Mental Health bareng profesional', '2025-08-07 14:43:57'),
(5, 1, 'Freelance/Part Time Project untuk alumni', '2025-08-07 14:43:57'),
(6, 1, 'Job-ready Asset & Career Mentoring terarah', '2025-08-07 14:43:57'),
(7, 1, 'Program Job Preparation & Connector +3 Bulan', '2025-08-07 14:43:57'),
(8, 1, 'Magang/Apprenticeship real project', '2025-08-07 14:43:57'),
(9, 1, 'Konsultasi Karir 1-on-1 fleksibel, kapan saja', '2025-08-07 14:43:57'),
(10, 1, 'Garansi Karir: Refund sampai 110% jika belum bekerja > 1 tahun', '2025-08-07 14:43:57'),
(11, 2, 'Live Online Class intensif dan seru', '2025-08-07 14:43:57'),
(12, 2, 'Lifetime Access Materi (Modul Belajar, Video Pembelajaran)', '2025-08-07 14:43:57'),
(13, 2, 'Actual Case Study & Portofolio Development', '2025-08-07 14:43:57'),
(14, 2, 'Sesi English & Mental Health bareng profesional', '2025-08-07 14:43:57'),
(15, 2, 'Freelance/Part Time Project untuk alumni', '2025-08-07 14:43:57'),
(16, 7, 'Live Online Class intensif dan seru', '2025-08-29 15:45:55'),
(17, 7, 'Lifetime Access Materi (Modul Belajar, Video Pembelajaran)', '2025-08-29 15:45:55'),
(18, 7, 'Actual Case Study & Portofolio Development', '2025-08-29 15:45:55'),
(19, 7, 'Sesi English & Mental Health bareng profesional', '2025-08-29 15:45:55'),
(20, 7, 'Freelance/Part Time Project untuk alumni', '2025-08-29 15:45:55'),
(21, 7, 'Job-ready Asset & Career Mentoring terarah', '2025-08-29 15:45:55'),
(22, 7, 'Program Job Preparation & Connector +3 Bulan', '2025-08-29 15:45:55'),
(23, 7, 'Magang/Apprenticeship real project', '2025-08-29 15:45:55'),
(24, 7, 'Konsultasi Karir 1-on-1 fleksibel, kapan saja', '2025-08-29 15:45:55'),
(25, 7, 'Garansi Karir: Refund sampai 110% jika belum bekerja > 1 tahun', '2025-08-29 15:45:55'),
(26, 8, 'Live Online Class intensif dan seru', '2025-08-29 15:45:55'),
(27, 8, 'Lifetime Access Materi (Modul Belajar, Video Pembelajaran)', '2025-08-29 15:45:55'),
(28, 8, 'Actual Case Study & Portofolio Development', '2025-08-29 15:45:55'),
(29, 8, 'Sesi English & Mental Health bareng profesional', '2025-08-29 15:45:55'),
(30, 8, 'Freelance/Part Time Project untuk alumni', '2025-08-29 15:45:55');

-- --------------------------------------------------------

--
-- Table structure for table `program`
--

CREATE TABLE `program` (
  `program_id` int(11) NOT NULL,
  `harga` decimal(10,2) DEFAULT NULL,
  `image_cover` varchar(255) DEFAULT NULL,
  `categories` enum('Bootcamp','Free Class') NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `deskripsi_2` text DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `career_title` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `instructor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program`
--

INSERT INTO `program` (`program_id`, `harga`, `image_cover`, `categories`, `deskripsi`, `deskripsi_2`, `title`, `career_title`, `created_at`, `instructor_id`) VALUES
(28, 3000000.00, '1754465157278-Bootcamp Graphic Design & Branding.png', 'Bootcamp', 'Apakah kamu tertarik menjadi graphic designer profesional tapi bingung harus mulai dari mana? Sudah belajar otodidak tapi desainmu masih terasa kurang rapi dan tidak konsisten? Belum punya portofolio yang kuat untuk melamar kerja atau freelance? Atau mungkin belum memahami cara membangun identitas brand yang kuat dan efektif di mata audiens?', NULL, 'Graphic Design & Branding', 'Desainer Grafis', '2025-08-04 05:59:11', 14),
(29, 0.00, '1756691254567-Datascience.png', 'Free Class', 'freeclass', NULL, 'tea', NULL, '2025-08-05 00:51:45', 14),
(31, 4271040.00, '1754444981320-fullstack.png', 'Bootcamp', 'Apakah kamu ingin menjadi developer tapi bingung harus mulai belajar dari mana? Sudah mencoba belajar mandiri tapi materi terasa tidak terstruktur? Tidak memiliki portofolio yang cukup untuk melamar kerja? Belum percaya diri dengan skill coding yang dimiliki? Bingung teknologi apa saja yang benar-benar dibutuhkan di industri saat ini?', '', 'Full-Stack Web Development', 'Web Programming', '2025-08-06 08:47:22', 13),
(32, 3000000.00, '1754467418761-Bootcamp Back-End Development Golang.png', 'Bootcamp', 'Pernah dengar istilah data science tapi bingung harus mulai dari mana? Punya data tapi tidak tahu bagaimana mengolah dan menganalisisnya? Bingung membedakan antara machine learning dan AI? Belum punya portofolio project yang bisa menunjukkan kemampuan analisis datamu?', NULL, 'Back-End Development: Golang', 'Golang Developer', '2025-08-06 15:03:38', 16),
(33, 3000000.00, '1754491799527-Bootcamp UIUX & Product Design.png', 'Bootcamp', 'Tertarik di dunia desain tapi bingung membedakan antara UI dan UX? Sering bingung bagaimana membuat desain yang tidak hanya indah tapi juga fungsional? Belum pernah riset pengguna atau membuat prototipe yang efektif? Ingin punya portofolio desain profesional untuk melamar kerja di bidang digital product?', NULL, 'UI/UX & Product Design', 'UI/UX Designer', '2025-08-06 21:49:59', 16),
(35, 3500000.00, '1754618622305-Datascience.png', 'Bootcamp', 'Pernah dengar istilah data science tapi bingung harus mulai dari mana? Punya data tapi tidak tahu bagaimana mengolah dan menganalisisnya? Bingung membedakan antara machine learning dan AI? Belum punya portofolio project yang bisa menunjukkan kemampuan analisis datamu?', NULL, 'Data Science & Machine Learning', 'Data Scientist', '2025-08-08 09:03:42', 19),
(36, 3200000.00, '1756781023186-MobDev.png', 'Bootcamp', 'Pengen bikin aplikasi mobile tapi bingung harus pakai teknologi apa? Sudah coba belajar Flutter tapi kesulitan membangun project dari nol? Belum punya portofolio aplikasi yang bisa ditunjukkan ke recruiter? Bingung gimana cara publish aplikasi ke Play Store atau App Store?', NULL, 'Mobile Development (Flutter)', NULL, '2025-09-02 09:43:43', 20),
(37, 3500000.00, '1756781103042-CybSec.png', 'Bootcamp', 'Penasaran gimana cara kerja sistem keamanan digital? Belum paham cara melindungi data pribadi dan jaringan dari ancaman siber? Bingung mulai dari mana buat bangun karier di dunia cybersecurity? Ingin belajar ethical hacking tapi takut nggak punya background IT?', NULL, 'Cybersecurity Fundamentals', NULL, '2025-09-02 09:45:03', 21),
(38, 3800000.00, '1756781169552-Bootcamp Back-End Development Golang.png', 'Bootcamp', 'Ingin berkarier di bidang Cloud tapi bingung harus mulai dari AWS atau GCP? Masih belum paham cara kerja cloud infrastructure dan deployment? Belum tahu tools dan konsep penting seperti Docker, CI/CD, atau Kubernetes? Ingin punya sertifikasi cloud tapi butuh panduan belajar yang jelas dan terstruktur?', NULL, ' Cloud Engineer (AWS/GCP)', NULL, '2025-09-02 09:46:09', 22),
(39, 2800000.00, '1756781233231-UnityGameDev.png', 'Bootcamp', 'Punya passion di dunia game tapi bingung cara mulai bikin game sendiri? Belum paham Unity dan C# untuk pengembangan game? Kesulitan membuat gameplay, animasi, dan interaksi dalam game? Ingin punya portofolio game yang menarik tapi tidak tahu harus mulai dari mana? Yuk bangun skill-mu dan wujudkan impian jadi Game Developer!', NULL, 'Game Development Unity', NULL, '2025-09-02 09:47:13', 23);

-- --------------------------------------------------------

--
-- Table structure for table `program_achievements`
--

CREATE TABLE `program_achievements` (
  `id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `achievement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program_achievements`
--

INSERT INTO `program_achievements` (`id`, `program_id`, `achievement_id`) VALUES
(27, 28, 8),
(28, 32, 13),
(30, 31, 11),
(32, 29, 8),
(33, 29, 6),
(34, 35, 10),
(35, 33, 16),
(40, 39, 14),
(41, 38, 15),
(42, 37, 6),
(43, 36, 17);

-- --------------------------------------------------------

--
-- Table structure for table `program_facts`
--

CREATE TABLE `program_facts` (
  `id` int(11) NOT NULL,
  `program_id` int(11) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program_facts`
--

INSERT INTO `program_facts` (`id`, `program_id`, `text`) VALUES
(1, 31, 'Permintaan Fullstack Developer Tinggi'),
(2, 31, 'Fleksibel: Bisa Frontend & Backend'),
(3, 31, 'Bisa Bekerja di Banyak Jenis Industri'),
(4, 31, 'Jenjang Karier Luas: DevOps, CTO, dll'),
(5, 31, 'Gaji Kompetitif di Pasar Global'),
(6, 35, 'Data Scientist Sangat Dicari di Era Digital'),
(7, 35, 'Skill Bisa Dipakai di Banyak Sektor Industri'),
(8, 35, 'Gaji Kompetitif dan Peluang Karier Global'),
(9, 35, 'Kuasai Tools Populer: Python, SQL, TensorFlow'),
(10, 35, 'Kontribusi Nyata dalam Pengambilan Keputusan'),
(11, 33, 'Permintaan UI/UX Designer Terus Meningkat'),
(12, 33, 'Desainer Berperan Penting di Setiap Produk'),
(13, 33, 'Skill Bisa Dipakai di Berbagai Industri'),
(14, 33, 'Karier Luas: UI Designer, UX Researcher, Product Designer'),
(15, 33, 'Fleksibel: Bisa Freelance atau Remote'),
(16, 32, 'Back-End Developer Sangat Dicari Industri'),
(17, 32, 'Golang Dipakai di Startup & Tech Company Besar'),
(18, 32, 'Fokus Bangun API dan Sistem Skala Besar'),
(19, 32, 'Karier Luas: Backend Engineer, DevOps, SRE'),
(20, 32, 'Gaji Tinggi & Stabil di Pasar Teknologi'),
(21, 28, 'Permintaan Desainer Grafis Terus Meningkat'),
(22, 28, 'Fleksibilitas Kerja: Freelance hingga Agency'),
(23, 28, 'Skill yang Dibutuhkan Berbagai Industri'),
(24, 28, 'Bisa Berkarier di Branding, UI, Editorial, dll'),
(25, 28, 'Potensi Penghasilan dari Proyek Global');

-- --------------------------------------------------------

--
-- Table structure for table `program_jobs`
--

CREATE TABLE `program_jobs` (
  `id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `company` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `salary` varchar(100) NOT NULL,
  `link` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program_jobs`
--

INSERT INTO `program_jobs` (`id`, `program_id`, `company`, `position`, `type`, `salary`, `link`, `created_at`) VALUES
(1, 31, 'JobStreet', 'Web Developer', 'Full Time', '4 - 8 Jt / Bulan', 'https://id.jobstreet.com/career-advice/role/web-developer/salary', '2025-08-07 13:39:00'),
(2, 31, 'Indeed', 'Web Developer', 'Full Time', '4 - 8 Jt / Bulan', 'https://id.indeed.com/jobs?q=web+developer&l=indonesia&from=searchOnHP%2Cwhatautocomplete&vjk=4c35fac130250b82', '2025-08-07 13:39:00'),
(3, 31, 'Glassdoor', 'Web Developer', 'Full Time', '4 - 8 Jt / Bulan', 'https://www.glassdoor.com/Salaries/indonesia-web-developer-salary-SRCH_IL.0,9_IN113_KO10,23.htm', '2025-08-07 13:39:00'),
(4, 31, 'Glints', 'Web Developer', 'Full Time', '4 - 8 Jt / Bulan', 'https://glints.com/id/opportunities/jobs/explore?keyword=web+developer&country=ID&locationName=All+Cities%2FProvinces', '2025-08-07 13:39:00'),
(5, 31, 'Kalibrr', 'Web Developer', 'Full Time', '4 - 8 Jt / Bulan', 'https://www.kalibrr.id/id-ID/home/te/web-developer', '2025-08-07 13:39:00'),
(6, 28, 'JobStreet', 'Graphic Designer', 'Full Time', '3 - 6 Jt / Bulan', 'https://id.jobstreet.com/career-advice/role/graphic-designer/salary', '2025-08-29 15:08:32'),
(7, 28, 'Indeed', 'Graphic Designer', 'Full Time', '3 - 6 Jt / Bulan', 'https://id.indeed.com/jobs?q=graphic+designer&l=indonesia', '2025-08-29 15:08:32'),
(8, 28, 'Glassdoor', 'Graphic Designer', 'Full Time', '3 - 6 Jt / Bulan', 'https://www.glassdoor.com/Salaries/indonesia-graphic-designer-salary-SRCH_IL.0,9_IN113_KO10,27.htm', '2025-08-29 15:08:32'),
(9, 28, 'Glints', 'Graphic Designer', 'Full Time', '3 - 6 Jt / Bulan', 'https://glints.com/id/opportunities/jobs/explore?keyword=graphic+designer&country=ID', '2025-08-29 15:08:32'),
(10, 28, 'Kalibrr', 'Graphic Designer', 'Full Time', '3 - 6 Jt / Bulan', 'https://www.kalibrr.id/id-ID/job-board/te/graphic-designer', '2025-08-29 15:08:32'),
(11, 35, 'JobStreet', 'Data Scientist', 'Full Time', '6 - 12 Jt / Bulan', 'https://id.jobstreet.com/jobs?key=data+scientist&location=Indonesia', '2025-08-29 15:15:52'),
(12, 35, 'Indeed', 'Data Scientist', 'Full Time', '6 - 12 Jt / Bulan', 'https://id.indeed.com/jobs?q=data+scientist&l=indonesia', '2025-08-29 15:15:52'),
(13, 35, 'Glassdoor', 'Data Scientist', 'Full Time', '6 - 12 Jt / Bulan', 'https://www.glassdoor.com/Job/indonesia-data-scientist-jobs-SRCH_IL.0,9_IN113_KO10,25.htm', '2025-08-29 15:15:52'),
(14, 35, 'Glints', 'Data Scientist', 'Full Time', '6 - 12 Jt / Bulan', 'https://glints.com/id/opportunities/jobs/explore?keyword=data+scientist&country=ID', '2025-08-29 15:15:52'),
(15, 35, 'Kalibrr', 'Data Scientist', 'Full Time', '6 - 12 Jt / Bulan', 'https://www.kalibrr.id/id-ID/job-board/te/data-scientist', '2025-08-29 15:15:52'),
(16, 33, 'JobStreet', 'UI/UX Designer', 'Full Time', '5 - 9 Jt / Bulan', 'https://id.jobstreet.com/jobs?key=ui%2Fux+designer&location=Indonesia', '2025-08-29 15:21:17'),
(17, 33, 'Indeed', 'UI/UX Designer', 'Full Time', '5 - 9 Jt / Bulan', 'https://id.indeed.com/jobs?q=ui+ux+designer&l=indonesia', '2025-08-29 15:21:17'),
(18, 33, 'Glassdoor', 'UI/UX Designer', 'Full Time', '5 - 9 Jt / Bulan', 'https://www.glassdoor.com/Job/indonesia-ui-ux-designer-jobs-SRCH_IL.0,9_IN113_KO10,25.htm', '2025-08-29 15:21:17'),
(19, 33, 'Glints', 'UI/UX Designer', 'Full Time', '5 - 9 Jt / Bulan', 'https://glints.com/id/opportunities/jobs/explore?keyword=ui%2Fux%20designer&country=ID', '2025-08-29 15:21:17'),
(20, 33, 'Kalibrr', 'UI/UX Designer', 'Full Time', '5 - 9 Jt / Bulan', 'https://www.kalibrr.id/id-ID/job-board/te/ui-ux-designer', '2025-08-29 15:21:17'),
(21, 32, 'JobStreet', 'Back-End Dev (Golang)', 'Full Time', '5 - 10 Jt / Bulan', 'https://id.jobstreet.com/jobs?key=golang+developer&location=Indonesia', '2025-08-29 15:25:16'),
(22, 32, 'Indeed', 'Back-End Dev (Golang)', 'Full Time', '5 - 10 Jt / Bulan', 'https://id.indeed.com/jobs?q=golang+developer&l=indonesia', '2025-08-29 15:25:16'),
(23, 32, 'Glassdoor', 'Back-End Dev (Golang)', 'Full Time', '5 - 10 Jt / Bulan', 'https://www.glassdoor.com/Job/indonesia-golang-developer-jobs-SRCH_IL.0,9_IN113_KO10,27.htm', '2025-08-29 15:25:16'),
(24, 32, 'Glints', 'Back-End Dev (Golang)', 'Full Time', '5 - 10 Jt / Bulan', 'https://glints.com/id/opportunities/jobs/explore?keyword=golang&country=ID', '2025-08-29 15:25:16'),
(25, 32, 'Kalibrr', 'Back-End Dev (Golang)', 'Full Time', '5 - 10 Jt / Bulan', 'https://www.kalibrr.id/id-ID/job-board/te/golang-developer', '2025-08-29 15:25:16');

-- --------------------------------------------------------

--
-- Table structure for table `program_pricing`
--

CREATE TABLE `program_pricing` (
  `pricing_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `original_price` decimal(10,2) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `is_main` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program_pricing`
--

INSERT INTO `program_pricing` (`pricing_id`, `program_id`, `name`, `price`, `original_price`, `created_at`, `is_main`) VALUES
(1, 31, 'Get A Job', 4271040.00, 5338800.00, '2025-08-07 14:26:55', 1),
(2, 31, 'Scale Up', 3000000.00, NULL, '2025-08-07 14:33:01', 0),
(7, 28, 'Get A Job', 4271040.00, 5338800.00, '2025-08-29 15:35:58', 0),
(8, 28, 'Scale Up', 3000000.00, 3500000.00, '2025-08-29 15:38:34', 0);

-- --------------------------------------------------------

--
-- Table structure for table `program_skills`
--

CREATE TABLE `program_skills` (
  `program_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program_skills`
--

INSERT INTO `program_skills` (`program_id`, `skill_id`) VALUES
(28, 1),
(28, 2),
(28, 3),
(31, 4),
(31, 5),
(31, 6),
(31, 7),
(32, 16),
(32, 17),
(32, 18),
(32, 19),
(33, 8),
(33, 9),
(33, 10),
(33, 11),
(35, 12),
(35, 13),
(35, 14),
(35, 15);

-- --------------------------------------------------------

--
-- Table structure for table `program_tools`
--

CREATE TABLE `program_tools` (
  `id` int(11) NOT NULL,
  `program_id` int(11) DEFAULT NULL,
  `tool_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program_tools`
--

INSERT INTO `program_tools` (`id`, `program_id`, `tool_id`, `created_at`) VALUES
(52, 28, 7, '2025-08-07 03:09:09'),
(53, 28, 8, '2025-08-07 03:09:09'),
(54, 32, 10, '2025-08-07 03:10:08'),
(57, 31, 10, '2025-08-08 06:20:49'),
(58, 31, 6, '2025-08-08 06:20:49'),
(61, 29, 6, '2025-09-01 01:47:34'),
(62, 29, 7, '2025-09-01 01:47:34'),
(63, 29, 8, '2025-09-01 01:47:34'),
(64, 35, 6, '2025-09-02 02:59:13'),
(65, 35, 10, '2025-09-02 02:59:13'),
(66, 33, 6, '2025-09-02 03:12:04'),
(67, 33, 10, '2025-09-02 03:12:04'),
(68, 39, 6, '2025-09-02 03:16:30'),
(69, 39, 7, '2025-09-02 03:16:30'),
(70, 39, 10, '2025-09-02 03:16:30'),
(71, 39, 8, '2025-09-02 03:16:30'),
(72, 38, 6, '2025-09-02 03:16:37'),
(73, 37, 10, '2025-09-02 03:16:53'),
(74, 36, 6, '2025-09-02 03:17:05'),
(75, 36, 10, '2025-09-02 03:17:05');

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `id` int(11) NOT NULL,
  `id_sesi` int(11) NOT NULL,
  `id_soal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`id`, `id_sesi`, `id_soal`) VALUES
(3, 10, 3),
(4, 11, 4),
(9, 16, 9),
(10, 17, 10),
(11, 18, 11),
(12, 19, 12),
(13, 20, 13),
(14, 21, 14),
(15, 22, 15),
(16, 23, 16),
(17, 24, 17),
(18, 13, 18),
(19, 25, 19),
(20, 26, 20),
(21, 27, 21),
(22, 28, 22),
(23, 29, 23),
(24, 30, 24),
(25, 31, 25),
(26, 32, 26),
(27, 33, 27),
(28, 34, 28),
(29, 36, 29),
(30, 37, 30);

-- --------------------------------------------------------

--
-- Table structure for table `sesi`
--

CREATE TABLE `sesi` (
  `id` int(11) NOT NULL,
  `judul_sesi` varchar(250) NOT NULL,
  `topik` varchar(250) NOT NULL,
  `video` varchar(250) NOT NULL,
  `id_program` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sesi`
--

INSERT INTO `sesi` (`id`, `judul_sesi`, `topik`, `video`, `id_program`) VALUES
(10, 'Introduction To Figma', 'Figma Adalah....', 'https://www.youtube.com/embed/jQ1sfKIl50E', 28),
(11, 'Introduction To Canva', 'Canva...', 'https://www.youtube.com/embed/jzWxBuvwuwQ', 28),
(13, 'testt 2', 'abcdd', 'https://www.youtube.com/embed/La9wG1S0Rp8', 29),
(16, 'Introduction HTML', 'Tes', 'https://www.youtube.com/embed/it1rTvBcfRg', 31),
(17, 'Learn HTML for Beginners', 'Tes', 'https://www.youtube.com/embed/BzYMFd-lQL4', 31),
(18, 'HTML & CSS', 'p', 'https://www.youtube.com/embed/3U1AhjEf7DM', 31),
(19, 'Percobaan', 'Ituloh', 'https://www.youtube.com/embed/K7gyclhWo1Y', 35),
(20, 'Introduction To Golang', 'Pengenalan & Pengaturan', 'https://www.youtube.com/embed/etSN4X_fCnM?list=PL4cUxeGkcC9gC88BEo9czgyS72A3doDeM', 32),
(21, 'Tutorial Go (Golang) #2', 'File Go Pertama Anda', 'https://www.youtube.com/embed/RI9ngRqn9N4?list=PL4cUxeGkcC9gC88BEo9czgyS72A3doDeM', 32),
(22, 'UI/UX & Product Design', 'UI/UX Explained In 8 Minutes | UI/UX Design For Beginners | UI/UX Design Basics | Simplilearn', 'https://www.youtube.com/embed/ODpB9-MCa5s', 33),
(23, '4 level desain UI/UX', '4 level desain UI/UX (dan kesalahan BESAR yang harus dihindari)', 'https://www.youtube.com/embed/86PGRyQjdzQ', 33),
(24, 'Tips Cara Menjadi UI/UX Designer', '6 Tips Cara Menjadi UI/UX Designer', 'https://www.youtube.com/embed/UTrXsVBrohg', 33),
(25, 'Tes 2', 'PP', 'https://www.youtube.com/embed/kinmfM69Noo', 35),
(26, 'Fundamental Flutter & Dart', 'Sesi 1', 'https://www.youtube.com/embed/cRIAl70eiT4', 36),
(27, 'Membangun aplikasi mobile multi-platform', 'Sesi 2', 'https://www.youtube.com/embed/YCt8x3vYxTE', 36),
(28, 'Network Security & Firewall', 'Sesi 1', 'https://www.youtube.com/embed/kDEX1HXybrU', 37),
(29, 'Ethical Hacking Basics', 'Sesi 2', 'https://www.youtube.com/embed/yFC8pb2TPdc', 37),
(30, 'Security Auditing Tools', 'Sesi 3', 'https://www.youtube.com/embed/d6BUnrKY2FI', 37),
(31, 'Cloud Fundamentals', 'Sesi 1', 'https://www.youtube.com/embed/N0SYCyS2xZA', 38),
(32, 'Deployment & Monitoring', 'Sesi 2', 'https://www.youtube.com/embed/mwkUOAEJ0uU', 38),
(33, 'C# Programming Basics', 'Sesi 1', 'https://www.youtube.com/embed/gfkTfcpWqAY', 39),
(34, '2D/3D Game Design & Animation Menggunakan Blender', 'Sesi 2', 'https://www.youtube.com/embed/yaOEsAOnq7s', 39),
(36, 'Game Physics & Sound', 'Sesi 3', 'https://www.youtube.com/embed/N-dPDsLTrTE', 39),
(37, 'Deploy ke Play Store & App Store', 'Sesi 4', 'https://www.youtube.com/embed/rPCi_eZ63Qs', 39);

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `skill_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`skill_id`, `name`) VALUES
(1, 'Prinsip desain grafis dan elemen visual yang kuat'),
(2, 'Logo, ikon, ilustrasi, dan brand identity'),
(3, 'Presentasi visual (poster, sosial media, iklan'),
(4, 'Dasar-dasar pemrograman (HTML, CSS, JavaScript)'),
(5, 'Pengembangan web (front-end dan back-end)'),
(6, 'Pengenalan frameworks seperti React, Node.js, atau Django'),
(7, 'Peluang Karir Cerah (Web Developer, Mobile App Developer, Full-Stack Developer)'),
(8, 'Dasar UI/UX & Design Thinking'),
(9, 'Research dan User Persona'),
(10, 'Wireframing & Prototyping'),
(11, 'Handoff ke Developer'),
(12, 'Python for Data Science'),
(13, 'Exploratory Data Analysis'),
(14, 'Machine Learning dasar'),
(15, 'Deploy model ke production'),
(16, 'Konsep inti DevOps & Jaringan Esensial'),
(17, 'Penguasaan Dasar Linux & Scripting Awal'),
(18, 'Revolusi Aplikasi dengan Kontainerisasi Docker'),
(19, 'Observabilitas Sistem & Wawasan Cloud Computing');

-- --------------------------------------------------------

--
-- Table structure for table `soal`
--

CREATE TABLE `soal` (
  `id` int(11) NOT NULL,
  `soal` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `soal`
--

INSERT INTO `soal` (`id`, `soal`) VALUES
(3, 'Apa itu figma?'),
(4, 'Apa Itu canva?'),
(7, 'Apa itu Ngoding?'),
(9, 'Apasih itu?'),
(10, 'Apa yang dimaksud'),
(11, 'Apakah kamu'),
(12, 'apa'),
(13, 'Apa itu '),
(14, 'Apakah benar?'),
(15, 'Apa itu '),
(16, 'SIapakah'),
(17, 'Apakah benar'),
(18, 'Apasih itu?'),
(19, 'Apakah'),
(20, 'Apakah benar?'),
(21, 'Yang manakah?'),
(22, 'Yakinkan Kalau'),
(23, 'SIapa yang harus'),
(24, 'Apa yang dimaksud'),
(25, 'Buatlah sebuah'),
(26, 'Proses manakah yang menunjukkan'),
(27, 'Dibagian mana kamu bisa mengubah'),
(28, 'Yang manakah bagian benarnya'),
(29, 'Siapakah penemu'),
(30, 'Apa arti dari sebuah');

-- --------------------------------------------------------

--
-- Table structure for table `tools`
--

CREATE TABLE `tools` (
  `id` int(11) NOT NULL,
  `judul` varchar(250) NOT NULL,
  `image` varchar(250) NOT NULL,
  `deskripsi` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tools`
--

INSERT INTO `tools` (`id`, `judul`, `image`, `deskripsi`) VALUES
(6, 'Vscode', '1754473096306-vs-code.png', 'code editor'),
(7, 'Figma', '1754473623792-image 44.png', 'Figma'),
(8, 'Canva', '1754473548015-1713529716396-removebg-preview.png', 'Canva'),
(10, 'Postman', '1754467244587-postman.png', 'Kebutuhan backend');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `transaction_status` enum('pending','success','failed','expire','cancel') DEFAULT 'pending',
  `payment_type` varchar(50) DEFAULT NULL,
  `gross_amount` decimal(10,2) DEFAULT NULL,
  `transaction_time` datetime DEFAULT NULL,
  `snap_token` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `program_name` varchar(100) DEFAULT NULL,
  `midtrans_order_id` varchar(100) DEFAULT NULL,
  `midtrans_transaction_id` varchar(100) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_url` text DEFAULT NULL,
  `expired_at` datetime DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `program_id`, `order_id`, `transaction_status`, `payment_type`, `gross_amount`, `transaction_time`, `snap_token`, `created_at`, `full_name`, `email`, `phone`, `program_name`, `midtrans_order_id`, `midtrans_transaction_id`, `payment_method`, `payment_url`, `expired_at`, `updated_at`) VALUES
(3, 8, 28, 'KA-8-28-1754357793052', 'pending', 'midtrans', 3000000.00, '2025-08-05 01:36:33', '55f15557-6d37-42c1-96a6-df819d33b97e', '2025-08-05 01:36:33', 'Ilyash', 'drown@gmail.com', '12345678', 'Scale Up', 'KA-8-28-1754357793052', NULL, NULL, NULL, NULL, '2025-08-05 01:36:33'),
(4, 8, 28, 'KA-8-28-1754358106571', 'pending', 'midtrans', 3000000.00, '2025-08-05 01:41:46', '21b3494a-e7d8-464b-99eb-ce5332b2085f', '2025-08-05 01:41:46', 'Ilyash', 'drown@gmail.com', '12345678', 'Scale Up', 'KA-8-28-1754358106571', NULL, NULL, NULL, NULL, '2025-08-05 01:41:46'),
(5, 9, 28, 'KA-9-28-1754360731017', 'pending', 'midtrans', 3000000.00, '2025-08-05 02:25:31', 'b9c1adb9-55c4-4e71-9b3d-6c60b701199e', '2025-08-05 02:25:31', 'Alhabsyi', 'Mahesa@gmail.com', '123456789', 'Scale Up', 'KA-9-28-1754360731017', NULL, NULL, NULL, NULL, '2025-08-05 02:25:31'),
(7, 11, 28, 'KA-11-28-1754379452662', 'pending', 'midtrans', 4271040.00, '2025-08-05 14:37:32', '2678980f-24e2-4356-96b5-e469ad3e7209', '2025-08-05 07:37:32', 'User1', 'user@gmail.com', '081234567890', 'Get A Job', 'KA-11-28-1754379452662', NULL, NULL, NULL, NULL, '2025-08-05 07:37:32'),
(8, 11, 28, 'KA-11-28-1754382094252', 'pending', 'midtrans', 3000000.00, '2025-08-05 15:21:34', '6b6d2866-e468-4588-b485-8c65df77fc0d', '2025-08-05 08:21:34', 'User1', 'user@gmail.com', '081234567890', 'Scale Up', 'KA-11-28-1754382094252', NULL, NULL, NULL, NULL, '2025-08-05 08:21:34'),
(9, 11, 28, 'KA-11-28-1754382105616', 'pending', 'midtrans', 4271040.00, '2025-08-05 15:21:45', '050f5c16-9837-4537-ab54-6b35ab0eff0d', '2025-08-05 08:21:45', 'User1', 'user@gmail.com', '081234567890', 'Get A Job', 'KA-11-28-1754382105616', NULL, NULL, NULL, NULL, '2025-08-05 08:21:45'),
(10, 13, 28, 'KA-13-28-1754382350502', 'pending', 'midtrans', 3000000.00, '2025-08-05 15:25:50', '89c7ad54-f425-4c54-800c-1032bc933c14', '2025-08-05 08:25:50', 'tes1', 'tes@gmail.com', '081234567890', 'Scale Up', 'KA-13-28-1754382350502', NULL, NULL, NULL, NULL, '2025-08-05 08:25:50'),
(11, 13, 28, 'KA-13-28-1754382434923', 'pending', 'midtrans', 4271040.00, '2025-08-05 15:27:15', '83a79d58-f4ba-40e4-a907-c7e0fea9d9c7', '2025-08-05 08:27:15', 'tes1', 'tes@gmail.com', '081234567890', 'Get A Job', 'KA-13-28-1754382434923', NULL, NULL, NULL, NULL, '2025-08-05 08:27:15'),
(12, 14, 28, 'KA-14-28-1754382519949', 'pending', 'midtrans', 3000000.00, '2025-08-05 15:28:40', 'a37239cc-bd5f-4b5f-a459-da5aaf8e0bf4', '2025-08-05 08:28:40', 'tes2', 'tes@mail.com', '081234567890', 'Scale Up', 'KA-14-28-1754382519949', NULL, NULL, NULL, NULL, '2025-08-05 08:28:40'),
(13, 15, 28, 'KA-15-28-1754382767400', 'pending', 'midtrans', 4271040.00, '2025-08-05 15:32:47', 'e5b48bd7-2f15-4f79-ae76-9ad2c6948291', '2025-08-05 08:32:47', 'tes3', 'a@gmail.com', '081234567890', 'Get A Job', 'KA-15-28-1754382767400', NULL, NULL, NULL, NULL, '2025-08-05 08:32:47'),
(14, 16, 28, 'KA-16-28-1754382915794', 'pending', 'midtrans', 3000000.00, '2025-08-05 15:35:15', '56d26d86-cc18-4a93-8ad8-26156d56e50b', '2025-08-05 08:35:15', 'tes4', 's@gmail.com', '081234567890', 'Scale Up', 'KA-16-28-1754382915794', NULL, NULL, NULL, NULL, '2025-08-05 08:35:15'),
(15, 17, 28, 'KA-17-28-1754385290316', 'pending', 'midtrans', 4271040.00, '2025-08-05 16:14:50', '19c6fb91-a5ff-4aea-9b7f-c0c196670bef', '2025-08-05 09:14:50', 'tes5', 'ab@gmail.com', '081234567890', 'Get A Job', 'KA-17-28-1754385290316', NULL, NULL, NULL, NULL, '2025-08-05 09:14:50'),
(16, 18, 28, 'KA-18-28-1754386512879', 'pending', 'midtrans', 4271040.00, '2025-08-05 16:35:13', '0a7439b9-a89d-4a4b-8e3d-32e4f30721b8', '2025-08-05 09:35:13', 'tes6', 'c@gmail.com', '081234567890', 'Get A Job', 'KA-18-28-1754386512879', NULL, NULL, NULL, NULL, '2025-08-05 09:35:13'),
(17, 18, 28, 'KA-18-28-1754386539736', 'pending', 'midtrans', 3000000.00, '2025-08-05 16:35:39', 'fe012a35-6395-4186-8756-12ac2f3e2575', '2025-08-05 09:35:39', 'tes6', 'c@gmail.com', '081234567890', 'Scale Up', 'KA-18-28-1754386539736', NULL, NULL, NULL, NULL, '2025-08-05 09:35:39'),
(18, 19, 28, 'KA-19-28-1754386586460', 'pending', 'midtrans', 3000000.00, '2025-08-05 16:36:26', '6874c034-3bba-4f74-871c-284c3e8eb171', '2025-08-05 09:36:26', 'tes7', 'g@gmail.com', '081234567890', 'Scale Up', 'KA-19-28-1754386586460', NULL, NULL, NULL, NULL, '2025-08-05 09:36:26'),
(19, 20, 28, 'KA-20-28-1754387067199', 'success', 'midtrans', 4271040.00, '2025-08-05 16:44:28', 'b627fc54-d7f7-420c-9970-0fda17291c41', '2025-08-05 09:44:28', 'tes8', 'y@gmail.com', '081234567890', 'Get A Job', 'KA-20-28-1754387067199', '271664f3-fa62-4b5f-9599-dc7c6bb181f9', 'qris', NULL, NULL, '2025-08-05 09:44:43'),
(20, 21, 28, 'KA-21-28-1754387535586', 'success', 'midtrans', 4271040.00, '2025-08-05 16:52:15', '7b911e92-9125-476f-925f-0cacc573e9dc', '2025-08-05 09:52:15', 'tes9', 'tt@gmail.com', '081234567890', 'Get A Job', 'KA-21-28-1754387535586', 'f1fce9b1-1a7f-4c80-9fef-a7dcde80d0ef', 'qris', NULL, NULL, '2025-08-05 09:52:30'),
(21, 22, 28, 'KA-22-28-1754387813095', 'success', 'midtrans', 4271040.00, '2025-08-05 16:56:53', '572b782c-8b66-46f3-add0-d8fd690741bc', '2025-08-05 09:56:53', 'tes10', 'kk@gmail.com', '081234567890', 'Get A Job', 'KA-22-28-1754387813095', '8eca6222-e6a8-4972-a671-8b7a21e9f953', 'qris', NULL, NULL, '2025-08-05 09:57:06'),
(22, 23, 28, 'KA-23-28-1754394976732', 'success', 'midtrans', 3000000.00, '2025-08-05 18:56:17', '6e9769f0-025f-472c-a72f-c7c2abe58eea', '2025-08-05 11:56:17', 'tes11', 'lk@gmail.com', '081234567890', 'Scale Up', 'KA-23-28-1754394976732', 'dc63d4cd-5cb3-4373-b8b3-6091797c6280', 'qris', NULL, NULL, '2025-08-05 11:56:34'),
(23, 23, 31, 'KA-23-31-1754445284311', 'success', 'midtrans', 4271040.00, '2025-08-06 08:54:44', '0500b2a1-0cf1-46b2-bb6f-ae032896bbf0', '2025-08-06 01:54:44', 'tes11', 'lk@gmail.com', '08123456789', 'Get A Job', 'KA-23-31-1754445284311', '120b3c3d-507b-4eed-b751-de06909762c5', 'qris', NULL, NULL, '2025-08-06 01:55:12'),
(24, 11, 31, 'KA-11-31-1754447227063', 'success', 'midtrans', 3000000.00, '2025-08-06 09:27:07', '176d4233-794b-48e8-b96e-2bf3ff81ee1c', '2025-08-06 02:27:07', 'User1', 'user@gmail.com', '081234567890', 'Scale Up', 'KA-11-31-1754447227063', 'b5bcd958-d6e6-4cd0-8c44-b1f51f60589f', 'qris', NULL, NULL, '2025-08-06 02:27:26'),
(25, 13, 31, 'KA-13-31-1754447277702', 'success', 'midtrans', 4271040.00, '2025-08-06 09:27:57', '76d9da84-7249-4a1b-ac09-fe6cb2073f0c', '2025-08-06 02:27:57', 'tes1', 'tes@gmail.com', '081234567890', 'Get A Job', 'KA-13-31-1754447277702', 'cfaff473-29b0-4787-9b99-1c5512a585b4', 'qris', NULL, NULL, '2025-08-06 02:28:08'),
(26, 13, 32, 'KA-13-32-1754559426564', 'success', 'midtrans', 3000000.00, '2025-08-07 16:37:06', '784c8b49-2e2d-4d36-9625-9850054328f8', '2025-08-07 09:37:06', 'tes1', 'testi@gmail.com', '081765432', 'Scale Up', 'KA-13-32-1754559426564', '9389134d-7869-4436-b87c-ef2393d9f587', 'qris', NULL, NULL, '2025-08-07 09:37:25'),
(27, 13, 31, 'KA-13-31-1754560338984', 'pending', 'midtrans', 4271040.00, '2025-08-07 16:52:19', '56144c61-0a12-4fec-a278-6fc2976cbd3c', '2025-08-07 09:52:19', 'tes1', 'testi@gmail.com', '081765432', 'Get A Job', 'KA-13-31-1754560338984', NULL, NULL, NULL, NULL, '2025-08-07 09:52:19'),
(28, 23, 32, 'KA-23-32-1754617189774', 'success', 'midtrans', 3000000.00, '2025-08-08 08:39:50', '93e769e3-6b90-4a44-a601-cad1de67756c', '2025-08-08 01:39:50', 'tes11', 'lk@gmail.com', '08123456789', 'Scale Up', 'KA-23-32-1754617189774', '396ba4eb-0d17-4753-86a1-dcace0509bbe', 'qris', NULL, NULL, '2025-08-08 01:40:02'),
(32, 23, 33, 'KA-23-33-1754617390502', 'success', 'midtrans', 3000000.00, '2025-08-08 08:43:10', 'e5edede6-f815-46d9-8476-13ab1f297225', '2025-08-08 01:43:10', 'tes11', 'lk@gmail.com', '08123456789', 'Scale Up', 'KA-23-33-1754617390502', '394c4682-af39-4e23-b740-1f8da9479881', 'qris', NULL, NULL, '2025-08-08 01:43:24'),
(33, 23, 28, 'KA-23-28-1754617943858', 'pending', 'midtrans', 3000000.00, '2025-08-08 08:52:24', 'bc42b0c2-68be-463f-a2b1-5c2569bb4aa9', '2025-08-08 01:52:24', 'tes11', 'lk@gmail.com', '08123456789', 'Scale Up', 'KA-23-28-1754617943858', NULL, NULL, NULL, NULL, '2025-08-08 01:52:24'),
(38, 23, 35, 'KA-23-35-1754619864044', 'success', 'midtrans', 3500000.00, '2025-08-08 09:24:24', 'b71a01b3-e64b-42c8-a8d3-876d3ad58eb7', '2025-08-08 02:24:24', 'tes11', 'lk@gmail.com', '08123456789', 'Scale Up', 'KA-23-35-1754619864044', 'c48a82fa-bf2b-4087-8866-bf650b780716', 'qris', NULL, NULL, '2025-08-08 02:24:41'),
(39, 24, 35, 'KA-24-35-1754620736620', 'success', 'midtrans', 3500000.00, '2025-08-08 09:38:57', '21c43f72-ebf8-4f6f-b494-0fb9135d1a0f', '2025-08-08 02:38:57', 'tes12', 'gj@gmail.com', '081234567890', 'Scale Up', 'KA-24-35-1754620736620', '8e3a51bd-0f26-4761-bfe5-aa39e3fc314e', 'qris', NULL, NULL, '2025-08-08 02:41:11'),
(40, 24, 31, 'KA-24-31-1754620907156', 'success', 'midtrans', 4271040.00, '2025-08-08 09:41:47', '70cebaf4-dfad-4617-a979-604032acbe71', '2025-08-08 02:41:47', 'tes12', 'gj@gmail.com', '081234567890', 'Get A Job', 'KA-24-31-1754620907156', '57d404a8-852c-4292-8cc6-bec535aa835e', 'qris', NULL, NULL, '2025-08-08 02:43:06'),
(41, 24, 28, 'KA-24-28-1754621081108', 'success', 'midtrans', 3000000.00, '2025-08-08 09:44:41', '916b1043-460f-4e34-8b94-ecf505860a1e', '2025-08-08 02:44:41', 'tes12', 'gj@gmail.com', '081234567890', 'Scale Up', 'KA-24-28-1754621081108', '2b372c3c-ff13-40fa-92f2-bbae2ec0a87b', 'qris', NULL, NULL, '2025-08-08 02:46:00'),
(42, 24, 33, 'KA-24-33-1754621195916', 'success', 'midtrans', 3000000.00, '2025-08-08 09:46:36', '5d2970c1-1fd7-4952-b7b9-13a9edd1a223', '2025-08-08 02:46:36', 'tes12', 'gj@gmail.com', '081234567890', 'Scale Up', 'KA-24-33-1754621195916', 'cd450d49-e328-4048-b663-0df45179f349', 'qris', NULL, NULL, '2025-08-08 02:50:52'),
(43, 24, 31, 'KA-24-31-1754625750292', 'pending', 'midtrans', 3000000.00, '2025-08-08 11:02:30', 'ad2be2c4-490c-4aea-b71d-d988a21a7919', '2025-08-08 04:02:30', 'tes12', 'gj@gmail.com', '081234567890', 'Scale Up', 'KA-24-31-1754625750292', NULL, NULL, NULL, NULL, '2025-08-08 04:02:30'),
(44, 23, 33, 'KA-23-33-1756448401810', 'success', 'midtrans', 3000000.00, '2025-08-29 13:20:05', 'de0ebb68-0912-4255-afe0-cac4fe699feb', '2025-08-29 06:20:05', 'tes11', 'lk@gmail.com', '08123456789', 'Scale Up', 'KA-23-33-1756448401810', '33b603ba-b738-44eb-ae53-debb3aba6609', 'qris', NULL, NULL, '2025-08-29 06:21:22'),
(45, 22, 31, 'KA-22-31-1756700736027', 'success', 'midtrans', 4271040.00, '2025-09-01 11:25:36', '95accabd-9880-4fe9-aa7d-add04a1b7b9a', '2025-09-01 04:25:36', 'tes10', 'kk@gmail.com', '081234567890', 'Get A Job', 'KA-22-31-1756700736027', '795068a1-d7c4-416f-ad93-76a6b448afec', 'qris', NULL, NULL, '2025-09-01 04:26:05'),
(46, 22, 32, 'KA-22-32-1756701235876', 'success', 'midtrans', 3000000.00, '2025-09-01 11:33:56', 'd4c54080-645c-4603-b6a8-5be07026d8d1', '2025-09-01 04:33:56', 'tes10', 'kk@gmail.com', '081234567890', 'Scale Up', 'KA-22-32-1756701235876', 'e2c125ac-5636-4c49-89fe-e57959ccdd68', 'qris', NULL, NULL, '2025-09-01 04:34:29'),
(47, 22, 33, 'KA-22-33-1756701524138', 'success', 'midtrans', 3000000.00, '2025-09-01 11:38:44', '94b1a859-8de8-4312-a366-e965f4905b08', '2025-09-01 04:38:44', 'tes10', 'kk@gmail.com', '081234567890', 'Scale Up', 'KA-22-33-1756701524138', '1b32f37e-47b8-4b32-83a4-82c6ae7e412a', 'qris', NULL, NULL, '2025-09-01 04:39:17'),
(48, 22, 35, 'KA-22-35-1756710296411', 'success', 'midtrans', 3500000.00, '2025-09-01 14:04:56', 'f7707134-3fd0-4721-947d-2c47eea01723', '2025-09-01 07:04:56', 'tes10', 'kk@gmail.com', '081234567890', 'Scale Up', 'KA-22-35-1756710296411', 'f863eaf3-4336-45c4-803e-d73315504763', 'qris', NULL, NULL, '2025-09-01 07:05:11'),
(49, 21, 33, 'KA-21-33-1756711610551', 'success', 'midtrans', 3000000.00, '2025-09-01 14:26:50', '69ffd0cc-4d0b-4009-be25-39c781fc5041', '2025-09-01 07:26:50', 'tes9', 'tt@gmail.com', '081234567890', 'Scale Up', 'KA-21-33-1756711610551', '9ab9c0b5-c504-4915-9ac7-b885e0ec69fc', 'qris', NULL, NULL, '2025-09-01 07:27:07'),
(50, 25, 39, 'KA-25-39-1756785462437', 'success', 'midtrans', 2800000.00, '2025-09-02 10:57:43', 'cdc6c33c-34f3-4473-b050-2757b99e3e56', '2025-09-02 03:57:43', 'tes13', 'tes@gmail.com', '081234567890', 'Scale Up', 'KA-25-39-1756785462437', '3aec3e96-05c8-4961-b4da-063bf47968c3', 'qris', NULL, NULL, '2025-09-02 03:57:57'),
(51, 25, 38, 'KA-25-38-1756785502237', 'success', 'midtrans', 3800000.00, '2025-09-02 10:58:23', '15614a86-8278-4499-8450-d2af86ec340b', '2025-09-02 03:58:23', 'tes13', 'tes@gmail.com', '081234567890', 'Scale Up', 'KA-25-38-1756785502237', '24580985-2dd0-4611-9fbc-7c840cb82184', 'qris', NULL, NULL, '2025-09-02 03:58:46'),
(53, 25, 31, 'KA-25-31-1756786063559', 'success', 'midtrans', 4271040.00, '2025-09-02 11:07:43', '655fc991-ef62-4b59-9df1-ba90199d3788', '2025-09-02 04:07:43', 'tes13', 'tes@gmail.com', '081234567890', 'Get A Job', 'KA-25-31-1756786063559', 'dfb90119-c714-42f4-9e53-9f578aa740c8', 'qris', NULL, NULL, '2025-09-02 04:08:08'),
(54, 25, 37, 'KA-25-37-1756786205792', 'success', 'midtrans', 3500000.00, '2025-09-02 11:10:05', '2b63fa1f-d3fd-46dd-8fae-82e52f981eb3', '2025-09-02 04:10:05', 'tes13', 'tes@gmail.com', '081234567890', 'Scale Up', 'KA-25-37-1756786205792', '9665b498-da62-4b71-a853-f98d952cb41f', 'qris', NULL, NULL, '2025-09-02 04:10:48'),
(55, 25, 36, 'KA-25-36-1756786372623', 'success', 'midtrans', 3200000.00, '2025-09-02 11:12:53', 'd705f0bb-dc5f-4175-bc06-c52ebb85ba4d', '2025-09-02 04:12:53', 'tes13', 'tes@gmail.com', '081234567890', 'Scale Up', 'KA-25-36-1756786372623', '19b84114-8d7a-4423-b706-a3b8c3eadb47', 'qris', NULL, NULL, '2025-09-02 04:13:28'),
(56, 25, 35, 'KA-25-35-1756786448824', 'success', 'midtrans', 3500000.00, '2025-09-02 11:14:08', '6624863e-40ee-480a-9084-aec29c00113d', '2025-09-02 04:14:08', 'tes13', 'tes@gmail.com', '081234567890', 'Scale Up', 'KA-25-35-1756786448824', 'db88feb0-3c6a-40e3-91a6-2f0db8d54743', 'qris', NULL, NULL, '2025-09-02 04:14:51'),
(57, 25, 33, 'KA-25-33-1756786510383', 'success', 'midtrans', 3000000.00, '2025-09-02 11:15:10', '727820ae-04ee-4f98-8558-fe8a1a93598a', '2025-09-02 04:15:10', 'tes13', 'tes@gmail.com', '081234567890', 'Scale Up', 'KA-25-33-1756786510383', 'a8ae3514-528f-4e5b-a445-c84099864065', 'qris', NULL, NULL, '2025-09-02 04:15:27'),
(58, 25, 32, 'KA-25-32-1756786548662', 'success', 'midtrans', 3000000.00, '2025-09-02 11:15:48', 'a134e2a5-448d-41c6-b70a-9fc5be62fe0d', '2025-09-02 04:15:48', 'tes13', 'tes@gmail.com', '081234567890', 'Scale Up', 'KA-25-32-1756786548662', 'caa5bf46-6b31-4317-a220-59b230b14fd7', 'qris', NULL, NULL, '2025-09-02 04:16:01'),
(59, 25, 28, 'KA-25-28-1756786582903', 'success', 'midtrans', 4271040.00, '2025-09-02 11:16:23', '0a727389-4fb7-4f7b-b9bc-b12d0fdcfe18', '2025-09-02 04:16:23', 'tes13', 'tes@gmail.com', '081234567890', 'Get A Job', 'KA-25-28-1756786582903', '6ded9fca-124e-40e7-b988-4374a12cc926', 'qris', NULL, NULL, '2025-09-02 04:16:36');

-- --------------------------------------------------------

--
-- Table structure for table `tugas`
--

CREATE TABLE `tugas` (
  `id` int(11) NOT NULL,
  `soal_tugas` varchar(250) NOT NULL,
  `id_sesi` int(11) NOT NULL,
  `id_tugas_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `role`, `image`, `bio`, `phone`, `location`) VALUES
(1, 'don', 'ares@gmail.com', '$2b$10$t563.hqvlh2bCtwBUgspr.xQc6x5uJbiC78vh232n0c3UFuHre25m', 'user', '', '', '', ''),
(3, 'Administrator', 'admin@mail.com', '$2b$10$ejWfM9IK.xJwJnVmmlOQNe1Ml5pqnX51aHdr1ZTL1Nz28pnPckkdW', 'admin', '', '', '', ''),
(4, 'waguri', 'waguri@gmail.com', '$2b$10$KBuEbR/doewzpHNqpqhvEOVtksLFmMVLzKQGx/EED4j4bl56Tt5GO', 'user', '', '', '', ''),
(5, 'dsbm', 'tested@gmail.com', '$2b$10$VQMSflklJs7HhQiWC.Qx0OVD.ip5omEL/ItDLLb7RakWmOk824KqO', 'user', '5_1754100438081.jpeg', 'testificated', '12345678', '08213209'),
(6, 'Ilyash Zaych', 'test@mail.com', '$2b$10$t70eZ1w6ltusaFile9K5k.wyRuVGPBTHqOMWpRob6ovldLBg6K5f.', 'user', '6_1754036066452.jpeg', 'TESTIFICATED', '12345678888', 'TESTIFICATION'),
(7, 'Daiwaa', 'Daiwaa@mail.com', '$2b$12$VE4DKreeoSt2boWUpH4D6udmJZjpZWU57f/.8lXN2sJkjiRZkssSK', 'user', '7_1754106473549.jpeg', 'Daiwa Scarlett', '1234567891011', 'Tokyo'),
(8, 'Ilyash', 'drown@gmail.com', '$2b$12$5G2MIEnXoBB4w0zt9vbBa.5Tx460OPQxqJxed8inEWUn1PGh/B3tm', 'user', '8_1754290883899.jpeg', 'YAsh', '12345678', 'Surabaya'),
(9, 'Alhabsyi', 'Mahesa@gmail.com', '$2b$12$gNbA4BIpNGEv0H5GCEF6NOoROVBrhKTd9W8Uc4H8cA/3zqMo4.wNa', 'user', '9_1754360582104.jpeg', 'Mahes', '123456789', 'Dau'),
(10, 'Daiwa', 'test@gmail.com', '$2b$12$BHNJcO30J2QEidxBIWLsZ.34EgtNss3m6HVV2RCzgiSJqdQ91TDme', 'user', NULL, NULL, NULL, NULL),
(11, 'User1', 'user@gmail.com', '$2b$12$OK3yYCw.X950ORt1w9Krf.cfJu/GuiwBRjBiOzWPkaQE6uOYbFEYK', 'user', NULL, NULL, NULL, NULL),
(13, 'tes1', 'testi@gmail.com', '$2b$12$DwFyMIBR7QAD4FYUjbIExukfndN/yS.NNsKkyj4jAy3qVSXj0ielK', 'user', '13_1754470687450.png', 'Gw suka bikin website', '081765432', 'Malang'),
(14, 'tes2', 'tes@mail.com', '$2b$12$E/QTHkKT4/8n/Amhfu4MRuCETkqnQ0K4.dgBMn/Gps0tbxWVEa.wq', 'user', NULL, NULL, NULL, NULL),
(15, 'tes3', 'a@gmail.com', '$2b$12$l5kZr/5S7rghuuIsReW8zuSUxWBlTQmnweyL.4gd6EVRYjYTXJpce', 'user', NULL, NULL, NULL, NULL),
(16, 'tes4', 's@gmail.com', '$2b$12$8VKfFVJL/i9Ell7ViXS49ecTlUVHcSur7MrNlwtyJaHZ3E6oVjHnS', 'user', NULL, NULL, NULL, NULL),
(17, 'tes5', 'ab@gmail.com', '$2b$12$6By57ioSTHusi8JQk56ggeL8kBUCA8HWlVNygzT06i9J.QKqczW8O', 'user', NULL, NULL, NULL, NULL),
(18, 'tes6', 'c@gmail.com', '$2b$12$V0qiG1sNWAsaAtSygwxjHevxP0u1ltLBGiVV65zmD0wNxOjHrApXe', 'user', NULL, NULL, NULL, NULL),
(19, 'tes7', 'g@gmail.com', '$2b$12$1NMxyqGMfdS8WqlWEEk66ecSk5QRpxp3xm7juIAeh6p56k.W1/tUu', 'user', NULL, NULL, NULL, NULL),
(20, 'tes8', 'y@gmail.com', '$2b$12$O/af3SgwnnZ84OSjbs6ZPuIWVVNe3sxgtaPcSuX3YdO8HslxLc3I2', 'user', NULL, NULL, NULL, NULL),
(21, 'tes9', 'tt@gmail.com', '$2b$12$EsybSy3JftH0JkhPzaNTA.9x6ordDuDzn.FMLA/CkZgwsuDSFU.kO', 'user', NULL, NULL, NULL, NULL),
(22, 'tes10', 'kk@gmail.com', '$2b$12$nK7wDLCdKGJYLVx7gDrekucxq8GTQfuG6/VSp1nlW9VFn26oOrpVu', 'user', NULL, NULL, NULL, NULL),
(23, 'tes11', 'lk@gmail.com', '$2b$12$rz5txHHJZuw/A/2gh3abg.75wMoyGGIXjCzw/86EHxYB4imo6OXPa', 'user', '23_1754442750047.jpg', 'Saya suka ngoding', '08123456789', 'Dau'),
(24, 'tes12', 'gj@gmail.com', '$2b$12$07Wz5.NLvU0sqPx6TpWXzu1y22tiRUXNxDyds6TD.0XFCVY2qM4xC', 'user', NULL, NULL, NULL, NULL),
(25, 'tes13', 'tes@gmail.com', '$2b$12$zf/tq2yGoVXqv/hhtEUO0O2nSYeRXulp2XbNGlaoKVMrSDDk9MAKq', 'user', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_achievements`
--

CREATE TABLE `user_achievements` (
  `user_achievement_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `achievement_id` int(11) DEFAULT NULL,
  `obtained_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_achievements`
--

INSERT INTO `user_achievements` (`user_achievement_id`, `user_id`, `achievement_id`, `obtained_at`) VALUES
(1, NULL, 13, '2025-09-01 04:34:49'),
(2, NULL, 10, '2025-09-01 04:39:56'),
(3, NULL, 10, '2025-09-01 07:05:34'),
(4, 21, 8, '2025-09-01 07:18:54'),
(5, 21, 10, '2025-09-01 07:27:33'),
(6, 25, 8, '2025-09-02 04:17:24'),
(7, 25, 13, '2025-09-02 04:17:43'),
(8, 25, 16, '2025-09-02 04:18:02'),
(9, 25, 10, '2025-09-02 04:18:27'),
(10, 25, 17, '2025-09-02 04:18:44'),
(11, 25, 6, '2025-09-02 04:19:08'),
(12, 25, 11, '2025-09-02 04:19:28'),
(13, 25, 15, '2025-09-02 04:19:47'),
(14, 25, 14, '2025-09-02 04:20:11');

-- --------------------------------------------------------

--
-- Table structure for table `user_progress`
--

CREATE TABLE `user_progress` (
  `progress_id` int(11) NOT NULL,
  `bootcamp_id` int(11) DEFAULT NULL,
  `percentage` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_progress`
--

INSERT INTO `user_progress` (`progress_id`, `bootcamp_id`, `percentage`, `user_id`) VALUES
(1, 31, 100, 23),
(2, 35, 100, 23),
(3, 28, 100, 23),
(4, 32, 100, 23),
(5, 33, 100, 23),
(6, 33, 33, 24),
(7, 28, 50, 24),
(8, 31, 99, 24),
(9, 35, 50, 24),
(10, 28, 100, 22),
(11, 31, 99, 22),
(12, 32, 100, 22),
(13, 33, 99, 22),
(14, 35, 100, 22),
(15, 28, 100, 21),
(16, 33, 99, 21),
(17, 38, 100, 25),
(18, 28, 100, 25),
(19, 32, 100, 25),
(20, 33, 99, 25),
(21, 35, 100, 25),
(22, 36, 100, 25),
(23, 37, 99, 25),
(24, 31, 99, 25),
(25, 39, 100, 25);

-- --------------------------------------------------------

--
-- Table structure for table `user_quiz`
--

CREATE TABLE `user_quiz` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `sesi_id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `jawaban_id` int(11) DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_quiz`
--

INSERT INTO `user_quiz` (`id`, `user_id`, `sesi_id`, `quiz_id`, `jawaban_id`, `is_correct`, `created_at`, `updated_at`) VALUES
(1, 23, 20, 13, 49, 1, '2025-08-29 03:14:26', '2025-08-29 07:27:50'),
(2, 23, 21, 14, 56, 1, '2025-08-29 03:14:33', '2025-08-29 07:27:54'),
(3, 23, 16, 9, 33, 1, '2025-08-29 03:46:10', '2025-08-29 07:17:21'),
(4, 23, 17, 10, 38, 1, '2025-08-29 03:46:14', '2025-08-29 03:55:23'),
(5, 23, 18, 11, 44, 1, '2025-08-29 03:46:18', '2025-08-29 07:20:46'),
(17, 23, 22, 15, 58, 1, '2025-08-29 06:35:00', '2025-08-29 06:48:34'),
(20, 23, 23, 16, 61, 1, '2025-08-29 06:35:15', '2025-08-29 07:16:42'),
(24, 23, 24, 17, 67, 1, '2025-08-29 06:35:22', '2025-08-29 07:09:01'),
(76, 23, 19, 12, 47, 1, '2025-08-29 07:28:06', '2025-08-29 07:28:09'),
(79, 23, 10, 3, 9, 1, '2025-08-29 07:28:27', '2025-08-29 07:28:27'),
(80, 23, 11, 4, 14, 1, '2025-08-29 07:28:33', '2025-08-29 07:28:33'),
(81, 23, 25, 19, 74, 1, '2025-08-30 06:28:28', '2025-08-30 06:28:29'),
(83, 24, 22, 15, 58, 1, '2025-09-01 02:30:54', '2025-09-01 02:30:55'),
(85, 24, 10, 3, 9, 1, '2025-09-01 02:31:21', '2025-09-01 02:31:23'),
(87, 24, 16, 9, 33, 1, '2025-09-01 02:31:31', '2025-09-01 02:31:31'),
(88, 24, 17, 10, 38, 1, '2025-09-01 02:31:33', '2025-09-01 02:31:33'),
(89, 24, 18, 11, 44, 1, '2025-09-01 02:31:36', '2025-09-01 02:31:36'),
(90, 24, 19, 12, 47, 1, '2025-09-01 02:31:51', '2025-09-01 02:31:54'),
(94, 22, 10, 3, 9, 1, '2025-09-01 04:18:43', '2025-09-01 04:18:43'),
(95, 22, 11, 4, 14, 1, '2025-09-01 04:18:45', '2025-09-01 04:18:45'),
(96, 22, 16, 9, 33, 1, '2025-09-01 04:26:45', '2025-09-01 04:26:45'),
(97, 22, 17, 10, 38, 1, '2025-09-01 04:26:53', '2025-09-01 04:26:53'),
(98, 22, 18, 11, 44, 1, '2025-09-01 04:26:56', '2025-09-01 04:26:57'),
(100, 22, 20, 13, 49, 1, '2025-09-01 04:34:41', '2025-09-01 04:34:44'),
(104, 22, 21, 14, 56, 1, '2025-09-01 04:34:46', '2025-09-01 04:34:49'),
(107, 22, 22, 15, 58, 1, '2025-09-01 04:39:46', '2025-09-01 04:39:48'),
(109, 22, 23, 16, 61, 1, '2025-09-01 04:39:50', '2025-09-01 04:39:54'),
(113, 22, 24, 17, 67, 1, '2025-09-01 04:39:56', '2025-09-01 04:39:56'),
(114, 22, 19, 12, 47, 1, '2025-09-01 07:05:27', '2025-09-01 07:05:32'),
(117, 22, 25, 19, 74, 1, '2025-09-01 07:05:34', '2025-09-01 07:05:34'),
(118, 21, 10, 3, 9, 1, '2025-09-01 07:18:52', '2025-09-01 07:18:52'),
(119, 21, 11, 4, 14, 1, '2025-09-01 07:18:54', '2025-09-01 07:18:54'),
(120, 21, 22, 15, 58, 1, '2025-09-01 07:27:21', '2025-09-01 07:27:23'),
(122, 21, 23, 16, 61, 1, '2025-09-01 07:27:25', '2025-09-01 07:27:29'),
(127, 21, 24, 17, 67, 1, '2025-09-01 07:27:31', '2025-09-01 07:27:33'),
(129, 25, 31, 25, 99, 1, '2025-09-02 03:59:04', '2025-09-02 03:59:06'),
(132, 25, 10, 3, 9, 1, '2025-09-02 04:17:21', '2025-09-02 04:17:21'),
(133, 25, 11, 4, 14, 1, '2025-09-02 04:17:24', '2025-09-02 04:17:24'),
(134, 25, 20, 13, 49, 1, '2025-09-02 04:17:38', '2025-09-02 04:17:38'),
(135, 25, 21, 14, 56, 1, '2025-09-02 04:17:41', '2025-09-02 04:17:43'),
(138, 25, 22, 15, 58, 1, '2025-09-02 04:17:56', '2025-09-02 04:17:56'),
(139, 25, 23, 16, 61, 1, '2025-09-02 04:17:59', '2025-09-02 04:17:59'),
(140, 25, 24, 17, 67, 1, '2025-09-02 04:18:01', '2025-09-02 04:18:02'),
(142, 25, 19, 12, 47, 1, '2025-09-02 04:18:18', '2025-09-02 04:18:20'),
(145, 25, 25, 19, 74, 1, '2025-09-02 04:18:22', '2025-09-02 04:18:27'),
(148, 25, 26, 20, 78, 1, '2025-09-02 04:18:37', '2025-09-02 04:18:39'),
(150, 25, 27, 21, 81, 1, '2025-09-02 04:18:42', '2025-09-02 04:18:44'),
(153, 25, 28, 22, 85, 1, '2025-09-02 04:18:57', '2025-09-02 04:18:57'),
(154, 25, 29, 23, 92, 1, '2025-09-02 04:19:01', '2025-09-02 04:19:03'),
(157, 25, 30, 24, 94, 1, '2025-09-02 04:19:06', '2025-09-02 04:19:08'),
(160, 25, 16, 9, 33, 1, '2025-09-02 04:19:22', '2025-09-02 04:19:22'),
(161, 25, 17, 10, 38, 1, '2025-09-02 04:19:24', '2025-09-02 04:19:24'),
(162, 25, 18, 11, 44, 1, '2025-09-02 04:19:27', '2025-09-02 04:19:28'),
(164, 25, 32, 26, 101, 1, '2025-09-02 04:19:43', '2025-09-02 04:19:47'),
(168, 25, 33, 27, 106, 1, '2025-09-02 04:19:57', '2025-09-02 04:19:59'),
(170, 25, 34, 28, 112, 1, '2025-09-02 04:20:01', '2025-09-02 04:20:03'),
(172, 25, 36, 29, 114, 1, '2025-09-02 04:20:06', '2025-09-02 04:20:06'),
(173, 25, 37, 30, 117, 1, '2025-09-02 04:20:08', '2025-09-02 04:20:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`achievement_id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `blog_comments`
--
ALTER TABLE `blog_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_id` (`blog_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `certificate`
--
ALTER TABLE `certificate`
  ADD PRIMARY KEY (`certificate_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `bootcamp_id` (`bootcamp_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_enrollment` (`user_id`,`program_id`),
  ADD KEY `program_id` (`program_id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Indexes for table `inbox`
--
ALTER TABLE `inbox`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `instructor`
--
ALTER TABLE `instructor`
  ADD PRIMARY KEY (`instructor_id`);

--
-- Indexes for table `jawaban`
--
ALTER TABLE `jawaban`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_soal` (`id_soal`);

--
-- Indexes for table `pricing_benefits`
--
ALTER TABLE `pricing_benefits`
  ADD PRIMARY KEY (`benefit_id`),
  ADD KEY `pricing_id` (`pricing_id`);

--
-- Indexes for table `program`
--
ALTER TABLE `program`
  ADD PRIMARY KEY (`program_id`),
  ADD KEY `instructor_id` (`instructor_id`);

--
-- Indexes for table `program_achievements`
--
ALTER TABLE `program_achievements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_program` (`program_id`),
  ADD KEY `id_achievement` (`achievement_id`);

--
-- Indexes for table `program_facts`
--
ALTER TABLE `program_facts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `program_jobs`
--
ALTER TABLE `program_jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `program_pricing`
--
ALTER TABLE `program_pricing`
  ADD PRIMARY KEY (`pricing_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `program_skills`
--
ALTER TABLE `program_skills`
  ADD PRIMARY KEY (`program_id`,`skill_id`),
  ADD KEY `skill_id` (`skill_id`);

--
-- Indexes for table `program_tools`
--
ALTER TABLE `program_tools`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_program_tool` (`program_id`,`tool_id`),
  ADD KEY `tool_id` (`tool_id`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_sesi` (`id_sesi`),
  ADD KEY `id_soal` (`id_soal`);

--
-- Indexes for table `sesi`
--
ALTER TABLE `sesi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_program` (`id_program`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`skill_id`);

--
-- Indexes for table `soal`
--
ALTER TABLE `soal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tools`
--
ALTER TABLE `tools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_id` (`order_id`),
  ADD UNIQUE KEY `midtrans_order_id` (`midtrans_order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `tugas`
--
ALTER TABLE `tugas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_sesi` (`id_sesi`),
  ADD KEY `id_tugas_user` (`id_tugas_user`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_achievements`
--
ALTER TABLE `user_achievements`
  ADD PRIMARY KEY (`user_achievement_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `achievement_id` (`achievement_id`);

--
-- Indexes for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD PRIMARY KEY (`progress_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `bootcamp_id` (`bootcamp_id`);

--
-- Indexes for table `user_quiz`
--
ALTER TABLE `user_quiz`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_user_quiz` (`user_id`,`quiz_id`),
  ADD KEY `sesi_id` (`sesi_id`),
  ADD KEY `quiz_id` (`quiz_id`),
  ADD KEY `jawaban_id` (`jawaban_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `achievements`
--
ALTER TABLE `achievements`
  MODIFY `achievement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_comments`
--
ALTER TABLE `blog_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `certificate`
--
ALTER TABLE `certificate`
  MODIFY `certificate_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `inbox`
--
ALTER TABLE `inbox`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `instructor`
--
ALTER TABLE `instructor`
  MODIFY `instructor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `jawaban`
--
ALTER TABLE `jawaban`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT for table `pricing_benefits`
--
ALTER TABLE `pricing_benefits`
  MODIFY `benefit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `program`
--
ALTER TABLE `program`
  MODIFY `program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `program_achievements`
--
ALTER TABLE `program_achievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `program_facts`
--
ALTER TABLE `program_facts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `program_jobs`
--
ALTER TABLE `program_jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `program_pricing`
--
ALTER TABLE `program_pricing`
  MODIFY `pricing_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `program_tools`
--
ALTER TABLE `program_tools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `sesi`
--
ALTER TABLE `sesi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `skill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `soal`
--
ALTER TABLE `soal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `tugas`
--
ALTER TABLE `tugas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `user_achievements`
--
ALTER TABLE `user_achievements`
  MODIFY `user_achievement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user_progress`
--
ALTER TABLE `user_progress`
  MODIFY `progress_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `user_quiz`
--
ALTER TABLE `user_quiz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `blog_comments`
--
ALTER TABLE `blog_comments`
  ADD CONSTRAINT `blog_comments_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`),
  ADD CONSTRAINT `blog_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `certificate`
--
ALTER TABLE `certificate`
  ADD CONSTRAINT `certificate_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `certificate_ibfk_2` FOREIGN KEY (`bootcamp_id`) REFERENCES `program` (`program_id`),
  ADD CONSTRAINT `certificate_ibfk_3` FOREIGN KEY (`admin_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`),
  ADD CONSTRAINT `enrollments_ibfk_3` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`);

--
-- Constraints for table `inbox`
--
ALTER TABLE `inbox`
  ADD CONSTRAINT `inbox_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `jawaban`
--
ALTER TABLE `jawaban`
  ADD CONSTRAINT `jawaban_ibfk_1` FOREIGN KEY (`id_soal`) REFERENCES `soal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pricing_benefits`
--
ALTER TABLE `pricing_benefits`
  ADD CONSTRAINT `pricing_benefits_ibfk_1` FOREIGN KEY (`pricing_id`) REFERENCES `program_pricing` (`pricing_id`) ON DELETE CASCADE;

--
-- Constraints for table `program`
--
ALTER TABLE `program`
  ADD CONSTRAINT `program_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `instructor` (`instructor_id`);

--
-- Constraints for table `program_achievements`
--
ALTER TABLE `program_achievements`
  ADD CONSTRAINT `id_achievement` FOREIGN KEY (`achievement_id`) REFERENCES `achievements` (`achievement_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_program` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `program_facts`
--
ALTER TABLE `program_facts`
  ADD CONSTRAINT `program_facts_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`) ON DELETE CASCADE;

--
-- Constraints for table `program_jobs`
--
ALTER TABLE `program_jobs`
  ADD CONSTRAINT `program_jobs_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`) ON DELETE CASCADE;

--
-- Constraints for table `program_pricing`
--
ALTER TABLE `program_pricing`
  ADD CONSTRAINT `program_pricing_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`) ON DELETE CASCADE;

--
-- Constraints for table `program_skills`
--
ALTER TABLE `program_skills`
  ADD CONSTRAINT `program_skills_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `program_skills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`skill_id`) ON DELETE CASCADE;

--
-- Constraints for table `program_tools`
--
ALTER TABLE `program_tools`
  ADD CONSTRAINT `program_tools_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `program_tools_ibfk_2` FOREIGN KEY (`tool_id`) REFERENCES `tools` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `quiz_ibfk_1` FOREIGN KEY (`id_sesi`) REFERENCES `sesi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quiz_ibfk_2` FOREIGN KEY (`id_soal`) REFERENCES `soal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sesi`
--
ALTER TABLE `sesi`
  ADD CONSTRAINT `sesi_ibfk_1` FOREIGN KEY (`id_program`) REFERENCES `program` (`program_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`) ON DELETE CASCADE;

--
-- Constraints for table `tugas`
--
ALTER TABLE `tugas`
  ADD CONSTRAINT `tugas_ibfk_1` FOREIGN KEY (`id_sesi`) REFERENCES `sesi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_achievements`
--
ALTER TABLE `user_achievements`
  ADD CONSTRAINT `user_achievements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_achievements_ibfk_2` FOREIGN KEY (`achievement_id`) REFERENCES `achievements` (`achievement_id`);

--
-- Constraints for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD CONSTRAINT `user_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_progress_ibfk_2` FOREIGN KEY (`bootcamp_id`) REFERENCES `program` (`program_id`);

--
-- Constraints for table `user_quiz`
--
ALTER TABLE `user_quiz`
  ADD CONSTRAINT `user_quiz_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_quiz_ibfk_2` FOREIGN KEY (`sesi_id`) REFERENCES `sesi` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_quiz_ibfk_3` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_quiz_ibfk_4` FOREIGN KEY (`jawaban_id`) REFERENCES `jawaban` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
