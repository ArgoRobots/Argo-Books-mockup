// User Panel Component
// Injects the user menu panel and handles interactions

(function() {
  'use strict';

  // Detect if we're in the pages folder or root
  const isInPagesFolder = window.location.pathname.includes('/pages/');
  const settingsPath = isInPagesFolder ? 'settings.html' : 'pages/settings.html';

  const userPanelHTML = `
  <div class="user-panel" id="user-panel">
    <div class="user-panel-header">
      <div class="user-panel-avatar">JD</div>
      <div class="user-panel-info">
        <div class="user-panel-name">John Doe</div>
        <div class="user-panel-email">john.doe@company.com</div>
      </div>
    </div>
    <div class="user-panel-body">
      <a href="#" class="user-panel-link" id="my-profile-btn">
        <i class="fas fa-user"></i>
        <span>My Profile</span>
      </a>
      <a href="${settingsPath}" class="user-panel-link">
        <i class="fas fa-cog"></i>
        <span>Settings</span>
      </a>
      <div class="user-panel-divider"></div>
      <a href="#" class="user-panel-link" id="switch-account-btn">
        <i class="fas fa-exchange-alt"></i>
        <span>Switch Account</span>
      </a>
      <a href="#" class="user-panel-link logout">
        <i class="fas fa-sign-out-alt"></i>
        <span>Log Out</span>
      </a>
    </div>
  </div>
  `;

  const profileModalHTML = `
  <div class="modal-overlay" id="profile-modal">
    <div class="modal" style="max-width: 420px;">
      <div class="modal-header">
        <h3 class="modal-title">My Profile</h3>
        <button class="modal-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <div class="profile-picture-section" style="text-align: center; margin-bottom: 24px;">
          <div class="profile-avatar" style="width: 100px; height: 100px; border-radius: 50%; background: var(--primary-color); color: white; display: flex; align-items: center; justify-content: center; font-size: 36px; font-weight: 600; margin: 0 auto 16px;">JD</div>
          <div class="profile-upload-area" style="border: 2px dashed var(--border-color); border-radius: var(--radius); padding: 16px; cursor: pointer; transition: all 0.2s;">
            <i class="fas fa-camera" style="font-size: 20px; color: var(--gray-400); margin-bottom: 8px;"></i>
            <p style="margin: 0; font-size: 13px; color: var(--text-muted);">Click to upload a new photo</p>
            <p style="margin: 4px 0 0; font-size: 11px; color: var(--gray-400);">JPG, PNG up to 5MB</p>
            <input type="file" accept="image/*" style="display: none;">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" value="john.doe@company.com" disabled>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary modal-cancel">Cancel</button>
        <button class="btn btn-primary">Save Changes</button>
      </div>
    </div>
  </div>
  `;

  const userPanelStyles = `
  <style id="user-panel-styles">
    .user-panel {
      position: fixed;
      top: 60px;
      right: 20px;
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

    .user-panel.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .user-panel-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-color);
    }

    .user-panel-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 16px;
    }

    .user-panel-info {
      flex: 1;
      min-width: 0;
    }

    .user-panel-name {
      font-weight: 600;
      color: var(--text-primary);
      font-size: 14px;
    }

    .user-panel-email {
      font-size: 12px;
      color: var(--text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-panel-body {
      padding: 8px 0;
    }

    .user-panel-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 20px;
      color: var(--text-primary);
      text-decoration: none;
      transition: background-color 0.2s ease;
    }

    .user-panel-link:hover {
      background-color: var(--bg-secondary);
    }

    .user-panel-link.logout {
      color: #dc2626;
    }

    .user-panel-link.logout:hover {
      background-color: rgba(220, 38, 38, 0.05);
    }

    .user-panel-link i {
      width: 18px;
      font-size: 14px;
    }

    .user-panel-link span {
      font-size: 14px;
    }

    .user-panel-divider {
      height: 1px;
      background-color: var(--border-color);
      margin: 8px 0;
    }

    .user-menu.clickable {
      cursor: pointer;
    }

    .user-menu.clickable:hover {
      opacity: 0.8;
    }
  </style>
  `;

  function injectPanel() {
    document.head.insertAdjacentHTML('beforeend', userPanelStyles);
    document.body.insertAdjacentHTML('beforeend', userPanelHTML);
    document.body.insertAdjacentHTML('beforeend', profileModalHTML);
  }

  function initializePanel() {
    const userMenu = document.querySelector('.user-menu');
    const userPanel = document.getElementById('user-panel');
    const profileModal = document.getElementById('profile-modal');

    if (!userMenu || !userPanel) return;

    // Make user menu clickable
    userMenu.classList.add('clickable');

    // Toggle panel on user menu click
    userMenu.addEventListener('click', function(e) {
      e.stopPropagation();
      userPanel.classList.toggle('active');

      // Close other panels
      document.getElementById('help-panel')?.classList.remove('active');
      document.getElementById('help-icon')?.classList.remove('active');
      document.getElementById('notification-panel')?.classList.remove('active');
      document.getElementById('notification-icon')?.classList.remove('active');
    });

    // My Profile button
    const myProfileBtn = document.getElementById('my-profile-btn');
    if (myProfileBtn && profileModal) {
      myProfileBtn.addEventListener('click', function(e) {
        e.preventDefault();
        userPanel.classList.remove('active');
        profileModal.classList.add('active');
      });

      // Close profile modal handlers
      const closeBtn = profileModal.querySelector('.modal-close');
      const cancelBtn = profileModal.querySelector('.modal-cancel');

      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          profileModal.classList.remove('active');
        });
      }

      if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
          profileModal.classList.remove('active');
        });
      }

      profileModal.addEventListener('click', function(e) {
        if (e.target === this) {
          this.classList.remove('active');
        }
      });

      // Profile upload area click handler
      const uploadArea = profileModal.querySelector('.profile-upload-area');
      const fileInput = profileModal.querySelector('input[type="file"]');
      if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', function() {
          fileInput.click();
        });
      }
    }

    // Switch account is handled by account-modals.js

    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
      if (!userPanel.contains(e.target) && !userMenu.contains(e.target)) {
        userPanel.classList.remove('active');
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      injectPanel();
      initializePanel();
    });
  } else {
    injectPanel();
    initializePanel();
  }
})();
