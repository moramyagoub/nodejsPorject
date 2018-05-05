var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


database = {
    newRecord:function(record,collection){
s
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("dbx");
    
    dbo.collection(collection+"").insertOne(record, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
    },
    LoadData:function(filer,collection){
        return new Promise((resolve,reject)=>{
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("dbx");
                dbo.collection(collection+"").find(filer).toArray( function(err, result) {
                  if (err) throw err;
                  console.log(result)
                 // console.log(result.name);
                 resolve(result);
                  db.close();
                });
              });
              
        },(err)=>{
            reject(err);
        });
    },
    UpdateRecord:function(query,newvalues,collection){

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("dbx");
    console.log("filter , ",query);
    console.log("newvalue,",newvalues);
    dbo.collection(collection+"").findOne(query, function(err, result) {
      if (err) throw err;
      console.log("testing :",result);
      db.close();
    });
    newval = {$set:{Job:newvalues.Job,Name:newvalues.Name,UserName:newvalues.UserName,Location:newvalues.Location, Phone:newvalues.Phone}};// newvalues._id = ObjectId(newvalues._id)
    dbo.collection(collection+"").updateOne(query, newval, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
     // console.log("resource is ",res);
      db.close();
    });
  });
    },

deleteRecord:function(filter,collection){
    var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("dbx");
   
  dbo.collection(collection+"").deleteOne(filter, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
});
} , 
Find:function(query,collection){
  return new Promise((resolve,rejwct)=>{
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("dbx");
      
      dbo.collection(collection+"").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log("testing :",result);
      
        db.close();
      resolve(result);
      });
  
  });
 
} )
}
}

exports.database = database;