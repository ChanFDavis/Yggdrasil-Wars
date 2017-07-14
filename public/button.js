/**
 * This file contains various object functions for elements that appear multiple times per screen and can be used on any string.
 */

function Button(x, y, givenText, textSize, defaultImage, clickedImage, functionToCall)
{
	this.x = x;
	this.y = y;

	this.sprite = createSprite(x, y, 100, 100);
	this.sprite.addImage('default', defaultImage);
	this.sprite.addImage('clicked', clickedImage);
	this.sprite.setDefaultCollider();
	this.sprite.functionToCall = functionToCall;
	this.sprite.onMousePressed = this.press;
	this.sprite.onMouseReleased = this.release;
	this.buttonText = givenText;
	this.textSize = textSize;

}

Button.prototype.press = function()
{
	this.changeImage('clicked');
	this.functionToCall();
	click.play();
};

Button.prototype.release = function() 
{
	this.changeImage('default');
};

Button.prototype.draw = function() 
{
	stroke(255);
	fill(255);
	textFont(celtic);
	
	drawSprite(this.sprite);
	textAlign(CENTER);
	textSize(this.textSize);	text(this.buttonText, this.x, this.y + (this.textSize / 3));
};



