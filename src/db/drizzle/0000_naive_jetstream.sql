CREATE TABLE "todo" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"content" varchar(1000) NOT NULL,
	"completed" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"use_id" uuid
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(500) NOT NULL,
	"age" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "age_check1" CHECK ("users"."age" >= 120),
	CONSTRAINT "age_check2" CHECK ("users"."age" <= 0)
);
--> statement-breakpoint
ALTER TABLE "todo" ADD CONSTRAINT "todo_use_id_users_id_fk" FOREIGN KEY ("use_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;