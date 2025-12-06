// Header Component
// Injects the header and handles page title detection

(function() {
  'use strict';

  // Get page title from the document title (before " - Argo Books")
  const fullTitle = document.title;

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
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search...">
          </div>
        </div>

        <div class="header-right">
          <div class="header-date-range">
            <i class="fas fa-calendar-alt"></i>
            <select id="global-date-range">
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="last-quarter">Last Quarter</option>
              <option value="this-year">This Year</option>
              <option value="last-year">Last Year</option>
              <option value="all-time">All Time</option>
            </select>
          </div>
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
    .header-date-range {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      background: var(--hover-color);
      border-radius: var(--radius-md);
      margin-right: 8px;
    }
    .header-date-range i {
      color: var(--text-secondary);
      font-size: 14px;
    }
    .header-date-range select {
      border: none;
      background: transparent;
      color: var(--text-primary);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      padding-right: 4px;
    }
    .header-date-range select:focus {
      outline: none;
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
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
  } else {
    injectHeader();
  }
})();
