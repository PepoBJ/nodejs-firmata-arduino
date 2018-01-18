'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const publicDir = express.static(`${__dirname}/public`);
const interfaceWifi = 'Wi-Fi'; // wlan0
const localip = require('local-ip')(interfaceWifi);
const five = require('johnny-five');
const portAndroid = 'COM3';
const pinLeds = {
	rojo : 8,
	azul : 9,
	verde : 10
};

app
	.use(publicDir)
	.get('/', (req, res) => {
		res.sendFile(`${publicDir}/index.html`);
	});

http.listen(port, () => console.log('Servidor iniciado en http://%s:%d', localip, port));

const board = new five.Board({
	repl: false,
	port: portAndroid
});
 
board.on('ready', () => {
	let speed = 1000;
	let blink = true;

    const leds = new five.Leds([pinLeds.rojo, pinLeds.azul, pinLeds.verde]);
  
	leds.blink(speed); 
     
    io.on('connection', (socket) => {
        socket.on('turn', (led) => {
			leds[led.color].stop();

			if(led.turn === "on" && blink)
			{
				leds[led.color].blink(speed);
			}
			else if(led.turn === "on" && !blink)
			{
				leds[led.color].on();
			}
			else
			{
				leds[led.color].off();
			}
			
			io.emit('turn_change', led);

			console.log('Turn recivied => ', led);
		});

		socket.on('blink_pulse', (type) => {
			leds.stop();

			if(type === "blink")
			{
				blink = true;			
				
				leds.blink(speed);
			}
			else
			{
				blink = false;

				leds.on();
			}
			
			io.emit('turn_type_change', type);

			console.log('Turn type recivied => ', type);
		});
 
    });
});