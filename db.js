const parameters = require('./parameters')
var sqlite3 = require('sqlite3').verbose();

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

exports.create = function () {
  var db = new sqlite3.Database(parameters.Parameters.db);
  db.serialize(function() {
    run(db, "CREATE TABLE fromcenter (id STRING(36) PRIMARY KEY NOT NULL, value TEXT)");
    run(db, "CREATE TABLE forcenter (id STRING(36) PRIMARY KEY NOT NULL, value TEXT)");
  });
  db.close();
}

exports.addForCenter = function (guid, js) {
  var db = new sqlite3.Database(parameters.Parameters.db);
  db.serialize(function() {
    db.run("REPLACE INTO forcenter(id, value) VALUES(?,?)", guid, JSON.stringify(js));
  });
   
  db.close();
}

exports.forCenter = function (fun) {
  var list = [];
  var db = new sqlite3.Database(parameters.Parameters.db);           
  db.all("SELECT id FROM forcenter", function(err,rows) {
    if(err) return fun(err);
    rows.forEach(function (row) { 
      list.push(row.id)
    }); 
    db.close();
    return fun(false,list);
  }); 
}

exports.delForCenter = function (guid) {
  var db = new sqlite3.Database(parameters.Parameters.db);
  db.serialize(function() {
    var stmt = db.prepare("DELETE FROM forcenter WHERE id=?");
    stmt.run(guid);
    stmt.finalize();
  });   
  db.close();
}

run = function(db, req_txt) {
  db.run(req_txt, function(err) {
    if (err) {
      return console.error(err.message);
    }
  });
}
