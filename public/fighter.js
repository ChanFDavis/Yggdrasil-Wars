
/**
 * @author Jake Koll and Chandler Davis
 */

/**
 * [maxSpeed The maximum speed the character can move]
 * @type {Number}
 */
var maxSpeed = 3;
/**
 * [friction To make the charcter movements less sharp]
 * @type {Number}
 */
var friction = .5;


/**
 * [Fighter This fuction is for creating a prototype function to make different kinds of fighters.]
 *
 * @constructor
 *
 * @param {Number} health         [The health of the character]
 * @param {Number} x              [The x coordinate of the character]
 * @param {Number} y              [The y coordinate of the character]
 * @param {Animation} walkAnimation  [The walking animation of the character]
 * @param {Animation} swingAnimation [The swinging animation of the character]
 * @param {Animation} deathAnimation [The death animation of the character]
 * @param {Animation} idleAnimation  [The idle animation of the character]
 */
function Fighter(x, y, type, id)
{
	this.type = type;

	this.id = id;
	this.speed = type.speed;
	this.maxSpeed = type.speed;

	this.inventory = initPlayerItems();
	this.baseDamage = type.damage;
	this.itemSelected = 0;


	/* This is where we initialize the sprite and it's animations */
	this.sprite = createSprite(x, y, 72, 96);
	this.sprite.friction = friction;

	this.sprite.health = type.health; //Amount of health.
	this.sprite.maxHealth = type.health; //Amount of health.
	this.sprite.healthRate = type.healthRate; //How fast health regenerates
	this.sprite.stamina = type.stamina;
	this.sprite.staminaRate = type.staminaRate;
	this.isVisible = type.isVisible;

	this.sprite.addAnimation('walk', type.walkAnimation);
	this.sprite.addAnimation('idle', type.idleAnimation);

	this.score = 0;

	this.sprite.sword = createSprite(x, y, 138, 96);
	this.sprite.sword.maxSpeed = maxSpeed;
	this.sprite.sword.friction = friction;
	this.sprite.sword.damage = type.damage * this.inventory[0].dmg;
	this.sprite.sword.position = this.sprite.position;

	this.sprite.sword.addAnimation('swing', type.swingAnimation);

	/* Bounding boxes */
	this.sprite.setCollider("circle", type.spriteCollider[0], type.spriteCollider[1], type.spriteCollider[2]);
	this.sprite.sword.setCollider("circle", type.weaponCollider[0], type.weaponCollider[1], type.weaponCollider[2]);

	this.sprite.scale = this.sprite.sword.scale = type.scale;

	this.sprite.sword.leftCone = type.leftConeAngle;
	this.sprite.sword.rightCone = type.rightConeAngle;

	this.activateSpecial = type.specialAbility;
}

/**
 * [walk Move the character forward]
 *
 * @function
 *
 * @param  {String} direction [What direction is the character moving]
 */
Fighter.prototype.walk = function(direction)
{
	if(direction == "up")
	{
		this.sprite.velocity.y = -this.speed;
		this.sprite.sword.velocity.y = -this.speed;
	}
	else if(direction == "down")
	{
		this.sprite.velocity.y = this.speed;
		this.sprite.sword.velocity.y = this.speed;
	}
	else if(direction == "right")
	{
		this.sprite.velocity.x = this.speed;
		this.sprite.sword.velocity.x = this.speed;
	}
	else if(direction == "left")
	{
		this.sprite.velocity.x = -this.speed;
		this.sprite.sword.velocity.x = -this.speed;
	}
}

/**
 * Updates the rotation of the player and the bounding box for the sword.
 * @function
 */
Fighter.prototype.update = function(enemyGroup)
{
	this.sprite.rotation = degrees(atan2(camera.mouseY-this.sprite.position.y, camera.mouseX-this.sprite.position.x ));
	this.sprite.sword.rotation = this.sprite.rotation;

	this.sprite.sword.overlap(enemyGroup, this.attack);
}

Fighter.prototype.attack = function(sword, enemy)
{
	var enemyAngle = degrees(atan2(enemy.position.y-sword.position.y, enemy.position.x-sword.position.x ));
	var diffAngle = round(enemyAngle) + (-1 * round(sword.rotation));

	var dLeft = (sword.rotation + this.leftCone);
	var dRight =  (sword.rotation + this.rightCone);

	if(dLeft > 179.75)
	{
		dLeft -= 360;
	}

	if(dRight > 179.75)
	{
		dRight -= 360;
	}

	var case1 = (dRight > 0  && dLeft < 0 && enemyAngle <= dRight && enemyAngle >= dLeft);
	var case2 = (dRight < 0  && dLeft > 0 && ((enemyAngle <= dRight && enemyAngle >= -180) || (enemyAngle >= dLeft && enemyAngle <= 180)));
	var case3 = (dRight > 0 && dRight > 0 && enemyAngle <= dRight && enemyAngle >= dLeft);
	var case4 = (dRight < 0 && dRight < 0 && enemyAngle <= dRight && enemyAngle >= dLeft);

	if((case1 || case2 || case3 || case4 ) && sword.visible == true)
	{
		socket.emit('hurtEnemy', enemy.id, sword.damage)
		console.log("Hit!");


	}
};
