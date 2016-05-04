$(document).ready(function(){
window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

var c = document.getElementById( 'c' ),
    ctx = c.getContext( '2d' ),
    cw = c.width = 500,
    ch = c.height = 500,
    cwc = cw / 2,
    chc = ch / 2,
    twoPi = Math.PI * 2,
    spawnTick = 0,
    spawnTickMax = 2,
    particles = [],
    initialLoops = 50;

function rand( min, max ) {
	return Math.random() * ( max - min ) + min;
}

function Particle() {
  this.x = cwc;
  this.y = chc;
  this.vx = 0;
  this.vy = 0;
  this.angle = rand( 0, twoPi );
  this.speed = rand( 0.5, 2 )
  this.radius = 0.001;
  this.radiusGrowth = 0.05;
  this.tick = 0;
  this.alpha = 0;
}

Particle.prototype.update = function( i ) {
  this.radius += this.radiusGrowth;  
  if( this.alpha < 1 && this.radius < 3 ) {
    this.alpha += 0.1;
  } else {
    this.alpha -= 0.04; 
  }  
  this.vx = ( Math.cos( this.angle ) * this.speed ) / ( this.radius * 2.5 );
  this.vy = ( Math.sin( this.angle ) * this.speed ) / ( this.radius * 2.5 );
  this.angle += rand( -0.25, 0.25 );
  this.x += this.vx;
  this.y += this.vy;    
  if( this.tick > 1 && this.alpha <= 0 ) {
    particles.splice( i, 1 );
  }  
  this.tick++;
}

Particle.prototype.render = function() {
  ctx.beginPath();
  ctx.arc( this.x, this.y, this.radius, 0, twoPi );
  ctx.shadowBlur = this.radius;
  ctx.shadowColor = 'hsla(0, 0%, 0%, ' + Math.max( 0, Math.min( 1, this.alpha ) ) * 2 + ')';
  ctx.fillStyle = 'hsla(0, 0%, 0%, ' + Math.max( 0, Math.min( 1, this.alpha ) ) + ')';
  ctx.fill();
}

function spawn() {
  if( spawnTick < spawnTickMax ){
    spawnTick++;
  } else {
    spawnTick = 0;
    particles.push( new Particle() );
  }
}

function loop() {
  spawn();
  ctx.clearRect( 0, 0, cw, ch );
  var i = particles.length;  
  while( i-- ) {
    var particle = particles[ i ];
    particle.update( i );
    particle.render();
  }
}

function raf() {
  requestAnimFrame( raf );
  loop();
}

for( var i = 0; i < initialLoops; i++ ) {
  loop();
}
raf();
});