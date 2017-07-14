
/**
 * @Author: Andrew Messerly
 */


function miniMap(x,y){

	this.x = x;
	this.y = y;


	this.sprite = createSprite(this.x,this.y, 900,625);
	this.sprite.addImage(miniMapImage);
	this.sprite.shapeColor = "black";
	this.sprite.visible = false;
	this.sprite.enemySymbol;
	this.sprite.greenDot;


}

miniMap.prototype.createDots = function(enemyGroup){



	greenDotGroup.clear();
	enemySymbols.clear();


	
	for(var j = 0; j < enemyGroup.length;j++)
	{
		this.sprite.enemySymbol = createSprite(enemyGroup[j].position.x  ,enemyGroup[j].position.y,4,4);

		this.sprite.enemySymbol.position.x = (((enemyGroup[j].position.x/SCENE_W) * 900) + ((width - 900)/2));
		this.sprite.enemySymbol.position.y = (((enemyGroup[j].position.y/SCENE_H) * 625) + ((height - 625)/2));
		this.sprite.enemySymbol.shapeColor = "red";

		enemySymbols.add(this.sprite.enemySymbol);



	}
	this.sprite.greenDot = createSprite(localFighter.sprite.position.x, localFighter.sprite.position.y,4,4);
	this.sprite.greenDot.position.x = (((localFighter.sprite.position.x/SCENE_W) * 900) + ((width - 900)/2));
	this.sprite.greenDot.position.y = (((localFighter.sprite.position.y/SCENE_H) * 625) + ((height - 625)/2));
	this.sprite.greenDot.shapeColor = "green";
	greenDotGroup.add(this.sprite.greenDot);

};


miniMap.prototype.move = function(mapX, mapY){

for(var k = 0; k < enemySymbols.length; k++){
	enemySymbols[k].maxSpeed = localFighter.sprite.speed;
	enemySymbols[k].position.x += mapX;
	enemySymbols[k].position.y += mapY;

}

greenDotGroup[0].maxSpeed = localFighter.sprite.speed;
greenDotGroup[0].position.x += mapX;
greenDotGroup[0].position.y += mapY;


};

miniMap.prototype.update = function(){

for(var i = 0; i < enemyGroup.length; i++){

	if(enemyGroup[i].health <= 0){
		enemySymbols[i].shapeColor = "black";
	}
}


for(var j = 0; j < enemySymbols.length; j++){


		enemySymbols[j].position.x = (((enemyGroup[j].position.x/SCENE_W) * 900) + ((width - 900)/2));
		enemySymbols[j].position.y = (((enemyGroup[j].position.y/SCENE_H) * 625) + ((height -625)/2));

	
}

	greenDotGroup[0].position.x = (((localFighter.sprite.position.x/SCENE_W) * 900) + ((width - 900)/2));
	greenDotGroup[0].position.y = (((localFighter.sprite.position.y/SCENE_H) * 625) + ((height - 625)/2));

};

miniMap.prototype.delete = function(){

for(var l = 0; l < enemySymbols.length; l++){
	
	enemySymbols[l].visible = false;
	
}
for(var i = 0; i < greenDotGroup.length; i++){

	greenDotGroup[i].visible = false;
}

};


miniMap.prototype.show = function(){

	for(var m = 0; m< enemySymbols.length; m++){
			enemySymbols[m].visible = true;
	}

	for(var m = 0; m< greenDotGroup.length; m++){
			greenDotGroup[m].visible = true;
	}
};


// function removeDot(mapX,mapY){

// for(var i = 0; i < enemySymbols.length; i++){
// 	if(enemySymbols[i].position.x == mapX && enemySymbols[i].position.y == mapY){

// 		enemySymbols[i].remove();
// 	}
// }

// };
