const fs = require('fs')
const parameters = require('./parameters')
var sqlite3 = require('sqlite3').verbose();
var logger = require('./logger')

exports.test = function () {
  var db = new sqlite3.Database(parameters.Parameters.db);
 
  db.serialize(function() {
    db.run("CREATE TABLE lorem (info TEXT)");
   
    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();
   
    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log(row.id + ": " + row.info);
    });
  });
   
  db.close();
}

exports.forCenter = "forcenter"
exports.forSlave = "forslave"

//проверяет наличие файла БД, если ошибка отстутствия файла, то создадим новую БД с таблицами
exports.init = function () {
  fs.readFile(parameters.Parameters.db, err => {
    if(err) {
      logger.log(err)
      if(err.code === 'ENOENT') {
        var db = new sqlite3.Database(parameters.Parameters.db);
        db.serialize(function() {
          db.run("CREATE TABLE forslave (guid STRING(36) PRIMARY KEY NOT NULL, value TEXT)");
          db.run("CREATE TABLE forcenter (guid STRING(36) PRIMARY KEY NOT NULL, value TEXT)");
        });
        db.close();
        logger.log("Создали новую БД")
      }
    }
  })
}

//добавляет в таблицу table БД документ с guid и содержанием js
exports.addDocument = function (table, guid, js) {
  var db = new sqlite3.Database(parameters.Parameters.db);
  db.serialize(function() {
    cmd = "REPLACE INTO "+table+" (guid, value) VALUES(?,?)"
    db.run(cmd, guid, JSON.stringify(js), iferr);
  });
  db.close();
}

//возвращает список guid из таблицы table
exports.guids = function (table, fun) {
  var list = [];
  var db = new sqlite3.Database(parameters.Parameters.db);
  cmd = "SELECT guid FROM " + table
  logger.log(cmd)
  db.all(cmd, function(err,rows) {
    if(err) return fun(err);
    rows.forEach(function (row) { 
      list.push(row.guid)
    }); 
    db.close();
    return fun(false,list);
  }); 
}

//возвращает содержимое документа с guid из таблицы table
exports.document = function (table, guid, fun) {
  var list = [];
  var db = new sqlite3.Database(parameters.Parameters.db);
  cmd = "SELECT value FROM " + table + " WHERE guid=?"
  obj = {}
  db.all(cmd, guid, function(err,rows) {
    if(err) return fun(err);
    rows.forEach(function (row) { 
      obj = JSON.parse(row.value)
      //list.push(obj)
    }); 
    db.close();
    return fun(false, obj);
  }); 
}

//удаляет документ с guid в таблице table
exports.delByGuid = function (table, guid) {
  var db = new sqlite3.Database(parameters.Parameters.db);
  db.serialize(function() {
    cmd = "DELETE FROM "+table+" WHERE guid=?"
    db.run(cmd, guid, iferr)
  });   
  db.close();
}

iferr = function(err) {
  if (err) {
    return logger.log(err.message);
  }
}
