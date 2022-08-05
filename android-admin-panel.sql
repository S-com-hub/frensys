-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2022 at 08:39 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `android-admin-panel`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_maping`
--

CREATE TABLE `activity_maping` (
  `id` int(11) NOT NULL,
  `activity_name` varchar(200) NOT NULL,
  `active_url` varchar(200) NOT NULL,
  `is_active` varchar(200) NOT NULL,
  `show_manu` varchar(200) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `status` varchar(1) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`id`, `name`, `type`, `image`, `status`, `date`) VALUES
(5, 'Top Banner', 'TB', 'add_banner-1659336876999-890482465.png', 'Y', '2022-08-01 06:54:37'),
(6, 'Bottom Banner', 'BB', 'add_banner-1659336928089-897563883.png', 'Y', '2022-08-01 06:55:28');

-- --------------------------------------------------------

--
-- Table structure for table `catagory`
--

CREATE TABLE `catagory` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(200) NOT NULL,
  `status` varchar(1) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `catagory`
--

INSERT INTO `catagory` (`id`, `name`, `image`, `status`, `date`) VALUES
(35, 'water pump 1', 'add_cat-1659336379056-292840901.png', 'Y', '2022-08-01 06:46:19');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `username`, `password`, `date`) VALUES
(14, 'xyz', '$2b$10$BVMot5Sk7pEPKDIGINvS7e0KM6lK1DgdZD87lR2zfTusatwFBbxHu', '2022-07-29 05:32:44');

-- --------------------------------------------------------

--
-- Table structure for table `module`
--

CREATE TABLE `module` (
  `id` int(11) NOT NULL,
  `module_name` varchar(200) NOT NULL,
  `url` varchar(200) NOT NULL,
  `role_name` varchar(200) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `module`
--

INSERT INTO `module` (`id`, `module_name`, `url`, `role_name`, `date`) VALUES
(4, 'dashboard', '/home/dashboard', 'Super Administration', '2022-07-26 11:25:10'),
(5, 'catagory', '/home/catagory', 'Super Administration', '2022-07-26 11:25:42'),
(6, 'plans', '/home/plans', 'Super Administration', '2022-07-26 11:26:03'),
(7, 'slug', '/home/slug', 'Super Administration', '2022-07-26 11:26:37'),
(8, 'sub catagory', '/home/sub-catagory', 'Super Administration', '2022-07-26 11:25:10'),
(9, 'slug-mapping', '/home/slug-mapping', 'Super Administration', '2022-07-26 11:26:37'),
(10, 'sub-cat-mapping', '/home/sub-cat-mapping', 'Super Administration', '2022-07-26 11:26:37'),
(11, 'user', '/home/user', 'Super Administration', '2022-07-26 11:25:10'),
(12, 'Banner', '/home/banner', 'Super Administration', '2022-07-26 11:25:10');

-- --------------------------------------------------------

--
-- Table structure for table `plan`
--

CREATE TABLE `plan` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `from` varchar(200) NOT NULL,
  `to` varchar(200) NOT NULL,
  `real_price` varchar(200) NOT NULL,
  `offer_price` varchar(200) NOT NULL,
  `total_download` int(11) NOT NULL,
  `image` varchar(200) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'Y',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `plan`
--

INSERT INTO `plan` (`id`, `name`, `from`, `to`, `real_price`, `offer_price`, `total_download`, `image`, `status`, `date`) VALUES
(10, 'basic', '2022-08-07', '2022-08-10', '500', '399', 200, 'Add_plan_img-1659336538718-378647567.png', 'Y', '2022-08-01 06:48:58');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `display_name`, `date`) VALUES
(3, 'Super Admin', 'Super Administration', '2022-07-23 06:13:22');

-- --------------------------------------------------------

--
-- Table structure for table `slug`
--

CREATE TABLE `slug` (
  `id` int(11) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `image` varchar(200) NOT NULL,
  `status` varchar(1) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `slug`
--

INSERT INTO `slug` (`id`, `slug`, `image`, `status`, `date`) VALUES
(12, 'first', 'add_slug-1659336767576-926510784.png', 'Y', '2022-08-01 06:52:47');

-- --------------------------------------------------------

--
-- Table structure for table `slug_mapping`
--

CREATE TABLE `slug_mapping` (
  `id` int(11) NOT NULL,
  `sugId` varchar(100) NOT NULL,
  `catId` int(11) NOT NULL,
  `subcatId` int(11) NOT NULL,
  `status` varchar(1) NOT NULL,
  `createOn` int(11) NOT NULL,
  `modifyOn` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `slug_mapping`
--

INSERT INTO `slug_mapping` (`id`, `sugId`, `catId`, `subcatId`, `status`, `createOn`, `modifyOn`) VALUES
(1, '5', 21, 0, 'Y', 0, 0),
(2, '6,5', 21, 12, 'Y', 0, 0),
(3, '7,5,8', 34, 0, 'Y', 0, 0),
(4, '5,7,8', 21, 11, 'Y', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sub-cat-mapping`
--

CREATE TABLE `sub-cat-mapping` (
  `id` int(11) NOT NULL,
  `cat_name` varchar(200) NOT NULL,
  `sub_cat_name` varchar(200) NOT NULL,
  `status` varchar(1) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sub-cat-mapping`
--

INSERT INTO `sub-cat-mapping` (`id`, `cat_name`, `sub_cat_name`, `status`, `date`) VALUES
(5, 'water pump 5', 'Water Pump Controller2', 'Y', '2022-07-28 12:37:52'),
(6, 'water pump 3', 'Water Pump Controller3', 'Y', '2022-07-28 12:56:24'),
(7, 'water pump 5', 'Water Pump Controller2', 'Y', '2022-07-28 12:56:29'),
(9, 'water pump 5', 'Water Pump Controller3', 'Y', '2022-08-01 05:42:51');

-- --------------------------------------------------------

--
-- Table structure for table `sub-catagory`
--

CREATE TABLE `sub-catagory` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `image` varchar(200) NOT NULL,
  `status` varchar(1) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sub-catagory`
--

INSERT INTO `sub-catagory` (`id`, `name`, `image`, `status`, `date`) VALUES
(16, 'sub cat 1', 'add_sub_cat-1659336806260-359087925.png', 'Y', '2022-08-01 06:53:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_maping`
--
ALTER TABLE `activity_maping`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `catagory`
--
ALTER TABLE `catagory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user` (`username`);

--
-- Indexes for table `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `module_name` (`module_name`),
  ADD KEY `role_name` (`role_name`);

--
-- Indexes for table `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `display_name` (`display_name`);

--
-- Indexes for table `slug`
--
ALTER TABLE `slug`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `slug_mapping`
--
ALTER TABLE `slug_mapping`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub-cat-mapping`
--
ALTER TABLE `sub-cat-mapping`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub-catagory`
--
ALTER TABLE `sub-catagory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Add_Catagory_name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_maping`
--
ALTER TABLE `activity_maping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `catagory`
--
ALTER TABLE `catagory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `module`
--
ALTER TABLE `module`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `plan`
--
ALTER TABLE `plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `slug`
--
ALTER TABLE `slug`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `slug_mapping`
--
ALTER TABLE `slug_mapping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sub-cat-mapping`
--
ALTER TABLE `sub-cat-mapping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `sub-catagory`
--
ALTER TABLE `sub-catagory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `module`
--
ALTER TABLE `module`
  ADD CONSTRAINT `role_name` FOREIGN KEY (`role_name`) REFERENCES `role` (`display_name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
