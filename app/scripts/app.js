/*global Hack*/

(function(ns){
"use strict";

	var Player = {
		draw: function(){
			Hack.engine.fillStyle = this.color;
			Hack.engine.fillRect(this.x, this.y, 128, 128);
		},
		update: function(){
			if (Number(new Date()) % 2) {
				this.x += 2;
			} else {
				this.x -= 2;

			}
		},

		x: 110, y:100, color: "#ff0000",

		name: 'thock',
		ns: 'Player'
	};

	ns.extend(Player);
	ns.entities.push(new ns.modules.Player());

})(Hack);