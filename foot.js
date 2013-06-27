var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");
for(var i=1; i<12;i++){
cxt.moveTo(i*20,0);
cxt.lineTo(i*20,350);
cxt.stroke();
}
for(var i=1; i<17;i++){
cxt.moveTo(0,i*20);
cxt.lineTo(240,i*20);
cxt.stroke(1,"#f00");
}
var game1 = new game();
game1.start();
