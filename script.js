// Audio Management
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');

let isPlaying = false;

// Load music preference from localStorage
function initMusic() {
    const savedPreference = localStorage.getItem('musicPlaying');
    if (savedPreference === null) {
        // First time, set to playing
        playMusic();
    } else if (savedPreference === 'true') {
        playMusic();
    } else {
        pauseMusic();
    }
}

function playMusic() {
    backgroundMusic.volume = 0.3; // Set volume to 30% for gentle background
    backgroundMusic.play().catch(err => {
        console.log('Autoplay prevented:', err);
    });
    isPlaying = true;
    musicToggle.classList.add('playing');
    musicToggle.classList.remove('muted');
    localStorage.setItem('musicPlaying', 'true');
}

function pauseMusic() {
    backgroundMusic.pause();
    isPlaying = false;
    musicToggle.classList.remove('playing');
    musicToggle.classList.add('muted');
    localStorage.setItem('musicPlaying', 'false');
}

// Toggle music on button click
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

// Persist music state across page navigation
window.addEventListener('beforeunload', () => {
    localStorage.setItem('musicPlaying', isPlaying.toString());
});

// Initialize music when page loads
window.addEventListener('DOMContentLoaded', () => {
    initMusic();
    updateCounter();
});

// Calculate days together
function updateCounter() {
    const startDate = new Date('2025-08-22').getTime();
    const today = new Date().getTime();
    const difference = today - startDate;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const daysElement = document.getElementById('days');
    
    if (daysElement) {
        daysElement.textContent = days >= 0 ? days : 0;
    }
}

// Update counter every day
setInterval(updateCounter, 1000 * 60 * 60 * 24);

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add click animation to cards
document.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('click', function () {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});