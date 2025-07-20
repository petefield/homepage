// script.js
// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Image hover effects
document.querySelectorAll('.post-image, .post-card-image').forEach(imageContainer => {
    const img = imageContainer.querySelector('img');
    if (img) {
        imageContainer.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
        });
        imageContainer.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    }
});