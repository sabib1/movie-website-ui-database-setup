CREATE TABLE `movies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`poster` text NOT NULL,
	`rating` integer NOT NULL,
	`duration` text NOT NULL,
	`description` text NOT NULL
);
