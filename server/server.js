var mysql = require('mysql');
var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(3000);
var io = socket(server);

var db = mysql.createConnection({
  host: 'mysql.cs.iastate.edu',
  user: 'dbu309la1',
  password: 'OGFjM2RlNDYx',
  database: 'db309la1'
});

db.connect(function(err){
  if (err) console.log(err);
});

setInterval(heartbeat, 1000/60);

app.use(express.static('../public'));



function heartbeat(){

}

console.log("My socket server is running\n");


io.sockets.on('connection', function(socket){

    console.log('New Connection ' + socket.id);




    socket.on('disconnect', function(){
      console.log("client disconnected");
    });
});
