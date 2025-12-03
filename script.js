/**
 * Canvas Background Particle Animation
 * Creates animated particles with connecting lines for background effect
 */
(function() {
    // Canvas setup
    const canvas = document.getElementById('canvas-background');
    const ctx = canvas.getContext('2d');
    
    /**
     * Resize canvas to match window size
     */
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // ============================================
    // CONFIGURATION - Adjust these values to customize the effect
    // ============================================
    
    // Particle system settings
    const particles = [];
    const particleCount = 24;              // Number of particles (increase for more, decrease for less)
    const connectionDistance = 200;        // Maximum distance for connecting lines (in pixels)
    
    // Particle size settings
    const particleSizeMin = 3;             // Minimum particle radius
    const particleSizeMax = 8;            // Maximum particle radius (6 + 8)
    const pulseAmplitude = 1;               // How much particles pulse (size variation)
    
    // Particle movement settings
    const particleSpeed = 0.3;              // Particle movement speed multiplier
    const pulseSpeedMin = 0.01;             // Minimum pulse animation speed
    const pulseSpeedMax = 0.03;             // Maximum pulse animation speed (0.01 + 0.02)
    
    // ============================================
    // COLOR SETTINGS - Modify these RGB values to change colors
    // ============================================
    
    // Particle colors (RGB values: 0-255, Alpha: 0.0-1.0)
    const PARTICLE_COLOR_R = 120;           // Particle red value (0-255)
    const PARTICLE_COLOR_G = 120;           // Particle green value (0-255)
    const PARTICLE_COLOR_B = 120;           // Particle blue value (0-255)
    
    // Particle glow opacity values
    const PARTICLE_GLOW_OPACITY_CENTER = 0.3;   // Center glow opacity (0.0-1.0)
    const PARTICLE_GLOW_OPACITY_MID = 0.12;     // Middle glow opacity (0.0-1.0)
    const PARTICLE_CORE_OPACITY = 0.5;          // Core particle opacity (0.0-1.0)
    
    // Connection line colors (RGB values: 0-255)
    const LINE_COLOR_R = 220;               // Line red value (0-255)
    const LINE_COLOR_G = 220;               // Line green value (0-255)
    const LINE_COLOR_B = 220;               // Line blue value (0-255)
    
    // Connection line opacity settings
    const LINE_OPACITY_MULTIPLIER = 0.8;   // Base opacity multiplier for lines (0.0-1.0)
    const LINE_WIDTH_MIN = 0.3;              // Minimum line width
    const LINE_WIDTH_MAX = 1.8;              // Maximum line width (0.3 + 1.5)
    
    // ============================================
    // PARTICLE CLASS
    // ============================================
    
    /**
     * Particle class representing individual animated particles
     */
    class Particle {
        constructor() {
            // Random starting position
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            
            // Random velocity (movement direction and speed)
            this.vx = (Math.random() - 0.5) * particleSpeed;
            this.vy = (Math.random() - 0.5) * particleSpeed;
            
            // Random size with pulsing effect
            this.radius = Math.random() * (particleSizeMax - particleSizeMin) + particleSizeMin;
            this.baseRadius = this.radius;
            
            // Pulsing animation settings
            this.pulseSpeed = Math.random() * (pulseSpeedMax - pulseSpeedMin) + pulseSpeedMin;
            this.pulsePhase = Math.random() * Math.PI * 2;
        }
        
        /**
         * Update particle position and animation
         */
        update() {
            // Move particle
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Keep particle within bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
            
            // Pulsing effect - makes particles grow and shrink
            this.pulsePhase += this.pulseSpeed;
            this.radius = this.baseRadius + Math.sin(this.pulsePhase) * pulseAmplitude;
        }
        
        /**
         * Draw the particle with glow effect
         */
        draw() {
            // Create radial gradient for outer glow effect
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius * 2
            );
            
            // Glow gradient stops - modify colors here
            gradient.addColorStop(0, `rgba(${PARTICLE_COLOR_R}, ${PARTICLE_COLOR_G}, ${PARTICLE_COLOR_B}, ${PARTICLE_GLOW_OPACITY_CENTER})`);
            gradient.addColorStop(0.5, `rgba(${PARTICLE_COLOR_R}, ${PARTICLE_COLOR_G}, ${PARTICLE_COLOR_B}, ${PARTICLE_GLOW_OPACITY_MID})`);
            gradient.addColorStop(1, `rgba(${PARTICLE_COLOR_R}, ${PARTICLE_COLOR_G}, ${PARTICLE_COLOR_B}, 0)`);
            
            // Draw outer glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Draw core particle - modify color here
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${PARTICLE_COLOR_R}, ${PARTICLE_COLOR_G}, ${PARTICLE_COLOR_B}, ${PARTICLE_CORE_OPACITY})`;
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    /**
     * Draw connecting lines between nearby particles
     */
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                // Calculate distance between particles
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Draw line if particles are close enough
                if (distance < connectionDistance) {
                    // Opacity decreases with distance
                    const opacity = (1 - distance / connectionDistance) * LINE_OPACITY_MULTIPLIER;
                    // Line width decreases with distance
                    const lineWidth = (1 - distance / connectionDistance) * (LINE_WIDTH_MAX - LINE_WIDTH_MIN) + LINE_WIDTH_MIN;
                    
                    // Create gradient line for smooth appearance
                    const gradient = ctx.createLinearGradient(
                        particles[i].x, particles[i].y,
                        particles[j].x, particles[j].y
                    );
                    
                    // Line gradient stops - modify colors here
                    gradient.addColorStop(0, `rgba(${LINE_COLOR_R}, ${LINE_COLOR_G}, ${LINE_COLOR_B}, ${opacity})`);
                    gradient.addColorStop(1, `rgba(${LINE_COLOR_R}, ${LINE_COLOR_G}, ${LINE_COLOR_B}, ${opacity * 0.5})`);
                    
                    // Draw the connection line
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = lineWidth;
                    ctx.stroke();
                }
            }
        }
    }
    
    /**
     * Main animation loop
     */
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections first (behind particles)
        drawConnections();
        
        // Draw particles on top
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Continue animation
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
})();

