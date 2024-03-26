CREATE TABLE `folder` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`user_id` text NOT NULL,
	`created_at` text DEFAULT '2024-03-25T01:31:48.721Z' NOT NULL,
	`updated_at` text DEFAULT '2024-03-25T01:31:48.721Z' NOT NULL,
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
	`trashed` integer DEFAULT false,
	`created_at` text DEFAULT '2024-03-25T01:31:48.720Z' NOT NULL,
	`updated_at` text DEFAULT '2024-03-25T01:31:48.720Z' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`folder_id`) REFERENCES `folder`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `zettel` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`note_id` text NOT NULL,
	`user_id` text NOT NULL,
	`created_at` text DEFAULT '2024-03-25T01:31:48.721Z' NOT NULL,
	FOREIGN KEY (`note_id`) REFERENCES `note`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`user_email` text,
	`fresh` integer DEFAULT true NOT NULL,
	`expires_at` integer NOT NULL,
	`refresh_token` text,
	`access_token` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`created_at` text DEFAULT '2024-03-25T01:31:48.718Z' NOT NULL,
	`updated_at` text DEFAULT '2024-03-25T01:31:48.718Z' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `folder_id_unique` ON `folder` (`id`);--> statement-breakpoint
CREATE INDEX `folder_id_idx` ON `folder` (`id`);--> statement-breakpoint
CREATE INDEX `folder_user_idx` ON `folder` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `note_id_unique` ON `note` (`id`);--> statement-breakpoint
CREATE INDEX `note_id_idx` ON `note` (`id`);--> statement-breakpoint
CREATE INDEX `note_user_idx` ON `note` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `zettel_id_unique` ON `zettel` (`id`);--> statement-breakpoint
CREATE INDEX `zettel_key_idx` ON `zettel` (`key`);--> statement-breakpoint
CREATE INDEX `zettel_note_idx` ON `zettel` (`note_id`);--> statement-breakpoint
CREATE INDEX `zettel_user_idx` ON `zettel` (`user_id`);--> statement-breakpoint
CREATE INDEX `user_index` ON `session` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_id_unique` ON `user` (`id`);--> statement-breakpoint
CREATE INDEX `id_index` ON `user` (`id`);