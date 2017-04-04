/*
 *
*/
var Share = function(){

	this.id = 'share';

	View.apply(this, arguments);

	this.images = {
		'share-background': 'img/home-bg.jpg'
	};

};

/*
 *
*/
Share.prototype = Object.create(View.prototype);

/*
 *
*/
Share.prototype.bind = function() {

	View.prototype.bind.call( this );

	var self = this;

	$('.twitter-content-img').on("mouseenter", function() { self.showDisplay(this) });
	$('.twitter-content-img').on("mouseleave", function() { self.hideDisplay(this) });

};


/*
 *
*/
Share.prototype.showDisplay = function(el) {

	$(el).find(".over-tweet-img").addClass("show");

};

/*
 *
*/
Share.prototype.hideDisplay = function(el) {

	$(el).find(".over-tweet-img").removeClass("show");

};

/*
 *
*/
Share.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.fadeIn(function(){
		self.onAnimateIn();
	});
	
	this.showTweets();
	
};

/*
 *
*/
Share.prototype.showTweets = function() {

	var requete = $.getJSON("./api.php",function(results){
	 	this.i = 1;
	 	var self = this;
	 	$.each(results, function(key,val){

			$('#tweet-'+self.i).html(val.text.replace('RT',''));			
			var created = new Date(Date.parse(val.created_at)).toLocaleString().substr(0, 10);
			$("#date-tweet-"+self.i).html("Le "+created);
			if ((self.i == 2 || self.i == 3) && (typeof val.entities.media != "undefined")) {
				$("#tweet-wrapper-"+self.i).css({"background-image": "url("+val.entities.media[0].media_url+")"});
			}
			self.i++;
	 	});
	});
};

/*
 *
*/
Share.prototype.animateOut = function() {
	
	View.prototype.animateOut.call(this);

	var self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});

}; 	