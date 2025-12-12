// Header Component
// Injects the header and handles page title detection

(function() {
  'use strict';

  // Detect if we're in the pages folder or root
  const isInPagesFolder = window.location.pathname.includes('/pages/');
  const pathPrefix = isInPagesFolder ? '' : 'pages/';
  const indexPath = isInPagesFolder ? '../index.html' : 'index.html';

  // =====================================================
  // UNIFIED DATA SOURCE - Used by both dropdown and modal
  // =====================================================

  const quickActionsData = {
    // Quick Actions - Create/Add actions
    quickActions: [
      {
        id: 'new-invoice',
        title: 'Create New Invoice',
        description: 'Create and send a new invoice to a customer',
        icon: 'fas fa-file-invoice',
        iconBg: 'var(--primary-light)',
        iconColor: 'var(--primary-color)',
        action: 'new-invoice'
      },
      {
        id: 'new-expense',
        title: 'Record Expense',
        description: 'Add a new expense entry',
        icon: 'fas fa-receipt',
        iconBg: '#ffe6e6',
        iconColor: 'var(--danger-color)',
        action: 'new-expense'
      },
      {
        id: 'scan-receipt',
        title: 'Scan Receipt',
        description: 'Scan and import receipt with OCR',
        icon: 'fas fa-camera',
        iconBg: '#fff3e6',
        iconColor: '#f59e0b',
        action: 'scan-receipt'
      },
      {
        id: 'new-customer',
        title: 'Add New Customer',
        description: 'Create a new customer record',
        icon: 'fas fa-user-plus',
        iconBg: '#e6f7e6',
        iconColor: 'var(--success-color)',
        action: 'new-customer'
      },
      {
        id: 'new-product',
        title: 'Add New Product',
        description: 'Add a product to your catalog',
        icon: 'fas fa-cube',
        iconBg: '#f0e6ff',
        iconColor: 'var(--secondary-color)',
        action: 'new-product'
      },
      {
        id: 'new-supplier',
        title: 'Add New Supplier',
        description: 'Add a supplier to your vendor list',
        icon: 'fas fa-truck',
        iconBg: '#e6f0ff',
        iconColor: '#3b82f6',
        action: 'new-supplier'
      },
      {
        id: 'new-employee',
        title: 'Add New Employee',
        description: 'Add an employee to your team',
        icon: 'fas fa-user-tie',
        iconBg: '#fce7f3',
        iconColor: '#ec4899',
        action: 'new-employee'
      },
      {
        id: 'new-rental',
        title: 'Create Rental Record',
        description: 'Start a new rental transaction',
        icon: 'fas fa-box',
        iconBg: '#ecfdf5',
        iconColor: '#10b981',
        action: 'new-rental'
      },
      {
        id: 'new-payment',
        title: 'Record Payment',
        description: 'Record a customer payment',
        icon: 'fas fa-credit-card',
        iconBg: '#eff6ff',
        iconColor: '#3b82f6',
        action: 'new-payment'
      },
      {
        id: 'new-purchase-order',
        title: 'Create Purchase Order',
        description: 'Create a new purchase order for suppliers',
        icon: 'fas fa-clipboard-list',
        iconBg: '#fef3c7',
        iconColor: '#d97706',
        action: 'new-purchase-order'
      },
      {
        id: 'stock-adjustment',
        title: 'Adjust Stock',
        description: 'Make inventory stock adjustments',
        icon: 'fas fa-sliders-h',
        iconBg: '#f3e8ff',
        iconColor: '#9333ea',
        action: 'stock-adjustment'
      },
      {
        id: 'stock-transfer',
        title: 'Transfer Stock',
        description: 'Transfer inventory between locations',
        icon: 'fas fa-exchange-alt',
        iconBg: '#e0e7ff',
        iconColor: '#6366f1',
        action: 'stock-transfer'
      },
      {
        id: 'record-return',
        title: 'Record Return',
        description: 'Process a customer return',
        icon: 'fas fa-undo',
        iconBg: '#fef2f2',
        iconColor: '#ef4444',
        action: 'record-return'
      },
      {
        id: 'new-category',
        title: 'Add Category',
        description: 'Create a new product category',
        icon: 'fas fa-tags',
        iconBg: '#f0fdf4',
        iconColor: '#22c55e',
        action: 'new-category'
      },
      {
        id: 'new-department',
        title: 'Add Department',
        description: 'Create a new department',
        icon: 'fas fa-building',
        iconBg: '#faf5ff',
        iconColor: '#a855f7',
        action: 'new-department'
      },
      {
        id: 'new-location',
        title: 'Add Location',
        description: 'Add a new warehouse or store location',
        icon: 'fas fa-map-marker-alt',
        iconBg: '#fff7ed',
        iconColor: '#ea580c',
        action: 'new-location'
      }
    ],

    // Navigation pages organized by section
    navigation: {
      main: [
        { title: 'Dashboard', icon: 'fas fa-home', page: indexPath },
        { title: 'Analytics', icon: 'fas fa-chart-line', page: `${pathPrefix}analytics.html` },
        { title: 'Insights', icon: 'fas fa-lightbulb', page: `${pathPrefix}insights.html` },
        { title: 'Reports', icon: 'fas fa-file-alt', page: `${pathPrefix}reports.html` }
      ],
      transactions: [
        { title: 'Expenses', icon: 'fas fa-arrow-down', page: `${pathPrefix}expenses.html` },
        { title: 'Revenue', icon: 'fas fa-arrow-up', page: `${pathPrefix}revenue.html` },
        { title: 'Invoices', icon: 'fas fa-file-invoice', page: `${pathPrefix}invoices.html` },
        { title: 'Payments', icon: 'fas fa-credit-card', page: `${pathPrefix}payments.html` }
      ],
      rentals: [
        { title: 'Rental Inventory', icon: 'fas fa-box', page: `${pathPrefix}rentals.html` },
        { title: 'Rental Records', icon: 'fas fa-clipboard-list', page: `${pathPrefix}rental-records.html` }
      ],
      management: [
        { title: 'Customers', icon: 'fas fa-users', page: `${pathPrefix}customers.html` },
        { title: 'Products/Services', icon: 'fas fa-cube', page: `${pathPrefix}products.html` },
        { title: 'Categories', icon: 'fas fa-tags', page: `${pathPrefix}categories.html` },
        { title: 'Suppliers', icon: 'fas fa-truck', page: `${pathPrefix}suppliers.html` }
      ],
      inventory: [
        { title: 'Stock Levels', icon: 'fas fa-warehouse', page: `${pathPrefix}inventory.html` },
        { title: 'Adjustments', icon: 'fas fa-sliders-h', page: `${pathPrefix}stock-adjustments.html` },
        { title: 'Locations', icon: 'fas fa-map-marker-alt', page: `${pathPrefix}locations.html` },
        { title: 'Transfers', icon: 'fas fa-exchange-alt', page: `${pathPrefix}stock-transfers.html` },
        { title: 'Purchase Orders', icon: 'fas fa-clipboard-list', page: `${pathPrefix}purchase-orders.html` }
      ],
      team: [
        { title: 'Employees', icon: 'fas fa-user-tie', page: `${pathPrefix}employees.html` },
        { title: 'Departments', icon: 'fas fa-building', page: `${pathPrefix}departments.html` },
        { title: 'Accountants', icon: 'fas fa-calculator', page: `${pathPrefix}accountants.html` }
      ],
      tracking: [
        { title: 'Returns', icon: 'fas fa-undo', page: `${pathPrefix}returns.html` },
        { title: 'Lost/Damaged', icon: 'fas fa-exclamation-triangle', page: `${pathPrefix}lost-products.html` },
        { title: 'Receipts', icon: 'fas fa-receipt', page: `${pathPrefix}receipts.html` }
      ]
    },

    // Utility/Settings actions
    utilities: [
      {
        id: 'settings',
        title: 'Settings',
        description: 'Configure application settings',
        icon: 'fas fa-cog',
        action: 'open-settings'
      },
      {
        id: 'help',
        title: 'Help & Support',
        description: 'Get help and view documentation',
        icon: 'fas fa-question-circle',
        action: 'open-help'
      },
      {
        id: 'notifications',
        title: 'Notifications',
        description: 'View and manage notifications',
        icon: 'fas fa-bell',
        action: 'open-notifications'
      },
      {
        id: 'export-data',
        title: 'Export Data',
        description: 'Export your data to CSV or PDF',
        icon: 'fas fa-download',
        action: 'export-data'
      },
      {
        id: 'import-data',
        title: 'Import Data',
        description: 'Import data from files',
        icon: 'fas fa-upload',
        action: 'import-data'
      },
      {
        id: 'backup',
        title: 'Backup Data',
        description: 'Create a backup of your data',
        icon: 'fas fa-cloud-upload-alt',
        action: 'backup-data'
      }
    ]
  };

  // =====================================================
  // HTML Generation Functions
  // =====================================================

  function generateQuickActionHTML(action) {
    return `
      <div class="command-item" data-action="${action.action}">
        <div class="command-item-icon" style="background: ${action.iconBg}; color: ${action.iconColor};">
          <i class="${action.icon}"></i>
        </div>
        <div class="command-item-content">
          <div class="command-item-title">${action.title}</div>
          <div class="command-item-desc">${action.description}</div>
        </div>
      </div>
    `;
  }

  function generateNavItemHTML(item) {
    return `
      <div class="command-item" data-page="${item.page}">
        <div class="command-item-icon"><i class="${item.icon}"></i></div>
        <div class="command-item-content">
          <div class="command-item-title">${item.title}</div>
        </div>
      </div>
    `;
  }

  function generateUtilityHTML(utility) {
    return `
      <div class="command-item" data-action="${utility.action}">
        <div class="command-item-icon">
          <i class="${utility.icon}"></i>
        </div>
        <div class="command-item-content">
          <div class="command-item-title">${utility.title}</div>
          <div class="command-item-desc">${utility.description}</div>
        </div>
      </div>
    `;
  }

  function generateCommandPaletteBody() {
    // Quick Actions section (show top 6 for dropdown, all for modal)
    const quickActionsHTML = quickActionsData.quickActions
      .map(action => generateQuickActionHTML(action))
      .join('');

    // Navigation sections - flatten all pages
    const allNavItems = [
      ...quickActionsData.navigation.main,
      ...quickActionsData.navigation.transactions,
      ...quickActionsData.navigation.rentals,
      ...quickActionsData.navigation.management,
      ...quickActionsData.navigation.inventory,
      ...quickActionsData.navigation.team,
      ...quickActionsData.navigation.tracking
    ];
    const navItemsHTML = allNavItems.map(item => generateNavItemHTML(item)).join('');

    // Utilities section
    const utilitiesHTML = quickActionsData.utilities
      .map(utility => generateUtilityHTML(utility))
      .join('');

    return `
      <div class="command-section">
        <div class="command-section-title">Quick Actions</div>
        ${quickActionsHTML}
      </div>
      <div class="command-section">
        <div class="command-section-title">Go To</div>
        ${navItemsHTML}
      </div>
      <div class="command-section">
        <div class="command-section-title">Tools & Settings</div>
        ${utilitiesHTML}
      </div>
    `;
  }

  // Generate the same content for both dropdown and modal
  const commandPaletteBodyHTML = generateCommandPaletteBody();

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
                ${commandPaletteBodyHTML}
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
            ${commandPaletteBodyHTML}
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
      left: 50%;
      transform: translateX(-50%) translateY(-10px);
      margin-top: 8px;
      background: var(--white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-color);
      opacity: 0;
      visibility: hidden;
      transition: var(--transition);
      z-index: 1000;
      min-width: 450px;
      max-width: 550px;
    }
    .search-dropdown.active {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
    }
    .search-dropdown-body {
      max-height: 500px;
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
      max-width: 650px;
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
      max-height: 500px;
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
      flex-shrink: 0;
    }
    .command-item-content {
      flex: 1;
      min-width: 0;
    }
    .command-item-title {
      font-weight: 500;
      color: var(--text-primary);
    }
    .command-item-desc {
      font-size: 12px;
      color: var(--text-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Hide sections with no visible items */
    .command-section:has(.command-item[style*="display: none"]):not(:has(.command-item:not([style*="display: none"]))) {
      display: none;
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
      dropdown.querySelectorAll('.command-section').forEach(function(section) {
        section.style.display = 'block';
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
        palette.querySelectorAll('.command-section').forEach(function(section) {
          section.style.display = 'block';
        });
      }
    }

    function closePalette() {
      palette.classList.remove('active');
    }
  }

  function filterItems(container, query) {
    container.querySelectorAll('.command-section').forEach(function(section) {
      let hasVisibleItems = false;

      section.querySelectorAll('.command-item').forEach(function(item) {
        const title = item.querySelector('.command-item-title').textContent.toLowerCase();
        const desc = item.querySelector('.command-item-desc');
        const descText = desc ? desc.textContent.toLowerCase() : '';

        if (title.includes(query) || descText.includes(query)) {
          item.style.display = 'flex';
          hasVisibleItems = true;
        } else {
          item.style.display = 'none';
        }
      });

      // Hide section if no visible items
      section.style.display = hasVisibleItems ? 'block' : 'none';
    });
  }

  function handleAction(action) {
    // For mockup purposes, navigate to relevant pages or trigger UI elements
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const prefix = isInPagesFolder ? '' : 'pages/';

    switch (action) {
      // Create/Add actions - navigate to relevant pages
      case 'new-invoice':
        window.location.href = prefix + 'invoices.html';
        break;
      case 'new-expense':
        window.location.href = prefix + 'expenses.html';
        break;
      case 'scan-receipt':
        window.location.href = prefix + 'receipts.html';
        break;
      case 'new-customer':
        window.location.href = prefix + 'customers.html';
        break;
      case 'new-product':
        window.location.href = prefix + 'products.html';
        break;
      case 'new-supplier':
        window.location.href = prefix + 'suppliers.html';
        break;
      case 'new-employee':
        window.location.href = prefix + 'employees.html';
        break;
      case 'new-rental':
        window.location.href = prefix + 'rental-records.html';
        break;
      case 'new-payment':
        window.location.href = prefix + 'payments.html';
        break;
      case 'new-purchase-order':
        window.location.href = prefix + 'purchase-orders.html';
        break;
      case 'stock-adjustment':
        window.location.href = prefix + 'stock-adjustments.html';
        break;
      case 'stock-transfer':
        window.location.href = prefix + 'stock-transfers.html';
        break;
      case 'record-return':
        window.location.href = prefix + 'returns.html';
        break;
      case 'new-category':
        window.location.href = prefix + 'categories.html';
        break;
      case 'new-department':
        window.location.href = prefix + 'departments.html';
        break;
      case 'new-location':
        window.location.href = prefix + 'locations.html';
        break;

      // Utility actions - trigger UI elements
      case 'open-settings':
        // Trigger help panel with settings tab if available
        const helpIcon = document.getElementById('help-icon');
        if (helpIcon) {
          helpIcon.click();
          // Try to switch to settings tab if help panel has tabs
          setTimeout(() => {
            const settingsTab = document.querySelector('[data-tab="settings"], .settings-tab');
            if (settingsTab) settingsTab.click();
          }, 100);
        }
        break;
      case 'open-help':
        const helpBtn = document.getElementById('help-icon');
        if (helpBtn) helpBtn.click();
        break;
      case 'open-notifications':
        const notifBtn = document.getElementById('notification-icon');
        if (notifBtn) notifBtn.click();
        break;
      case 'export-data':
        window.location.href = prefix + 'reports.html';
        break;
      case 'import-data':
        // Show import modal or navigate to import page
        alert('Import data feature coming soon!');
        break;
      case 'backup-data':
        // Show backup modal or trigger backup
        alert('Backup feature coming soon!');
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
