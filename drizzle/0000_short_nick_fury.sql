CREATE TABLE `character` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`level` integer NOT NULL,
	`hit_points` integer NOT NULL,
	`max_hit_points` integer NOT NULL,
	`temp_hit_points` integer DEFAULT 0 NOT NULL,
	`str` integer NOT NULL,
	`dex` integer NOT NULL,
	`con` integer NOT NULL,
	`int` integer NOT NULL,
	`wis` integer NOT NULL,
	`cha` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `class` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`hit_die` integer NOT NULL,
	`class_level` integer NOT NULL,
	`character` integer NOT NULL,
	FOREIGN KEY (`character`) REFERENCES `character`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `defense` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`defense` text NOT NULL,
	`character` integer NOT NULL,
	FOREIGN KEY (`character`) REFERENCES `character`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`affected_object` text NOT NULL,
	`affected_value` text NOT NULL,
	`value` integer NOT NULL,
	`character` integer NOT NULL,
	FOREIGN KEY (`character`) REFERENCES `character`(`id`) ON UPDATE no action ON DELETE cascade
);
