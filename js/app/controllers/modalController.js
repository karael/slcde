// Modal controller
var ModalController = function(){

    this.modalDatas = {};

    this.nextModal = null;

    //nextModal
    this._nextModal = new signals.Signal();

    this.init();

};

// Initilize modal controller
ModalController.prototype.init = function(){

    // Bind event
    this.bind();

    // Set event datas
    this.setDatas();
};

// Bind modal controller events
ModalController.prototype.bind = function(){

    // Listen playerController onVideoUpdate
    app.viewController.views.experience.playerController._onVideoUpdate.add(this.onVideoUpdate, this);

};

// Set modalDatas
ModalController.prototype.setDatas = function(){

    // Keep context
    var self = this;

    // Get assets
    var requete = $.ajax({
        url: 'assets/json/modals.json',
        dataType: 'json',
        type: 'GET',
        async: false,
        success: function(data) {
            self.modalDatas = data;
        }
    });
};

// Dispatch table of next modals events
ModalController.prototype.getNextAlert = function(videoPercent){
    var tableOfAlert = [];

    $.each(this.modalDatas, function(key, val){
        var eventInterval = val.id - videoPercent;
        // Set table of alerts
        if (eventInterval >= 0 && eventInterval <= 3) {
            tableOfAlert[tableOfAlert.length] = {
                "id" : val.id,
                "player" :  val.player,
                "top" : val.position.x,
                "left" : val.position.y,
                "titre" : val.titre,
                "texte" : val.texte
            };
        }
    });

    //Dispatch event
    this._nextModal.dispatch( tableOfAlert );
};


// Get event from player
ModalController.prototype.onVideoUpdate = function(videoPercent) {
    this.getNextAlert(videoPercent);
};



