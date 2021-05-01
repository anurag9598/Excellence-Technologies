const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const express = require("express");
const app = express();

// Connection URL
const url = 'mongodb://localhost:27017';

//middleware
app.use(express.json())

// Database Name
const dbName = 'mycol';

// Create a new MongoClient
const client = new MongoClient(url,{ useUnifiedTopology: true } );

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});

//routes
app.get("/",(req,res)=>{
  res.send("<h1 style=\"background-color:grey\">Works at Excellence Technologies</h1>");
});

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection1 = db.collection('candidate');
  const collection2 = db.collection('test_score');

  //Insert candidate
 collection1.insertMany([
   { name : "Anurag Chaudhary" , email : "nitin.anurag28@gmail.com" }] , function(err, result) {
    assert.equal(err, null);
    console.log("Inserted into the collection1");
    callback(result);
  });

  // Insert test_score
  collection2.insertMany([
   { first_round : 8, second_round : 9, third_round : 10}], function(err, result) {
    assert.equal(err, null);
    console.log("Inserted into the collection2");
    callback(result);
  });
}

let gethighest = function(db,callback){ let first = collection2.aggregate([{ $group : { _id : '$firstround',
firstround : { $max : $firstround }}}]);
                                       let second = collection2.aggregate([{ $group : { _id : '$secondround',
firstround : { $max : $secondround }}}]);
                                       let third = collection2.aggregate([{ $group : { _id : '$thirdround',
firstround : { $max : $thirdround }}}]);
                                       let max = (first > second) ? ((first>third)? first : third) : ((second > third)? second: third) ;
                                       callback.send(max);
                                      }

let avgperround = function(db,callback){ let first = collection2.aggregate([{ $group : { _id : '$firstround',
firstround : { $avg : $firstround }}}]);
                                       let second = collection2.aggregate([{ $group : { _id : '$secondround',
firstround : { $avg : $secondround }}}]);
                                       let third = collection2.aggregate([{ $group : { _id : '$thirdround',
firstround : { $avg : $thirdround }}}]);
                                        let avg = (first+second+third)/3 ; 
                                        callback.send(avg);
                                       }

//listen
app.listen(8080,()=>console.log("Running on port 8080"));
