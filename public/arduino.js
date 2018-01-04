(function (d, io) {
	'use strict';

	var io = io();
	var leds = d.querySelectorAll('.led');
	var buttons_turn = d.querySelectorAll('.type_turn');

	leds.forEach(function(element, index){
		element.addEventListener('click', function(e){
			if(element.dataset.turn === "on")
			{
				element.dataset.turn = "off";

				element.classList.remove(element.dataset.on);
				element.classList.add(element.dataset.off);
			}
			else
			{
				element.dataset.turn = "on";

				element.classList.remove(element.dataset.off);
				element.classList.add(element.dataset.on);
			}
			
			io.emit('turn', element.dataset);

			console.table(element.dataset);
		});
	});

	buttons_turn.forEach(function(element, index){		
		element.addEventListener('click', function() {

			buttons_turn.forEach(function(element, index){
				element.classList.remove('activated');
			});

			element.classList.add('activated');
			
			io.emit('blink_pulse', element.dataset.type);
			
			leds.forEach(function(element, index){
				element.dataset.turn = "on";

				element.classList.remove(element.dataset.off);
				element.classList.add(element.dataset.on);
			});

			console.table(element.dataset);
		});
	});

})(document, io);