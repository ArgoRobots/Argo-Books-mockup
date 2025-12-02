// Help Panel Component
// Injects the help panel and handles the help icon interactions

(function() {
  'use strict';

  const helpPanelHTML = `
  <div class="help-panel" id="help-panel">
    <div class="help-panel-header">
      <h3>Help & Resources</h3>
    </div>
    <div class="help-panel-body">
      <a href="#" class="help-panel-link">
        <i class="fas fa-gift"></i>
        <span>What's New</span>
      </a>
      <a href="#" class="help-panel-link">
        <i class="fas fa-book"></i>
        <span>Documentation</span>
      </a>
      <a href="#" class="help-panel-link">
        <i class="fas fa-users"></i>
        <span>Argo Community</span>
      </a>
      <a href="#" class="help-panel-link">
        <i class="fas fa-headset"></i>
        <span>Support</span>
      </a>
    </div>
  </div>
  `;

  const helpPanelStyles = `
  <style id="help-panel-styles">
    .help-panel {
      position: fixed;
      top: 60px;
      right: 20px;
      width: 280px;
      background: var(--white);
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
    }

    .help-panel.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .help-panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-color);
    }

    .help-panel-header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .help-panel-body {
      padding: 8px 0;
    }

    .help-panel-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      color: var(--text-primary);
      text-decoration: none;
      transition: background-color 0.2s ease;
    }

    .help-panel-link:hover {
      background-color: var(--bg-secondary);
    }

    .help-panel-link i {
      width: 20px;
      color: var(--primary-color);
      font-size: 16px;
    }

    .help-panel-link span {
      font-size: 14px;
    }

    #help-icon.active {
      background-color: var(--bg-secondary);
    }
  </style>
  `;

  function injectHelpPanel() {
    // Inject styles
    document.head.insertAdjacentHTML('beforeend', helpPanelStyles);
    // Inject panel
    document.body.insertAdjacentHTML('beforeend', helpPanelHTML);
  }

  function initializeHelpPanel() {
    const helpIcon = document.getElementById('help-icon');
    const helpPanel = document.getElementById('help-panel');

    if (!helpIcon || !helpPanel) return;

    // Toggle panel on icon click
    helpIcon.addEventListener('click', function(e) {
      e.stopPropagation();
      helpPanel.classList.toggle('active');
      helpIcon.classList.toggle('active');
    });

    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
      if (!helpPanel.contains(e.target) && !helpIcon.contains(e.target)) {
        helpPanel.classList.remove('active');
        helpIcon.classList.remove('active');
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      injectHelpPanel();
      initializeHelpPanel();
    });
  } else {
    injectHelpPanel();
    initializeHelpPanel();
  }
})();
