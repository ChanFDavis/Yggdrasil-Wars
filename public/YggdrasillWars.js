var time;
var counter;
var customCursor;
var localFighter;
var chestArray = [];

var allyGroup; // Fighter sprites group
var enemyGroup; // Enemy sprites group
var swordGroup;
var obstacleGroup;
var chestGroup;
var spawnerGroup;
var enemySymbols;
var greenDotGroup;
var hudGroup;

// To be used later
// var ruinsGroup;
// var treesGroup;
// var foodGroup;
// var pointsGroup;
// var fliesGroup;
// var iceGroup;

var fighterArray = {};
var enemyArray = {};

var SCENE_H = 4000;
var SCENE_W = 4000;

var score = 0;
var partyScreen;

var playerTypeArray;
var enemyImageArray;

var globalType;

var miniMap;

var healthBars;

var isMod;
var isSpectator;
var isPlayer;
var paused = false;

var tempUnlockCode = [1,2,3];
var lockProgress = 0;

var hudNeedReset = false;


function becomePlayer(playerType)
{
	isPlayer = true;

	globalType = playerType;

	localFighter = new Fighter(random(SCENE_H), random(SCENE_W), playerTypeArray[playerType]);
	// localFighter = new Fighter(500, 500, playerTypeArray[playerType], socket.id);
	
	fighterArray[socket.id] = localFighter;

	var data = {
    x: localFighter.sprite.position.x,
    y: localFighter.sprite.position.y,
    rotation: localFighter.sprite.rotation,
    type: playerType,
    health: localFighter.sprite.health
	};

	socket.emit("initPlayer", data)
	console.log(playerType);
	if(playerType == "Cavalry")
	{
		localFighter.sprite.rotateToDirection = true;
		localFighter.sprite.sword.rotateToDirection = true;
	}

	createHud();
}

function becomeSpectator()
{
	isSpectator = true;
}

function becomeMod()
{
	isMod = true;
}

function setupGame()
{
	createCanvas(1000, 725);
	allyGroup = new Group();
	enemyGroup = new Group();
	swordGroup = new Group();
	obstacleGroup = new Group();
	chestGroup = new Group();
	spawnerGroup = new Group();
	enemySymbols = new Group();
	healthBars = new Group();
	greenDotGroup = new Group();
	hudGroup = new Group();

	landscapeSprite = createSprite(SCENE_W/2, SCENE_H/2, SCENE_W, SCENE_H);
	landscapeSprite.addImage(landscape);
	landscapeSprite.depth = 1;
	
	// socket = io.connect('proj-309-la-1.cs.iastate.edu:3000');
	socket = io.connect('http://localhost:3000');

	footsteps.setVolume(0.10);

	initGameItems();
	assignTypes();

	/* Connect to the server */


	initSocketFunctions();

	/* Create the custom cursor and initialize its position to the middle of the canvas */
	cursorSprite = createSprite(width/2, height/2);
	cursorSprite.addImage(customCursor);

	noCursor();

	miniMap = new miniMap(1000,1000);
	partyScreen = new partyScreen(1000,1000, "Character", "Health", "Points");

	time = 120;
	counter=setInterval(timer, 1000);

	socket.emit('requestMap');
	socket.emit('requestAllies');
}

function mouseReleased()
{
	swordSound.stop();
}

function keyPressed()
{
	if(keyCode == 82 && time == 0)
	{
		loop();
		location.reload();

	}
	if(keyCode == 80 || keyCode == 77){
		blop.play();
	}

	if(keyCode == 16 && globalType == "Cavalry" && (keyIsDown(65) || keyIsDown(83) || keyIsDown(87) || keyIsDown(68))){
		whip.play();
	}
}

function keyReleased()
{
	if(!keyIsDown(65) && !keyIsDown(83) && !keyIsDown(87) && !keyIsDown(68)){
		galloping.stop();
		footsteps.stop();
		barbSteps.stop();
	}
}

function drawGame()
{
	background(55,75,30);



	footsteps.setVolume(0.3);

	cursorSprite.position.x = mouseX;
	cursorSprite.position.y = mouseY;

	cursorSprite.position.x = camera.mouseX;
	cursorSprite.position.y = camera.mouseY;

	miniMap.sprite.position.x = camera.position.x;
	miniMap.sprite.position.y = camera.position.y;

	partyScreen.sprite.position.x = camera.position.x;
	partyScreen.sprite.position.y = camera.position.y;

	if(isPlayer)
	{
		fullHealthBar.width = 200 * (localFighter.sprite.health / localFighter.sprite.maxHealth);

		camera.position.x = localFighter.sprite.position.x;
		camera.position.y = localFighter.sprite.position.y;

		if(localFighter.sprite.overlap(obstacleGroup))
		{
			localFighter.speed = localFighter.maxSpeed - 1.213;
		}
		else
		{
			localFighter.speed = localFighter.maxSpeed;
		}

		localFighter.sprite.collide(chestGroup);

		for (var key in chestArray)
		{
			if (localFighter.sprite.sword.overlap(chestArray[key].sprite)) {
				if(keyDown(chestArray[key].unlockCode[lockProgress]) && !(chestArray[key].isOpen)){

					lockProgress+=1;
					if(lockProgress == chestArray[key].lockStrength){
						lockProgress = 0;
						chestArray[key].setUnlockCode();
						chestArray[key].open();
						chestArray[key].update;

					}
				}
			}
		}

		localFighter.sprite.changeAnimation('idle');

		if(keyDown('w'))
		{
			localFighter.walk("up");
			localFighter.sprite.changeAnimation('walk');
		}

	if(keyWentDown('w'))
	{
		if(!galloping.isPlaying() && !footsteps.isPlaying() && !barbSteps.isPlaying()){
			if(globalType == "Cavalry"){

					galloping.loop();
				}
			else if(globalType == "Barbarian"){
				barbSteps.loop();
			}
			else{
				footsteps.loop();
			}
			}
		}

		if(keyDown('s'))
		{
			localFighter.walk("down");
			localFighter.sprite.changeAnimation('walk');
		}
	if(keyWentDown('s')){

		if(!galloping.isPlaying() && !footsteps.isPlaying() && !barbSteps.isPlaying()){
			if(globalType == "Cavalry"){

					galloping.loop();
				}
			else if(globalType == "Barbarian"){
				barbSteps.loop();
			}
			else{
				footsteps.loop();
			}

			}
		}


		if(keyDown('a'))
		{
			localFighter.walk("left");
			localFighter.sprite.changeAnimation('walk');
		}
		if(keyWentDown('a')){

			if(!galloping.isPlaying() && !footsteps.isPlaying()&& !barbSteps.isPlaying()){
			if(globalType == "Cavalry"){

					galloping.loop();
				}
				else if(globalType == "Barbarian"){
				barbSteps.loop();
			}
			else{
				footsteps.loop();
			}
			}
		}


		if(keyDown('d'))
		{

			localFighter.walk("right");
			localFighter.sprite.changeAnimation('walk');
		}
		if(keyWentDown('d')){
			if(!galloping.isPlaying() && !footsteps.isPlaying()&& !barbSteps.isPlaying()){
				if(globalType == "Cavalry"){

					galloping.loop();
				}
				else if(globalType == "Barbarian"){
				barbSteps.loop();
			}
			else{
				footsteps.loop();
			}
		}
		}


		if(mouseDown(LEFT) && time < 120 && !swordSound.isPlaying()){
			swordSound.loop();
		}


		if(localFighter.sprite.sword.visible == false){
			swordSound.stop();
		}



		if(keyDown(16))
		{

			localFighter.activateSpecial(true);
		}
		else {
			localFighter.activateSpecial(false);

		}

		if(keyWentDown(49))
		{
			localFighter.itemSelected = 0;
			localFighter.sprite.sword.damage = localFighter.inventory[0].dmg * localFighter.baseDamage;
			itemSelectedSpriteX = -150;
		}
		if(keyWentDown(50))
		{
			localFighter.itemSelected = 1;
			localFighter.sprite.sword.damage = localFighter.inventory[1].dmg * localFighter.baseDamage;
			itemSelectedSpriteX = -50;
		}
		if(keyWentDown(51))
		{
			localFighter.itemSelected = 2;
			localFighter.sprite.sword.damage = localFighter.inventory[2].dmg * localFighter.baseDamage;
			itemSelectedSpriteX = 50;
		}
		if(keyWentDown(52))
		{
			localFighter.itemSelected = 3;
			localFighter.sprite.sword.damage = localFighter.inventory[3].dmg * localFighter.baseDamage;
			itemSelectedSpriteX = 150;
		}


		if(localFighter.inventory[localFighter.itemSelected].name != "Empty" && (mouseDown() || keyDown(32))){
			localFighter.sprite.sword.visible = true;
			reduceStaminaWidth();
		}
		else
		{
			localFighter.sprite.sword.visible = false;
			restoreStaminaWidth();
		}

		

		/* Invisible landscapeSprite around landscape */
		if(localFighter.sprite.position.x < 0) {
			localFighter.sprite.position.x = 0;
		}
		if(localFighter.sprite.position.y < 0) {
			localFighter.sprite.position.y = 0;
		}
		if(localFighter.sprite.position.x > SCENE_W) {
			localFighter.sprite.position.x = SCENE_W;
		}
		if(localFighter.sprite.position.y > SCENE_H) {
			localFighter.sprite.position.y = SCENE_H;
		}

		localFighter.update(enemyGroup);
		score = localFighter.score;

	}
	else
	{
		var spectatorSpeed = 5.6;


		if(keyDown(16))
		{
			spectatorSpeed = 9.81;
		}

		if(keyDown('w'))
		{
			camera.position.y -= spectatorSpeed;
		}
		if(keyDown('s'))
		{
			camera.position.y += spectatorSpeed;
		}
		if(keyDown('a'))
		{
			camera.position.x -= spectatorSpeed;
		}
		if(keyDown('d'))
		{
			camera.position.x += spectatorSpeed;
		}
		if(keyDown(188))
		{
			camera.zoom = 1.7;
		}
		else if(keyDown(190))
		{
			camera.zoom = 0.3;
		}
		else
		{
			camera.zoom = 1;
		}

		if(isMod)
		{
			if(keyWentDown('c'))
			{
				socket.emit('addChest', camera.mouseX, camera.mouseY);
				console.log("Added Chest");
			}
			if(keyWentDown('o'))
			{
				socket.emit('addObstacle', camera.mouseX, camera.mouseY);
				console.log("Added Obstacle");
			}
		}
	}

	borderCamera();

	if(isPlayer)
	{

		if(keyWentDown('m'))
		{
			miniMap.createDots(enemyGroup);
		}

		if(localFighter.sprite.overlap(obstacleGroup))
		{
			localFighter.speed = localFighter.maxSpeed - 1.213;
		}
		else
		{
			localFighter.speed = localFighter.maxSpeed;
		}


		if(keyDown('m'))
		{

			miniMap.sprite.visible = true;
			miniMap.update();
			miniMap.show();
			miniMap.move(camera.position.x - (width/2),  camera.position.y - (height/2));
			deleteHud();
			hudNeedReset = true;

		}
		else {
			if(hudNeedReset){
				restoreHud();
				hudNeedReset = false;

			}
			miniMap.sprite.visible = false;
			miniMap.delete();
			camera.zoom = 1;
			drawHud();
		}

		var currPlayerData = {
			x: localFighter.sprite.position.x,
			y: localFighter.sprite.position.y,
			rotation: localFighter.sprite.rotation,
			isAttacking: localFighter.sprite.sword.visible,
			isWalking: localFighter.sprite.getAnimationLabel() == "walk"
		};

		socket.emit('updatePlayer', currPlayerData);

	}

	if(false == true){//time == 0){
		swordSound.stop();
		galloping.stop();
		barbSteps.stop();
		whip.stop();
		footsteps.stop();
		victory.setVolume(0.0000001);
		victory.play();
		noLoop();
		textSize(80);
		textAlign(CENTER);
		text("Press 'R' \n to return to the title screen.", camera.position.x, camera.position.y);
		text("Your final score:" + score, camera.position.x, camera.position.y - 100);

	}

	drawSprite(landscapeSprite);
	drawSprites(allyGroup);
	if(isPlayer)
	{
		drawSprite(localFighter.sprite);
		drawSprite(localFighter.sprite.sword);
	}
	drawSprites(spawnerGroup);
	drawSprites(enemyGroup);
	drawSprites(chestGroup);
	drawSprites(obstacleGroup);
	if(isPlayer)
	{
		for (var key in chestArray)
		{
			if (localFighter.sprite.sword.overlap(chestArray[key].sprite) && !(chestArray[key].isOpen))
			{
				text(chestArray[key].unlockCode[0], localFighter.sprite.position.x, localFighter.sprite.position.y+10);
				text(chestArray[key].unlockCode[1], localFighter.sprite.position.x + 20, localFighter.sprite.position.y+10);
				text(chestArray[key].unlockCode[2], localFighter.sprite.position.x + 40, localFighter.sprite.position.y+10);

			}
		}

		drawSprite(miniMap.sprite);
		drawSprites(enemySymbols);
		drawSprites(greenDotGroup);
	}

	if(isPlayer)
	{
		if(keyWentDown('p'))
		{
			partyScreen.draw();

		}
		if(keyDown('p'))
		{
			drawSprite(partyScreen.sprite);
			partyScreen.show();
			partyScreen.sprite.visible = true;

			partyScreen.move(camera.position.x + 200,camera.position.y - 200);
			text("Character", camera.position.x - 400, camera.position.y - 250);
			text("Health", camera.position.x + 130, camera.position.y - 250);
			text("Points", camera.position.x - 100, camera.position.y-250);
			partyScreen.addNames(fighterArray);
			partyScreen.addPoints(fighterArray);

			drawSprites(healthBars);

		}
		else
		{
			partyScreen.sprite.visible = false;
			partyScreen.delete();

			drawSprites(hudGroup);
			drawSprites(itemsBar);
		}
		
	}
	drawSprite(cursorSprite);
}

function borderCamera()
{
	var top = camera.position.y - ((height * 1/camera.zoom)  / 2);
	var bottom = camera.position.y + ((height * 1/camera.zoom)  / 2);

	var left = camera.position.x - ((width * 1/camera.zoom) / 2);
	var right = camera.position.x + ((width * 1/camera.zoom) / 2);

	if(top < 0)
	{
		camera.position.y = (height * 1/camera.zoom) /2;
	}
	if(bottom > SCENE_H)
	{
		camera.position.y = SCENE_H - (height * 1/camera.zoom) /2;
	}
	if(left < 0)
	{
		camera.position.x = (width * 1/camera.zoom)/2;
	}
	if(right > SCENE_W)
	{
		camera.position.x = SCENE_W	- (width * 1/camera.zoom)/2;
	}
}

/* Creates all the socket connection functions that will be used throughout the code */
function initSocketFunctions()
{
	socket.on('addAlly', function(newAlly)
	{
		var tempAlly = new Ally(newAlly.x, newAlly.y, playerTypeArray[newAlly.type], newAlly.id);
		fighterArray[newAlly.id] = tempAlly;
		allyGroup.push(tempAlly.sprite);
		allyGroup.push(tempAlly.sprite.sword);
	});

	socket.on('removeAlly', function(toRemoveKey)
	{
		for(var clientKey in fighterArray)
		{
			if(clientKey == toRemoveKey)
			{
				fighterArray[clientKey].sprite.sword.remove();
				fighterArray[clientKey].sprite.remove();
				delete fighterArray[clientKey];
			}

		}
	});

	socket.on('updateAllies', function(allyArray)
	{
		for(var serverKey in allyArray)
		{
			for(var clientKey in fighterArray)
			{
				let currAlly = allyArray[serverKey];
				let currFighter = fighterArray[clientKey];
				
				if(serverKey == clientKey && (serverKey != socket.id || !isPlayer))
				{
					currFighter.sprite.position.x = currAlly.x;
					currFighter.sprite.position.y = currAlly.y;
					currFighter.sprite.rotation = currAlly.rotation;
					currFighter.sprite.sword.rotation = currAlly.rotation;
					currFighter.sprite.sword.visible = currAlly.isAttacking;
					currFighter.sprite.changeAnimation(currAlly.isWalking ? 'walk' : 'idle');
				}
				else if(serverKey == socket.id && isPlayer)
				{
					currFighter.sprite.health = currAlly.health;
				}
			}
		}
	});

	socket.on('placeNewChest', function(newChest)
	{
		var tempChest = new Chest(newChest.id, newChest.x, newChest.y);
		tempChest.setUnlockCode();
		chestArray[newChest.id] = tempChest;
		chestGroup.push(tempChest.sprite);
	});

	socket.on('placeNewObject', function(newObject)
	{
		var tempObstacle = new Obstacle(newObject.x, newObject.y, newObject.scale);
		obstacleGroup.push(tempObstacle.sprite);
	});

	socket.on('initChests', function(serverChestArr)
	{
		var tempChest;
		for(var key in serverChestArr)
		{
			tempChest = new Chest(serverChestArr[key].id, serverChestArr[key].x, serverChestArr[key].y);

			if(serverChestArr[key].isOpen)
			{
				tempChest.isOpen = true;
				tempChest.sprite.changeImage('open');
			}
			else
			{
				tempChest.setUnlockCode();
			}

			chestArray[key] = tempChest;
			chestGroup.push(tempChest.sprite);
		}
	});

	socket.on('initSpawners', function(spawnerArray)
	{		
		for(var i = 0; i < spawnerArray.length; i++)
		{	
			let tempSpawner = new EnemySpawner(spawnerArray[i].x, spawnerArray[i].y)
			spawnerGroup.push(tempSpawner.sprite);
		}
	});

	socket.on('addEnemy', function(newEnemy)
	{
		var tempEnemy = new Enemy(newEnemy.id, newEnemy.x, newEnemy.y, newEnemy.type);
		enemyArray[newEnemy.id] = tempEnemy; 
		enemyGroup.push(tempEnemy.sprite);
	});

	socket.on('removeEnemy', function(enemyID)
	{
		enemyGroup.remove(enemyArray[enemyID].sprite);
		enemyArray[enemyID].sprite.remove();
		delete enemyArray[enemyID];
	});

	socket.on('initEnemies', function(serverArray)
	{
		console.log("Getting enemies from the server.");
		for(var serverKey in serverArray)
		{
			let currEnemy = serverArray[serverKey];
			tempEnemy = new Enemy(currEnemy.id, currEnemy.x, currEnemy.y, currEnemy.type);
			enemyArray[currEnemy.id] = tempEnemy; 
			enemyGroup.push(tempEnemy.sprite);
		}
	});

	socket.on('updateEnemies', function(serverArray)
	{
		for(var serverKey in serverArray)
		{
			for(var clientKey in enemyArray)
			{
				if(serverKey == clientKey)
				{
					let temp = serverArray[serverKey];
					enemyArray[clientKey].sprite.rotation = temp.rotation;
					enemyArray[clientKey].sprite.position.x = temp.x;
					enemyArray[clientKey].sprite.position.y = temp.y;
					enemyArray[clientKey].sprite.health = temp.health;
				}
			}	
		}
	});

	socket.on('initObstacles', function(obstacleArr)
	{
		for(var i = 0; i < obstacleArr.length; i++)
		{
			let tempObstacle = new Obstacle(obstacleArr[i].x, obstacleArr[i].y, obstacleArr[i].scale)
			obstacleGroup.push(tempObstacle.sprite);
		}
	});

	socket.on('die', function()
	{
		localFighter.sprite.position.x = random(50, 3950);
		localFighter.sprite.position.y = random(50, 3950);
	});

	socket.on('updateChest', function(key)
	{
		chestArray[key].sprite.changeImage('open');
		chestArray[key].isOpen = true;

	});

	socket.on('disconnect', function () 
	{
    	console.log( 'Disconnected from Server' );
    	window.setTimeout( 'app.connect()', 5000 );
  	});

}
