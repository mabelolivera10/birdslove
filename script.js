var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");
var cw = canvas.width = 500,
  cx = cw / 2;
var ch = canvas.height = 500,
  cy = 3*ch / 4;

var rad = Math.PI / 180;
var frames = 0;
var spring = .005;//elasticidad
var leafColors = ["#5a9435","#76ae3e"];
var heartsRy = [];
ctx.font="35pt Tangerine";
ctx.strokeStyle="hsl(19,98%,45%)";
ctx.textAlign="center";

// BRANCH
var bez = {
	x:0,
	y:cy,
	cx:cx,
	cy:cy,
	_x:cw-50,
	_y:cy,
	dest_y:cy + 20,
	speed: 0
}
var bez1 = {
	_x:0,
	_y:cy+20,
	cx:cx,
	cy:cy+15,
	x:cw-50,
	y:cy+10,
	dest_y:cy + 30,
	speed: 0
}

function Animacion() {
  elId = window.requestAnimationFrame(Animacion);
  frames++
  ctx.clearRect(0, 0, cw, ch);
  
  ctx.fillStyle ="#777";
  ctx.fillText("I LOVE YOU",cx,60);

  
  
   heartsAnimation();
 
  /////////////////////////////
  var dist = (bez.dest_y - bez._y);
  var acc = dist * spring;  
  bez.speed += acc;
  bez._y += bez.speed;
  
  var dist1 = (bez1.dest_y - bez1.y);
  var acc1 = dist1 * spring;  
  bez1.speed += acc1;
  bez1.y += bez1.speed;
  ////////////////////////////
  
ctx.fillStyle = "hsl(31,40%,25%)";  


drawBranch(bez,bez1);
drawTwig(pointOnQuadraticBezier(bez1,.3),30,20,30,60); 
drawTwig(pointOnQuadraticBezier(bez1,.3),15,10,20,80); 
drawTwig(pointOnQuadraticBezier(bez1,.6),20,10,20,30);
drawTwig(pointOnQuadraticBezier(bez,.9),10,-20,20,-30);
drawTwig(pointOnQuadraticBezier(bez,.9),5,-10,20,-70);  

DrawBird(50,.26,180,50);
DrawBird(60,.52,0,50);
DrawBird(55,.8,42,95); 
}

elId = window.requestAnimationFrame(Animacion);

function Bird(R,poz,color){  
  this.R = R;
  this.x=poz.x;
  this.y=poz.y -this.R;
  this.color=color;
}
  
function DrawBird(R,t,hue,light){
 var color =  "hsl("+hue+","+light+"%,70%)";
 var tuftColors = ["hsl("+hue+","+light+"%,60%)","hsl("+hue+","+light+"%,50%)"];
 ctx.strokeStyle ="hsl(31,40%,25%)"
 var poz =  pointOnQuadraticBezier(bez,t)
 var bird = new Bird(R,poz,color);
    // TAIL
  ctx.fillStyle = "hsl("+hue+","+light+"%,50%)";
 ctx.beginPath();
 ctx.moveTo(bird.x,bird.y+.5*bird.R);
 ctx.lineTo(bird.x-1.1*bird.R,bird.y+.3*bird.R);
 ctx.lineTo(bird.x-1.2*bird.R,bird.y+.7*bird.R); 
 ctx.closePath(); 
 ctx.fill();
  // BODY
 ctx.fillStyle = bird.color; 
 ctx.beginPath();
 ctx.arc(bird.x, bird.y, bird.R,0,2*Math.PI);
 ctx.fill();
  //EYES
 var x1 = bird.x + 21*Math.cos(-165*rad);
 var x2 = bird.x + 21*Math.cos(-15*rad);
 var y1 = bird.y + 21*Math.sin(-165*rad);
 var y2 = bird.y + 21*Math.sin(-15*rad); 
 ctx.fillStyle = "white";
 ctx.beginPath();
 ctx.arc(x1,y1,20,0,2*Math.PI);
 ctx.fill();
 ctx.stroke(); 
 ctx.beginPath();
 ctx.arc(x2,y2,20,0,2*Math.PI);
 ctx.fill();
 ctx.stroke();
 ctx.fillStyle = "black";
 ctx.beginPath();
 ctx.arc(x1+5,y1+5,10,0,2*Math.PI);
 ctx.fill();
 ctx.stroke(); 
 ctx.beginPath();
 ctx.arc(x2-5,y2+5,10,0,2*Math.PI);
 ctx.fill();
 ctx.stroke();
  // BEAK
 ctx.fillStyle = "darkorange";
 ctx.beginPath();
 ctx.moveTo(bird.x, bird.y);
 ctx.lineTo(bird.x+7, bird.y+10);
 ctx.lineTo(bird.x, bird.y+20);
 ctx.lineTo(bird.x-7, bird.y+10);
 ctx.closePath();
 ctx.fill(); 
 // LEGS
 var leg1 = pointOnQuadraticBezier(bez,t+.02)
 ctx.beginPath();
 ctx.arc(leg1.x,leg1.y,6,0,2*Math.PI); 
 ctx.fill();
 var leg2 = pointOnQuadraticBezier(bez,t-.02)
 ctx.beginPath();
 ctx.arc(leg2.x,leg2.y,6,0,2*Math.PI); 
 ctx.fill();
 //TUFT 
 var tuft = new Leaf(bird.x,bird.y-bird.R,15,-20*rad);
 drawLeaf(tuft,tuftColors);
 var tuft1 = new Leaf(bird.x,bird.y-bird.R,10,-80*rad);
 drawLeaf(tuft1,tuftColors); 

}

function pointOnQuadraticBezier(bez,t){
var o = {}
o.x = (1 - t) * (1 - t) * bez.x + 2 * (1 - t) * t * bez.cx + t * t * bez._x;
o.y = (1 - t) * (1 - t) * bez.y + 2 * (1 - t) * t * bez.cy + t * t * bez._y;
return o;
}

function Leaf(x,y,r,a){
  this.r = r;
  this.a = a;
  this.x = x + this.r*Math.cos(this.a);
  this.y = y + this.r*Math.sin(this.a);
  this.R = Math.sqrt(2*this.r*this.r);
  this.a1 = this.a + Math.PI/2;
  this.a2 = this.a1 +Math.PI;
  this.from_a = this.a - 45*rad;
  this.to_a = -90*rad +this.from_a;
  this.x1 = this.x + this.r*Math.cos(this.a1);
  this.y1 = this.y + this.r*Math.sin(this.a1);
  this.x2 = this.x + this.r*Math.cos(this.a2);
  this.y2 = this.y + this.r*Math.sin(this.a2);  
}


function drawLeaf(l,leafColors){  
ctx.save();
ctx.fillStyle =leafColors[0];
ctx.beginPath();
ctx.arc(l.x1,l.y1,l.R,l.from_a,l.to_a,true);
ctx.fill();
ctx.fillStyle =leafColors[1];
ctx.beginPath();
ctx.arc(l.x2,l.y2,l.R,Math.PI+l.from_a,Math.PI+l.to_a,true);
ctx.fill();
ctx.restore();
}

function drawBranch(bez,bez1){
ctx.beginPath();
ctx.moveTo(bez.x,bez.y);// aquí empieza la curva
ctx.quadraticCurveTo(bez.cx,bez.cy,bez._x,bez._y);
ctx.lineTo(bez1.x,bez1.y);// aquí empieza la curva
ctx.quadraticCurveTo(bez1.cx,bez1.cy,bez1._x,bez1._y);
ctx.fill();  
}



function drawTwig(l,dx,dy,size,angle){console.clear();
  var x = l.x;
  var y = l.y;
  var _x = x + dx;
  var _y = y + dy;
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(_x,_y);
  ctx.stroke();
  var lx = l.x+dx;
  var ly=l.y+dy;
  var leaf = new Leaf(lx,ly,size,angle*rad);
  drawLeaf(leaf,leafColors);
} 
function Heart(){
  this.x = cw/2;
  this.y = 3*ch/4;
  this.r = 5;
  this.a = -90;
  this.lightness= 50;
  this.pn = Math.random() > .5 ? 1 : -1;
  this.fall = Math.round(Math.random() * 7) + 1;
  this.drift = this.pn * Math.round(Math.random() * 4) + 1;
  
}

Heart.prototype.draw = function() {
  var x = this.x,y=this.y,r= this.r,a=this.a;
  ctx.fillStyle = "hsl(0,95%,"+this.lightness+"%)"
  ctx.beginPath();
  var x1 = x + r * Math.cos(a * rad);
  var y1 = y + r * Math.sin(a * rad);
  var cx1 = x + r * Math.cos((a + 22.5) * rad);
  var cy1 = y + r * Math.sin((a + 22.5) * rad);

  var cx2 = x + r * Math.cos((a - 22.5) * rad);
  var cy2 = y + r * Math.sin((a - 22.5) * rad);
  var chord = 2 * r * Math.sin(22.5 * rad / 2);

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.arc(cx1, cy1, chord, (270 + a) * rad, (270 + a + 225) * rad);
  ctx.lineTo(x, y);
  ctx.moveTo(x1, y1);
  ctx.arc(cx2, cy2, chord, (90 + a) * rad, (90 + a + 135) * rad, true);
  ctx.lineTo(x, y);
  ctx.fill();
}

function heartsAnimation(){
  if(heartsRy.length < 20 && frames%5==0){
  var heart = new Heart();
  heartsRy.push(heart);
  }
  for(var i = 0; i < heartsRy.length; i++){
    if(heartsRy[i].lightness >=100){
      heartsRy[i].y = 3*ch/4;
      heartsRy[i].x = cw/2;
      heartsRy[i].fall = Math.round(Math.random() * 7) + 1;
      heartsRy[i].drift = heartsRy[i].pn * Math.round(Math.random() * 4) + 1;
      heartsRy[i].lightness = 50;
      heartsRy[i].r = 5;
    }
    heartsRy[i].y -= heartsRy[i].fall;
    heartsRy[i].fall-=.1;
    heartsRy[i].x += heartsRy[i].drift;
    heartsRy[i].lightness ++
    heartsRy[i].r +=.2;
    heartsRy[i].draw();
  }
}