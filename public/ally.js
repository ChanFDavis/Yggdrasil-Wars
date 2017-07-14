
/**
 * @author Jake Koll and Chandler Davis
 */


function Ally(x, y, type, id)
{
	this.type = type;
	this.id = id;


	/* This is where we initialize the sprite and it's animations */
	this.sprite = createSprite(x, y);


	this.sprite.addAnimation('walk', type.walkAnimation);
	this.sprite.addAnimation('idle', type.idleAnimation);

	this.sprite.sword = createSprite(x, y);

	this.sprite.sword.position = this.sprite.position;

	this.sprite.sword.visible = false;

	this.sprite.sword.addAnimation('swing', type.swingAnimation);

	this.sprite.scale = this.sprite.sword.scale = type.scale;

}
