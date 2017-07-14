
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

var FPS = 24;

var fighterArr = [];
var spawnerArr = [];
var enemyArr = [];
var obstacleArr = [];
var chestArr = [];
var numSpawners = 2;

app.use(express.static("../public"));


/**
 * @author Chandler Davis and Andrew Messerly
 */

/**
 * Constructs a spawner that spawns Enemy objects/sprites
 * @constructor
 *
 * @param {int} x         Initial x-position of the spawner
 * @param {int} y         Initial y-position of the spawner
 * @param {function} enemyType The constructor for the Enemy that it will spawn
 * @param {int} rate      The rate (per second) that the spawner will emit a new Enemy
 * @param {int} limit     The maximum amount of Enemies that this spawner will emit
 * @param {Image} image     The image for the EnemySpawner sprite
 */
function EnemySpawner(x, y, rate, limit)
{
	this.x = x;
	this.y = y;
	this.rate = rate;
	this.limit = limit;
	this.spawnCount = 0;
	this.curDepth = 100;

	this.enemyArr = [];
	this.spawn;
	this.timer = 0;
}

/**
 * Spawns Enemies given the values initialized in the constructor function
 * @function
 *
 */
EnemySpawner.prototype.spawn = function(enemyGroup)
{
	if((this.timer % (100/this.rate)) == 0 && this.enemyArr.length < this.limit)
	{
		this.spawnCount++;

		tempEnemy = new Enemy(this.x, this.y, this.enemyType);
		tempEnemy.sprite.depth = this.curDepth;
		this.curDepth++;
		this.enemyArr.push(tempEnemy);
		enemyGroup.push(tempEnemy.sprite);

	}

	this.timer++;
};

EnemySpawner.prototype.updateAll = function(fighterArr)
{
	for (var i = 0; i < this.enemyArr.length; i++)
	{
		this.enemyArr[i].update(fighterArr);
	}
};



/**
 * This handles the events that occur whenever someone joins the server.
 * @param  {socket} client [The socket that the client uses to connect to the server]
 */
function onSocketConnect(client)
{

	setInterval(heartbeat, 1000/FPS);

	/* When connected, add the client's fighter to the array. */
	client.on('start', function(newFighter)
	{
		console.log(client.id + " added it's fighter\n");
	});



	client.on('updateClient', function(gameData) {
		for (var i=0; i<chestArr.length; i++) {
			chestArr[i].isOpen = gameData.chests[i];
		}
	});

	console.log(client.id + " has connected to the server.\n");

	client.on('addChest', function(givenX, givenY)
	{
		var chestData = {x: givenX, y: givenY, isOpen: false};
		chestArr.push(chestData);
		io.sockets.emit('newChest', chestData);
		console.log(client.id + " added a chest at (" + givenX + ", " + givenY + ")\n");
	});

	client.on('addObstacle', function(givenX, givenY)
	{
		var obstacleData = {x: givenX, y: givenY};
		obstacleArr.push(obstacleData);
		console.log(client.id + " added an obstacle at (" + givenX + ", " + givenY + ")\n");
	});


	client.on('checkUserDB',function(data){
		db.query('select UserName from Login where UserName = ?', data.UserName, function(err, result){
			if(err){
				console.error(err);
				return;
			}
			else if(result[0] == null){
				data = false;
			}
			io.sockets.emit('checkedUserDB', data);

		});
	});

	client.on('checkDB',function(data){

		db.query('select Pass from Login where UserName = ?', data.UserName, function(err, result){
			if(err){
				console.error(err);
				return;
			}
			else if(result[0] == null || result[0].Pass != data.Pass){
				data = false;
			}
			io.sockets.emit('checkedDB', data);

		});
	});

	client.on('insertDB',function(data){
		var query = db.query('insert into Login set ?', data, function(err, result){
			if(err){
				console.error(err);
				return;
			}
			console.error(result);
		});
	});

	io.on('disconnect', function()
	{
		console.log(client.id + " has disconnected from the server.\n");
		for(var i = 0; i < fighterArr.length; i++){
            if(client.id == fighterArr[i].id){
                fighterArr.splice(i,1);
            }
        }
	});
}

io.on('connection', onSocketConnect);
