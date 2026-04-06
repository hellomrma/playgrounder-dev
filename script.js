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
    const particleCount = 18;               // Number of particles
    const connectionDistance = 200;         // Maximum distance for connecting lines (in pixels)

    // Particle size settings
    const particleSizeMin = 2;              // Minimum particle radius
    const particleSizeMax = 6;             // Maximum particle radius
    const pulseAmplitude = 0.8;             // How much particles pulse (size variation)

    // Particle movement settings
    const particleSpeed = 0.25;             // Particle movement speed multiplier
    const pulseSpeedMin = 0.008;            // Minimum pulse animation speed
    const pulseSpeedMax = 0.022;            // Maximum pulse animation speed

    // ============================================
    // COLOR SETTINGS — Mint green palette to match accent
    // ============================================

    // Particle colors (RGB values: 0-255)
    const PARTICLE_COLOR_R = 0;
    const PARTICLE_COLOR_G = 210;
    const PARTICLE_COLOR_B = 100;

    // Particle glow opacity values
    const PARTICLE_GLOW_OPACITY_CENTER = 0.12;   // Center glow opacity
    const PARTICLE_GLOW_OPACITY_MID = 0.04;      // Middle glow opacity
    const PARTICLE_CORE_OPACITY = 0.22;           // Core particle opacity

    // Connection line colors (RGB values: 0-255)
    const LINE_COLOR_R = 0;
    const LINE_COLOR_G = 190;
    const LINE_COLOR_B = 90;

    // Connection line opacity settings
    const LINE_OPACITY_MULTIPLIER = 0.3;    // Base opacity multiplier for lines
    const LINE_WIDTH_MIN = 0.2;             // Minimum line width
    const LINE_WIDTH_MAX = 1.2;             // Maximum line width

    // ============================================
    // PARTICLE CLASS
    // ============================================

    /**
     * Particle class representing individual animated particles
     */
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * particleSpeed;
            this.vy = (Math.random() - 0.5) * particleSpeed;
            this.radius = Math.random() * (particleSizeMax - particleSizeMin) + particleSizeMin;
            this.baseRadius = this.radius;
            this.pulseSpeed = Math.random() * (pulseSpeedMax - pulseSpeedMin) + pulseSpeedMin;
            this.pulsePhase = Math.random() * Math.PI * 2;
        }

        /**
         * Update particle position and animation
         */
        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));

            this.pulsePhase += this.pulseSpeed;
            this.radius = this.baseRadius + Math.sin(this.pulsePhase) * pulseAmplitude;
        }

        /**
         * Draw the particle with glow effect
         */
        draw() {
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius * 2.5
            );

            gradient.addColorStop(0, `rgba(${PARTICLE_COLOR_R}, ${PARTICLE_COLOR_G}, ${PARTICLE_COLOR_B}, ${PARTICLE_GLOW_OPACITY_CENTER})`);
            gradient.addColorStop(0.5, `rgba(${PARTICLE_COLOR_R}, ${PARTICLE_COLOR_G}, ${PARTICLE_COLOR_B}, ${PARTICLE_GLOW_OPACITY_MID})`);
            gradient.addColorStop(1, `rgba(${PARTICLE_COLOR_R}, ${PARTICLE_COLOR_G}, ${PARTICLE_COLOR_B}, 0)`);

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

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
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * LINE_OPACITY_MULTIPLIER;
                    const lineWidth = (1 - distance / connectionDistance) * (LINE_WIDTH_MAX - LINE_WIDTH_MIN) + LINE_WIDTH_MIN;

                    const gradient = ctx.createLinearGradient(
                        particles[i].x, particles[i].y,
                        particles[j].x, particles[j].y
                    );

                    gradient.addColorStop(0, `rgba(${LINE_COLOR_R}, ${LINE_COLOR_G}, ${LINE_COLOR_B}, ${opacity})`);
                    gradient.addColorStop(1, `rgba(${LINE_COLOR_R}, ${LINE_COLOR_G}, ${LINE_COLOR_B}, ${opacity * 0.5})`);

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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawConnections();
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();
})();

/**
 * Cursor glow — follows mouse position with subtle lag
 */
(function() {
    const cursorGlow = document.querySelector('.cursor-glow');
    if (!cursorGlow) return;

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Hide on mouse leave, show on enter
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '1';
    });
})();
