// Header Component
// Injects the header and handles page title detection

(function() {
  'use strict';

  // Get page title from the document title (before " - Argo Books")
  const fullTitle = document.title;

  // Detect if we're in the pages folder or root
  const isInPagesFolder = window.location.pathname.includes('/pages/');
  const pathPrefix = isInPagesFolder ? '' : 'pages/';
  const indexPath = isInPagesFolder ? '../index.html' : 'index.html';

  const headerHTML = `
      <header class="header">
        <div class="header-left">
          <button class="menu-toggle btn-icon">
            <i class="fas fa-bars"></i>
          </button>
          <button class="header-action-btn" id="undo-btn" title="Undo">
            <i class="fas fa-undo"></i>
          </button>
          <button class="header-action-btn" id="redo-btn" title="Redo">
            <i class="fas fa-redo"></i>
          </button>
          <button class="header-action-btn" id="save-btn" title="Save">
            <i class="fas fa-save"></i>
          </button>
        </div>

        <div class="header-center">
          <div class="search-box-wrapper">
            <div class="search-box" id="search-box-trigger">
              <i class="fas fa-search"></i>
              <input type="text" id="search-box-input" placeholder="Search or jump to...">
              <span class="search-shortcut">Ctrl+K</span>
            </div>
            <!-- Dropdown Panel (appears under searchbar on click) -->
            <div class="search-dropdown" id="searchDropdown">
              <div class="search-dropdown-body">
                <div class="command-section">
                  <div class="command-section-title">Quick Actions</div>
                  <div class="command-item" data-action="new-invoice">
                    <div class="command-item-icon" style="background: var(--primary-light); color: var(--primary-color);">
                      <i class="fas fa-file-invoice"></i>
                    </div>
                    <div class="command-item-content">
                      <div class="command-item-title">Create New Invoice</div>
                      <div class="command-item-desc">Create and send a new invoice to a customer</div>
                    </div>
                  </div>
                  <div class="command-item" data-action="new-expense">
                    <div class="command-item-icon" style="background: #ffe6e6; color: var(--danger-color);">
                      <i class="fas fa-receipt"></i>
                    </div>
                    <div class="command-item-content">
                      <div class="command-item-title">Record Expense</div>
                      <div class="command-item-desc">Add a new expense entry</div>
                    </div>
                  </div>
                  <div class="command-item" data-action="new-customer">
                    <div class="command-item-icon" style="background: #e6f7e6; color: var(--success-color);">
                      <i class="fas fa-user-plus"></i>
                    </div>
                    <div class="command-item-content">
                      <div class="command-item-title">Add New Customer</div>
                      <div class="command-item-desc">Create a new customer record</div>
                    </div>
                  </div>
                  <div class="command-item" data-action="new-product">
                    <div class="command-item-icon" style="background: #f0e6ff; color: var(--secondary-color);">
                      <i class="fas fa-cube"></i>
                    </div>
                    <div class="command-item-content">
                      <div class="command-item-title">Add New Product</div>
                      <div class="command-item-desc">Add a product to your catalog</div>
                    </div>
                  </div>
                </div>
                <div class="command-section">
                  <div class="command-section-title">Go To</div>
                  <div class="command-item" data-page="${indexPath}">
                    <div class="command-item-icon"><i class="fas fa-home"></i></div>
                    <div class="command-item-content">
                      <div class="command-item-title">Dashboard</div>
                    </div>
                  </div>
                  <div class="command-item" data-page="${pathPrefix}invoices.html">
                    <div class="command-item-icon"><i class="fas fa-file-invoice"></i></div>
                    <div class="command-item-content">
                      <div class="command-item-title">Invoices</div>
                    </div>
                  </div>
                  <div class="command-item" data-page="${pathPrefix}customers.html">
                    <div class="command-item-icon"><i class="fas fa-users"></i></div>
                    <div class="command-item-content">
                      <div class="command-item-title">Customers</div>
                    </div>
                  </div>
                  <div class="command-item" data-page="${pathPrefix}expenses.html">
                    <div class="command-item-icon"><i class="fas fa-arrow-down"></i></div>
                    <div class="command-item-content">
                      <div class="command-item-title">Expenses</div>
                    </div>
                  </div>
                  <div class="command-item" data-page="${pathPrefix}reports.html">
                    <div class="command-item-icon"><i class="fas fa-file-alt"></i></div>
                    <div class="command-item-content">
                      <div class="command-item-title">Reports</div>
                    </div>
                  </div>
                  <div class="command-item" data-page="${pathPrefix}settings.html">
                    <div class="command-item-icon"><i class="fas fa-cog"></i></div>
                    <div class="command-item-content">
                      <div class="command-item-title">Settings</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="header-right">
          <button class="header-icon" id="upgrade-icon" title="Upgrades">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" fill="#3b82f6"/>
              <path d="M12 16V8M8 12l4-4 4 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
          </button>
          <button class="header-icon" id="notification-icon">
            <i class="fas fa-bell"></i>
            <span class="badge">3</span>
          </button>
          <button class="header-icon" id="help-icon">
            <i class="fas fa-question-circle"></i>
          </button>
          <div class="user-menu">
            <div class="user-avatar">JD</div>
            <div class="user-info">
              <span class="user-name">John Doe</span>
              <span class="user-role">Administrator</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Command Palette Modal (appears on Ctrl+K) -->
      <div class="command-palette-overlay" id="commandPalette">
        <div class="command-palette">
          <div class="command-palette-header">
            <i class="fas fa-search"></i>
            <input type="text" id="command-palette-input" placeholder="Type a command or search...">
            <span class="command-palette-esc">ESC</span>
          </div>
          <div class="command-palette-body">
            <div class="command-section">
              <div class="command-section-title">Quick Actions</div>
              <div class="command-item" data-action="new-invoice">
                <div class="command-item-icon" style="background: var(--primary-light); color: var(--primary-color);">
                  <i class="fas fa-file-invoice"></i>
                </div>
                <div class="command-item-content">
                  <div class="command-item-title">Create New Invoice</div>
                  <div class="command-item-desc">Create and send a new invoice to a customer</div>
                </div>
              </div>
              <div class="command-item" data-action="new-expense">
                <div class="command-item-icon" style="background: #ffe6e6; color: var(--danger-color);">
                  <i class="fas fa-receipt"></i>
                </div>
                <div class="command-item-content">
                  <div class="command-item-title">Record Expense</div>
                  <div class="command-item-desc">Add a new expense entry</div>
                </div>
              </div>
              <div class="command-item" data-action="new-customer">
                <div class="command-item-icon" style="background: #e6f7e6; color: var(--success-color);">
                  <i class="fas fa-user-plus"></i>
                </div>
                <div class="command-item-content">
                  <div class="command-item-title">Add New Customer</div>
                  <div class="command-item-desc">Create a new customer record</div>
                </div>
              </div>
              <div class="command-item" data-action="new-product">
                <div class="command-item-icon" style="background: #f0e6ff; color: var(--secondary-color);">
                  <i class="fas fa-cube"></i>
                </div>
                <div class="command-item-content">
                  <div class="command-item-title">Add New Product</div>
                  <div class="command-item-desc">Add a product to your catalog</div>
                </div>
              </div>
            </div>
            <div class="command-section">
              <div class="command-section-title">Go To</div>
              <div class="command-item" data-page="${indexPath}">
                <div class="command-item-icon"><i class="fas fa-home"></i></div>
                <div class="command-item-content">
                  <div class="command-item-title">Dashboard</div>
                </div>
              </div>
              <div class="command-item" data-page="${pathPrefix}invoices.html">
                <div class="command-item-icon"><i class="fas fa-file-invoice"></i></div>
                <div class="command-item-content">
                  <div class="command-item-title">Invoices</div>
                </div>
              </div>
              <div class="command-item" data-page="${pathPrefix}customers.html">
                <div class="command-item-icon"><i class="fas fa-users"></i></div>
                <div class="command-item-content">
                  <div class="command-item-title">Customers</div>
                </div>
              </div>
              <div class="command-item" data-page="${pathPrefix}expenses.html">
                <div class="command-item-icon"><i class="fas fa-arrow-down"></i></div>
                <div class="command-item-content">
                  <div class="command-item-title">Expenses</div>
                </div>
              </div>
              <div class="command-item" data-page="${pathPrefix}reports.html">
                <div class="command-item-icon"><i class="fas fa-file-alt"></i></div>
                <div class="command-item-content">
                  <div class="command-item-title">Reports</div>
                </div>
              </div>
              <div class="command-item" data-page="${pathPrefix}settings.html">
                <div class="command-item-icon"><i class="fas fa-cog"></i></div>
                <div class="command-item-content">
                  <div class="command-item-title">Settings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  `;

  const headerStyles = `
  <style id="header-component-styles">
    .header-icon i {
      font-size: 18px;
    }
    .header-action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      color: var(--text-secondary);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: var(--transition);
    }
    .header-action-btn:hover {
      background: var(--hover-color);
      color: var(--text-primary);
    }
    .header-action-btn:active {
      background: var(--border-color);
    }
    .header-action-btn i {
      font-size: 14px;
    }

    /* Search box wrapper for dropdown positioning */
    .search-box-wrapper {
      position: relative;
    }

    /* Search box with shortcut */
    .search-box {
      position: relative;
      cursor: pointer;
    }
    .search-box input {
      cursor: text;
      padding-right: 60px;
    }
    .search-shortcut {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: var(--gray-200);
      color: var(--text-secondary);
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 500;
      pointer-events: none;
    }

    /* Search Dropdown Panel */
    .search-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 8px;
      background: var(--white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-color);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: var(--transition);
      z-index: 1000;
      min-width: 400px;
    }
    .search-dropdown.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    .search-dropdown-body {
      max-height: 400px;
      overflow-y: auto;
      padding: 8px 0;
    }

    /* Command Palette Modal */
    .command-palette-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 100px;
      z-index: 3000;
      opacity: 0;
      visibility: hidden;
      transition: var(--transition);
    }
    .command-palette-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    .command-palette {
      background: var(--white);
      border-radius: var(--radius-lg);
      width: 100%;
      max-width: 600px;
      box-shadow: var(--shadow-lg);
      overflow: hidden;
      transform: translateY(-20px);
      transition: var(--transition);
    }
    .command-palette-overlay.active .command-palette {
      transform: translateY(0);
    }
    .command-palette-header {
      display: flex;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-color);
      gap: 12px;
    }
    .command-palette-header i {
      color: var(--gray-500);
      font-size: 16px;
    }
    .command-palette-header input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 16px;
      color: var(--text-primary);
    }
    .command-palette-header input::placeholder {
      color: var(--gray-500);
    }
    .command-palette-esc {
      background: var(--gray-200);
      color: var(--text-secondary);
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 500;
    }
    .command-palette-body {
      max-height: 400px;
      overflow-y: auto;
      padding: 12px 0;
    }

    /* Shared command styles */
    .command-section {
      margin-bottom: 8px;
    }
    .command-section-title {
      padding: 8px 20px;
      font-size: 11px;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .command-item {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      gap: 12px;
      cursor: pointer;
      transition: var(--transition);
    }
    .command-item:hover, .command-item.selected {
      background: var(--gray-100);
    }
    .command-item-icon {
      width: 36px;
      height: 36px;
      border-radius: var(--radius);
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--gray-100);
      color: var(--text-secondary);
      font-size: 14px;
    }
    .command-item-content {
      flex: 1;
    }
    .command-item-title {
      font-weight: 500;
      color: var(--text-primary);
    }
    .command-item-desc {
      font-size: 12px;
      color: var(--text-secondary);
    }
  </style>
  `;

  function injectHeader() {
    // Inject styles
    document.head.insertAdjacentHTML('beforeend', headerStyles);

    // Find the main content area and inject header at the beginning
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.insertAdjacentHTML('afterbegin', headerHTML);
    }

    // Initialize search and command palette
    initSearchDropdown();
    initCommandPalette();
  }

  function initSearchDropdown() {
    const searchBox = document.getElementById('search-box-trigger');
    const searchInput = document.getElementById('search-box-input');
    const dropdown = document.getElementById('searchDropdown');

    if (!searchBox || !dropdown || !searchInput) return;

    // Open dropdown on input focus
    searchInput.addEventListener('focus', function() {
      openDropdown();
    });

    // Filter on input
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      filterItems(dropdown, query);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!searchBox.contains(e.target) && !dropdown.contains(e.target)) {
        closeDropdown();
      }
    });

    // Handle command items in dropdown
    dropdown.querySelectorAll('.command-item').forEach(function(item) {
      item.addEventListener('click', function() {
        const page = this.getAttribute('data-page');
        const action = this.getAttribute('data-action');

        if (page) {
          window.location.href = page;
        } else if (action) {
          handleAction(action);
        }
        closeDropdown();
      });
    });

    function openDropdown() {
      dropdown.classList.add('active');
      // Reset filter
      dropdown.querySelectorAll('.command-item').forEach(function(item) {
        item.style.display = 'flex';
      });
    }

    function closeDropdown() {
      dropdown.classList.remove('active');
    }
  }

  function initCommandPalette() {
    const palette = document.getElementById('commandPalette');
    const input = document.getElementById('command-palette-input');

    if (!palette) return;

    // Keyboard shortcut Ctrl+K
    document.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openPalette();
      }
      // Close on Escape
      if (e.key === 'Escape') {
        if (palette.classList.contains('active')) {
          closePalette();
        }
        // Also close dropdown
        const dropdown = document.getElementById('searchDropdown');
        if (dropdown && dropdown.classList.contains('active')) {
          dropdown.classList.remove('active');
        }
      }
    });

    // Close on overlay click
    palette.addEventListener('click', function(e) {
      if (e.target === palette) {
        closePalette();
      }
    });

    // Handle command items in modal
    palette.querySelectorAll('.command-item').forEach(function(item) {
      item.addEventListener('click', function() {
        const page = this.getAttribute('data-page');
        const action = this.getAttribute('data-action');

        if (page) {
          window.location.href = page;
        } else if (action) {
          handleAction(action);
        }
        closePalette();
      });
    });

    // Filter items on input
    if (input) {
      input.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        filterItems(palette, query);
      });
    }

    function openPalette() {
      palette.classList.add('active');
      if (input) {
        input.value = '';
        input.focus();
        // Reset visibility of all items
        palette.querySelectorAll('.command-item').forEach(function(item) {
          item.style.display = 'flex';
        });
      }
    }

    function closePalette() {
      palette.classList.remove('active');
    }
  }

  function filterItems(container, query) {
    container.querySelectorAll('.command-item').forEach(function(item) {
      const title = item.querySelector('.command-item-title').textContent.toLowerCase();
      const desc = item.querySelector('.command-item-desc');
      const descText = desc ? desc.textContent.toLowerCase() : '';
      if (title.includes(query) || descText.includes(query)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  function handleAction(action) {
    // For mockup purposes, navigate to relevant pages
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const prefix = isInPagesFolder ? '' : 'pages/';

    switch (action) {
      case 'new-invoice':
        window.location.href = prefix + 'invoices.html';
        break;
      case 'new-expense':
        window.location.href = prefix + 'expenses.html';
        break;
      case 'new-customer':
        window.location.href = prefix + 'customers.html';
        break;
      case 'new-product':
        window.location.href = prefix + 'products.html';
        break;
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
  } else {
    injectHeader();
  }
})();
