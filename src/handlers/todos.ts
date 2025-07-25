import { db } from "../db/config/db";
import { todoTable } from "../db/schema";
import { eq } from "drizzle-orm";

export async function getAllTodos() {
  const todos = await db.select().from(todoTable)
  return todos;
}


export async function getTodoById(id: string) {
  const todoId = await db.select(
    {
      title: todoTable.title,
      content: todoTable.content,
    }
  ).from(todoTable).where(eq(todoTable.id, id));
  return todoId[0];
}

export async function createTodo(title: string, content: string) {
  const todo = await db.insert(todoTable).values({
    title,
    content
  }).returning({ title: todoTable.title });

  return `Todo created :)${todo} `;
}

export async function removeTodo(id: string) {
  const removeTodo = await db.delete(todoTable).where(eq(todoTable.id, id)).returning({ title: todoTable.title });
  return `Todo with id ${removeTodo} removed :) `;
}
