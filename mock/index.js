const express = require('express')
const cors = require('cors')
const app = express()
const port = 3009

app.use(cors())

app.get('/mock', (req, res) => {
  res.send({
    userId: Math.ceil(Math.random() * 9000 + 1000),
    id: Math.ceil(Math.random() * 9000 + 1000),
    title: 'Title',
    completed: Math.random() > 0.5 ? true : false,
    createdAt: new Date()
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

