// File Menu Component
// Injects the file menu button and panel into the header

(function() {
  'use strict';

  const fileMenuHTML = `
  <div class="file-menu-panel" id="file-menu-panel">
    <div class="file-menu-body">
      <a href="#" class="file-menu-item" id="file-new-company">
        <i class="fas fa-plus"></i>
        <span>Create New Company</span>
      </a>
      <a href="#" class="file-menu-item" id="file-open-company">
        <i class="fas fa-folder-open"></i>
        <span>Open Company...</span>
      </a>
      <div class="file-menu-item has-submenu" id="file-open-recent">
        <i class="fas fa-clock"></i>
        <span>Open Recent</span>
        <i class="fas fa-chevron-right submenu-arrow"></i>
        <div class="file-submenu">
          <a href="#" class="file-menu-item">
            <i class="fas fa-building"></i>
            <span>My Company Inc.</span>
          </a>
          <a href="#" class="file-menu-item">
            <i class="fas fa-store"></i>
            <span>Side Business LLC</span>
          </a>
          <a href="#" class="file-menu-item">
            <i class="fas fa-briefcase"></i>
            <span>Consulting Services</span>
          </a>
          <div class="file-menu-divider"></div>
          <a href="#" class="file-menu-item">
            <i class="fas fa-trash"></i>
            <span>Clear Recent</span>
          </a>
        </div>
      </div>
      <div class="file-menu-divider"></div>
      <a href="#" class="file-menu-item" id="file-save">
        <i class="fas fa-save"></i>
        <span>Save</span>
        <span class="file-menu-shortcut">Ctrl+S</span>
      </a>
      <a href="#" class="file-menu-item" id="file-save-as">
        <i class="fas fa-file-export"></i>
        <span>Save As...</span>
        <span class="file-menu-shortcut">Ctrl+Shift+S</span>
      </a>
      <a href="#" class="file-menu-item" id="file-close-company">
        <i class="fas fa-times-circle"></i>
        <span>Close Company</span>
      </a>
      <div class="file-menu-divider"></div>
      <a href="#" class="file-menu-item" id="file-export-as">
        <i class="fas fa-file-arrow-down"></i>
        <span>Export As...</span>
      </a>
      <div class="file-menu-divider"></div>
      <a href="#" class="file-menu-item" id="file-show-in-folder">
        <i class="fas fa-folder"></i>
        <span>Show Company in Folder</span>
      </a>
    </div>
  </div>
  `;

  const fileMenuStyles = `
  <style id="file-menu-styles">
    .file-menu-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: var(--radius);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
      background: transparent;
    }

    .file-menu-btn:hover {
      background-color: var(--gray-200);
      color: var(--text-primary);
    }

    .file-menu-btn.active {
      background-color: var(--primary-color);
      color: white;
    }

    .file-menu-btn i {
      font-size: 16px;
    }

    .file-menu-panel {
      position: fixed;
      top: 60px;
      left: 70px;
      width: 260px;
      background: var(--white);
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
    }

    .file-menu-panel.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .file-menu-body {
      padding: 8px 0;
    }

    .file-menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      color: var(--text-primary);
      text-decoration: none;
      transition: background-color 0.15s ease;
      cursor: pointer;
      position: relative;
    }

    .file-menu-item:hover {
      background-color: var(--bg-secondary);
    }

    .file-menu-item i:first-child {
      width: 18px;
      font-size: 14px;
      color: var(--text-secondary);
    }

    .file-menu-item span {
      font-size: 14px;
      flex: 1;
    }

    .file-menu-shortcut {
      font-size: 12px !important;
      color: var(--text-muted) !important;
      flex: none !important;
    }

    .file-menu-divider {
      height: 1px;
      background-color: var(--border-color);
      margin: 8px 0;
    }

    /* Submenu styles */
    .file-menu-item.has-submenu {
      position: relative;
    }

    .file-menu-item .submenu-arrow {
      width: auto !important;
      font-size: 10px !important;
      color: var(--text-muted);
      margin-left: auto;
    }

    .file-submenu {
      position: absolute;
      left: 100%;
      top: 0;
      width: 220px;
      background: var(--white);
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      padding: 8px 0;
      opacity: 0;
      visibility: hidden;
      transform: translateX(-10px);
      transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s ease;
    }

    .file-menu-item.has-submenu:hover .file-submenu {
      opacity: 1;
      visibility: visible;
      transform: translateX(0);
    }

    .file-submenu .file-menu-item {
      padding: 8px 14px;
    }

    .file-submenu .file-menu-item i:first-child {
      font-size: 12px;
    }

    .file-submenu .file-menu-item span {
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .file-menu-panel {
        left: 16px;
        right: 16px;
        width: auto;
      }

      .file-submenu {
        position: static;
        width: 100%;
        box-shadow: none;
        background: var(--gray-50);
        border-radius: 0;
        margin: 4px 0;
        padding: 4px 0;
        opacity: 1;
        visibility: visible;
        transform: none;
        display: none;
      }

      .file-menu-item.has-submenu:hover .file-submenu {
        display: block;
      }

      .file-submenu .file-menu-item {
        padding-left: 46px;
      }
    }
  </style>
  `;

  function injectFileMenu() {
    // Inject styles
    document.head.insertAdjacentHTML('beforeend', fileMenuStyles);

    // Inject panel into body
    document.body.insertAdjacentHTML('beforeend', fileMenuHTML);

    // Add file button to header-left after menu toggle
    const headerLeft = document.querySelector('.header-left');
    const menuToggle = headerLeft?.querySelector('.menu-toggle');

    if (headerLeft && menuToggle) {
      const fileBtn = document.createElement('button');
      fileBtn.className = 'file-menu-btn';
      fileBtn.id = 'file-menu-btn';
      fileBtn.title = 'File';
      fileBtn.innerHTML = '<i class="fas fa-file"></i>';

      // Insert after menu toggle
      menuToggle.insertAdjacentElement('afterend', fileBtn);
    }
  }

  function initializeFileMenu() {
    const fileBtn = document.getElementById('file-menu-btn');
    const filePanel = document.getElementById('file-menu-panel');

    if (!fileBtn || !filePanel) return;

    // Toggle panel on button click
    fileBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const isActive = filePanel.classList.contains('active');

      // Close all other panels first
      closeAllPanels();

      if (!isActive) {
        filePanel.classList.add('active');
        fileBtn.classList.add('active');
      }
    });

    // Handle menu item clicks
    const menuItems = filePanel.querySelectorAll('.file-menu-item:not(.has-submenu)');
    menuItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const itemId = this.id;

        // Close the menu
        filePanel.classList.remove('active');
        fileBtn.classList.remove('active');

        // Handle specific actions
        handleMenuAction(itemId);
      });
    });

    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
      if (!filePanel.contains(e.target) && !fileBtn.contains(e.target)) {
        filePanel.classList.remove('active');
        fileBtn.classList.remove('active');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        filePanel.classList.remove('active');
        fileBtn.classList.remove('active');
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      // Ctrl+S - Save
      if (e.ctrlKey && e.key === 's' && !e.shiftKey) {
        e.preventDefault();
        handleMenuAction('file-save');
      }
      // Ctrl+Shift+S - Save As
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        handleMenuAction('file-save-as');
      }
    });
  }

  function closeAllPanels() {
    // Close user panel
    document.getElementById('user-panel')?.classList.remove('active');

    // Close help panel
    document.getElementById('help-panel')?.classList.remove('active');
    document.getElementById('help-icon')?.classList.remove('active');

    // Close notification panel
    document.getElementById('notification-panel')?.classList.remove('active');
    document.getElementById('notification-icon')?.classList.remove('active');

    // Close file menu
    document.getElementById('file-menu-panel')?.classList.remove('active');
    document.getElementById('file-menu-btn')?.classList.remove('active');
  }

  function handleMenuAction(actionId) {
    switch(actionId) {
      case 'file-new-company':
        // Open create company modal
        const createModal = document.getElementById('create-company-modal');
        if (createModal) {
          createModal.classList.add('active');
        }
        break;

      case 'file-open-company':
        // For mockup - just show an alert or could open a file dialog
        showToast('Open Company dialog would appear here');
        break;

      case 'file-save':
        showToast('Company saved successfully', 'success');
        break;

      case 'file-save-as':
        showToast('Save As dialog would appear here');
        break;

      case 'file-close-company':
        showToast('Company closed');
        break;

      case 'file-export-as':
        showToast('Export dialog would appear here');
        break;

      case 'file-show-in-folder':
        showToast('Opening folder in file explorer...');
        break;

      default:
        console.log('Menu action:', actionId);
    }
  }

  function showToast(message, type = 'info') {
    // Create toast element if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 8px;
      `;
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'file-menu-toast';

    const bgColor = type === 'success' ? 'var(--success-color)' : 'var(--gray-800)';
    toast.style.cssText = `
      background: ${bgColor};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: slideIn 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    `;

    const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;

    toastContainer.appendChild(toast);

    // Add animation styles if not present
    if (!document.getElementById('toast-animation-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'toast-animation-styles';
      styleSheet.textContent = `
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `;
      document.head.appendChild(styleSheet);
    }

    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      injectFileMenu();
      initializeFileMenu();
    });
  } else {
    injectFileMenu();
    initializeFileMenu();
  }
})();
