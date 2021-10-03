/*
 * ASCII Camera
 * http://idevelop.github.com/ascii-camera/
 *
 * Copyright 2013, Andrei Gheorghe (http://github.com/idevelop)
 * Released under the MIT license
 */


function start() {


// (function() {
	var asciiContainer = document.getElementById("ascii");
	var capturing = false;

	camera.init({
		width: 160,
		height: 120,
		fps: 30,
		mirror: true,

		onFrame: function(canvas) {

			var contrast = document.getElementById('contrast').value;

			ascii.fromCanvas(canvas, {
				// contrast: 128,
				contrast: contrast,
				callback: function(asciiString) {
					asciiContainer.innerHTML = asciiString;
				}
			});
		},

		onSuccess: function() {
			document.getElementById("info").style.display = "none";

			setTimeout(() => {
				camera.start();
				capturing = true;
				document.getElementById("buttonStart").style.display = "none";
			}, 1000)

			const button = document.getElementById("buttonPause");
			button.style.display = "block";
			button.onclick = function() {
				if (capturing) {
					camera.pause();
					button.innerText = 'Resume';
				} else {
					camera.start();
					button.innerText = 'Pause';
				}
				capturing = !capturing;
			};
		},

		onError: function(error) {
			// TODO: log error
		},

		onNotSupported: function() {
			document.getElementById("info").style.display = "none";
			asciiContainer.style.display = "none";
			document.getElementById("notSupported").style.display = "block";
		}
	});
// })();
}
