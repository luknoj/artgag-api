# Sample database with some data

You can copy and paste all of this commands into your MySQL database and the connect it with the server. I recommend XAMPP for that purpose.

#### Structure for posts

```
CREATE TABLE `articles` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(50) CHARACTER SET utf8 NOT NULL,
  `content` text CHARACTER SET utf8 NOT NULL,
  `post_date` date NOT NULL,
  `accepted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```
Data which has some sample posts hosted on imgur

```
INSERT INTO `articles` (`post_id`, `user_id`, `title`, `content`, `post_date`, `accepted`) VALUES
(1, 1, 'post4', 'https://i.imgur.com/CEk6YVa.gif', '2018-01-28', 0),
(2, 1, 'post5', 'https://i.imgur.com/hVmoqga.jpg', '2018-01-28', 0);
```
#### comments

```
CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` text NOT NULL,
  `date` date NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

#### rating

```
CREATE TABLE `rating` (
  `rateId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `rate` tinyint(2) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```
#### users

```
CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `userEmail` varchar(60) NOT NULL,
  `userPass` varchar(255) NOT NULL,
  `creationDate` date NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
Passwords are hashed and stored as hash in the database.
Sample account is *"root"* with password *"admin"*.

```
INSERT INTO `users` (`userId`, `userName`, `userEmail`, `userPass`, `creationDate`, `is_admin`) VALUES
(1, 'root', 'root@root.com', '21232f297a57a5a743894a0e4a801fc3', '2017-10-19', 1);
```

#### indexes

```
ALTER TABLE `articles`
  ADD PRIMARY KEY (`post_id`);

ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

ALTER TABLE `rating`
  ADD PRIMARY KEY (`rateId`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userEmail` (`userEmail`);

ALTER TABLE `articles`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;


ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

ALTER TABLE `rating`
  MODIFY `rateId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;
```