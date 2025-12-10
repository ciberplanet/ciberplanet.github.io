// ==========================================
// CIBER PLANET - JavaScript
// ==========================================

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 2000);
});

// Create Stars (100 stars)
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        starsContainer.appendChild(star);
    }
}
createStars();

// Matrix Rain Effect
const canvas = document.getElementById('matrix');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00f5ff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 50);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Create Floating Pixels (30 pixels)
function createPixels() {
    const container = document.getElementById('pixelContainer');
    if (!container) return;
    
    const colors = ['#00f5ff', '#ff00ff', '#bf00ff', '#39ff14', '#ff6ec7'];
    
    for (let i = 0; i < 30; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.style.left = Math.random() * 100 + '%';
        pixel.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        pixel.style.animationDelay = Math.random() * 15 + 's';
        pixel.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(pixel);
    }
}
createPixels();

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Reveal on Scroll
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal();

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}
animateCounters();

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroLogo = document.querySelector('.hero-logo');
    
    if (heroLogo && scrolled < window.innerHeight) {
        heroLogo.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        let hue = 0;
        const rainbow = setInterval(() => {
            document.documentElement.style.setProperty('--neon-cyan', `hsl(${hue}, 100%, 50%)`);
            document.documentElement.style.setProperty('--neon-magenta', `hsl(${hue + 60}, 100%, 50%)`);
            document.documentElement.style.setProperty('--neon-purple', `hsl(${hue + 120}, 100%, 50%)`);
            document.documentElement.style.setProperty('--neon-green', `hsl(${hue + 180}, 100%, 50%)`);
            hue = (hue + 5) % 360;
        }, 100);
        
        setTimeout(() => {
            clearInterval(rainbow);
            document.documentElement.style.setProperty('--neon-cyan', '#00f5ff');
            document.documentElement.style.setProperty('--neon-magenta', '#ff00ff');
            document.documentElement.style.setProperty('--neon-purple', '#bf00ff');
            document.documentElement.style.setProperty('--neon-green', '#39ff14');
        }, 10000);
        
        alert('🎮 ¡MODO ARCOÍRIS ACTIVADO! 🌈');
    }
});

// Mouse trail effect
const trailContainer = document.createElement('div');
trailContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9997;';
document.body.appendChild(trailContainer);

let lastTrailTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime > 30) {
        lastTrailTime = now;
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: linear-gradient(135deg, #00f5ff, #ff00ff);
            border-radius: 50%;
            left: ${e.clientX - 5}px;
            top: ${e.clientY - 5}px;
            pointer-events: none;
            animation: trailFade 0.5s ease forwards;
        `;
        trailContainer.appendChild(trail);
        setTimeout(() => trail.remove(), 500);
    }
});

// Add trail fade animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        0% { transform: scale(1); opacity: 0.8; }
        100% { transform: scale(0); opacity: 0; }
    }
`;
document.head.appendChild(trailStyle);

// Typing effect for loading text
const loadingTexts = ['INICIANDO SISTEMA...', 'CARGANDO MÓDULOS...', 'CONECTANDO...', 'CASI LISTO...'];
let textIndex = 0;
const loadingText = document.querySelector('.loading-text');

const changeLoadingText = setInterval(() => {
    if (loadingText && textIndex < loadingTexts.length - 1) {
        textIndex++;
        loadingText.textContent = loadingTexts[textIndex];
    } else {
        clearInterval(changeLoadingText);
    }
}, 500);

// Console Easter Egg
console.log('%c🎮 CIBER PLANET 🎮', 'font-size: 30px; color: #00f5ff; text-shadow: 0 0 10px #00f5ff; background: #0a0a0f; padding: 10px;');
console.log('%c¿Encontraste el código secreto? ↑↑↓↓←→←→BA', 'font-size: 14px; color: #ff00ff;');
