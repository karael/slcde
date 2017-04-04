var Experience = function(){

	this.id = 'experience';

	View.apply(this, arguments);

	this.images = {
		'experience-background': 'img/home-bg.jpg'
	};
};

Experience.prototype = Object.create(View.prototype);

Experience.prototype.bind = function() {

	View.prototype.bind.call( this );

	var self = this;

	$('.timeline-top').on("mouseover", $.proxy(self.displayMenu, self));
	$('.fantome2').on("mouseenter", $.proxy(self.hideMenu, self));
};

Experience.prototype.animateIn = function() {

	View.prototype.animateIn.call(this);

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.fadeIn(function(){
		self.onAnimateIn();
	});

	this.setupMenu();
    $(".timeline-top").css("bottom","115px");


	this.hideExplication();

};

Experience.prototype.animateOut = function() {

	View.prototype.animateOut.call(this);
	var self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});

};

Experience.prototype.setupMenu = function() {
    //   	$.fn.exchangePositionWith = function(selector) {
    //        var other = $(selector)
    //        this.after(other.clone());
    //        other.after(this).remove();
    //    };

    $( "li" ).click(function() {
	    $( this ).addClass( "active" );
	    $( this ).siblings().removeClass( "active" );
	    // $( this ).exchangePositionWith("li:eq(1)");
   	});
};

Experience.prototype.displayMenu = function() {
 
	$(".timeline-hover").show();
	$(".timeline-top").css("bottom","115px");
	$(".timeline-top").css("top","auto");
	$(".fantome").css("z-index","10");
	$(".circle").css("z-index","20");

};

Experience.prototype.hideMenu = function() {
 
 	$(".timeline-hover").hide();
 	$(".containt-hover").hide();
 	$(".content").css("background-color","black");
	$(".timeline-top").css("top","calc( 100vh - 35px )");
	$(".timeline-top").css("bottom","0px");
	$(".fantome").css("z-index","0");

}

Experience.prototype.hideExplication = function(){
    self = this;

	setTimeout(function(){
		$("#explication_nav").fadeOut(2000, function(){
            self.playerController = new PlayerController();
            self.modalController = new ModalController();
        })
	}, 4000);

};




