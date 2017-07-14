var gameItems = [];
var playerItems = [];

function Item(img, dmg, name){
  this.img = img;
  this.dmg = dmg;
  this.name = name;
}

function initGameItems(){
  gameItems = [];
  gameItems.push(new Item(emptyInventoryImage, 0, "Empty"));
  gameItems.push(new Item(basicSwordImage, 1, "Basic"));
  gameItems.push(new Item(bronzeSwordImage, 4, "Bronze"));
  gameItems.push(new Item(silverSwordImage, 8, "Silver"));
  gameItems.push(new Item(goldSwordImage, 16, "Gold"));
}

function initPlayerItems(){
  playerItems = [];
  playerItems.push(gameItems[1]);
  playerItems.push(gameItems[0]);
  playerItems.push(gameItems[0]);
  playerItems.push(gameItems[0]);
  return playerItems;
}

function chestItemDrop(item){
  for(i = 0; i < 4; i++){
    if(localFighter.inventory[i].name == "Empty" || localFighter.inventory[i].name == item.name){
      
      if (localFighter.inventory[i].name == item.name) {
        localFighter.score += 2*item.dmg;
      }

      console.log(item.name);
      localFighter.inventory[i] = item;
      itemsBar[i].addImage(localFighter.inventory[i].img);
      itemsBar[i].name = localFighter.inventory[i].name;


      break;
    }
  }
}
