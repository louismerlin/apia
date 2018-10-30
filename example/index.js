const express = require('express')
const apia = require('apia')

const app = express()
const port = 3000

app.use(apia('helloworld'))

app.get('/', (req, res) =>
  res.send('Hello, World !')
)

app.get('/:name', (req, res) =>
  res.send(`Hello, ${req.params.name} !`)
)

app.listen(port, () => console.log(`Example app listening on port ${port}`))
