
function Obstacle(x, y, scale) {
	this.x = x;
	this.y = y;
	this.scale = scale;
}

function Chest(id, x, y) 
{
	this.id = id;
	this.x = x;
	this.y = y;
	this.isOpen = false;
}


module.exports = {
	obstacle: Obstacle,
	chest: Chest
};