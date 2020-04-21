const parameters = require('./parameters')
var sqlite3 = require('sqlite3').verbose();

var list = []

exports.test = function testDb() {
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

exports.create = function createDb() {
  var db = new sqlite3.Database(parameters.Parameters.db);
 
  db.serialize(function() {
    db.run("CREATE TABLE fromcenter (id STRING(36) PRIMARY KEY NOT NULL, value TEXT)");
    db.run("CREATE TABLE forcenter (id STRING(36) PRIMARY KEY NOT NULL, value TEXT)");
  });
   
  db.close();
}

exports.addForCenter = function addForCenterDB(guid, js) {
  var db = new sqlite3.Database(parameters.Parameters.db);
 
  db.serialize(function() {
    console.log(guid)
    console.log(js)
    db.run("REPLACE INTO forcenter(id, value) VALUES(?,?)", guid, JSON.stringify(js));
    //stmt.run(guid, js);
    //stmt.finalize();
  });
   
  db.close();
}

exports.forCenter = function forCenterDb(fun) {
  var db = new sqlite3.Database(parameters.Parameters.db);
  db.serialize(function() {
    list.length = 0
    db.each("SELECT id AS guid FROM forcenter", function(err, row) {
        list.push(row.guid);
        console.log("="+row.guid)
        console.log("=>"+list)
        fun(list)
      });
  });
  db.close()
}

exports.delForCenter = function delForCenterDB(guid) {
  var db = new sqlite3.Database(parameters.Parameters.db);
 
  db.serialize(function() {
    var stmt = db.prepare("DELETE FROM forcenter WHERE id=?");
    stmt.run(guid);
    stmt.finalize();
  });
   
  db.close();
}

exports.select = function (cb) {
  var list = [];
  var db = new sqlite3.Database(parameters.Parameters.db);           
  db.all("SELECT id FROM forcenter", function(err,rows){
    //if(err) return cb(err);
    let contador = 0; 
    rows.forEach(function (row) { 
      list.push(row.id)
    }); 
    db.close();
    return cb(list);
}); 
}