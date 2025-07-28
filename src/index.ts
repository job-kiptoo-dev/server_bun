import { Hono } from 'hono'
import { createTodo, getAllTodos, getTodoById } from './handlers/todos'
import { todoTable } from './db/schema'
import { db } from './db/config/db'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/todos', async (c) => {
  const todos = await getAllTodos()
  return c.json({ todos })
})

app.get('/todos/:id', async (c) => {

  const id = c.req.param('id')
  const todo = await getTodoById(id)
  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404)
  }
  return c.json({ todo })
})

app.post("/create_todo", async (c) => {
  const { title, content } = await c.req.json()

  if (!title || !content) {
    return c.json({ error: 'Title and content are required' }, 400)
  }
  // Here you would typically save the todo to a database
  const newTodo = await db.insert(todoTable).values({
    title,
    content,
    completed: false
  }).returning()
  return c.json(newTodo[0])



}
)

export default app;
