

var R = 45;
var r = 16;
var earthPos, rockPos, separation;
var sX = 0;  //What is sx?
var sY = 0;
var eSelected = false;
var rSelected = false;
var val;
var lastX, lastY;

function setup() {
  var cnv = createCanvas(800, 400);
  cnv.parent("myContainer1");
  textSize(16);
  textFont("Georgia");
  textStyle(NORMAL);  
  earthPos = createVector(300, 200);
  rockPos = createVector(100, 200);
  separation = p5.Vector.sub(rockPos, earthPos);
}

function draw() {
  background(255);
  strokeWeight(2);
  grid(true);
  earth(eSelected);
  rock(rSelected); 
  arrow(rockPos.x, rockPos.y, calcG().x, calcG().y ); 
  fill(0);
  text("Force: " + val.toPrecision(3) + " N", width/2, 20);
  separation = p5.Vector.sub(rockPos, earthPos);
}

function mousePressed() {
  var d = dist(mouseX, mouseY, earthPos.x, earthPos.y);
  var d2 = dist(mouseX, mouseY, rockPos.x, rockPos.y);
 
  if ( d < R/2) {
    eSelected = !eSelected;  
    sX = -mouseX + earthPos.x;
    sY = -mouseY + earthPos.y;
  }

  else if ( d2 < r/2 ) {
    rSelected = !rSelected;
    sX = -mouseX + rockPos.x;
    sY = -mouseY + rockPos.y;
  }
}

function grid(y) {
  if (y == true) {
    strokeWeight(0.5);
    stroke(150);
    for (var i = 1; i<9*2; i++) {
      line(width, .5*i*height/9, 0, .5*i*height/9);
    }
    for (var i = 1; i<9*4; i++) {
      line(.5*i*height/9, 0, .5*i*height/9, height);
    }
  }
}

function earth(s) { 
  if (s != false){
    earthPos.x = mouseX + sX;  
    earthPos.y = mouseY + sY;   
  }    

  if (dist(rockPos.x, rockPos.y, earthPos.x, earthPos.y) < (R+r)/2 && (mouseIsPressed==false) ){
    eSelected = false;
  }
  push();
  translate(earthPos.x, earthPos.y);
  noStroke();
  fill(40,140,235);
  ellipse(0, 0, R, R);
  fill(0);
  ellipse(0, 0,3,3);
  pop();
}


function rock(s) {
  if (s != false)  { 
    rockPos.x = mouseX + sX;
    rockPos.y = mouseY + sY;
  }  
  if ( (dist(rockPos.x, rockPos.y, earthPos.x, earthPos.y) < (R+r)/2) && (mouseIsPressed==false) ){
    rSelected = false;
  }
  noStroke();
  fill(150,120,120);
  push();
  translate(rockPos.x, rockPos.y);
  ellipse(0, 0, r, r);
  pop();
}


function arrow(x_, y_, lenX, lenY) {
  if (p5.Vector.sub(rockPos,earthPos).mag() > R/2+r/2){
    push();
    translate(x_, y_);
    strokeWeight(2);
    stroke(0);
    line(0, 0, lenX, lenY);
    translate(lenX, lenY);
    if (lenX >= 0) {
      rotate(-2.6 + atan(lenY/lenX) );
    }

    if (lenX < 0) {
      rotate(-2.6 + PI + atan(lenY/lenX) );
    }
    line(0, 0, 6, 0);
    rotate(5.2);
    line(0, 0, 6, 0);
    pop();
  }
}



function calcG() {
  var F = separation.get();
  F.normalize();
  F.mult(-400000/separation.magSq());
  val = F.mag();
  return F;
}

function collisionCheck() {
  if (separation.mag() > R/2 + r/2){
    return false;
  }
  else {
    return true;
  }

}

