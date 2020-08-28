const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const port = 3000

app.use(express.json())
 
const users = [] // mocking our database

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.name, password: hashedPassword }
    users.push(user)
    res.status(201).send()
  
  } catch {
    res.status(500).send()
  }
})

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name = req.body.name)
  if (user == null) {
    return res.status(404).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).send('success')
    } else {
      res.status(401).send('unauthorized')
    }
  } catch { 
    req.status(500).send()
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
 
