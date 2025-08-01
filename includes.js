// Function to load navbar and footer using XMLHttpRequest (works with local files)
function loadIncludes() {
    // Load navbar
    loadFile('navbar.html', function(content) {
        document.getElementById('navbar-placeholder').innerHTML = content;
        setActiveNavigation();
    });
    
    // Load footer
    loadFile('footer.html', function(content) {
        document.getElementById('footer-placeholder').innerHTML = content;
    });
}

// Helper function to load files
function loadFile(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) { // 0 for local files
                callback(xhr.responseText);
            } else {
                console.error('Error loading file:', url);
                // Fallback: create basic navbar/footer if files can't be loaded
                if (url === 'navbar.html') {
                    createFallbackNavbar();
                } else if (url === 'footer.html') {
                    createFallbackFooter();
                }
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

// Fallback navbar if file loading fails
function createFallbackNavbar() {
    const navbarHTML = `
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <img src="assets/friendsofglasgow.png" alt="Friends of Glasgow" class="nav-logo-img">
                <span>Kibble Palace</span>
            </div>
            <ul class="nav-menu">
                <li><a href="index.html" class="nav-link" data-page="index">Home</a></li>
                <li class="nav-dropdown">
                    <a href="design-journey.html" class="nav-link" data-page="design-journey">Design Journey <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-content">
                        <a href="design-journey.html" class="dropdown-link" data-page="design-journey">Overview</a>
                        <a href="research-discovery.html" class="dropdown-link" data-page="research-discovery">Research & Discovery</a>
                        <a href="ideation-selection.html" class="dropdown-link" data-page="ideation-selection">Ideation & Selection</a>
                        <a href="prototyping-testing.html" class="dropdown-link" data-page="prototyping-testing">Prototyping & Testing</a>
                    </div>
                </li>
                <li><a href="portfolio.html" class="nav-link" data-page="portfolio">Portfolio</a></li>
                <li><a href="reflection.html" class="nav-link" data-page="reflection">Reflection</a></li>
                <li><a href="prototype.html" class="nav-link" data-page="prototype">Prototype</a></li>
                <li><a href="about.html" class="nav-link" data-page="about">About Us</a></li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>`;
    document.getElementById('navbar-placeholder').innerHTML = navbarHTML;
    setActiveNavigation();
}

// Fallback footer if file loading fails
function createFallbackFooter() {
    const footerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-bottom">
                <p>&copy; 2025 Kibble Palace Visitor Tracking Solution. Student Project - University of Glasgow. <img src="assets/UoG_logo.jpg" alt="University of Glasgow" class="footer-uni-logo"></p>
            </div>
        </div>
    </footer>`;
    document.getElementById('footer-placeholder').innerHTML = footerHTML;
}

// Function to set active navigation based on current page
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    
    // Remove all active classes
    document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page
    const currentLinks = document.querySelectorAll(`[data-page="${currentPage}"]`);
    currentLinks.forEach(link => {
        link.classList.add('active');
    });
    
    // Special handling for index page
    if (currentPage === 'index' || currentPage === '') {
        const homeLink = document.querySelector('[data-page="index"]');
        if (homeLink) homeLink.classList.add('active');
    }
}

// Load includes when DOM is ready
document.addEventListener('DOMContentLoaded', loadIncludes);