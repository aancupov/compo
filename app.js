const express = require('express')
const app = express()
app.use(express.json())  //чтобы express мог работать с json

const db = require('./db') //модуль работы с БД

//GET
app.get('/api/forcenter', (req, res) => {
  db.forCenter((err, list) => {
    if(err) {
      res.status(400)
    } else {
      res.status(200).json(list)
    }
  })
})

//DELETE
app.delete('/api/forcenter/:guid', (req, res) => {
  guid = req.params.guid
  db.delForCenter(guid)
  res.status(200).json({'result':'ok'})
})

//POST
app.post('/api/fromslave/:guid', (req, res) => {
  guid = req.params.guid
  db.addForCenter(guid, req.body)
  res.status(201).json({'result':'ok'})
})

app.listen(3000, () => console.log('Server has been started on port 3000...'))