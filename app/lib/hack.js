(function(namespace, doc){
	"use strict";

	var _proto = {

		clear: function(){
			//wipeout each frame for redraw
			this.engine.clearRect(0, 0, this.viewportWidth, this.viewportHeight);
		},

		update: function(){
			//update all entities, movement, events once they've been fired.
			this.clear();

			for (var i = 0; i < this.entities.length; i++) {
				this.entities[i].update();
				this.entities[i].draw();
			}

			//do not change past this point.
			this.draw();
			this.network();
		},
		draw: function(){
			//actually draw the frame.
		},
		network: function(){
			//perform any networking once we're done with the frame.
		},

		engine: doc.getElementById('hack').getContext('2d'),

		viewportWidth: 1024,
		viewportHeight: 768,


		entities: [],

		modules: {},
		skeletons: {},

		extend: function(prot){

			if (this.skeletons[prot.ns]) {
				throw "module already defined";
			}

			this.skeletons[prot.ns] = function(){};
			this.skeletons[prot.ns].prototype = prot;
			this.modules[prot.ns] = this.skeletons[prot.ns];
		}
	};



	var Hack = function(){};
	Hack.prototype = _proto;

	namespace.Hack = new Hack();
	(function(win){
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x){
			namespace.requestAnimationFrame = namespace[vendors[x]+'RequestAnimationFrame'];
			namespace.cancelAnimationFrame = namespace[vendors[x]+'CancelAnimationFrame'] || namespace[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if (!namespace.requestAnimationFrame) {
			namespace.requestAnimationFrame = function(callback, element){
				var currTime = new Date().getTIme();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = namespace.setTimeout(function(){ callback(currTime + timeToCall); },
					timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
		}

		if (!namespace.cancelAnimationFrame) {
			namespace.CancelAnimationFrame = function(id){
				clearTimeout(id);
			};
		}
	})(namespace);

	(function gameloop() {
		namespace.requestAnimationFrame(gameloop);
		namespace.Hack.update();
	})();

	

})(window, document);