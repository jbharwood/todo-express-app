const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 3001,
})

const getTasks = (request, response) => {
  pool.query('SELECT * FROM tasks ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
} //blah

const getTaskById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM tasks WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createTask = (request, response) => {
  const { task, completed } = request.body

  pool.query('INSERT INTO tasks (task, completed) VALUES ($1, $2)', [task, completed], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Task added with ID: ${result.insertId}`)
  })
}

const updateTask = (request, response) => {
  const id = parseInt(request.params.id)
  const { task, completed } = request.body

  pool.query(
    'UPDATE users SET task = $1, completed = $2 WHERE id = $3',
    [task, completed, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Task modified with ID: ${id}`)
    }
  )
}

const deleteTask = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM tasks WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Task deleted with ID: ${id}`)
  })
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
}
