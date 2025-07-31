// Global variables
let currentVisitorCount = 47;
let isCheckedIn = false;

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Add click outside to close functionality
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modalId);
            }
        });
        
        // Add escape key to close functionality
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal(modalId);
            }
        });
    }
}

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
    initializeChart();
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
        { selector: '.metric-card[data-metric="visitors"] .metric-number', baseValue: 7265, variance: 50, suffix: '' },
        { selector: '.metric-card[data-metric="checkins"] .metric-number', baseValue: 1271, variance: 30, suffix: '' },
        { selector: '.metric-card[data-metric="duration"] .metric-number', baseValue: 36, variance: 5, suffix: '' },
        { selector: '.metric-card[data-metric="occupancy"] .metric-number', baseValue: 126, variance: 15, suffix: '' }
    ];
    
    setInterval(() => {
        metrics.forEach(metric => {
            const element = document.querySelector(metric.selector);
            if (element) {
                const variation = (Math.random() - 0.5) * metric.variance;
                const newValue = Math.round(metric.baseValue + variation);
                element.textContent = newValue.toLocaleString() + metric.suffix;
            }
        });
        
        // Redraw charts with slight variations
        drawVisitorLineChart();
        drawTimeSlotsChart();
        drawDemographicsChart();
        drawFootfallChart();
    }, 8000);
}

// Add dashboard feature interactions
function initializeDashboardInteractions() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    metricCards.forEach(card => {
        card.addEventListener('click', function() {
            const metric = this.getAttribute('data-metric');
            showMetricDetails(metric);
        });
    });
    
    // Initialize all charts
    initializeCharts();
}

// Initialize all dashboard charts
function initializeCharts() {
    // Add a small delay to ensure DOM is fully loaded
    setTimeout(() => {
        drawVisitorLineChart();
        drawTimeSlotsChart();
        drawDemographicsChart();
        drawFootfallChart();
        addChartInteractivity();
    }, 100);
}

// Add interactivity to charts
function addChartInteractivity() {
    // Add click handlers to chart sections
    const chartSections = document.querySelectorAll('.chart-section');
    chartSections.forEach(section => {
        section.addEventListener('click', function() {
            const chartTitle = this.querySelector('h4').textContent;
            showChartDetails(chartTitle);
        });
        
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });
    });
}

function showChartDetails(chartTitle) {
    const details = {
        'Visitor Counts': 'Weekly visitor trends showing seasonal patterns and growth over time.',
        'Visitor Time Slots': 'Peak visiting hours analysis - 12pm-2pm shows highest traffic with 106 visitors.',
        'Visitor Demographics': 'Geographic distribution of visitors - Japan leads with 200 visitors.',
        'Footfall Traffic and Duration': 'Comparison of entry methods and average visit duration throughout the year.'
    };
    
    const detail = details[chartTitle];
    if (detail) {
        alert(`${chartTitle}\n\n${detail}`);
    }
}

// Draw the purple visitor counts line chart
function drawVisitorLineChart() {
    const canvas = document.getElementById('visitor-line-chart');
    if (!canvas) return;
    
    // Set canvas size properly
    canvas.style.width = '100%';
    canvas.style.height = '200px';
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Chart data points (matching your Figma design)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = [120, 80, 95, 180, 140, 160];
    const maxValue = Math.max(...data);
    
    // Draw grid lines
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = (height - 60) * (i / 5) + 30;
        ctx.beginPath();
        ctx.moveTo(50, y);
        ctx.lineTo(width - 30, y);
        ctx.stroke();
    }
    
    // Draw the purple line
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = 50 + (index * (width - 80) / (data.length - 1));
        const y = height - 60 - ((value / maxValue) * (height - 90));
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        // Draw data points
        ctx.fillStyle = '#8b5cf6';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
    ctx.stroke();
    
    // Draw month labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    months.forEach((month, index) => {
        const x = 50 + (index * (width - 80) / (months.length - 1));
        ctx.fillText(month, x, height - 20);
    });
}

// Draw visitor time slots bar chart
function drawTimeSlotsChart() {
    const canvas = document.getElementById('time-slots-chart');
    if (!canvas) return;
    
    // Set canvas size properly
    canvas.style.width = '100%';
    canvas.style.height = '200px';
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const timeSlots = ['10am-12pm', '12pm-2pm', '2pm-4pm', '4pm-6pm', '6pm onwards'];
    const values = [60, 106, 80, 40, 30];
    const maxValue = Math.max(...values);
    
    const barWidth = (width - 100) / timeSlots.length;
    
    values.forEach((value, index) => {
        const x = 50 + (index * barWidth) + (barWidth * 0.2);
        const barHeight = (value / maxValue) * (height - 80);
        const y = height - 60 - barHeight;
        
        // Draw bar
        ctx.fillStyle = index === 1 ? '#3b82f6' : '#e5e7eb';
        ctx.fillRect(x, y, barWidth * 0.6, barHeight);
        
        // Draw value label for highlighted bar
        if (index === 1) {
            ctx.fillStyle = 'white';
            ctx.font = 'bold 12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(value.toString(), x + (barWidth * 0.3), y - 10);
        }
        
        // Draw time slot labels
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(timeSlots[index], x + (barWidth * 0.3), height - 20);
    });
}

// Draw visitor demographics chart
function drawDemographicsChart() {
    const canvas = document.getElementById('demographics-chart');
    if (!canvas) return;
    
    // Set canvas size properly
    canvas.style.width = '100%';
    canvas.style.height = '200px';
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const demographics = ['JS', 'Canada', 'Mexico', 'China', 'Japan', 'Australia'];
    const values = [80, 120, 90, 60, 200, 70];
    const maxValue = Math.max(...values);
    
    const barWidth = (width - 100) / demographics.length;
    
    values.forEach((value, index) => {
        const x = 50 + (index * barWidth) + (barWidth * 0.2);
        const barHeight = (value / maxValue) * (height - 80);
        const y = height - 60 - barHeight;
        
        // Draw bar
        ctx.fillStyle = index === 4 ? '#3b82f6' : '#e5e7eb';
        ctx.fillRect(x, y, barWidth * 0.6, barHeight);
        
        // Draw value label for highlighted bar
        if (index === 4) {
            ctx.fillStyle = 'white';
            ctx.font = 'bold 12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(value.toString(), x + (barWidth * 0.3), y - 10);
        }
        
        // Draw demographic labels
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(demographics[index], x + (barWidth * 0.3), height - 20);
    });
}

// Draw footfall traffic timeline chart
function drawFootfallChart() {
    const canvas = document.getElementById('footfall-chart');
    if (!canvas) return;
    
    // Set canvas size properly
    canvas.style.width = '100%';
    canvas.style.height = '150px';
    canvas.width = canvas.offsetWidth;
    canvas.height = 150;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const barWidth = (width - 100) / months.length;
    
    months.forEach((month, index) => {
        const x = 50 + (index * barWidth);
        
        // Generate random heights for the three types of data
        const manualHeight = Math.random() * 60 + 20;
        const qrHeight = Math.random() * 40 + 10;
        const durationHeight = Math.random() * 30 + 10;
        
        // Draw manual entry bars (red)
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(x, height - 40 - manualHeight, barWidth * 0.25, manualHeight);
        
        // Draw QR code bars (blue)
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(x + (barWidth * 0.3), height - 40 - qrHeight, barWidth * 0.25, qrHeight);
        
        // Draw duration bars (purple)
        ctx.fillStyle = '#8b5cf6';
        ctx.fillRect(x + (barWidth * 0.6), height - 40 - durationHeight, barWidth * 0.25, durationHeight);
        
        // Draw month labels
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(month, x + (barWidth * 0.5), height - 10);
    });
}

function showMetricDetails(metric) {
    const details = {
        visitors: {
            title: 'Total Visitors',
            description: 'Cumulative visitor count tracked through QR code check-ins and manual entries.',
            insights: ['Peak season: Summer months', 'Average daily: 245 visitors', 'Growth rate: +11% this month']
        },
        checkins: {
            title: 'Daily Check-ins',
            description: 'Real-time check-ins for today through the digital tracking system.',
            insights: ['Current time: 2:30 PM', 'Peak hours: 11 AM - 3 PM', 'Digital adoption: 85%']
        },
        duration: {
            title: 'Average Visit Duration',
            description: 'Mean time spent by visitors in the Kibble Palace greenhouse.',
            insights: ['Optimal range: 30-45 minutes', 'Educational tours: 60+ minutes', 'Quick visits: 15-20 minutes']
        },
        occupancy: {
            title: 'Current Occupancy',
            description: 'Real-time count of visitors currently inside the greenhouse.',
            insights: ['Capacity: 200 visitors', 'Current level: 63%', 'Status: Optimal']
        }
    };
    
    const detail = details[metric];
    if (detail) {
        const message = `${detail.title}\n\n${detail.description}\n\nKey Insights:\n${detail.insights.join('\n')}`;
        alert(message);
    }
}

// Removed interactive workflow overlay functionality

// Initialize dashboard updates and interactions
document.addEventListener('DOMContentLoaded', function() {
    updateDashboardMetrics();
    initializeDashboardInteractions();
});

// Modal Functions for Solutions
function openSolutionsModal() {
    document.getElementById('solutionsModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeSolutionsModal() {
    document.getElementById('solutionsModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('solutionsModal');
    if (event.target === modal) {
        closeSolutionsModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSolutionsModal();
    }
});