var PlayerController = function(){

	this.players = {};
	this.nextAlertPercentage = {};

	this.currTimeline = null;
	this.nextTimeline = null;

	this.globalVolume = 1;

	this._onVideoUpdate = new signals.Signal();

	this.init();
	this.currentPercentage = 0;
	this.activeNextDots = [];
	this.noReopen = 0;


};

/**
  * @desc Initiates View and parses DOM to save elements to object
  *		gets timeline (all points of timeline) and video element
*/
PlayerController.prototype.init = function(){

	this.players = {
		'perou':{
			'id': 'perou',
			'container': $('#player-perou'),
			'video': $('#player-perou video'),
			'timeline': $('#player-perou .line')
		},
		'siberie':{
			'id': 'siberie',
			'container': $('#player-siberie'),
			'video': $('#player-siberie video'),
			'timeline': $('#player-siberie .line')
		},
		'paris':{
			'id': 'paris',
			'container': $('#player-paris'),
			'video': $('#player-paris video'),
			'timeline': $('#player-paris .line')
		}
	};

	this.currTimeline = this.players.perou;

	this.fadeIn(this.currTimeline);
	this.play(this.currTimeline);

	this.bind();
}

/**
  * @desc Binding events
*/
PlayerController.prototype.bind = function(){
	var self = this;

	$('.sound').on('click', function(e){
		e.preventDefault();
		self.toggleVolume();
	});
	$('video').on('ended', function(){
		app.router.navigate('/share');
	})
	$('.fantome2').on('click', function(){
		self.videoToggle(self.currTimeline);
	})
	$(document).on('keydown', function(e){
		switch(e.which){
			case 32:
				e.preventDefault();
				self.videoToggle(self.currTimeline);
			break;
			case 38:
				e.preventDefault();
				switch(self.currTimeline.id){
					case 'perou':
						self.changeVideo(self.players.paris);
					break;
					case 'siberie':
						self.changeVideo(self.players.perou);
					break;
					case 'paris':
						self.changeVideo(self.players.siberie);
					break;
				}
			break;
			case 40:
				e.preventDefault();
				switch(self.currTimeline.id){
					case 'perou':
						self.changeVideo(self.players.siberie);
					break;
					case 'siberie':
						self.changeVideo(self.players.paris);
					break;
					case 'paris':
						self.changeVideo(self.players.perou);
					break;
				}
			break;
		}
	})
	$('.circle').on('click', function(e){

		e.preventDefault();
		var clicked = this.closest('.line'),
			id      = clicked.getAttribute('data-id');

		if(self.currTimeline.timeline[0] != clicked){
			self.goTo(this.getAttribute('data-id'));
			self.changeVideo(self.players[id]);
		}else{
			self.goTo(this.getAttribute('data-id'));
		}
	})
	$('video').bind('progress', function(){
		var duration = $('video')[0].duration,
			current = this.currentTime;
			percent = Math.floor(current * 100 / duration) +1;

		self.currentPercentage = percent;

		self._onVideoUpdate.dispatch(percent);

		self.timelineProgress(percent);

	})

	setTimeout(function(){
		app.viewController.views.experience.modalController._nextModal.add(self.alertNextModal, self);
		app.viewController.views.experience.modalController._nextModal.add(self.clearPastActive, self);
	}, 500 );


}

/**
  * @desc Changes current video to next view
  * @param player  - Next player to be displayed (player object)
*/
PlayerController.prototype.changeVideo = function(nextPlayer){

	nextPlayer.video[0].currentTime = this.currTimeline.video[0].currentTime;

	this.fadeIn(nextPlayer);
	this.fadeOut(this.currTimeline);
	this.currTimeline = nextPlayer;

}

/**
  * @desc Plays video
  * @param player - Video to play (player object)
*/
PlayerController.prototype.play = function(player){

	player.video[0].volume = this.globalVolume;
	player.video[0].play();

}

/**
  * @desc Pauses video
  * @param player - Video to pause (player object)
*/
PlayerController.prototype.pause = function(player){

	player.video[0].pause();

}

/**
  * @desc Toggles video (plays if paused, pause if playing)
  * @param currentPlayer - the current displayed video
*/
PlayerController.prototype.videoToggle = function(currentPlayer){

	if(currentPlayer.video[0].paused)
		this.play(currentPlayer);
	else
		this.pause(currentPlayer);
}

/**
  * @desc Sets current video time to wanted percentage
  * @param string || number - Percentage to go to
*/
PlayerController.prototype.goTo = function(percentage){

	if(typeof(percentage) != 'number')
		percentage = parseInt(percentage);

	var duration = this.players.perou.video[0].duration;

	time = percentage * duration / 100;

	this.noReopen = 0;

	this.players.perou.video[0].currentTime = time;
	this.players.siberie.video[0].currentTime = time;
	this.players.paris.video[0].currentTime = time;

	this.play(this.currTimeline);
}

/*
  * @desc opens a modal window to display a message
*/
PlayerController.prototype.toggleVolume = function(){

	if(this.globalVolume == 1){
		this.globalVolume = 0;
		$('.sound').removeClass('active');
	}
	else{
		this.globalVolume = 1;
		$('.sound').addClass('active');
	}

	this.currTimeline.video[0].volume = this.globalVolume;
}

/**
  * @desc Fades Video Out and pauses it (still diplayes not to break layout)
*/
PlayerController.prototype.fadeOut = function(player){

	var self = this;

	player.timeline.removeClass('active');

	player.video.fadeOut('fast', function(){
		self.pause(player);
	})
}

/**
  * @desc Fades Video In and plays it (still diplays not to break layout)
  * @param player - Player to fadeIn to view (player object)
*/
PlayerController.prototype.fadeIn = function(player){
	var self = this;

	player.timeline.addClass('active');

	player.video.fadeIn('fast', function(){
		self.play(player);
	})
}

/**
  * @desc Activates animation for future dots (not on same timeline), triggered on signal
  * @param string  - table of dot objects
*/
PlayerController.prototype.alertNextModal = function(table){
	var self = this;

	if(table.length > 0){
		for (var i = 0; i < table.length; i++) {
			if(table[i].player != self.currTimeline.id){
				var selector = '#timeline-'+table[i].player+' [data-id="'+table[i].id+'"] .inner'
				$(selector).addClass('nextDot');

				if(self.activeNextDots.indexOf(selector) == -1){
					self.activeNextDots.push(selector);
				}
			}
			else{
				if(parseInt(table[i].id) == self.currentPercentage && self.noReopen != table[i].id){
					self.displayModal(table[i]);
				}
			}
		};
	}
}

/**
  * @desc Clears dots animation
*/
PlayerController.prototype.clearPastActive = function(){
	var self = this;
	if(self.activeNextDots.length > 0){
		for (var i = 0; i < self.activeNextDots.length; i++) {

			var nodePercent = self.activeNextDots[i].match(/\d/g);
			nodePercent = parseInt(nodePercent.join(''));
			if(nodePercent > self.currentPercentage+3 || nodePercent < self.currentPercentage){
				$(self.activeNextDots[i]).removeClass('nextDot');
				self.activeNextDots.splice(i, 1);
			}
		};
	}

}

/**
  * @desc opens a modal window to display a content
  * @param content  - the modal's content
*/
PlayerController.prototype.displayModal = function(content){
	var self = this;

	this.pause(this.players.perou);
	this.pause(this.players.siberie);
	this.pause(this.players.paris);
	$('.modal p').html(content.texte);
	$('.modal h3').html(content.titre);


	$('.modal').fadeIn('fast');

	$('.close').one('click', function(e){
		e.preventDefault();
		self.noReopen = content.id;
		$('.modal').fadeOut('fast');
		self.play(self.currTimeline);
	})

}

/**
  * @desc Colors dots on timeline to show Video progression (call on video refresh event)
  * @param player - Player to fadeOut of view (player object)
*/
PlayerController.prototype.timelineProgress = function(percentage){
	percentage = parseInt(percentage);

	$('.all-progress').css({
	width: percentage+'%'});

	for (var i = 0; i <= 99; i++) {

		var currentDots = $('[data-id="'+i+'"]');

		if(i < percentage){
			if(!currentDots.hasClass('active')){
				currentDots.addClass('active');
				if(currentDots.hasClass('circle-action')){
					currentDots.addClass('active-action');
					currentDots.find('.inner').addClass('active');
				}
			}
		}
		else{
			if(currentDots.hasClass('active'))
				currentDots.removeClass('active');
				if(currentDots.hasClass('circle-action'))
					currentDots.removeClass('active-action');
					currentDots.find('.inner').removeClass('active');
		}
	};
}