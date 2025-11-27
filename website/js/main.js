/*
 * Microchip Distributor Website - Main JavaScript
 * Handles interactive elements, mobile navigation, and basic functionality
 */

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animation for hamburger icon
            const bars = mobileMenuToggle.querySelectorAll('.bar');
            bars[0].classList.toggle('bar1');
            bars[1].classList.toggle('bar2');
            bars[2].classList.toggle('bar3');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation if contact forms are added later
    const contactForms = document.querySelectorAll('form.contact-form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm(form);
        });
    });
    
    // Product table sorting functionality
    initializeTableSorting();
    
    // Initialize any carousels or sliders
    initializeCarousels();
    
    // Initialize tooltips if needed
    initializeTooltips();
});

// Form validation function
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
        
        // Additional validation for email fields
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                field.classList.add('error');
            }
        }
    });
    
    if (isValid) {
        // Submit the form
        console.log('Form is valid, submitting...');
        // In a real implementation, you would submit the form here
        // form.submit();
        
        // Show success message
        showNotification('Thank you for your message. We will contact you soon.', 'success');
    } else {
        showNotification('Please fill in all required fields correctly.', 'error');
    }
}

// Table sorting functionality
function initializeTableSorting() {
    const sortableTables = document.querySelectorAll('.data-table.sortable');
    
    sortableTables.forEach(table => {
        const headers = table.querySelectorAll('th');
        
        headers.forEach((header, index) => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                sortTable(table, index);
            });
        });
    });
}

function sortTable(table, columnIndex) {
    const isAscending = table.getAttribute('data-sort-direction') !== 'asc';
    table.setAttribute('data-sort-direction', isAscending ? 'asc' : 'desc');
    
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();
        
        // Try to sort as numbers if possible
        const numA = parseFloat(cellA.replace(/[^0-9.-]+/g, ''));
        const numB = parseFloat(cellB.replace(/[^0-9.-]+/g, ''));
        
        if (!isNaN(numA) && !isNaN(numB)) {
            return isAscending ? numA - numB : numB - numA;
        } else {
            return isAscending ? 
                cellA.localeCompare(cellB) : 
                cellB.localeCompare(cellA);
        }
    });
    
    // Clear the table body
    tbody.innerHTML = '';
    
    // Re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));
}

// Carousel/slide initialization
function initializeCarousels() {
    // Initialize any carousels on the page
    // This would be expanded based on actual carousel implementation
    console.log('Carousels initialized');
}

// Tooltip initialization
function initializeTooltips() {
    // Initialize tooltips if they exist
    // This would be expanded based on actual tooltip implementation
    console.log('Tooltips initialized');
}

// Notification display function
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '4px',
        color: 'white',
        zIndex: '10000',
        maxWidth: '400px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transform: 'translateX(200%)',
        transition: 'transform 0.3s ease'
    });
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#00A651';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#DC3545';
    } else {
        notification.style.backgroundColor = '#0066CC';
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(200%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Utility function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle lazy loading of images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading after DOM is loaded
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Additional utility functions could be added here as needed