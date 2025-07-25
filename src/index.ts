import { Hono } from 'hono'
import { getAllTodos, getTodoById } from './handlers/todos'

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


export default app
