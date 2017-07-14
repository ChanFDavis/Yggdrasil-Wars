/**
 * @author Chandler Davis
 */


/**
 *
 *
 * This is the constructor for the most general type of enemy.
 * All future enemies will have the properties and methods that are declared here.
 *
 * @constructor
 *
 * @param {Number} health          The amount of damage the monster can take before dying
 * @param {Number} x               The initial x-position of the enemy
 * @param {Number} y               The initial y-position of the enemy
 * @param {Number} speed           How fast the enemy is going to move
 * @param {Number} damage          How much damage the enemy does per attack
 * @param {Number} detectionRadius The "view distance" of the enemy. When a fighter is within this radius, the enemy will chase them
 */
function Enemy(x, y, type, id)
{
	this.x = x;
	this.y = y;
	this.type = type;
	this.id = id;
	this.health = type.health;

	this.damage = type.damage;

	this.detectionRadius = type.detectionRadius * type.scale;
	this.hitRadius = type.hitRadius;
	this.speed = type.speed;

	this.turnCounter = 0;

	this.playerToChase = null;
	this.isWalking = false;

	this.rotation = 0;
}

/**
 * Makes the enemy chase the closest player to it at any given time.
 * There is a certain range that if the player is outside, the monster just walks around randomly.
 *
 * @function
 *
 * @param  {Group} playerGroup A Group object that contains all of fighter's sprites in the server
 */
Enemy.prototype.update = function(fighterArr)
{
	var currDist;
	var chasedDist = 10000;

	// The monster will chase the player that is closest to it, in its view-range.
	for(var player in fighterArr)
	{
		currDist = this.dist(fighterArr[player].x, fighterArr[player].y, this.x, this.y);

		if(!this.playerToChase || currDist < chasedDist)
		{
			chasedDist = currDist;
			this.playerToChase = fighterArr[player];
		}

		// Chase them
		if(chasedDist < this.detectionRadius)
		{
			let dX = this.playerToChase.x - this.x;
			let dY = this.playerToChase.y - this.y;
			let angleToChase = Math.atan2(dY, dX);
			this.rotation = angleToChase;

			if(chasedDist <= this.hitRadius)
			{
				if(Math.floor(this.playerToChase.health - this.damage) <= .7)
				{
					return player;		
				}
					
				this.playerToChase.health -= this.damage;		
			}
			else
			{
				this.addSpeed(.2, angleToChase);
			}

		}
		else // Walk around
		{
			this.moveAround();
		}
	}

};


Enemy.prototype.addSpeed = function(boost, direction)
{
	this.x += ((this.speed + boost) * Math.cos(direction));
	this.y += ((this.speed + boost) * Math.sin(direction));
};

Enemy.prototype.dist = function(x1, y1, x2, y2)
{
	return Math.sqrt((x2-x1) * (x2-x1) + (y2-y1) * (y2-y1));
};

Enemy.prototype.rotationToRadians = function()
{
	return (this.rotation % 360) * (Math.PI/180);
};

Enemy.prototype.moveAround = function() 
{
	
	if((this.turnCounter % 12) != 0)
	{
		this.rotation += this.randInt(-2,4);
	}
	
	this.addSpeed(0, this.rotationToRadians());

	if(this.x < 0){this.x = 0;}
	if(this.y < 0){this.y = 0;}
	if(this.x > 4000){this.x = 4000;}
	if(this.y > 4000){this.y = 4000;}

	this.turnCounter++;
};

module.exports = Enemy;

/* Random integer within a range */
Enemy.prototype.randInt = function(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

