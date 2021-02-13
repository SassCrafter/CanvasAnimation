const canvas = document.getElementById('canvas-1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const mouse = {
	x: null,
	y: null,
}



class Particle {
	constructor(color) {
		this.color = color;
		// this.x = mouse.x;
		// this.y = mouse.y;
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.size = Math.floor(Math.random() * 21);
		this.speedX = Math.random() * 3 - 1.5;
		this.speedY = Math.random() * 3 - 1.5;
	}

	update() {
		this.x += this.speedX;
		this.y += this.speedY;
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}


const handleParticles = () => {
	particlesArray.forEach(particle => {
		particle.update();
		particle.draw();
	})
}


const init = () => {
	for (let i = 0; i < 100; i++) {
		particlesArray.push(new Particle('steelblue'));
	}
}




const drawCircle = (x, y, r, bgColor) => {
	ctx.fillStyle = bgColor;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2);
	ctx.fill();
}


const animate = () => {
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgba(0,0,0, 0.02)';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	handleParticles();
	requestAnimationFrame(animate);
};





window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

canvas.addEventListener('mousemove', (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
});


canvas.addEventListener('click', (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
});

init();
animate();