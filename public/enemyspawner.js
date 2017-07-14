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
function EnemySpawner(x, y)
{
	this.x = x;
	this.y = y;

	this.sprite = createSprite(x, y);
	this.sprite.addImage(spawnerImage);
	this.sprite.scale = 2.63;
}