const express = require('express')
const bcrypt = require('bcryptjs')
const path = require('path')

module.exports = password => {
  const apia = express.Router()
  const hash = bcrypt.hashSync(password || '')
  const hits = {}

  // The actual analyst
  apia.use((req, res, next) => {
    const urlHits = hits[req.url] || {}
    const now = Date.now()
    const date = now - now % 60000 // Round down to the previous minute
    urlHits[date] = urlHits[date] + 1 || 1
    hits[req.url] = urlHits
    next()
  })

  // API request with relevant info
  apia.get('/apia', (req, res) => {
    if (bcrypt.compareSync(req.get('password') || '', hash)) { return res.send(hits) } else return res.sendStatus(401)
  })

  // Graphical view of relevant info
  apia.use('/grapia', express.static(path.join(__dirname, 'grapia')))

  return apia
}
