var Block_mobile = function(){

	this.id = 'block_mobile';

	View.apply(this, arguments);

	this.images = {
		'home-background': 'img/home-bg.jpg'
	};

};

Block_mobile.prototype = Object.create(View.prototype);

Block_mobile.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.fadeIn(function(){
		self.onAnimateIn();
	});

};

Block_mobile.prototype.animateOut = function() {
	
	View.prototype.animateOut.call(this);

	var self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});

};
