/* Based heavily on dwmkerr's starfield
 * Generate a basic starfield (with stationary stars)
 * Have the stars appear (having one of a preset number of colors)
 * for a set period of time, then disappear
 */

/* The Starfield Class
 * Utilize The ES6 Way Of Doing CLasses
 * It seems like an easier way
 */

 /* TODO:
  * Modify the existing code to be more like what I want (see above)
  */

class BackgroundStarfield {
	constructor() {
		this.fps = 30;
		this.canvas = null;
		this.width = 0;
		this.height = 0;
		this.minimumVelocity = 15;
		this.maximumVelocity = 30;
		this.stars = 100;
		this.interval = 0;
	}

	init(div) {
		var self = this;
		this.containerDiv = div;
		self.width = window.innerWidth;
		self.height = window.innerHeight;
		window.addEventListener('resize', function resize(event) {
			self.width = window.innerWidth;
			self.height = window.innerHeight;
			self.canvas.width = self.width;
			self.canvas.height = self.height;
			self.draw();
		});

		//	Create the canvas.
		var canvas = document.createElement('canvas');
		div.appendChild(canvas);
		this.canvas = canvas;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}

	begin() {
		//	Create the stars.
		var stars = [];
		for (var i = 0; i < this.stars; i++) {
			stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*3+1,
		 		(Math.random()*(this.maximumVelocity - this.minimumVelocity))+this.minimumVelocity);
		}
		this.stars = stars;

		var self = this;
		//	Start the timer.
		this.interval = setInterval(function() {
			self.update();
			self.draw();	
		}, 1000 / this.fps);
	}

	end() {
		clearInterval(this.interval);
	}

	update() {
		var dt = 1 / this.fps;

		for(var i = 0; i < this.stars.length; i++) {
			var star = this.stars[i];
			star.y += dt * star.velocity;
			//	If the star has moved from the bottom of the screen, spawn it at the top.
			if (star.y > this.height) {
				this.stars[i] = new Star(Math.random() * this.width, 0, Math.random() * 3 + 1, 
				(Math.random() * (this.maximumVelocity - this.minimumVelocity)) + this.minimumVelocity);
			}
		}
	}

	draw() {
		//	Get the drawing context.
		var context = this.canvas.getContext("2d");

		//	Draw the background.
		// 	Now it looks like a snowfield...I like it!
	 	context.fillStyle = '#e3e3e3';
		context.fillRect(0, 0, this.width, this.height);

		//	Draw  the stars.
		context.fillStyle = '#ffffff';
		for(var i = 0; i < this.stars.length; i++) {
			var star = this.stars[i];
			context.fillRect(star.x, star.y, star.size, star.size);
		}
	}

}

class Star {
	constructor(x, y, size, velocity) {
		this.x = x;
		this.y = y; 
		this.size = size;
		this.velocity = velocity;
	}
}

