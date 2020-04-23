const express = require('express')
const app = express()
app.use(express.json())  //чтобы express мог работать с json
const db = require('./db') //модуль работы с БД
const logger = require('./logger')

//Проверка наличия БД и файла-лога
logger.init()
db.init()

//Определение REST-API

//////////////// Center
//GET
app.get('/api/forcenter', (req, res) => {
  db.guids(db.forCenter, (err, list) => {
    if(err) {
      res.status(400)
    } else {
      res.status(200).json(list)
    }
  })
})

app.get('/api/forcenter/:guid', (req, res) => {
  guid = req.params.guid
  db.document(db.forCenter, guid, (err, list) => {
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
  db.delByGuid(db.forCenter, guid)
  res.status(200).json({'result':'ok'})
})

//POST
app.post('/api/forcenter/:guid', (req, res) => {
  guid = req.params.guid
  db.addDocument(db.forCenter, guid, req.body)
  res.status(201).json({'result':'ok'})
})

////////// Slave
//GET
app.get('/api/forslave', (req, res) => {
  db.guids(db.forSlave, (err, list) => {
    if(err) {
      res.status(400)
    } else {
      res.status(200).json(list)
    }
  })
})

app.get('/api/forslave/:guid', (req, res) => {
  guid = req.params.guid
  db.document(db.forSlave, guid, (err, list) => {
    if(err) {
      res.status(400)
    } else {
      res.status(200).json(list)
    }
  })
})

//DELETE
app.delete('/api/forslave/:guid', (req, res) => {
  guid = req.params.guid
  db.delByGuid(db.forSlave, guid)
  res.status(200).json({'result':'ok'})
})

//POST
app.post('/api/forslave/:guid', (req, res) => {
  guid = req.params.guid
  db.addDocument(db.forSlave, guid, req.body)
  res.status(201).json({'result':'ok'})
})

//Запуск сервера
app.listen(3000, () => console.log('Server has been started on port 3000...'))