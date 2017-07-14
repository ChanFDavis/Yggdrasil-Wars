
var items = [];
var basicSwordImage = 0;
var emptyInventoryImage = 0;
var basicSword = createItem(basicSwordImage, 5, basicSword, false);
var noWeapon = createItem(emptyInventoryImage, .5, noWeapon, true);

function Items(img, dmg, name, isEmpty){
  this.img = img;
  this.dmg = dmg;
  this.name = name;
  this.isEmpty = isEmpty;
}
