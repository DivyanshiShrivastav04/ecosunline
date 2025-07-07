// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't already active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !phone || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }
        
        // Show success message
        alert('Thank you for your message! We will get back to you within 24 hours.');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send the data to a server here
        console.log('Form submitted:', {
            name: name,
            email: email,
            phone: phone,
            message: message
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .testimonial-card, .about-text, .contact-info, .contact-form');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // CTA button scroll to contact
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function(e) {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        const offsetTop = contactSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Performance optimization: Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add smooth scroll behavior to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Statistics counter animation
    const statsNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const finalNumber = entry.target.textContent;
                const numericValue = parseInt(finalNumber.replace(/\D/g, ''));
                const suffix = finalNumber.replace(/\d/g, '');
                
                if (numericValue && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target, 0, numericValue, suffix, 2000);
                }
            }
        });
    });

    statsNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateCounter(element, start, end, suffix, duration) {
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.floor(start + (end - start) * progress);
            element.textContent = currentValue + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Enhanced mobile menu functionality
    function handleMobileMenu() {
        if (window.innerWidth <= 768) {
            navMenu.classList.add('mobile-menu');
        } else {
            navMenu.classList.remove('mobile-menu', 'active');
            hamburger.classList.remove('active');
        }
    }

    window.addEventListener('resize', handleMobileMenu);
    handleMobileMenu();

    // Add click outside to close mobile menu
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Preload critical images
    const criticalImages = [
        'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1920'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Service worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Note: In a real implementation, you would create a service worker file
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Google Analytics placeholder (replace with actual tracking code)
function gtag() {
    // Google Analytics tracking code would go here
    console.log('Analytics event:', arguments);
}

// Track form submissions
document.getElementById('contactForm').addEventListener('submit', function() {
    gtag('event', 'form_submit', {
        event_category: 'Contact',
        event_label: 'Contact Form'
    });
});

// Track service link clicks
document.querySelectorAll('.service-link').forEach(link => {
    link.addEventListener('click', function() {
        gtag('event', 'click', {
            event_category: 'Service',
            event_label: this.href
        });
    });
});

// Track CTA button clicks
document.querySelector('.cta-button').addEventListener('click', function() {
    gtag('event', 'click', {
        event_category: 'CTA',
        event_label: 'Get Free Quote'
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu on escape
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close active FAQ
        document.querySelectorAll('.faq-item.active').forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Add focus management for accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                
                // Send to analytics
                gtag('event', 'timing_complete', {
                    name: 'page_load',
                    value: Math.round(perfData.loadEventEnd - perfData.loadEventStart)
                });
            }, 0);
        });
    }
}

measurePerformance();