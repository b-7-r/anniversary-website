// Password Protection
const PASSWORD = '13/11/2025';
const SESSION_KEY = 'anniversaryAccess';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const passwordForm = document.getElementById('passwordForm');
const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const submitBtn = passwordForm.querySelector('.submit-btn');

// Check if already authenticated
function checkAccess() {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
        const sessionTime = JSON.parse(session).timestamp;
        const now = Date.now();
        
        if (now - sessionTime < SESSION_DURATION) {
            redirectToMain();
        } else {
            localStorage.removeItem(SESSION_KEY);
        }
    }
}

// Toggle password visibility
togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    const icon = togglePassword.querySelector('.toggle-icon');
    icon.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

// Handle form submission
passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = passwordInput.value.trim();
    
    if (input === PASSWORD) {
        authenticateUser();
    } else {
        showError('❌ Incorrect password. Try again!');
        shakeInput();
        passwordInput.value = '';
    }
});

// Authenticate user
function authenticateUser() {
    // Store session
    localStorage.setItem(SESSION_KEY, JSON.stringify({
        authenticated: true,
        timestamp: Date.now()
    }));
    
    // Show success message
    passwordForm.style.display = 'none';
    successMessage.classList.add('show');
    errorMessage.classList.remove('show');
    errorMessage.innerHTML = '';
    
    // Redirect after 2 seconds
    setTimeout(() => {
        redirectToMain();
    }, 2000);
}

// Show error message
function showError(message) {
    errorMessage.innerHTML = message;
    errorMessage.classList.add('show');
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 3000);
}

// Shake input animation
function shakeInput() {
    const inputWrapper = document.querySelector('.input-wrapper');
    inputWrapper.style.animation = 'none';
    setTimeout(() => {
        inputWrapper.style.animation = 'shake 0.5s ease-in-out';
    }, 10);
}

// Redirect to main page
function redirectToMain() {
    window.location.href = 'index.html';
}

// Enter key support
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        passwordForm.dispatchEvent(new Event('submit'));
    }
});

// Focus on input on load
window.addEventListener('DOMContentLoaded', () => {
    checkAccess();
    passwordInput.focus();
    
    // Add animation to particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        particle.style.animationDelay = (index * 0.5) + 's';
    });
});

// Prevent back button after authentication
window.addEventListener('beforeunload', () => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
        history.pushState(null, null, window.location.href);
    }
});

// Handle back button
window.addEventListener('popstate', () => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
        history.pushState(null, null, window.location.href);
    }
});

// Lock focus on password input when page loads
passwordInput.addEventListener('blur', () => {
    setTimeout(() => passwordInput.focus(), 100);
});

console.log('🔐 Password Protection Active');
console.log('Password format: DD/MM/YYYY');
console.log('Example: 13/11/2025');
