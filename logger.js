const path = require('path')
const fs = require('fs')
const fil = "./db/log.txt" 

exports.init = function() {
  fs.readFile(fil , err => {
    if(err) {
      if(err.code === 'ENOENT') {
        fs.writeFile(fil, getDate()+" => Создали новый файл лога", err => {
          if (err) {
            throw err
          }
        })
      }
    }
  })
}

exports.log = function(msg) {
  fs.appendFile(fil, "\n"+getDate() + " => "+msg, err => {
    if (err) {
      throw err
    }
  })
}

getDate = function() {
  var now = new Date()
  var options = {
    //era: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    //weekday: 'long',
    timezone: 'UTC+5',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  
  return now.toLocaleString("ru", options)
}