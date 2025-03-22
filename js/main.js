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
    
    // Update theme toggle icon based on current theme
    updateThemeToggleIcon();
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Update theme toggle icon
        updateThemeToggleIcon();
    });
    
    // Listen for system preference changes
    prefersDarkScheme.addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            updateThemeToggleIcon();
        }
    });
}

// Helper function to update theme toggle icon
function updateThemeToggleIcon() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const moonIcon = document.querySelector('.theme-toggle .fa-moon');
    const sunIcon = document.querySelector('.theme-toggle .fa-sun');
    
    if (isDarkMode) {
        moonIcon.style.opacity = '0';
        moonIcon.style.transform = 'rotate(180deg)';
        sunIcon.style.opacity = '1';
        sunIcon.style.transform = 'rotate(0)';
    } else {
        moonIcon.style.opacity = '1';
        moonIcon.style.transform = 'rotate(0)';
        sunIcon.style.opacity = '0';
        sunIcon.style.transform = 'rotate(-180deg)';
    }
}
// The closing brace for initThemeToggle function
// No closing brace needed here since it was an extra one

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    // Close menu on window resize (if switching to desktop view)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    // Check if device supports touch or has small screen (likely mobile)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;
    
    // Disable custom cursor on touch devices or small screens
    if (isTouchDevice || isSmallScreen) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }
    
    // Initialize cursor position to prevent jumps
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
    
    // Show cursor after a short delay
    setTimeout(() => {
        cursor.style.opacity = '0.7';
        cursorFollower.style.opacity = '0.3';
    }, 500);
    
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
    
    // Hide cursor when leaving the window
    document.addEventListener('mouseout', function(e) {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        }
    });
    
    document.addEventListener('mouseover', function() {
        cursor.style.opacity = '0.7';
        cursorFollower.style.opacity = '0.3';
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Update on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768) {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
            document.body.style.cursor = 'auto';
        } else {
            cursor.style.display = 'block';
            cursorFollower.style.display = 'block';
            document.body.style.cursor = 'none';
        }
    });
}

// Animations with Intersection Observer
function initAnimations() {
    // Add AOS-like functionality with Intersection Observer
    const animatedElements = document.querySelectorAll('[data-aos], .animate-text, .animate-text-delay, .animate-text-delay-2, .hero-image img, .content-section-inner, .feature-item, .info-card, .note-card');
    
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

// Smooth Scrolling and Active State for Sidebar Links
function initSmoothScroll() {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');
    const sections = {};
    
    // Build sections object for active state tracking
    sidebarLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            sections[targetId] = targetElement.offsetTop;
        }
    });
    
    // Handle smooth scrolling
    sidebarLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Remove active class from all links
                sidebarLinks.forEach(link => link.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
                
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
    
    // Update active state on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100; // Offset for better UX
        
        for (let id in sections) {
            const section = document.querySelector(id);
            if (section) {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    sidebarLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === id) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        }
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