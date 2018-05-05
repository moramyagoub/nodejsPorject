var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors')
var ObjectId = require('mongodb').ObjectID;
 var db = require("./mangodb");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.get('/Users', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

     db.database.LoadData({},"Users").then(function(d){
         console.log(d);
         res.json(d);
     });
   
 });
 app.post("/Users/Add",function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    db.database.newRecord(req.body,"Users")
res.send("done");
 });

 app.post("/Users/edit",function(req,res){
 var newvalus = req.body; //JSON.parse(req.body);
 console.log(newvalus);
 var filer = {_id:ObjectId(req.body._id)};
    db.database.UpdateRecord(filer,newvalus,"Users");
res.send("done");
 });
 app.post("/Users/delete",function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    var filer = {_id:ObjectId(req.body._id)};
    db.database.deleteRecord(filer,"Users")
res.send("done");
 });


 app.post("/auth",function(req,res){
userName = req.body.userName;
pass  = req.body.Password;

q = {UserName:userName,Password:pass};
console.log(q)
 db.database.Find(q,"Users").then(function(d){
res.json(d);
 });

 });
 app.listen(3000);
 console.log("server start");