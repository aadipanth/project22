// creating the Engine,World and Bodies
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

// creating variables for the engine and world
var engine;
var world;
// creating an array
var boxes = [];
// variables for the ground and the slider
var ground;
var gSlider;
 
function setup() {
    createCanvas(400, 400);

    // creating the engine and world
    engine = Engine.create();
    world = engine.world;
 
    // creating the slider bar
    gSlider = createSlider(0, 100, 50);
    gSlider.position(40, 365);
    gSlider.input = map(engine.world.gravity, gSlider.min, gSlider.max, 0, 1);
 
    // creating the ground
    ground = new Ground(200,350,400,10)

}
 
// creating a new function to create a new box whenever we click 
function mousePressed() {
    // create a new box whenever you click 
    if (mouseY < 350) {
       boxes.push(new Box(mouseX, mouseY, random(5,50), random(5,50) ))
    }
}
 
function draw() {
    // to stop the redrawwing 
    background(51);
    // updating the engine
    Engine.update(engine);
    var fVal = gSlider.value();
 
    // displaying the box whenever the function mousePressed is called
    for (var i = 0 ;i < boxes.length; i++){
        boxes[i].display();
    }
ground.display();
}
 
// creating a simple function that can create a box at a time
function Box(x,y,width,height){
    // storing the features of the box into a variable
    var opt = {
        restitution : 0.5,
        friction : 0.5
    };
    
    // creating the box
    this.body = Bodies.rectangle(x,y,width,height,opt);
    this.width = width;
    this.height = height;
    // adding the body to the world
    World.add(world,this.body);

    // making a function to show the box on the screen
    this.display = function(){
        // storing the position of the box into a variable
        var pos = this.body.position;
        // storing the angle of the box into a variable
        var angle = this.body.angle;

        push();
        translate(pos.x,pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(2);
        stroke(1);
        rect(0,0,this.width,this.height);
        pop();
    }
}

