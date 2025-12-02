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
