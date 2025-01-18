CREATE TABLE `migrations` (
	`id` varchar(255) NOT NULL,
	`hash` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `migrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_personal_information` (
	`user_id` int NOT NULL,
	`email` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	CONSTRAINT `user_personal_information_user_id` PRIMARY KEY(`user_id`),
	CONSTRAINT `user_personal_information_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
