// ============================================================
// Theme Management
// ============================================================

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function getSystemTheme() {
    return prefersDark.matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    const resolved = theme === 'system' ? getSystemTheme() : theme;
    document.documentElement.setAttribute('data-theme', resolved);
}

function setTheme(theme) {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}

// Initialize on load
const savedTheme = localStorage.getItem('theme') || 'system';
setTheme(savedTheme);

// Button listeners
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => setTheme(btn.dataset.theme));
});

// Respond to OS-level theme changes
prefersDark.addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'system') {
        applyTheme('system');
    }
});


// ============================================================
// Active Nav Link on Scroll
// ============================================================

const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.section === id);
            });
        }
    });
}, {
    rootMargin: '-15% 0px -75% 0px',
    threshold: 0
});

sections.forEach(s => sectionObserver.observe(s));


// ============================================================
// Headshot — show image if it loads, fallback to placeholder
// ============================================================

const headshotImg   = document.getElementById('headshot');
const headshotPlaceholder = document.getElementById('headshot-placeholder');

if (headshotImg) {
    function showPhoto() {
        headshotPlaceholder.style.display = 'none';
        headshotImg.style.display = 'block';
    }
    function showPlaceholder() {
        headshotImg.style.display = 'none';
        headshotPlaceholder.style.display = 'flex';
    }

    headshotImg.addEventListener('load',  showPhoto);
    headshotImg.addEventListener('error', showPlaceholder);

    // Handle already-cached images
    if (headshotImg.complete) {
        headshotImg.naturalWidth > 0 ? showPhoto() : showPlaceholder();
    }
}
