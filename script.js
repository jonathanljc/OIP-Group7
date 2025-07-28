// Global variables
let currentVisitorCount = 47;
let isCheckedIn = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializePrototypeTabs();
    initializeAnimations();
    initializeChart();
    
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
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
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
    
    // Typing effect for hero title (optional)
    // typeWriter();
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

// QR Code simulation
function simulateQRScan() {
    const qrCode = document.getElementById('qr-code');
    const scanResult = document.getElementById('scan-result');
    const visitorCountElement = document.getElementById('visitor-count');
    
    // Add scanning animation
    qrCode.style.animation = 'none';
    qrCode.style.background = '#ff6b6b';
    qrCode.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    setTimeout(() => {
        if (!isCheckedIn) {
            // Check in
            currentVisitorCount++;
            isCheckedIn = true;
            scanResult.innerHTML = '✅ Successfully checked in!';
            scanResult.className = 'scan-result success';
            qrCode.style.background = '#51cf66';
            qrCode.innerHTML = '<i class="fas fa-check"></i>';
        } else {
            // Check out
            currentVisitorCount--;
            isCheckedIn = false;
            scanResult.innerHTML = '✅ Successfully checked out!';
            scanResult.className = 'scan-result success';
            qrCode.style.background = '#ffd43b';
            qrCode.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
        }
        
        // Update visitor count
        visitorCountElement.textContent = currentVisitorCount;
        
        // Reset QR code after 3 seconds
        setTimeout(() => {
            qrCode.style.background = 'var(--primary-color)';
            qrCode.innerHTML = '<i class="fas fa-qrcode"></i>';
            qrCode.style.animation = 'pulse 2s infinite';
            scanResult.innerHTML = '';
            scanResult.className = 'scan-result';
        }, 3000);
    }, 1500);
}

// Kiosk simulation
function simulateKioskAction(action) {
    const kioskResult = document.getElementById('kiosk-result');
    const visitorCountElement = document.getElementById('visitor-count');
    const checkInBtn = document.querySelector('.kiosk-btn.check-in');
    const checkOutBtn = document.querySelector('.kiosk-btn.check-out');
    
    // Disable buttons during processing
    checkInBtn.disabled = true;
    checkOutBtn.disabled = true;
    checkInBtn.style.opacity = '0.6';
    checkOutBtn.style.opacity = '0.6';
    
    // Show processing message
    kioskResult.innerHTML = '⏳ Processing...';
    kioskResult.style.background = '#fff3cd';
    kioskResult.style.color = '#856404';
    
    setTimeout(() => {
        if (action === 'check-in') {
            currentVisitorCount++;
            kioskResult.innerHTML = '✅ Welcome to Kibble Palace!';
            kioskResult.className = 'kiosk-result success';
        } else {
            currentVisitorCount = Math.max(0, currentVisitorCount - 1);
            kioskResult.innerHTML = '✅ Thank you for visiting!';
            kioskResult.className = 'kiosk-result success';
        }
        
        // Update visitor count with animation
        animateNumberChange(visitorCountElement, currentVisitorCount);
        
        // Re-enable buttons
        checkInBtn.disabled = false;
        checkOutBtn.disabled = false;
        checkInBtn.style.opacity = '1';
        checkOutBtn.style.opacity = '1';
        
        // Clear result after 3 seconds
        setTimeout(() => {
            kioskResult.innerHTML = '';
            kioskResult.className = 'kiosk-result';
        }, 3000);
    }, 1000);
}

// Animate number changes
function animateNumberChange(element, newValue) {
    const currentValue = parseInt(element.textContent);
    const increment = newValue > currentValue ? 1 : -1;
    let current = currentValue;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        
        if (current === newValue) {
            clearInterval(timer);
        }
    }, 100);
}

// Chart initialization (placeholder)
function initializeChart() {
    const canvas = document.getElementById('visitor-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Simple chart visualization
    drawVisitorChart(ctx, canvas.width, canvas.height);
}

function drawVisitorChart(ctx, width, height) {
    // Sample data for visitor trends
    const data = [30, 45, 60, 55, 70, 85, 75, 90, 80, 95, 85, 75];
    const labels = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'];
    
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set styles
    ctx.strokeStyle = '#7fb069';
    ctx.fillStyle = 'rgba(127, 176, 105, 0.2)';
    ctx.lineWidth = 3;
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    
    // Calculate points
    const points = data.map((value, index) => ({
        x: padding + (index * chartWidth) / (data.length - 1),
        y: padding + chartHeight - (value / 100) * chartHeight
    }));
    
    // Draw area fill
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding);
    points.forEach(point => ctx.lineTo(point.x, point.y));
    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(point => ctx.lineTo(point.x, point.y));
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = '#7fb069';
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw labels
    ctx.fillStyle = '#666';
    labels.forEach((label, index) => {
        const x = padding + (index * chartWidth) / (data.length - 1);
        ctx.fillText(label, x, height - 10);
    });
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
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

// Add floating animation to QR code
function addFloatingAnimation() {
    const qrCode = document.getElementById('qr-code');
    if (qrCode) {
        setInterval(() => {
            if (qrCode.style.animation.includes('pulse')) {
                qrCode.style.transform = `translateY(${Math.sin(Date.now() * 0.002) * 5}px)`;
            }
        }, 16);
    }
}

// Initialize floating animation
document.addEventListener('DOMContentLoaded', addFloatingAnimation);

// Add dynamic dashboard updates
function updateDashboardMetrics() {
    const metrics = [
        { selector: '.dashboard-card:nth-child(1) .number', baseValue: 247, variance: 20 },
        { selector: '.dashboard-card:nth-child(3) .number', baseValue: 45, variance: 10 },
        { selector: '.dashboard-card:nth-child(4) .number', baseValue: 68, variance: 15 }
    ];
    
    setInterval(() => {
        metrics.forEach(metric => {
            const element = document.querySelector(metric.selector);
            if (element) {
                const variation = (Math.random() - 0.5) * metric.variance;
                const newValue = Math.round(metric.baseValue + variation);
                
                if (metric.selector.includes('nth-child(4)')) {
                    element.textContent = newValue + '%';
                } else if (metric.selector.includes('nth-child(3)')) {
                    element.textContent = newValue + ' min';
                } else {
                    element.textContent = newValue;
                }
            }
        });
    }, 5000);
}

// Initialize dashboard updates
document.addEventListener('DOMContentLoaded', updateDashboardMetrics);