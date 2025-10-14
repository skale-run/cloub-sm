const express = require('express')
const path = require('path')
const helmet = require('helmet')

const app = express()
const PORT = process.env.PORT || 8080

app.disable('x-powered-by')
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
)
// Serve static assets from the build directory
app.use(express.static(path.join(__dirname)))

// Fallback to index.html for all unmatched routes so that
// client-side routing can handle paths like /dash, /login, /register, etc.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
