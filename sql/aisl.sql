-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 15, 2026 at 03:01 PM
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
-- Database: `aisl`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `admin_email` varchar(255) DEFAULT NULL,
  `admin_pass` varchar(2000) DEFAULT NULL,
  `admin_contact` varchar(20) DEFAULT NULL,
  `admin_name` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `admin_email`, `admin_pass`, `admin_contact`, `admin_name`) VALUES
(1, 'hirun.kavishka@gmail.com', 'a874af049b8cf756872c4e4df10000f36bf0f692', '0761939149', 'Hirun Kumarasinghe');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `month` varchar(20) NOT NULL,
  `coordinator` varchar(100) NOT NULL,
  `coordinator_name` varchar(255) NOT NULL,
  `duration` varchar(50) NOT NULL,
  `credits` int(11) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `language` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `image`, `year`, `month`, `coordinator`, `coordinator_name`, `duration`, `credits`, `tags`, `language`, `created_at`) VALUES
(1, 'AI Fundamentals (English)', 'Learn the fundamentals of Artificial Intelligence', 'aifun.webp', 2025, 'January', 'john', 'Dr. John Smith', '6 weeks (15 hours)', 30, 'programming,technology', 'English', '2025-09-07 12:21:24'),
(11, 'AI Fundamentals (සිංහල)', 'Learn the fundamentals of Artificial Intelligence', 'aifun.webp', 2025, 'January', 'john', 'Dr. John Smith', '6 weeks (15 hours)', 30, 'programming,technology', 'සිංහල', '2025-09-07 06:51:24'),
(12, 'AI Fundamentals (தமிழ்)', 'Learn the fundamentals of Artificial Intelligence', 'aifun.webp', 2025, 'January', 'john', 'Dr. John Smith', '6 weeks (15 hours)', 30, 'programming,technology', 'தமிழ்', '2025-09-07 06:51:24');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `event_date` date NOT NULL,
  `event_time` time NOT NULL,
  `location` varchar(255) NOT NULL,
  `organizer` varchar(100) NOT NULL,
  `organizer_name` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `image`, `event_date`, `event_time`, `location`, `organizer`, `organizer_name`, `category`, `tags`, `created_at`) VALUES
(2, 'Official Launch of \"AI Literacy for All\"', 'LEARN proudly hosted the official launch of AI Literacy for All on 15 July 2025 at the Grand Kandyan Hotel, Kandy. This national initiative aims to democratize AI education across Sri Lanka, empowering university students, school teachers, and learners in technical and vocational training institutes to thrive in an AI-driven world.', 'f79hqqzf9l4v.jpg,hkhytpg5v9oz.jpg,g7988eaxkwg1.jpg,k9yu24pml8qo.jpg,ngm9n55b2fcm.jpg,yueri7ojyzfx.jpg,83lfl1bq6375.jpg,m589c473bk5y.jpg,tslkr78cd146.jpg,7pp73s95ivcw.jpg,338qsxds5kqv.jpg,n62kehi8v3b7.jpg,ou637umw8hul.jpg,huhxg9ojlgqv.jpg,8gcga8mcq73n.jpg,', '2025-07-15', '14:00:00', 'Grand Kandyan Hotel', 'LEARN', 'LEARN', 'workshop', 'web,technology,programming', '2025-09-07 15:41:49'),
(10, 'Certificate Awarding Ceremony of AI Fundemental Program 2024', 'rrrr', 'cyvw7l41gagk.jpg,6o8ojgzae2iq.jpg,oqzlbemsh6cq.jpg,ab1ud2djcqpb.jpg,yghaqr9lsv9j.jpg,lf63tzgwfs2n.jpg,rhs40zf92ndf.jpg,o1r8r5c6ybuu.jpg,5xmv8ptip4kj.jpg,q6iasjldlnj0.jpg,njgb74jvgywx.jpg,e6w0ro3k31bi.jpg,tnsbsq5dsd8x.jpg,26n4npz1ysjm.jpg,104m1kf5y5d7.jpg,', '2026-03-15', '15:00:00', 'Arts Theatre, Arts Faculty, University of Peradeniya', 'LEARN', 'LEARN', 'Awarding Ceremony', 'AI4ALL,LEARN', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `instructors`
--

CREATE TABLE `instructors` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `title` varchar(200) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `expertise` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `linkedin` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instructors`
--

INSERT INTO `instructors` (`id`, `name`, `title`, `image_url`, `expertise`, `email`, `created_at`, `linkedin`) VALUES
(34, 'Prof. Roshan Ragel', 'Chief Executive Officer (CEO), LEARN, Professor in Computer Engineering, University of Peradeniya', 'assets/images/instructors/new/profragel.jpg', 'Programme Leader & Trainer', 'roshanr@eng.pdn.ac.lk', '2025-10-15 14:39:58', ''),
(35, 'Dr. Asitha Bandaranayake', 'Chief Technology Officer (CTO), LEARN, Senior Lecturer, University of Peradeniya', 'assets/images/instructors/new/drasitha.jpg', 'Programme Leader & Trainer', 'asithab@eng.pdn.ac.lk', '2025-10-15 14:39:58', ''),
(36, 'Dr. Pramila Gamage', 'Senior Lecturer, University of Peradeniya', 'assets/images/instructors/new/pramila.jpg', 'Coordinator & Trainer', 'pramilag@eng.pdn.ac.lk', '2025-10-15 14:39:58', ''),
(37, 'Prof. Chalinda Beneragama', 'Professor in Horticulture, University of Peradeniya', 'assets/images/instructors/new/profchalinda.jpg', 'Trainer', 'chalindab@agri.pdn.ac.lk', '2025-10-15 14:39:58', ''),
(38, 'Prof. Sakunthala Yatigammana Ekanayake', 'Professor in Education, University of Peradeniya', 'assets/images/instructors/new/profsakunthala.jpg', 'Coordinator & Trainer', 'sakuyatigammana@arts.pdn.ac.lk', '2025-10-15 14:39:58', ''),
(39, 'Dr. Sunethra Karunaratne', 'Senior Lecturer, SLIATE', 'assets/images/instructors/new/drsunetra.jpg', 'Trainer', 'karunaratnesunethra@gmail.com', '2025-10-15 14:39:58', ''),
(40, 'Prof. Anusha Walisadeera', 'Professor in Computer Science', 'assets/images/instructors/new/profanusha.jpg', 'Trainer', 'waindika@dcs.ruh.ac.lk', '2025-10-15 14:39:58', ''),
(41, 'Dr. Mahanama Thilini', 'Lecturer, University of Kelaniya', 'assets/images/instructors/drmahanama.jpg', 'Trainer', 'thilinim@kln.ac.lk', '2025-10-15 14:39:58', ''),
(42, 'Ms. Nisansala Nilushi', 'Senior Lecturer, University of Colombo', 'assets/images/instructors/msnisansala.jpg', 'Trainer', 'nisansala@fnd.cmb.ac.lk', '2025-10-15 14:39:58', ''),
(43, 'Mr. Sakuntharaj Ratnasingam', 'Senior Lecturer, University of Vavunia', 'assets/images/instructors/mrsakuntharaj.jpg', 'Trainer', 'sakuntharaj@gmail.com', '2025-10-15 14:39:58', ''),
(44, 'Dr. Sugandima Vidanagamachchi', 'Senior Lecturer, University of Ruhuna', 'assets/images/instructors/new/drsugandima.png', 'Trainer', 'smv@dcs.ruh.ac.lk', '2025-10-15 14:39:58', ''),
(45, 'Dr. Upanith Liyanaarachchi', 'Senior Lecturer, Wayamba University of Sri Lanka', 'assets/images/instructors/new/liyanaarachchi.jpg', 'Trainer', 'upanith@wyb.ac.lk', '2025-10-15 14:39:58', ''),
(46, 'Mr. Vinothraj Thangarajah', 'Lecturer, Eastern University of Sri Lanka', 'assets/images/instructors/new/vinotharaj.jpg', 'Trainer', 'vinothrajt@esn.ac.lk', '2025-10-15 14:39:58', ''),
(47, 'Dr. Achala Pallegedara', 'Senior Lecturer, University of Peradeniya', 'assets/images/instructors/new/drachala.jpg', 'Trainer', 'achala@eng.pdn.ac.lk', '2025-10-15 14:39:58', ''),
(48, 'Ms. Dinithi Ranasinghe', 'Lecturer, Open University of Sri Lanka', 'assets/images/instructors/new/diniti.jpg', 'Trainer', 'duran@ou.ac.lk', '2025-10-15 14:39:58', ''),
(49, 'Prof. Kamalanath Samarakoon', 'Professor in Computer Engineering, University of Peradeniya', 'assets/images/instructors/drkamalanath.jpg', 'Trainer', 'kamalanath@eng.pdn.ac.lk', '2025-10-15 14:39:58', ''),
(50, 'Mr. Mohan Wijeratna', 'Assistant Director (Programming), National Institute of Education', 'assets/images/instructors/new/mrmohan.jpg', 'Trainer', 'mohan@nie.edu.lk', '2025-10-15 14:39:58', ''),
(51, 'Prof. Pradeepa Bandaranayake', 'Professor in Molecular Biotechnology and Biotechnology, University of Peradeniya', 'assets/images/instructors/new/profpradeepa.jpg', 'Trainer', 'pradeepag@agri.pdn.ac.lk', '2025-10-15 14:39:58', ''),
(52, 'Prof. Prashanthi Naragoda', 'Professor in Fine Arts, Director National Centre for Advanced Studies in Humanities and Social Science', 'assets/images/instructors/new/profprashanthi.jpg', 'Trainer', 'director@ncas.ac.lk', '2025-10-15 14:39:58', ''),
(53, 'Dr. Samaraweera Darshana', 'Deputy Director, National Institute of Education', 'assets/images/instructors/drsamaraweera.jpg', 'Trainer', 'darshananie@gmail.com', '2025-10-15 14:39:58', ''),
(54, 'Ms. Shalini Rajasingham', 'Lecturer, Open University of Sri Lanka', 'assets/images/instructors/msshalini.jpg', 'Trainer', 'sraja@ou.ac.lk', '2025-10-15 14:39:58', ''),
(55, 'Ms. Wathsala Dayananda', 'Operations Manager, LEARN', 'pi84cnbpjhjy.jpeg', 'Coordinator & Trainer', 'wathsala@ops.learn.ac.lk', '2025-10-15 14:39:58', ''),
(56, 'Mr. Thiwanka Umagiliyage', 'Senior Solutions Engineer, LEARN', 'x7czmbdrgb3z.jpg', 'Network and Cybersecurity', 'thiwanka@ops.learn.ac.lk', '2025-10-15 14:39:58', ''),
(57, 'Ms. Gayani Herath', 'Financial Accountant, LEARN', 'kyp29uj0g37n.JPG', 'Accounting & Finance', 'gayani@ops.learn.ac.lk', '2025-10-15 14:39:58', ''),
(58, 'Mr. Lakmal Dharmasena', 'Event Operations Executive, LEARN', 'assets/images/instructors/mrlakmal.jpg', 'Events operations & Qualitative Research Methods', 'lakmal@ops.learn.ac.lk', '2025-10-15 14:39:58', ''),
(59, 'Mr. Pamuditha Liyanage', 'Senior Solutions Engineer, LEARN', 'tai0tdbr51e3.jpeg', 'Network, Cybersecurity, ML and DL', 'pamuditha@ops.learn.ac.lk', '2025-10-15 14:39:58', ''),
(60, 'Ms. Andrea Rajiah', 'Snr Admin Executive cum PA, LEARN', 'i5oklpctn60w.jpg', 'Administration', 'andrea@ops.learn.ac.lk', '2025-10-15 14:39:58', ''),
(61, 'Mr. Milinda Gunasena', 'Manager HR & Admin., LEARN', 'o9vwacf7xklg.jpeg', 'HR & Admin.', 'milinda@ops.learn.ac.lk', '2025-10-15 14:39:58', ''),
(62, 'Mr. G.Romiyal', 'Lecturer, Sri Lanka-German Training Institute - SLGTI', '89rd325ohr37.jpg', 'Coordinator & Trainer', '', '2025-11-23 11:47:03', '');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `images` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news_images`
--

CREATE TABLE `news_images` (
  `id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `coordinator` varchar(100) NOT NULL,
  `coordinator_name` varchar(255) NOT NULL,
  `duration` varchar(50) NOT NULL,
  `credits` int(11) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`id`, `title`, `description`, `image`, `year`, `coordinator`, `coordinator_name`, `duration`, `credits`, `tags`, `created_at`) VALUES
(1, 'Computer Science Fundamentals', 'A comprehensive program covering the core concepts of computer science, algorithms, and data structures.', 'cs-fundamentals.avif', 2023, 'john', 'Dr. John Smith', '12 months', 60, 'technology,certification', '2025-09-07 09:21:46'),
(2, 'Business Administration', 'Develop essential business skills and knowledge to advance your career in management and leadership.', 'business-admin.jpg', 2023, 'sarah', 'Prof. Sarah Johnson', '18 months', 90, 'business,certification', '2025-09-07 09:21:46'),
(3, 'Data Science & Analytics', 'Master the tools and techniques for extracting insights from data and making data-driven decisions.', 'data-science.webp', 2022, 'michael', 'Dr. Michael Chen', '10 months', 50, 'technology,science', '2025-09-07 09:21:46'),
(4, 'Digital Marketing Strategies', 'Learn how to create effective digital marketing campaigns and measure their success.', 'digital-marketing.webp', 2022, 'emma', 'Dr. Emma Wilson', '8 months', 40, 'business,technology', '2025-09-07 09:21:46'),
(5, 'Environmental Science', 'Study the natural environment and solutions to environmental challenges facing our planet.', 'environmental-science.webp', 2021, 'john', 'Dr. John Smith', '14 months', 70, 'science', '2025-09-07 09:21:46'),
(6, 'Graphic Design & Visual Arts', 'Develop your creative skills and learn principles of design for various media platforms.', 'graphic-design.jpg', 2021, 'emma', 'Dr. Emma Wilson', '9 months', 45, 'arts', '2025-09-07 09:21:46');

-- --------------------------------------------------------

--
-- Table structure for table `scholarships`
--

CREATE TABLE `scholarships` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `provider` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `deadline` date NOT NULL,
  `level` varchar(50) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `scholarships`
--

INSERT INTO `scholarships` (`id`, `title`, `provider`, `type`, `amount`, `deadline`, `level`, `subject`, `description`, `image_url`, `created_at`) VALUES
(1, 'STEM Excellence Scholarship', 'National Science Foundation', 'merit', 10000.00, '2026-10-15', 'undergraduate', 'science', 'Awarded to students demonstrating exceptional achievement in STEM fields with a minimum 3.5 GPA.', 'assets/images/scholarship1.webp', '2025-09-09 13:51:40'),
(2, 'Future Business Leaders Grant', 'Global Business Association', 'need', 5000.00, '2025-09-30', 'graduate', 'business', 'Designed to support students from underrepresented communities pursuing business degrees.', 'assets/images/scholarship2.jpg', '2025-09-09 13:51:40'),
(3, 'Technology Innovation Award', 'TechForward Initiative', 'merit', 7500.00, '2025-10-20', 'undergraduate', 'technology', 'For students developing innovative technology solutions to real-world problems.', 'assets/images/scholarship3.webp', '2025-09-09 13:51:40'),
(4, 'Medical Research Fellowship', 'Health Sciences Institute', 'subject', 15000.00, '2023-12-10', 'phd', 'medical', 'Supports PhD candidates conducting groundbreaking medical research.', 'assets/images/scholarship4.jpg', '2025-09-09 13:51:40'),
(5, 'Creative Arts Scholarship', 'Arts & Culture Foundation', 'merit', 3000.00, '2023-10-05', 'undergraduate', 'arts', 'For students demonstrating exceptional talent in visual arts, music, or performing arts.', 'assets/images/scholarship5.jpg', '2025-09-09 13:51:40'),
(6, 'Engineering Excellence Grant', 'International Engineering Society', 'merit', 8000.00, '2023-11-15', 'graduate', 'engineering', 'Awarded to graduate students pursuing advanced degrees in engineering disciplines.', 'assets/images/scholarship6.jpg', '2025-09-09 13:51:40');

-- --------------------------------------------------------

--
-- Table structure for table `slide_show`
--

CREATE TABLE `slide_show` (
  `row_id` int(255) NOT NULL,
  `image` varchar(500) NOT NULL,
  `text` varchar(500) NOT NULL,
  `active` int(1) NOT NULL,
  `sub` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `slide_show`
--

INSERT INTO `slide_show` (`row_id`, `image`, `text`, `active`, `sub`) VALUES
(3, '1773553513_69b6476971b42.jpg', 'Honoring Our AVPN Trainers', 1, '2025'),
(4, '1773553774_69b6486e9c86f.jpg', 'AI for All - Symbolic Launch', 1, '2025'),
(5, '1773553805_69b6488de9380.jpg', 'Leadership & Guest Highlights', 1, '2025'),
(6, '1773553827_69b648a37f95a.jpg', 'Honoring Our Speakers & Contributors', 1, '2025'),
(7, '1773553851_69b648bb81804.jpg', 'Reception & Early Highlights', 1, '2025'),
(8, '1773553872_69b648d08c473.jpg', 'AI Achievers of 2025: Certificate Ceremony Highlights - Art Theater, UoP', 1, '2025'),
(9, '1773553896_69b648e89b1a4.jpg', 'AI Achievers of 2025: Certificate Ceremony Highlights - Art Theater, UoP', 1, '2025');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news_images`
--
ALTER TABLE `news_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `news_id` (`news_id`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scholarships`
--
ALTER TABLE `scholarships`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slide_show`
--
ALTER TABLE `slide_show`
  ADD PRIMARY KEY (`row_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `instructors`
--
ALTER TABLE `instructors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `news_images`
--
ALTER TABLE `news_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `scholarships`
--
ALTER TABLE `scholarships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `slide_show`
--
ALTER TABLE `slide_show`
  MODIFY `row_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `news_images`
--
ALTER TABLE `news_images`
  ADD CONSTRAINT `news_images_ibfk_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
