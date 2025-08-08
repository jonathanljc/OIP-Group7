// Global variables
// Function to get CSS variable values
function getCSSVariable(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

// Color constants using CSS variables
const COLORS = {
    primary: () => getCSSVariable('--primary-color'),
    secondary: () => getCSSVariable('--secondary-color'),
    accent: () => getCSSVariable('--accent-color'),
    success: () => getCSSVariable('--success-color'),
    warning: () => getCSSVariable('--warning-color'),
    error: () => getCSSVariable('--error-color'),
    info: () => getCSSVariable('--info-color'),
    warningLight: () => getCSSVariable('--warning-light'),
    warningText: '#856404' // Keep this specific color for contrast
};

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scrolling
    }
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializePrototypeTabs();
    initializeAnimations();
    initializeTextSweepAnimation();
    initializeAOS();
    
    // Add smooth scrolling for all anchor links
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
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Enhanced mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#dailies').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Prototype tabs functionality
function initializePrototypeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Animation initialization
function initializeAnimations() {
    // Counter animation for hero stats
    animateCounters();
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/\d+/, target);
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
            }
        }, 20);
    };
    
    // Intersection observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.reflection-card, .team-member, .value-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .demo-btn, .kiosk-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Add the CSS to the document
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Smooth reveal animations for timeline items
function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
}

// Initialize timeline animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTimelineAnimations);

// Text sweep animation for h2 elements
function initializeTextSweepAnimation() {
    const h2Elements = document.querySelectorAll('h2');
    
    h2Elements.forEach(h2 => {
        // Create overlay element for sweep effect
        const overlay = document.createElement('div');
        overlay.className = 'text-sweep-overlay';
        
        // Position overlay
        h2.style.position = 'relative';
        h2.style.overflow = 'hidden';
        h2.appendChild(overlay);
        
        // Add hover event listeners
        h2.addEventListener('mouseenter', () => {
            overlay.style.transform = 'translateX(0%)';
        });
        
        h2.addEventListener('mouseleave', () => {
            overlay.style.transform = 'translateX(-100%)';
        });
    });
}

// Initialize AOS (Animate On Scroll) library
function initializeAOS() {
    console.log("Initializing AOS...");
    
    // Force visibility of design journey elements immediately
    forceDesignJourneyVisibility();
    
    // If AOS library is available, initialize it
    if (typeof AOS !== 'undefined') {
        console.log("AOS library found, initializing...");
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    } else {
        console.log("AOS library not found, using fallback...");
        // Fallback: manually trigger animations for design journey elements
        initializeDesignJourneyAnimations();
    }
}

// Force design journey elements to be visible
function forceDesignJourneyVisibility() {
    console.log("Forcing design journey visibility...");
    
    const designJourneySection = document.getElementById('design-journey');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineContents = document.querySelectorAll('.timeline-content');
    
    console.log("Design journey section found:", !!designJourneySection);
    console.log("Timeline items found:", timelineItems.length);
    console.log("Timeline contents found:", timelineContents.length);
    
    // Force visibility of all timeline elements
    timelineItems.forEach((item, index) => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.visibility = 'visible';
        item.style.display = 'flex';
        console.log(`Timeline item ${index + 1} made visible`);
    });
    
    timelineContents.forEach((content, index) => {
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
        content.style.visibility = 'visible';
        content.style.display = 'block';
        console.log(`Timeline content ${index + 1} made visible`);
    });
    
    // Also check for the ideation section specifically
    const ideationSection = document.querySelector('.timeline-item[data-aos-delay="200"]');
    if (ideationSection) {
        console.log("Ideation section found and made visible");
        ideationSection.style.opacity = '1';
        ideationSection.style.transform = 'translateY(0)';
        ideationSection.style.visibility = 'visible';
        ideationSection.style.display = 'flex';
    } else {
        console.log("Ideation section NOT found");
    }
}

// Fallback animation system for design journey
function initializeDesignJourneyAnimations() {
    const designJourneyElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                // Add a small delay for staggered animations
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    designJourneyElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}


// View Toggle and Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check internet connectivity and auto-switch to gallery if offline
    function checkConnectivity() {
        if (!navigator.onLine) {
            // Switch all toggles to gallery view when offline
            const galleryToggles = document.querySelectorAll('input[value="gallery"]');
            galleryToggles.forEach(toggle => {
                toggle.checked = true;
                
                // Manually trigger the view switching logic
                const viewType = toggle.value; // 'gallery'
                const systemType = toggle.name.split('-')[0]; // 'qr' or 'kiosk'
                const parentTabContent = toggle.closest('.tab-content');
                
                if (parentTabContent) {
                    // Hide all sub-tab contents in this parent
                    parentTabContent.querySelectorAll('.sub-tab-content').forEach(content => {
                        content.classList.remove('active');
                    });
                    
                    // Show the gallery content
                    const targetContentId = `${systemType}-carousel`;
                    const targetContent = document.getElementById(targetContentId);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                }
            });
        }
    }
    
    // Check connectivity on page load
    checkConnectivity();
    
    // Listen for online/offline events
    window.addEventListener('offline', function() {
        checkConnectivity();
    });
    
    window.addEventListener('online', function() {
        // Optionally switch back to interactive when online
        // Uncomment the lines below if you want auto-switch back to interactive
        // const interactiveToggles = document.querySelectorAll('input[value="interactive"]');
        // interactiveToggles.forEach(toggle => {
        //     toggle.checked = true;
        //     const event = new Event('change');
        //     toggle.dispatchEvent(event);
        // });
    });
    
    // View toggle functionality
    const viewToggles = document.querySelectorAll('.view-toggle-switch input[type="radio"]');
    
    viewToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            if (this.checked) {
                const viewType = this.value; // 'interactive' or 'gallery'
                const systemType = this.name.split('-')[0]; // 'qr' or 'kiosk'
                const parentTabContent = this.closest('.tab-content');
                
                // Hide all sub-tab contents in this parent
                parentTabContent.querySelectorAll('.sub-tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the selected content
                const targetContentId = `${systemType}-${viewType === 'interactive' ? 'interactive' : 'carousel'}`;
                const targetContent = document.getElementById(targetContentId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            }
        });
    });

    // Carousel functionality
    const carousels = ['qr', 'kiosk'];
    
    carousels.forEach(carouselType => {
        const track = document.getElementById(`${carouselType}-carousel-track`);
        const slides = track?.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll(`#${carouselType}-indicators .indicator`);
        const prevBtn = document.querySelector(`[data-carousel="${carouselType}"].prev`);
        const nextBtn = document.querySelector(`[data-carousel="${carouselType}"].next`);
        
        if (!track || !slides.length) return;
        
        let currentSlide = 0;
        
        function updateCarousel() {
            // Update track position
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update slide active states
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateCarousel();
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const activeTab = document.querySelector('.tab-content.active');
            const activeSubTab = activeTab?.querySelector('.sub-tab-content.active');
            
            if (activeSubTab && activeSubTab.id.includes(carouselType)) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevSlide();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextSlide();
                }
            }
        });
    });
});