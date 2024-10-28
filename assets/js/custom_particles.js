const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numParticles = 280; 
const connectionDistance = 135; 
const maxConnections = 6; 

// Create particle object
function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 0.4 + 1; 
    this.speedX = Math.random() * 3 - 1; 
    this.speedY = Math.random() * 3 - 1; 
    this.connections = []; 
}

// Initialize particles
for (let i = 0; i < numParticles; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    particles.push(new Particle(x, y));
}

// Draw particles and connecting lines with smooth transition
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'; 
        ctx.fill();

        // Reset connections for the current frame
        particle.connections = [];
        let connections = 0; 

        // Create connections with nearby particles
        for (let j = 0; j < particles.length; j++) {
            if (i !== j) {
                const otherParticle = particles[j];
                const distance = Math.hypot(particle.x - otherParticle.x, particle.y - otherParticle.y);

                // Calculate the opacity based on the distance (closer = more opaque)
                let opacity = 1 - distance / connectionDistance;

                // Connect if within distance and max connections not reached
                if (distance < connectionDistance && connections < maxConnections) {
                    // Apply a soft fade transition for connection lines
                    if (opacity < 0) opacity = 0;

                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.6})`; 
                    ctx.lineWidth = .4;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();

                    connections++; 
                    particle.connections.push(otherParticle); 
                }
            }
        }

        // Ensure at least two connections
        while (connections < 4) {
            let nearestParticle = null;
            let nearestDistance = Infinity;

            // Find the nearest particle to connect
            for (let j = 0; j < particles.length; j++) {
                if (i !== j && !particle.connections.includes(particles[j])) {
                    const otherParticle = particles[j];
                    const distance = Math.hypot(particle.x - otherParticle.x, particle.y - otherParticle.y);

                    if (distance < nearestDistance) {
                        nearestDistance = distance;
                        nearestParticle = otherParticle;
                    }
                }
            }

            // Draw line to the nearest particle
            if (nearestParticle && connections < maxConnections) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'; // Line color with default opacity
                ctx.lineWidth = .5;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(nearestParticle.x, nearestParticle.y);
                ctx.stroke();

                connections++;
                particle.connections.push(nearestParticle); // Add to connections
            } else {
                break; // Exit if no more connections can be made
            }
        }

        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
    }

    requestAnimationFrame(animate);
}

animate();