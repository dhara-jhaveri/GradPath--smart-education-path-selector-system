// DOM Elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const openMenuBtn = document.getElementById('openMenu');
const closeMenuBtn = document.getElementById('closeMenu');
const animatedElements = document.querySelectorAll('.animate-on-scroll');
const contactForm = document.querySelector('.contact-form');

// Navigation Menu Toggle
openMenuBtn.addEventListener('click', () => {
    navLinks.classList.add('active');
});

closeMenuBtn.addEventListener('click', () => {
    navLinks.classList.remove('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Animation
function checkScroll() {
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            const delay = element.getAttribute('data-delay') || 0;
            setTimeout(() => {
                element.classList.add('show');
            }, delay);
        }
    });
}

// Initial check for elements in view
window.addEventListener('load', checkScroll);
window.addEventListener('scroll', checkScroll);

// Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call with timeout
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Image Upload Functionality (Placeholder for future implementation)
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const openMenuBtn = document.getElementById('openMenu');
    const closeMenuBtn = document.getElementById('closeMenu');
    const navLinks = document.querySelector('.nav-links');
    
    if (openMenuBtn && closeMenuBtn && navLinks) {
        openMenuBtn.addEventListener('click', function() {
            navLinks.classList.add('active');
        });
        
        closeMenuBtn.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    }
    
    // Add placeholder images if sources are empty or invalid
    const visionImg = document.getElementById('vision-img');
    const missionImg = document.getElementById('mission-img');
    
    // Function to handle image loading errors
    function handleImageError(img, placeholderText) {
        img.onerror = function() {
            this.src = `https://via.placeholder.com/600x400?text=${placeholderText.replace(' ', '+')}`;
            this.onerror = null; // Prevent infinite loop if placeholder also fails
        };
        
        // If src is empty or just a hash/fragment
        if (!img.src || img.src === window.location.href || img.src.endsWith('#')) {
            img.src = `https://via.placeholder.com/600x400?text=${placeholderText.replace(' ', '+')}`;
        }
    }
    
    if (visionImg) {
        handleImageError(visionImg, 'Our Vision');
    }
    
    if (missionImg) {
        handleImageError(missionImg, 'Our Mission');
    }
    
    // Scroll animation
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                const delay = element.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    element.classList.add('active');
                }, delay);
            }
        });
    }
    
    // Initial check
    checkIfInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);

    // Add animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.setAttribute('data-delay', index * 150); // Staggered animation
    });

    // Initialize any sliders or carousels
    initializeTestimonialSlider();
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for navbar
                behavior: 'smooth'
            });
        }
    });
});

// Testimonial slider functionality
function initializeTestimonialSlider() {
    const testimonialContainer = document.querySelector('.testimonial-slider');
    if (!testimonialContainer) return;
    
    const testimonials = testimonialContainer.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentIndex = 0;
    
    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.style.display = 'none';
        }
    });
    
    // Next button functionality
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            testimonials[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonials[currentIndex].style.display = 'block';
        });
    }
    
    // Previous button functionality
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            testimonials[currentIndex].style.display = 'none';
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            testimonials[currentIndex].style.display = 'block';
        });
    }
}

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrollPosition = window.scrollY;
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

// Add counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Initialize counter animation when stats section is in view
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.disconnect();
        }
    });
    
    observer.observe(statsSection);
}

// Connect "Get Started" button to login page
document.addEventListener('DOMContentLoaded', function() {
    const getStartedBtn = document.querySelector('.hero-section .cta-button');
    
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    }

    // User session management functions

    // Get current logged-in user info from localStorage
    function getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    // Get JWT token from localStorage
    function getToken() {
        return localStorage.getItem('token');
    }

    // Check if user is authenticated
    function isAuthenticated() {
        return !!getToken();
    }

    // Logout user
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }

    // Example: Add logout button event listener if exists
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});
