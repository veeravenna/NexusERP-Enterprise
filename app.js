// NexusERP Enterprise - Main JavaScript

// Check authentication
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!isLoggedIn && currentPage !== 'login.html' && currentPage !== '') {
        window.location.href = 'login.html';
    }
    
    if (isLoggedIn && currentPage === 'login.html') {
        window.location.href = 'index.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    initDashboard();
    initLogin();
});

// Dashboard initialization
function initDashboard() {
    // Animate stat cards
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(el => {
        const finalValue = el.textContent;
        el.textContent = '0';
        let current = 0;
        const target = parseInt(finalValue.replace(/[^0-9]/g, ''));
        const increment = Math.ceil(target / 50);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = finalValue;
                clearInterval(timer);
            } else {
                el.textContent = el.textContent.replace(/\d+/g, current);
            }
        }, 20);
    });

    // Animate bars
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        setTimeout(() => {
            const height = bar.style.height;
            bar.style.height = '0%';
            setTimeout(() => {
                bar.style.height = height;
            }, 100);
        }, index * 100);
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                alert('Search functionality: "' + this.value + '"');
            }
        });
    }

    // Notification bell click
    const notificationBtn = document.querySelector('.icon-btn .fa-bell');
    if (notificationBtn) {
        notificationBtn.parentElement.addEventListener('click', function() {
            alert('You have 3 new notifications!');
        });
    }

    // Envelope click
    const envelopeBtn = document.querySelector('.icon-btn .fa-envelope');
    if (envelopeBtn) {
        envelopeBtn.parentElement.addEventListener('click', function() {
            alert('Inbox: 5 unread messages');
        });
    }

    // View All link
    const viewAll = document.querySelector('.view-all');
    if (viewAll) {
        viewAll.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Navigating to full orders list...');
        });
    }
}

// Login functionality
function initLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === 'admin' && password === 'admin123') {
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('username', username);
                window.location.href = 'index.html';
            } else {
                alert('Invalid credentials! Use admin / admin123');
            }
        });
    }
}

// Utility: Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Utility: Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

// Utility: Generate random order ID
function generateOrderId() {
    return '#ORD-' + Math.floor(1000 + Math.random() * 9000);
}

// Logout function
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    window.location.href = 'login.html';
}

// Console branding
console.log('%c NexusERP Enterprise ', 'background: #4F46E5; color: white; font-size: 16px; padding: 10px 20px; border-radius: 4px;');
console.log('%c Welcome to NexusERP - Enterprise Resource Planning ', 'color: #4F46E5; font-size: 12px;');
