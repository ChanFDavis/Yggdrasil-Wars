/**
* This is for drawing the screens before the player is placed into the game.
*/
var enemyWalkAnimation;
var enemyAttackAnimation;
var enemyIdleAnimation;

var batWalkAnimation;
var batAttackAnimation;
var batIdleAnimation;

var spiderWalkAnimation;
var spiderAttackAnimation;
var spiderIdleAnimation;

var fighterSwingAnimation;
var fighterDeathAnimation;
var fighterIdleAnimation;

var knightWalkAnimation;
var knightSwingAnimation;
var knightIdleAnimation;

var rogueWalkAnimation;
var rogueSwingAnimation;
var rogueIdleAnimation;

var mercWalkAnimation;
var mercSwingAnimation;
var mercIdleAnimation;

var barbWalkAnimation;
var barbSwingAnimation;
var barbIdleAnimation;

var cavalryWalkAnimation;
var cavalrySwingAnimation;
var cavalryIdleAnimation;

var miniMapImage;

 var footsteps;
 var swordSound;
 var galloping;
 var blop;
 var whip;
 var barbSteps;
 var victory;
 var hover;
 var click;

 var oldEnglish;
 var celtic;
 var goudy;
 var meath;

var cursorSprite;

var forestImage;

var openChestImage;
var closedChestImage;

var landscapeSprite;

var customCursor;
var spawnerImage;
var landscape;

var emptyInventoryImage;
var basicSwordImage;

var bronzeSwordImage;
var silverSwordImage;
var goldSwordImage;

var clickedButtonImage;
var defaultButtonImage;
var mainMenuImage;

var initializedGame;

var startGame;

var titleScreenImage;

var testButton;

var prepScreen;

var titleScreenFinished = false;
var prepScreenInit = false;

var characterImages = [];
var characterNames  = [];

var backgroundImage;
var foregroundImage;


function preload()
{
	defaultButtonImage = loadImage("assets/screens/testbuttondefault.png");
	clickedButtonImage = loadImage("assets/screens/testbuttonclicked.png");

	titleScreenImage = loadImage("assets/screens/titleImage.png");

	mainMenuImage = loadImage("assets/screens/mainmenu.png");



	backgroundImage = loadImage("assets/screens/prep_background.png");
	foregroundImage = loadImage("assets/screens/prep_foreground.png");

	characterImages.push(loadImage("assets/screens/class_images/barb_portrait.png"));
	characterNames.push("Barbarian");

	characterImages.push(loadImage("assets/screens/class_images/cavalry_portrait.png"));
	characterNames.push("Cavalry");

	characterImages.push(loadImage("assets/screens/class_images/knight_portrait.png"));
	characterNames.push("Knight");

	characterImages.push(loadImage("assets/screens/class_images/rogue_portrait.png"));
	characterNames.push("Rogue");

	characterImages.push(loadImage("assets/screens/class_images/merc_portrait.png"));
	characterNames.push("Mercenary");

	goblinWalkAnimation = loadAnimation("assets/enemy/walk/enemyWalking00.png", "assets/enemy/walk/enemyWalking09.png");
	goblinAttackAnimation = loadAnimation("assets/enemy/attack/enemyAttack0.png", "assets/enemy/attack/enemyAttack3.png");
	goblinIdleAnimation = loadAnimation("assets/enemy/enemyIdle.png");

	batWalkAnimation = loadAnimation("assets/bat/walk/batWalk0.png","assets/bat/walk/batWalk7.png");
	batAttackAnimation = loadAnimation("assets/bat/attack/batAttack0.png","assets/bat/attack/batAttack5.png");
	batIdleAnimation = loadAnimation("assets/bat/walk/batWalk0.png","assets/bat/walk/batWalk7.png");

	spiderWalkAnimation = loadAnimation("assets/spider/walk/spiderWalk0.png","assets/spider/walk/spiderWalk3.png");
	spiderAttackAnimation = loadAnimation("assets/spider/attack/spiderAttack0.png","assets/spider/attack/spiderAttack4.png");
	spiderIdleAnimation = loadAnimation("assets/spider/walk/spiderWalk0.png","assets/spider/walk/spiderWalk3.png");

	knightWalkAnimation = loadAnimation("assets/fighter/walk/walk00.png","assets/fighter/walk/walk09.png");
	knightSwingAnimation = loadAnimation("assets/fighter/swing/swing0.png","assets/fighter/swing/swing6.png");
	knightIdleAnimation = loadAnimation("assets/fighter/fighter_idle.png");

	rogueWalkAnimation = loadAnimation("assets/rogue/walk/roguewalk0.png","assets/rogue/walk/roguewalk7.png");
	rogueSwingAnimation = loadAnimation("assets/rogue/attack/rogueattack0.png","assets/rogue/attack/rogueattack6.png");
	rogueIdleAnimation = loadAnimation("assets/rogue/walk/roguewalk3.png");

	mercWalkAnimation = loadAnimation("assets/mercenary/walk/mercwalk00.png","assets/mercenary/walk/mercwalk11.png");
	mercSwingAnimation = loadAnimation("assets/mercenary/attack/mercattack0.png","assets/mercenary/attack/mercattack5.png");
	mercIdleAnimation = loadAnimation("assets/mercenary/walk/mercwalk00.png");

	barbWalkAnimation = loadAnimation("assets/barbarian/walk/barbwalk0.png","assets/barbarian/walk/barbwalk7.png");
	barbSwingAnimation = loadAnimation("assets/barbarian/attack/barbattack0.png","assets/barbarian/attack/barbattack5.png");
	barbIdleAnimation = loadAnimation("assets/barbarian/walk/barbwalk2.png");

	cavalryWalkAnimation = loadAnimation("assets/cavalry/walk/cavalrywalk0.png","assets/cavalry/walk/cavalrywalk3.png");
	cavalrySwingAnimation = loadAnimation("assets/cavalry/swing/cavalryswing0.png","assets/cavalry/swing/cavalryswing5.png");
	cavalryIdleAnimation = loadAnimation("assets/cavalry/walk/cavalrywalk3.png");

	customCursor = loadImage("assets/cursor.png");
	spawnerImage = loadImage("assets/spawner.png");

	openChestImage = loadImage("assets/obstacles/chest_open.png");
	closedChestImage = loadImage("assets/obstacles/chest_closed.png");

	landscape = loadImage("assets/map.png");
	
	miniMapImage = loadImage("assets/minimap.png");
	
	emptyInventoryImage = loadImage("assets/inventory/emptyInventory.png");
	basicSwordImage = loadImage("assets/inventory/basicSword.png");
	bronzeSwordImage = loadImage("assets/inventory/bronzeSword.png");
	silverSwordImage = loadImage("assets/inventory/silverSword.png");
	goldSwordImage = loadImage("assets/inventory/goldSword.png");

	footsteps = loadSound("assets/sounds/Marching.wav");
	swordSound = loadSound("assets/sounds/Woosh.wav");
	galloping = loadSound("assets/sounds/Galloping.wav");
	blop = loadSound("assets/sounds/Blop.wav");
	whip = loadSound("assets/sounds/Whip.wav");
	barbSteps = loadSound("assets/sounds/barbSteps.wav");
	victory = loadSound("assets/sounds/victory.wav");

	hover = loadSound("assets/sounds/hover.wav");
	click = loadSound("assets/sounds/click.wav");

	oldEnglish = loadFont("assets/Fonts/OldEnglish.ttf");
	celtic = loadFont("assets/Fonts/Celtic.ttf");
	meath = loadFont("assets/Fonts/Meath.ttf");
	goudy = loadFont("assets/Fonts/Goudy.ttf");


	forestImage = loadImage("assets/obstacles/forest.png");
}

function setup()
{
	createCanvas(1000, 725);

	frameRate(60);

	startGame = false;

}

function draw()
{
	var chosenClass;

	background("#343832");

	if(!startGame)
	{
		if(titleScreenFinished)
		{
			if(!prepScreenInit)
			{
				initPrepScreen();
				prepScreenInit = true;
			}
			switch(drawMainMenu())
			{
				case 1: // Go to preparation screen

					if(chosenClass = drawPrepScreen())
					{
						allSprites.removeSprites();

						setupGame();
						startGame = true;

						becomePlayer(chosenClass);
					}
					break;
				case 2: //Enter game as spectator
					becomeSpectator();
					allSprites.removeSprites();

					setupGame();
					startGame = true;
					break;
				case 3: //Enter game as mod (if login works)
					becomeMod();

					allSprites.removeSprites();

					setupGame();
					startGame = true;

					break;
				case 4: //Go to the options page (Just changes css)
					break;

			}


		}
		else
		{
			image(titleScreenImage, 0, 0);

			if(keyWentDown(13))
			{
				console.log("Moving past the title screen");
				titleScreenFinished = true;
				initMainMenu();

			}
		}
	}
	else
	{
		drawGame();
	}
}
