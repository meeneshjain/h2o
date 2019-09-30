-- Adminer 4.5.0 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `alternate_mobile` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `is_email_verified` tinyint(4) NOT NULL DEFAULT '0',
  `is_mobile_verified` tinyint(4) NOT NULL DEFAULT '0',
  `customer_type` varchar(50) NOT NULL COMMENT 'user ; corporate',
  `referral_code` varchar(100) NOT NULL,
  `third_party_auth` varchar(50) NOT NULL COMMENT 'facebook , google',
  `source` varchar(50) NOT NULL COMMENT 'ios, android, web, admin',
  `status` varchar(50) NOT NULL COMMENT '0 - deleted; 1- active; 2 - inactive',
  `created_date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

TRUNCATE `customers`;
INSERT INTO `customers` (`id`, `first_name`, `last_name`, `email`, `password`, `mobile`, `alternate_mobile`, `dob`, `is_email_verified`, `is_mobile_verified`, `customer_type`, `referral_code`, `third_party_auth`, `source`, `status`, `created_date`, `updated_date`) VALUES
(1,	'Meenesh',	'Jain',	'j.meenesh@gmail.com',	'',	'9993755651',	'9425664770',	'1991-06-19',	0,	0,	'user',	'',	'',	'1',	'1',	'2019-09-29 22:17:29',	'2019-09-29 22:17:29');

DROP TABLE IF EXISTS `customer_address`;
CREATE TABLE `customer_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `mobile` varchar(250) NOT NULL,
  `lat` float NOT NULL,
  `long` float NOT NULL,
  `is_primary` tinyint(4) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

TRUNCATE `customer_address`;

DROP TABLE IF EXISTS `customer_login_history`;
CREATE TABLE `customer_login_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `customer_token` varchar(250) NOT NULL,
  `device_type` varchar(50) NOT NULL COMMENT 'iOS 1 :- Android 2 :- web 0',
  `device_id` varchar(250) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

TRUNCATE `customer_login_history`;
INSERT INTO `customer_login_history` (`id`, `customer_id`, `customer_token`, `device_type`, `device_id`, `created_date`, `updated_date`) VALUES
(1,	1,	'.H&DcWyawzkJL3ala8k0',	'1',	'wqwewqeqasdsadasdaasd',	'2019-09-28 00:00:00',	'2019-09-28 00:00:00');

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `price` varchar(50) NOT NULL,
  `mrp` varchar(50) NOT NULL,
  `image` varchar(500) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

TRUNCATE `products`;
INSERT INTO `products` (`id`, `name`, `price`, `mrp`, `image`, `status`, `created_date`, `updated_date`) VALUES
(1,	'water bottle',	'1200',	'1500',	'',	'active',	'2019-09-22 17:43:31',	'2019-09-22 17:43:31'),
(2,	'water tank',	'2500',	'2999',	'',	'active',	'2019-09-22 17:43:31',	'2019-09-22 17:43:31');

DROP TABLE IF EXISTS `product_supplier`;
CREATE TABLE `product_supplier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

TRUNCATE `product_supplier`;

DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_org_id` int(11) NOT NULL,
  `email` varchar(250) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `is_email_verify` tinyint(4) NOT NULL,
  `lng` varchar(50) NOT NULL,
  `area_coverage` varchar(200) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

TRUNCATE `suppliers`;

DROP TABLE IF EXISTS `suppliers_address`;
CREATE TABLE `suppliers_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `suppliers_id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `mobile` varchar(250) NOT NULL,
  `lat` float NOT NULL,
  `long` float NOT NULL,
  `address_one` text NOT NULL,
  `address_two` text NOT NULL,
  `city` varchar(250) NOT NULL,
  `state` varchar(250) NOT NULL,
  `pin_code` varchar(250) NOT NULL,
  `country` varchar(250) NOT NULL,
  `tag` varchar(250) NOT NULL,
  `is_primary` tinyint(4) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

TRUNCATE `suppliers_address`;

DROP TABLE IF EXISTS `suppliers_login_history`;
CREATE TABLE `suppliers_login_history` (
  `id` int(11) NOT NULL,
  `suppliers_id` int(11) NOT NULL,
  `customer_token` varchar(250) NOT NULL,
  `device_type` varchar(250) NOT NULL,
  `device_id` varchar(50) NOT NULL,
  `player_id` varchar(50) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

TRUNCATE `suppliers_login_history`;

DROP TABLE IF EXISTS `suppliers_working_day`;
CREATE TABLE `suppliers_working_day` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `suppliers_id` int(11) NOT NULL,
  `weekday` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

TRUNCATE `suppliers_working_day`;

DROP TABLE IF EXISTS `suppliers_working_hourid`;
CREATE TABLE `suppliers_working_hourid` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `suppliers_id` int(11) NOT NULL,
  `suppliers_working_day_id` int(11) NOT NULL,
  `start_time` varchar(100) NOT NULL,
  `end_time` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

TRUNCATE `suppliers_working_hourid`;

DROP TABLE IF EXISTS `supplier_org`;
CREATE TABLE `supplier_org` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `supplier_slug` varchar(250) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

TRUNCATE `supplier_org`;

-- 2019-09-30 15:58:42