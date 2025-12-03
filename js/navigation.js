// Argo Books - Navigation Script
// Simple page navigation for the mockup

document.addEventListener('DOMContentLoaded', function() {
  // Get all navigation items
  const navItems = document.querySelectorAll('.nav-item[data-page]');

  // Add click handlers
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const page = this.getAttribute('data-page');
      if (page) {
        window.location.href = page;
      }
    });
  });

  // Mark current page as active
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navItems.forEach(item => {
    const page = item.getAttribute('data-page');
    if (page === currentPage) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Sidebar toggle is now handled by js/components/sidebar.js

  // Company modal handling is now in js/components/company-modal.js

  // Custom date range handling for Analytics
  const dateRangeSelect = document.getElementById('date-range-select');
  const customDateRange = document.getElementById('custom-date-range');

  if (dateRangeSelect && customDateRange) {
    dateRangeSelect.addEventListener('change', function() {
      if (this.value === 'custom') {
        customDateRange.style.display = 'flex';
      } else {
        customDateRange.style.display = 'none';
      }
    });
  }

  // Analytics tab switching
  const analyticsTabs = document.querySelectorAll('.analytics-tab');
  const analyticsContents = document.querySelectorAll('.analytics-content');

  analyticsTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetContent = this.getAttribute('data-analytics-tab');

      // Remove active from all tabs
      analyticsTabs.forEach(t => t.classList.remove('active'));
      // Add active to clicked tab
      this.classList.add('active');

      // Hide all analytics contents
      analyticsContents.forEach(content => {
        content.style.display = 'none';
      });

      // Show target analytics content
      const targetElement = document.getElementById(targetContent);
      if (targetElement) {
        targetElement.style.display = 'block';
      }
    });
  });

  // Tab switching
  const tabs = document.querySelectorAll('.tab[data-tab]');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');

      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active to clicked tab
      this.classList.add('active');

      // Hide all tab contents
      tabContents.forEach(content => {
        content.style.display = 'none';
      });

      // Show target tab content
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.style.display = 'block';
      }
    });
  });

  // Modal handling
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalCloses = document.querySelectorAll('.modal-close, .modal-cancel');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
      }
    });
  });

  modalCloses.forEach(close => {
    close.addEventListener('click', function() {
      const modal = this.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  });

  // Close modal when clicking overlay
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
      }
    });
  });

  // Search box placeholder animation
  const searchInput = document.querySelector('.search-box input');
  if (searchInput) {
    const placeholders = [
      'Search transactions...',
      'Search customers...',
      'Search products...',
      'Try AI search...'
    ];
    let currentIndex = 0;

    // Simple placeholder rotation (optional feature)
    // setInterval(() => {
    //   currentIndex = (currentIndex + 1) % placeholders.length;
    //   searchInput.placeholder = placeholders[currentIndex];
    // }, 3000);
  }

  // Notification badge counter (mockup)
  const notificationBadge = document.querySelector('.header-icon .badge');
  // This would be connected to real data in production

  // Initialize tooltips (basic implementation)
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  tooltipElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      const text = this.getAttribute('data-tooltip');
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = text;
      document.body.appendChild(tooltip);

      const rect = this.getBoundingClientRect();
      tooltip.style.top = rect.bottom + 8 + 'px';
      tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    });

    el.addEventListener('mouseleave', function() {
      const tooltip = document.querySelector('.tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    });
  });
});

// Utility function to format currency
function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

// Utility function to format date
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
}

// Simple chart placeholder (would use Chart.js or similar in production)
function renderChart(containerId, type, data) {
  const container = document.getElementById(containerId);
  if (container) {
    // In production, this would render actual charts
    container.innerHTML = `<div class="chart-placeholder">
      <i class="fas fa-chart-${type}"></i>
      <span>${type.charAt(0).toUpperCase() + type.slice(1)} Chart</span>
    </div>`;
  }
}

// Export for use in other scripts
window.ArgoBooks = {
  formatCurrency,
  formatDate,
  renderChart
};
