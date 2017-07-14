
var itemsBar;

var itemSelectedSprite;
var itemSelectedSpriteX = -150;

function createHud(){


  emptyHealthBar = createSprite(10,100,200,23);
  hudGroup.push(emptyHealthBar);
  fullHealthBar = createSprite(10,10,200,23);
  hudGroup.push(fullHealthBar);
  emptyStaminaBar = createSprite(10,200,200,23);
  hudGroup.push(emptyStaminaBar);
  fullStaminaBar = createSprite(10,200,200,23);
  hudGroup.push(fullStaminaBar);


  fullHealthBar.shapeColor = color("red");
  emptyHealthBar.shapeColor = color("black");
  fullStaminaBar.shapeColor = color("blue");
  emptyStaminaBar.shapeColor = color("black");

  var itemDepth = 1504;
  itemsBar = new Group();

  for(i = 0; i < 4; i++){
    let itemSprite  = createSprite(0,0,90,90);
    itemSprite.addImage(localFighter.inventory[i].img);
    itemSprite.name = localFighter.inventory[i].name;
    hudGroup.push(itemSprite);
    itemsBar.add(itemSprite);
    itemDepth++;
  }

  itemSelectedSprite = createSprite(0,0,100,100);
  hudGroup.push(itemSelectedSprite);
  itemSelectedSprite.shapeColor = color("cyan");

}

function changeItemSelectedPosition(xPos, yPos){

  itemSelectedSprite.position.x = xPos;
  itemSelectedSprite.position.y = yPos;

}
function changeHealthPosition(xPos, yPos){

  fullHealthBar.position.x = xPos;
  fullHealthBar.position.y = yPos;
  emptyHealthBar.position.x = xPos;
  emptyHealthBar.position.y = yPos;

}

function changeStaminaPosition(xPos,yPos){

  fullStaminaBar.position.x = xPos;
  fullStaminaBar.position.y = yPos;
  emptyStaminaBar.position.x = xPos;
  emptyStaminaBar.position.y = yPos;

}

function changeItemPosition(xPos,yPos){

  var xPosShift = xPos;
  for(i = 0; i < 4; i++){
    itemsBar[i].position.x = xPosShift;
    itemsBar[i].position.y = yPos;
    xPosShift += 100;
  }
}

function reduceHealthWidth(damage)
{
  fullHealthBar.width -= (200 * damage)/ localFighter.sprite.maxHealth;
  
  if(fullHealthBar.width <= 0)
  {
    localFighter.sprite.position.x = random(500, 3500);
    localFighter.sprite.position.y = random(500, 3500);
    localFighter.sprite.health = localFighter.sprite.maxHealth;
    fullHealthBar.width = emptyHealthBar.width;
  }
}

function reduceStaminaWidth(){

  fullStaminaBar.width -= 200 / localFighter.sprite.stamina;

  if(fullStaminaBar.width < 0){
    fullStaminaBar.width = 0;
    localFighter.sprite.sword.visible = false;
  }

}



function restoreHealthWidth(){

  localFighter.sprite.health += localFighter.sprite.healthRate;
  if(localFighter.sprite.health >= localFighter.sprite.maxHealth)
  {
      localFighter.sprite.health = localFighter.sprite.maxHealth;
  }

}

function restoreStaminaWidth(){

  fullStaminaBar.width += localFighter.sprite.staminaRate;

  if(fullStaminaBar.width > 200){
    fullStaminaBar.width = 200;


  }

}
function deleteHud(){
  emptyHealthBar.visible = false;
  fullHealthBar.visible = false;
  emptyStaminaBar.visible = false;
  fullStaminaBar.visible = false;
  itemSelectedSprite.visible = false;

  for(var i = 0; i < itemsBar.length; i++){
    itemsBar[i].visible = false;

  }

}

function restoreHud(){

 emptyHealthBar.visible = true;
 fullHealthBar.visible = true;
 emptyStaminaBar.visible = true;
 fullStaminaBar.visible = true;
 itemSelectedSprite.visible = true;

 for(var i = 0; i < itemsBar.length; i++){
  itemsBar[i].visible = true;

}


}

function drawHud()
{
  stroke('black');
  textSize(32);
  fill('white');
  textFont('Georgia');

  changeItemSelectedPosition(camera.position.x+itemSelectedSpriteX, camera.position.y+310);

  changeItemPosition(camera.position.x-150, camera.position.y+310);
  changeHealthPosition((camera.position.x - 385) , camera.position.y-335);
  changeStaminaPosition((camera.position.x - 395) + localFighter.sprite.maxHealth + 150, camera.position.y-335);
  text("Score: " + score, camera.position.x+343, camera.position.y-330);
  text("Time:  " + time, camera.position.x+343, camera.position.y - 300);
}
