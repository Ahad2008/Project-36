//Create variables here
var dog, happyDog;
var database, foodS, foodStock, food, fedTime, lastFed, feed, addFood;
var DogIMG, HappyDogIMG;

function preload(){
  //load images here
  DogIMG = loadImage("dogImg.png");
  HappyDogIMG = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

	createCanvas(1000, 500);

  food = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog = createSprite(850, 350, 10, 10);
  dog.addImage(DogIMG);
  dog.scale = 0.3;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);

  food.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
 
  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed: " + lastFed % 12 + " PM", 350,30);
   }else if(lastFed == 0){
     text("Last Feed: 12 AM",350,30);
   }else{
     text("Last Feed: " + lastFed + " AM", 350, 30);
   }
 
  drawSprites();
}

function readStock(data){
  foodS = data.val();
  food.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(HappyDogIMG);

  food.updateFoodStock(food.getFoodStock() - 1);
  database.ref('/').update({
    Food:food.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}