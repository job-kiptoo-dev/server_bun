import { sql } from "drizzle-orm";
import { boolean, check, integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";



export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar({ length: 255 }).unique().notNull(),
  passwordHash: varchar({ length: 500 }).notNull(),
  age: integer(),
  createdAt: timestamp({ withTimezone: true }).defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow(),
},
  (table) => [
    check("age_check1", sql`${table.age} >= 120`),

    check("age_check2", sql`${table.age} <= 0`),
  ]
)

export const todoTable = pgTable("todo", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar().notNull(),
  content: varchar({ length: 1000 }).notNull(),
  completed: boolean().default(false),
  createdAt: timestamp({ withTimezone: true }).defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow(),
  useId: uuid().references(() => usersTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  })
})
