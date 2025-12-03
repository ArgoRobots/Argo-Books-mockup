// Sidebar Component
// Injects the sidebar navigation and handles page detection

(function() {
  'use strict';

  // Detect if we're in the pages folder or root
  const isInPagesFolder = window.location.pathname.includes('/pages/');
  const pathPrefix = isInPagesFolder ? '' : 'pages/';
  const indexPath = isInPagesFolder ? '../index.html' : 'index.html';

  const sidebarHTML = `
    <aside class="sidebar">
      <div class="sidebar-header clickable">
        <div class="sidebar-logo">AB</div>
        <span class="sidebar-brand">Argo Books</span>
        <i class="fas fa-chevron-down company-chevron"></i>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <div class="nav-section-title">Main</div>
          <a class="nav-item" data-page="${indexPath}">
            <i class="fas fa-home"></i>
            <span>Dashboard</span>
          </a>
          <a class="nav-item" data-page="${pathPrefix}analytics.html">
            <i class="fas fa-chart-line"></i>
            <span>Analytics</span>
          </a>
          <a class="nav-item" data-page="${pathPrefix}insights.html">
            <i class="fas fa-lightbulb"></i>
            <span>Insights</span>
          </a>
          <a class="nav-item" data-page="${pathPrefix}reports.html">
            <i class="fas fa-file-alt"></i>
            <span>Reports</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="nav-section-title">Transactions</div>
          <a class="nav-item" data-page="${pathPrefix}expenses.html">
            <i class="fas fa-arrow-down"></i>
            <span>Expenses</span>
          </a>
          <a class="nav-item" data-page="${pathPrefix}revenue.html">
            <i class="fas fa-arrow-up"></i>
            <span>Revenue</span>
          </a>
          <a class="nav-item" data-page="${pathPrefix}invoices.html">
            <i class="fas fa-file-invoice"></i>
            <span>Invoices</span>
          </a>
          <a class="nav-item" data-page="${pathPrefix}payments.html">
            <i class="fas fa-credit-card"></i>
            <span>Payments</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="nav-section-title">Rentals</div>
          <a class="nav-item" data-page="${pathPrefix}rentals.html">
            <i class="fas fa-box"></i>
            <span>Rental Inventory</span>
          </a>
          <a class="nav-item" data-page="${pathPrefix}rental-records.html">
            <i class="fas fa-clipboard-list"></i>
            <span>Rental Records</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="nav-section-title">Management</div>
          <a class="nav-item" data-page="${pathPrefix}customers.html">
            <i class="fas fa-users"></i>
            <span>Customers</span>
          </a>
          <a class="nav-item" data-page="${pathPrefix}products.html">
            <i class="fas fa-cube"></i>
            <span>Products</span>
          </a>
          <a class="nav-item" data-page="${pathPrefix}categories.html">
            <i class="fas fa-tags"></i>
            <span>Categories</span>
          </a>
          <a class="nav-item" data-page="${pathPrefix}suppliers.html">
            <i class="fas fa-truck"></i>
            <span>Suppliers</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="nav-section-title">Team</div>
          <a class="nav-item" data-page="${pathPrefix}employees.html">
            <i class="fas fa-user-tie"></i>
            <span>Employees</span>
          </a>
          <a class="nav-item" data-page="${pathPrefix}departments.html">
            <i class="fas fa-building"></i>
            <span>Departments</span>
          </a>
          <a class="nav-item" data-page="${pathPrefix}accountants.html">
            <i class="fas fa-calculator"></i>
            <span>Accountants</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="nav-section-title">Tracking</div>
          <a class="nav-item" data-page="${pathPrefix}returns.html">
            <i class="fas fa-undo"></i>
            <span>Returns</span>
          </a>
          <a class="nav-item" data-page="${pathPrefix}lost-products.html">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Lost/Damaged</span>
          </a>
          <a class="nav-item" data-page="${pathPrefix}receipts.html">
            <i class="fas fa-receipt"></i>
            <span>Receipts</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="nav-section-title">Tools</div>
          <a class="nav-item" data-page="${pathPrefix}import-export.html">
            <i class="fas fa-exchange-alt"></i>
            <span>Import/Export</span>
          </a>
          <a class="nav-item" data-page="${pathPrefix}settings.html">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
          </a>
        </div>
      </nav>
    </aside>
  `;

  function injectSidebar() {
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.insertAdjacentHTML('afterbegin', sidebarHTML);
    }
  }

  function initializeSidebar() {
    // Get current page filename
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    // Mark current page as active
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    navItems.forEach(item => {
      const page = item.getAttribute('data-page');
      const pageName = page.split('/').pop();
      if (pageName === currentPage) {
        item.classList.add('active');
      }
    });

    // Add click handlers for navigation
    navItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.getAttribute('data-page');
        if (page) {
          window.location.href = page;
        }
      });
    });

    // Sidebar toggle (works on both mobile and desktop)
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();

        if (window.innerWidth <= 768) {
          // Mobile: slide in/out
          sidebar.classList.toggle('open');
        } else {
          // Desktop: collapse/expand
          sidebar.classList.toggle('collapsed');
          mainContent?.classList.toggle('sidebar-collapsed');

          // Dispatch custom event for other components to listen
          window.dispatchEvent(new CustomEvent('sidebarToggle', {
            detail: { collapsed: sidebar.classList.contains('collapsed') }
          }));
        }
      });

      // Close sidebar when clicking outside on mobile
      document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
          }
        }
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      injectSidebar();
      initializeSidebar();
    });
  } else {
    injectSidebar();
    initializeSidebar();
  }
})();
