const cors = require('cors');
const express = require('express');
const app = express();
const port = 3009;

app.use(cors());

app.get('/mock', (req, res) => {
  res.send({
    userId: Math.ceil(Math.random() * 9000 + 1000),
    id: Math.ceil(Math.random() * 9000 + 1000),
    title: 'Title',
    completed: Math.random() > 0.5 ? true : false,
    createdAt: new Date(),
  });
});

app.get('/error/400', (req, res) => {
  res.status(400).send({
    code: 'ERROR-400',
    message: 'An error has occurred.',
  });
});

app.get('/error/400/delay', (req, res) => {
  setTimeout(() => {
    res.status(400).send({
      code: 'ERROR-400',
      message: 'An error has occurred.',
    });
  }, 800);
});

app.get('/error/500', (req, res) => {
  res.status(500).send({
    code: 'ERROR-500',
    message: 'An error has occurred.',
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
