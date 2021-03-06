var Router = function(){

	// Create navigate event
	this._onNavigate = new signals.Signal();

	// Create routes
	this.createRoutes();

};

// Init router
Router.prototype.init = function() {

	var self = this;

	// Bind HistoryJS state change
	History.Adapter.bind(window, "statechange", function(e){

		self.onStateChange(e);

	});

	// Parse first token
	this.onStateChange();

};

// On state change
Router.prototype.onStateChange = function(e) {
	
	// Get token
	var token = this.getToken();

	// Parse token - test if it matches a route
	crossroads.parse( token );

};

// Create routes
Router.prototype.createRoutes = function() {

	var self = this;

	// Homepage
	crossroads.addRoute( '', function(){

		// Dispatch navigate event
		self._onNavigate.dispatch({
			view: 'home'
		});

	});

	// Experience
	crossroads.addRoute( '/experience' , function(){

		self._onNavigate.dispatch({
			view: 'experience'
		});

	});

	// Experience
	crossroads.addRoute( '/share' , function(){

		self._onNavigate.dispatch({
			view: 'share'
		});

	});

	// Experience
	crossroads.addRoute( '/erreur_404' , function(){

		self._onNavigate.dispatch({
			view: 'erreur_404'
		});

	});

	// Block mobile
	crossroads.addRoute( '/block_mobile' , function(){

		self._onNavigate.dispatch({
			view: 'block_mobile'
		});

	});


};

// Navigate
Router.prototype.navigate = function( href ) {
	
	History.pushState(null, null, href);

};

// Get token from History hash
Router.prototype.getToken = function() {
	
	var token = History.getState().hash;

	if ( token.indexOf('?') != -1 ){

		var tokenSplit = token.split('?');
		return tokenSplit[0];

	} else {

		return token;

	}

};