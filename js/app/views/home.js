var Home = function(){

	this.id = 'home';

	View.apply(this, arguments);

	this.images = {
		'home-background': 'img/home-bg.jpg'
	};

};

Home.prototype = Object.create(View.prototype);

Home.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.fadeIn(function(){
		self.onAnimateIn();
	});

	this.fade();

};

Home.prototype.animateOut = function() {
	
	View.prototype.animateOut.call(this);

	var self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});

};

Home.prototype.fade = function() {
	$( "h1" ).fadeIn( 2000 );
	$( "p" ).fadeIn( 2000 );
	$( "a" ).fadeIn( 7000 );
};