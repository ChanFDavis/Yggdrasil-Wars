
function Fighter(x, y, rotation, type, health, id)
{
	this.x = x;
	this.y = y;
	this.rotation = rotation;
	this.type = type;
	this.id = id;
	this.health = health;
	this.maxHealth = health;
	this.isAttacking = false;
	this.isWalking = false;
}

module.exports = Fighter;
