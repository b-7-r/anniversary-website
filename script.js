// Audio Management
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');

let isPlaying = false;

// Load music preference from localStorage
function initMusic() {
    const savedPreference = localStorage.getItem('musicPlaying');
    if (savedPreference === null) {
        playMusic();
    } else if (savedPreference === 'true') {
        playMusic();
    } else {
        pauseMusic();
    }
}

function playMusic() {
    backgroundMusic.volume = 0.3;
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

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

window.addEventListener('beforeunload', () => {
    localStorage.setItem('musicPlaying', isPlaying.toString());
});

// Lightbox Gallery
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentImageIndex = 0;

const imageData = [
    { title: 'Our Beginning', description: 'Where it all started' },
    { title: 'Special Moments', description: 'Just us two' },
    { title: 'Forever With You', description: 'Promising forever' },
    { title: 'Always & Forever', description: 'Our love story' },
    { title: 'Smile Together', description: 'Your smile makes me happy' },
    { title: 'Perfect Day', description: 'With you is perfect' },
    { title: 'Our Love', description: 'Forever & Always' }
];

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(index);
    });
});

function openLightbox(index) {
    const image = galleryItems[index].querySelector('.gallery-image');
    lightboxImage.src = image.src;
    lightboxCaption.innerHTML = `<h3>${imageData[index].title}</h3><p>${imageData[index].description}</p>`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

lightboxPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentImageIndex);
});

lightboxNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    openLightbox(currentImageIndex);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') lightboxPrev.click();
        if (e.key === 'ArrowRight') lightboxNext.click();
        if (e.key === 'Escape') closeLightbox();
    }
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

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    initMusic();
    updateCounter();
});

setInterval(updateCounter, 1000 * 60 * 60 * 24);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});