const parameters = require('./parameters')
const db = require('./db')

const express = require('express')
const app = express()


const CONTACTS = [
  {id:1, value: {name: 'Распределение', number: 'ВЧ-0021', date: '01-04-2020'} },
  {id:2, value: {name: 'Распределение', number: 'ВЧ-0022', date: '02-04-2020'} },
]

app.use(express.json())  //чтобы express мог работать с json


//GET
app.get('/api/forcenter', (req, res) => {
  //console.log(parameters.Parameters.db)
  //db.create()
  db.select((list) => {
    console.log("==>"+list)
    res.status(200).json(list)
  })
})

//DELETE
app.delete('/api/forcenter/:guid', (req, res) => {
  guid = req.params.guid
  //console.log(guid)
  //console.log(req.body)
  db.delForCenter(guid)
  res.status(200).json({'result':'ok'})
})

//POST
app.post('/api/fromslave/:guid', (req, res) => {
  guid = req.params.guid
  //console.log(guid)
  //console.log(req.body)
  db.addForCenter(guid, req.body)
  res.status(201).json({'result':'ok'})
})

app.listen(3000, () => console.log('Server has been started on port 3000...'))