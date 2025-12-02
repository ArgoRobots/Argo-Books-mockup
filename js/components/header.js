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

        <div class="header-right">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search...">
          </div>
          <button class="header-icon" id="upgrade-icon" title="Upgrades">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
          <button class="header-icon" id="notification-icon">
            <i class="fas fa-bell"></i>
            <span class="badge"></span>
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
