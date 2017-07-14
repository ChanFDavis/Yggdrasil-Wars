/**
 * @author Ashley Young
 */

/**
 * Creates an immutable Obstacle object, represented by the image of a bush
 * @constructor
 *
 * @param      {Number}     x       x-coordinate of the obstacle
 * @param      {Number}     y       y-coordinate of the obstacle
 * @param      {Number}     width   The width of the obstacle
 * @param      {Number}     height  The height of the obstacle
 * @param      {.png}    image   The image to represent the obstacle
 */
function Obstacle(x, y, scale)
{
	this.x = x;
	this.y = y;

	this.sprite = createSprite(x, y);
	this.sprite.scale = scale;
	this.sprite.immovable = true;
	this.sprite.addImage(forestImage);
}

/**
 * Creates a treasure chest that can be opened, and will later give points when opened
 * @constructor
 *
 * @param      {Number}  x            x-coordinate of chest
 * @param      {Number}  y            y-coordinate of chest
 * @param      {.png}  openImage    image to represent chest's open state
 * @param      {.png}  closedImage  image to represent chest's closed state
 */
function Chest(id, x, y) 
{
	this.id = id;

	this.x = x;
	this.y = y;

	this.sprite = createSprite(x, y);
	this.itemStash = gameItems[round(random(0,4))];

	this.sprite.addImage('closed', closedChestImage);
	this.sprite.addImage('open', openChestImage);
	this.sprite.changeImage('closed');
	
	this.sprite.immovable = true;
	
	this.isOpen = false;

	this.unlockCode = [];
	
	this.lockStrength = 3;
}

Chest.prototype.open = function() 
{
	this.sprite.changeImage('open');
	
	this.isOpen = true;

	socket.emit('openChest', this.id);

	chestItemDrop(this.itemStash);
	
	this.itemStash = gameItems[0];
};

Chest.prototype.setUnlockCode = function()
{
	for(var i = 0; i< 3; i++)
	{
		this.unlockCode[i] = setRandomLetter();
	}
};
