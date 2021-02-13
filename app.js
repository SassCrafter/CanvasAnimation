const canvas = document.getElementById('canvas-1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const mouse = {
	x: null,
	y: null,
}

let hue = 0;



class Particle {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;
		this.size = Math.floor(Math.random() * 10);
		this.speedX = Math.random() * 5 - 2.5;
		this.speedY = Math.random() * 5 - 2.5;
		this.color = `hsl(${hue}, 100%, 50%)`;
	}

	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.size > 0.3) this.size -= 0.1;
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}


const handleParticles = () => {
	for (let i = 0; i < particlesArray.length; i++) {
		particlesArray[i].update();
		particlesArray[i].draw();
		if (particlesArray[i].size <= 0.5) {
			particlesArray.splice(i, 1);
			i--;
		}
	}
}




const drawCircle = (x, y, r, bgColor) => {
	ctx.fillStyle = bgColor;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2);
	ctx.fill();
}


const animate = () => {
	//	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgba(0,0,0, 0.02)';
	ctx.fillRect(0,0,canvas.width, canvas.height);
	handleParticles();
	hue += 5;
	requestAnimationFrame(animate);
};





window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

canvas.addEventListener('mousemove', (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
	for (let i = 0; i < 10; i++) {
		particlesArray.push(new Particle());
	}
});


canvas.addEventListener('click', (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
	for (let i = 0; i < 500; i++) {
		particlesArray.push(new Particle());
	}
});

// init();
animate();