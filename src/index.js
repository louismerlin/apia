const express = require('express')
const path = require('path')

const apia = express.Router()

const hits = {}

apia.use((req, res, next) => {
  const urlHits = hits[req.url] || {}
  const now = Date.now()
  const date = now - now % 60000 // Round down to the previous minute
  urlHits[date] = urlHits[date] + 1 || 1
  hits[req.url] = urlHits
  next()
})

// API request with relevant info
apia.get('/apia', (req, res) =>
  res.send(hits)
)

// Graphical view of relevant info
apia.use('/grapia', express.static(path.join(__dirname, 'grapia')))
/*apia.get('/grapia', (req, res) => {
  const p = path.join(__dirname, 'grapia/index.html')
  return res.sendFile(p)
})*/

module.exports = apia
