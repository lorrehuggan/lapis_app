CREATE TABLE `folder` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`user_id` text NOT NULL,
	`created_at` text DEFAULT '2024-03-20T00:27:25.571Z' NOT NULL,
	`updated_at` text DEFAULT '2024-03-20T00:27:25.571Z' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
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
	`trashed` integer DEFAULT false,
	`created_at` text DEFAULT '2024-03-20T00:27:25.570Z' NOT NULL,
	`updated_at` text DEFAULT '2024-03-20T00:27:25.570Z' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`folder_id`) REFERENCES `folder`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`created_at` text DEFAULT '2024-03-20T00:27:25.569Z' NOT NULL,
	`updated_at` text DEFAULT '2024-03-20T00:27:25.569Z' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `folder_id_unique` ON `folder` (`id`);--> statement-breakpoint
CREATE INDEX `folder_id_idx` ON `folder` (`id`);--> statement-breakpoint
CREATE INDEX `folder_user_idx` ON `folder` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `note_id_unique` ON `note` (`id`);--> statement-breakpoint
CREATE INDEX `note_id_idx` ON `note` (`id`);--> statement-breakpoint
CREATE INDEX `note_user_idx` ON `note` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_id_unique` ON `user` (`id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `user` (`id`);