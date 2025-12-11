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
      <div class="help-panel-divider"></div>
      <button class="help-panel-update-btn" id="check-updates-btn">
        <div class="update-btn-left">
          <i class="fas fa-sync-alt"></i>
          <span>Check for Updates</span>
        </div>
        <span class="version-badge">v2.4.1</span>
      </button>
    </div>
  </div>
  `;

  const checkUpdatesModalHTML = `
  <div class="modal-overlay" id="checkUpdatesModal">
    <div class="modal" style="max-width: 450px;">
      <div class="modal-header">
        <h3 class="modal-title">Check for Updates</h3>
        <button class="modal-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body text-center">
        <div class="update-icon-container">
          <i class="fas fa-check-circle"></i>
        </div>
        <h4 class="mt-3 mb-2">You're up to date!</h4>
        <p class="text-muted mb-3">Argo Books v2.4.1 is the latest version.</p>
        <div class="update-info">
          <div class="update-info-row">
            <span class="text-muted">Current Version:</span>
            <span class="fw-600">2.4.1</span>
          </div>
          <div class="update-info-row">
            <span class="text-muted">Last Checked:</span>
            <span class="fw-600">Just now</span>
          </div>
          <div class="update-info-row">
            <span class="text-muted">Release Date:</span>
            <span class="fw-600">December 1, 2024</span>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary modal-cancel">Close</button>
        <a href="#" class="btn btn-outline">
          <i class="fas fa-file-alt"></i>
          View Release Notes
        </a>
      </div>
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

    .help-panel-divider {
      height: 1px;
      background: var(--border-color);
      margin: 8px 0;
    }

    .help-panel-update-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 12px 20px;
      background: none;
      border: none;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .help-panel-update-btn:hover {
      background-color: var(--bg-secondary);
    }

    .update-btn-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .update-btn-left i {
      width: 20px;
      color: var(--primary-color);
      font-size: 16px;
    }

    .update-btn-left span {
      font-size: 14px;
      color: var(--text-primary);
    }

    .version-badge {
      font-size: 12px;
      color: var(--text-secondary);
      background: var(--bg-secondary);
      padding: 4px 8px;
      border-radius: 4px;
    }

    .update-icon-container {
      width: 80px;
      height: 80px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e6f7e6;
      border-radius: 50%;
    }

    .update-icon-container i {
      font-size: 40px;
      color: var(--success-color);
    }

    .update-info {
      background: var(--bg-secondary);
      border-radius: 8px;
      padding: 16px;
      text-align: left;
    }

    .update-info-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
    }

    .update-info-row:not(:last-child) {
      border-bottom: 1px solid var(--border-color);
    }
  </style>
  `;

  function injectHelpPanel() {
    // Inject styles
    document.head.insertAdjacentHTML('beforeend', helpPanelStyles);
    // Inject panel
    document.body.insertAdjacentHTML('beforeend', helpPanelHTML);
    // Inject check updates modal
    document.body.insertAdjacentHTML('beforeend', checkUpdatesModalHTML);
  }

  function initializeHelpPanel() {
    const helpIcon = document.getElementById('help-icon');
    const helpPanel = document.getElementById('help-panel');
    const checkUpdatesBtn = document.getElementById('check-updates-btn');
    const checkUpdatesModal = document.getElementById('checkUpdatesModal');

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

    // Check for updates button click
    if (checkUpdatesBtn && checkUpdatesModal) {
      checkUpdatesBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        // Close the help panel
        helpPanel.classList.remove('active');
        helpIcon.classList.remove('active');
        // Open the modal
        checkUpdatesModal.classList.add('active');
      });

      // Close modal handlers
      const modalClose = checkUpdatesModal.querySelector('.modal-close');
      const modalCancel = checkUpdatesModal.querySelector('.modal-cancel');

      if (modalClose) {
        modalClose.addEventListener('click', function() {
          checkUpdatesModal.classList.remove('active');
        });
      }

      if (modalCancel) {
        modalCancel.addEventListener('click', function() {
          checkUpdatesModal.classList.remove('active');
        });
      }

      // Close on overlay click
      checkUpdatesModal.addEventListener('click', function(e) {
        if (e.target === checkUpdatesModal) {
          checkUpdatesModal.classList.remove('active');
        }
      });
    }
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
