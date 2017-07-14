var leftPosX ;
var rightPosX;

var current;
var left;
var right;
var visibleInfo = false;
var specialInfo = false;

var hasSelected;

var currentSprite;
var leftSprite;
var rightSprite;

var selectButton;
var leftButton;
var rightButton;

var lastIndex;

var mercDescription = ["A sellsword hailing from a common village. \nHis loyalty is to gold, and his price is steep. \n Through his training, and experience in the art of warefare, \n he has equipped himself properly with medium armor and his favorite sword. \n His well balanced fighting style is valued highly and worth the price."];
var rogueDescription = ["An outcast forced out of the major city of Firnim. \n His thievery skills have allowed him to open chests faster than most, \n though he is better at picking locks than fights,\n he uses a dagger for self defense."];
var barbDescription = ["A ruffian looking to take advantage of the war by causing lawlessness and chaos.\n This melevolent man looks to get up close and hurt with his fists.\n  He can't take many hits but his health pool is incredible and one swing hurts massively"];
var cavalryDescription = ["A mounted knight hailing from the village of Brynhildr.\n Raised in a family of farmer's his family's horses are the fastest in all the land,\n thanks to that he is faster than others, \nthough he can't hurt as much from horseback, his speed makes up for it.\n The horse's name is Bo'Jangles"];
var knightDescription = ["Through dedication to his country,\n the knight has prided himself with an almost impenetrable suit of armor. \nTo wear such a suit encourages incredible strength to move and hurt as well.\n However, all of it comes at a cost of his speed."];

var mercSpecialInfo = ["By realizing that he gets paid for performing well,\n the mercenary gets a damage boost when using his special."];
var rogueSpecialInfo = ["When cornered, the rogue will use \n her invisibility to sneak away from monsters with her special."];
var barbSpecialInfo = ["The Barbarian doesn't like to be underestimated, \n and once you do he is suddenly twice his size, and range."];
var cavalrySpecialInfo = ["By whipping the reins on his horse, Bo'Jangles knows to speed it up,\n as if he got a nice hit of a triple espresso"];
var knightSpecialInfo = ["The knight knows he cannot die in the filth and mud of a battlefield,\n so when he activates his special, he rapidly gets health back."];


var selectedCharacter;

function initPrepScreen()
{
	selectedCharacter = null

	leftPosX = (width/2) - 300;
	rightPosX = (width/2) + 300;

	current = 2; // current index of the character image array being selected
	left =  1;
	right = 3;

	hasSelected = false;

	currentSprite = createSprite(width/2, 476);
	leftSprite = createSprite(leftPosX - 45, 412);
	rightSprite = createSprite(rightPosX + 45, 412);


	currentSprite.scale = 1.42;
	leftSprite.scale = rightSprite.scale  = 1.26;

	lastIndex  = characterImages.length - 1;


	infoButton = new Button(leftPosX, 600, "Info", 22, defaultButtonImage, clickedButtonImage, showInfo);
	specialButton = new Button(rightPosX,600,"Special",22,defaultButtonImage,clickedButtonImage,showSpecial);
	randomButton = new Button(width/2, 205, "Random", 22, defaultButtonImage,clickedButtonImage,randomize);
	selectButton = new Button(width/2, 257, "Select", 22, defaultButtonImage, clickedButtonImage, select);
	leftArrow = new Button(leftPosX + 137, 257, "Previous", 22, defaultButtonImage, clickedButtonImage, changeLeft);
	rightArrow = new Button(rightPosX - 137, 257, "Next", 22, defaultButtonImage, clickedButtonImage, changeRight);

	for (var i = 0; i < characterImages.length; i++)
	{
		currentSprite.addImage(characterNames[i], characterImages[i]);
		leftSprite.addImage(characterNames[i], characterImages[i]);
		rightSprite.addImage(characterNames[i], characterImages[i]);
	}

	changeLeft();
	changeLeft();
	changeLeft();
	changeLeft();
}

function changeRight()
{	
	visibleInfo = false;
	specialInfo = false;
	if(left == 0)
	{
		left = lastIndex;
		current = 0;
		right = 1;
	}
	else if(current == 0)
	{
		left = lastIndex - 1;
		current = lastIndex;
		right = 0;
	}
	else if(right == 0)
	{
		left = lastIndex - 2;
		current = lastIndex - 1;
		right = lastIndex;
	}
	else
	{
		left--;
		current--;
		right--;
	}
	

	currentSprite.changeImage(characterNames[current]);
	leftSprite.changeImage(characterNames[left]);
	rightSprite.changeImage(characterNames[right]);

}

function changeLeft()
{
	visibleInfo = false;
	specialInfo = false;
	if(right == lastIndex)
	{
		left = lastIndex - 1;
		current = lastIndex;
		right = 0;
	}
	else if(current == lastIndex)
	{
		left = lastIndex;
		current = 0;
		right = 1;
	}
	else if(left == lastIndex)
	{
		left = 0;
		current = 1;
		right = 2;
	}
	else
	{
		left++;
		current++;
		right++;
	}
	currentSprite.changeImage(characterNames[current]);
	leftSprite.changeImage(characterNames[left]);
	rightSprite.changeImage(characterNames[right]);
}

function select()
{
	selectedCharacter =  currentSprite.getAnimationLabel();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showInfo(){
if(visibleInfo==false){
	specialInfo = false;
	visibleInfo = true;
}
else{
	visibleInfo = false;
}
}

function showSpecial(){
if(specialInfo == false){
	visibleInfo = false;
	specialInfo = true;

}
else{
	specialInfo = false;
}


}

function randomize(){
var x = getRandomInt(0,4);

for(var i = 0; i < x; i++){

	changeLeft();

}

}

function drawPrepScreen()
{

	image(backgroundImage,0,0);

	drawSprite(currentSprite);
	drawSprite(leftSprite);
	drawSprite(rightSprite);

	image(foregroundImage,0,0);

	infoButton.draw();
	specialButton.draw();
	randomButton.draw();
	selectButton.draw();
	leftArrow.draw();
	rightArrow.draw();

	textFont(goudy);

	fill("white");
	stroke("black");
	textSize(45);
	strokeWeight(2);
	text(characterNames[current], (width/2), 436);

	textSize(90);
	strokeWeight(7);
	stroke("#3E2005");
	fill("#D4C40F");
	text("Choose Your Character!", width / 2, 100);

if(visibleInfo){
	textFont(meath);
	textSize(27);
	strokeWeight(2);
	stroke("black");
	fill("white");

		if(characterNames[current] == "Rogue"){

			text(rogueDescription,(width/2)-35,460);

		}else if(characterNames[current] == "Knight"){

			text(knightDescription,(width/2)-35,460);

		}else if(characterNames[current] == "Mercenary"){

			text(mercDescription,(width/2)-30,440);
		}
		else if(characterNames[current] == "Cavalry"){
			text(cavalryDescription,(width/2)-35,460);
		}
		else if(characterNames[current] == "Barbarian"){
			text(barbDescription,(width/2)-20,460);
		}
	}

if(specialInfo){
	textFont(meath);
	textSize(27);
	strokeWeight(2);
	stroke("black");
	fill("white");
		if(characterNames[current] == "Rogue"){

			text(rogueSpecialInfo,(width/2)-35,460);

		}else if(characterNames[current] == "Knight"){

			text(knightSpecialInfo,(width/2)-35,460);

		}else if(characterNames[current] == "Mercenary"){

			text(mercSpecialInfo,(width/2)-30,440);
		}
		else if(characterNames[current] == "Cavalry"){
			text(cavalrySpecialInfo,(width/2)-35,460);
		}
		else if(characterNames[current] == "Barbarian"){
			text(barbSpecialInfo,(width/2)-20,460);
		}

	}

	if(selectedCharacter)
	{
		console.log("A character has been selected. Now moving from the prep screen into the game.");
		return selectedCharacter;
	}
}