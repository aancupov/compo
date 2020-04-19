const express = require('express')
const app = express()

const CONTACTS = [
  {id:1, value: {name: 'Распределение', number: 'ВЧ-0021', date: '01-04-2020'} },
  {id:2, value: {name: 'Распределение', number: 'ВЧ-0022', date: '02-04-2020'} },
]

app.use(express.json())  //чтобы express мог работать с json


//GET
app.get('/api/forcenter', (req, res) => {
  res.status(200).json(CONTACTS)
})

//DELETE
app.delete('/api/forcenter/:id', (req, res) => {
  id = req.params.id
  res.status(200).json({'id': id})
})

//POST
app.post('/api/fromslave', (req, res) => {
  console.log(req.body)
  res.status(201).json({'ok':'ok'})
})

app.listen(3000, () => console.log('Server has been started on port 3000...'))