
CREATE TABLE `Address` (
  `AID` int(6) NOT NULL AUTO_INCREMENT,
  `zipCode` varchar(5) DEFAULT NULL,
  `street` varchar(100) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `uid` varchar(50) NOT NULL,
  PRIMARY KEY (`AID`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;

CREATE TABLE `athlete` (
  `uid` varchar(50) NOT NULL,
  `nickname` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `place` (
  `id` varchar(50) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `ico` varchar(15) NOT NULL,
  `uid` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `placeGallery` (
  `uid` varchar(50) NOT NULL,
  `imageURL` varchar(250) DEFAULT NULL,
  `iid` int(5) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`iid`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

CREATE TABLE `placeTrainer` (
  `ptid` int(5) NOT NULL AUTO_INCREMENT,
  `pid` varchar(50) NOT NULL,
  `tid` varchar(50) NOT NULL,
  PRIMARY KEY (`ptid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

CREATE TABLE `sportType` (
  `stid` int(5) NOT NULL AUTO_INCREMENT,
  `sportTypeName` varchar(50) NOT NULL,
  PRIMARY KEY (`stid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE TABLE `trainer` (
  `uid` varchar(50) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `score` float DEFAULT NULL,
  `ico` int(8) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user` (
  `id` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(60) NOT NULL,
  `verified` int(10) NOT NULL,
  `verificationToken` varchar(50) NOT NULL,
  `lockedToken` varchar(50) NOT NULL,
  `nickname` varchar(30) DEFAULT NULL,
  `phoneNumber` varchar(30) DEFAULT NULL,
  `imageURL` varchar(250) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `userSportType` (
  `ustid` int(5) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `stid` varchar(50) NOT NULL,
  PRIMARY KEY (`ustid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
