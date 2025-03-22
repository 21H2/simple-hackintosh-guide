// Modern Hackintosh Guide - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initCustomCursor();
    initAnimations();
    initSmoothScroll();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add a slight delay to the follower for a nice effect
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Change cursor size on clickable elements
    const clickables = document.querySelectorAll('a, button, .btn, input, select, textarea');
    clickables.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Handle cursor on touch devices
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
}

// Animations with Intersection Observer
function initAnimations() {
    // Add AOS-like functionality with Intersection Observer
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            } else {
                // Uncomment to reset animation when out of view
                // entry.target.classList.remove('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });
    
    animatedElements.forEach(element => {
        element.classList.add('aos-init');
        observer.observe(element);
        
        // Add delay if specified
        const delay = element.getAttribute('data-aos-delay');
        if (delay) {
            element.style.transitionDelay = `${delay}ms`;
        }
    });
    
    // Add CSS for AOS animations
    const style = document.createElement('style');
    style.textContent = `
        .aos-init {
            opacity: 0;
            transition: transform 0.8s ease, opacity 0.8s ease;
        }
        .aos-init[data-aos="fade-up"] {
            transform: translateY(50px);
        }
        .aos-init[data-aos="fade-down"] {
            transform: translateY(-50px);
        }
        .aos-init[data-aos="fade-left"] {
            transform: translateX(50px);
        }
        .aos-init[data-aos="fade-right"] {
            transform: translateX(-50px);
        }
        .aos-init[data-aos="zoom-in"] {
            transform: scale(0.9);
        }
        .aos-animate {
            opacity: 1;
            transform: translateY(0) translateX(0) scale(1);
        }
    `;
    document.head.appendChild(style);
}

// Smooth Scrolling for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});