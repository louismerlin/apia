const { Router } = require('express')
const path = require('path')

const apia = Router()

const hits = {}

apia.use((req, res, next) => {
  hits[req.url] = hits[req.url] + 1 || 1
  next()
})

// API request with relevant info
apia.get('/apia', (req, res) =>
  res.send(hits)
)

// Graphical view of relevant info
apia.get('/grapia', (req, res) => {
  const p = path.join(__dirname, 'grapia/index.html')
  return res.sendFile(p)
})

module.exports = apia
