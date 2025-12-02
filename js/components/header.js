// Header Component
// Injects the header and handles page title detection

(function() {
  'use strict';

  // Get page title from the document title (before " - Argo Books")
  const fullTitle = document.title;
  const pageTitle = fullTitle.includes(' - ') ? fullTitle.split(' - ')[0] : fullTitle;

  const headerHTML = `
      <header class="header">
        <div class="header-left">
          <button class="menu-toggle btn-icon">
            <i class="fas fa-bars"></i>
          </button>
          <h1 class="page-title">${pageTitle}</h1>
        </div>

        <div class="header-center">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search...">
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
  `;

  const headerStyles = `
  <style id="header-component-styles">
    .header-icon i {
      font-size: 18px;
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
