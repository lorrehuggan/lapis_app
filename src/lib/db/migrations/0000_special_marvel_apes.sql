CREATE TABLE `folder` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` text DEFAULT '2024-03-16T00:08:48.615Z' NOT NULL,
	`updated_at` text DEFAULT '2024-03-16T00:08:48.615Z' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `note` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`content` text,
	`folder_id` text,
	`zettels` text DEFAULT '[]',
	`created_at` text DEFAULT '2024-03-16T00:08:48.614Z' NOT NULL,
	`updated_at` text DEFAULT '2024-03-16T00:08:48.614Z' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`folder_id`) REFERENCES `folder`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`created_at` text DEFAULT '1,710,547,728,609' NOT NULL,
	`updated_at` text DEFAULT '1,710,547,728,613' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `folder_id_unique` ON `folder` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `note_id_unique` ON `note` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_id_unique` ON `user` (`id`);