const { Router } = require('express')
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
apia.get('/grapia', (req, res) =>
  res.send(hits)
)

module.exports = apia
