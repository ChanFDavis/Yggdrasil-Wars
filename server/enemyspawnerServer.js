function EnemySpawner(x, y, type, rate, limit)
{
	this.x = x;
	this.y = y;

	this.type = type;
	this.rate = rate;
	this.limit = limit;
	this.spawnCount = 0;
}

EnemySpawner.prototype.spawn = function(timer)
{
	if((timer % (600/this.rate)) == 0 && this.spawnCount <= this.limit)
	{	
		this.spawnCount++;
		return true;
	}

	return false;
};

module.exports = EnemySpawner;