// User Panel Component
// Injects the user menu panel and handles interactions

(function() {
  'use strict';

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
      <a href="#" class="user-panel-link" id="settings-btn">
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

  const settingsModalHTML = `
  <div class="modal-overlay" id="settings-modal">
    <div class="modal settings-modal" style="max-width: 800px; max-height: 90vh;">
      <div class="modal-header">
        <h3 class="modal-title">Settings</h3>
        <button class="modal-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body" style="padding: 0; display: flex; height: 500px;">
        <!-- Settings Sidebar -->
        <div class="settings-sidebar">
          <a href="#" class="settings-nav-item active" data-settings-tab="general">
            <i class="fas fa-sliders-h"></i>
            <span>General</span>
          </a>
          <a href="#" class="settings-nav-item" data-settings-tab="features">
            <i class="fas fa-puzzle-piece"></i>
            <span>Features</span>
          </a>
          <a href="#" class="settings-nav-item" data-settings-tab="notifications">
            <i class="fas fa-bell"></i>
            <span>Notifications</span>
          </a>
          <a href="#" class="settings-nav-item" data-settings-tab="appearance">
            <i class="fas fa-palette"></i>
            <span>Appearance</span>
          </a>
          <a href="#" class="settings-nav-item" data-settings-tab="security">
            <i class="fas fa-shield-alt"></i>
            <span>Security</span>
          </a>
        </div>
        <!-- Settings Content -->
        <div class="settings-content">
          <!-- General Tab -->
          <div class="settings-tab active" id="settings-general">
            <h4 class="settings-section-title">General Preferences</h4>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Display Language</label>
                <select class="form-control form-select">
                  <option selected>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish (Español)</option>
                  <option>French (Français)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Default Currency</label>
                <select class="form-control form-select">
                  <option selected>USD - US Dollar</option>
                  <option>EUR - Euro</option>
                  <option>GBP - British Pound</option>
                  <option>CAD - Canadian Dollar</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Date Format</label>
                <select class="form-control form-select">
                  <option selected>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Time Zone</label>
                <select class="form-control form-select">
                  <option selected>Eastern Time (ET)</option>
                  <option>Pacific Time (PT)</option>
                  <option>Central Time (CT)</option>
                  <option>UTC</option>
                </select>
              </div>
            </div>
            <h4 class="settings-section-title mt-4">Privacy</h4>
            <div class="settings-toggle-item">
              <div>
                <div class="fw-600">Anonymous Data Collection</div>
                <div class="text-muted fs-sm">Help improve Argo Books by sharing anonymous usage data</div>
              </div>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <!-- Features Tab -->
          <div class="settings-tab" id="settings-features" style="display: none;">
            <h4 class="settings-section-title">Feature Modules</h4>
            <p class="text-muted fs-sm mb-3">Enable or disable feature modules based on your business needs.</p>
            <div class="settings-toggle-item">
              <div>
                <div class="fw-600">Invoices</div>
                <div class="text-muted fs-sm">Create and manage customer invoices</div>
              </div>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider"></span>
              </label>
            </div>
            <div class="settings-toggle-item">
              <div>
                <div class="fw-600">Payments</div>
                <div class="text-muted fs-sm">Track and process customer payments</div>
              </div>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider"></span>
              </label>
            </div>
            <div class="settings-toggle-item">
              <div>
                <div class="fw-600">Inventory</div>
                <div class="text-muted fs-sm">Track stock levels, transfers, and purchase orders</div>
              </div>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider"></span>
              </label>
            </div>
            <div class="settings-toggle-item">
              <div>
                <div class="fw-600">Employees</div>
                <div class="text-muted fs-sm">Manage employee records and information</div>
              </div>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider"></span>
              </label>
            </div>
            <div class="settings-toggle-item">
              <div>
                <div class="fw-600">Rentals</div>
                <div class="text-muted fs-sm">Manage equipment and item rentals</div>
              </div>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <!-- Notifications Tab -->
          <div class="settings-tab" id="settings-notifications" style="display: none;">
            <h4 class="settings-section-title">Notification Preferences</h4>
            <div class="settings-toggle-item">
              <div>
                <div class="fw-600">Low Stock Alert</div>
                <div class="text-muted fs-sm">Alert when stock falls below reorder point</div>
              </div>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider"></span>
              </label>
            </div>
            <div class="settings-toggle-item">
              <div>
                <div class="fw-600">Invoice Overdue</div>
                <div class="text-muted fs-sm">Alert when invoice passes due date</div>
              </div>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider"></span>
              </label>
            </div>
            <div class="settings-toggle-item">
              <div>
                <div class="fw-600">Payment Received</div>
                <div class="text-muted fs-sm">Alert when an invoice is paid</div>
              </div>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider"></span>
              </label>
            </div>
            <div class="settings-toggle-item">
              <div>
                <div class="fw-600">Large Transaction Alert</div>
                <div class="text-muted fs-sm">Alert for transactions above threshold</div>
              </div>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <!-- Appearance Tab -->
          <div class="settings-tab" id="settings-appearance" style="display: none;">
            <h4 class="settings-section-title">Theme</h4>
            <div class="theme-options">
              <label class="theme-option selected">
                <input type="radio" name="theme" value="light" checked>
                <div class="theme-preview light"></div>
                <span>Light</span>
              </label>
              <label class="theme-option">
                <input type="radio" name="theme" value="dark">
                <div class="theme-preview dark"></div>
                <span>Dark</span>
              </label>
              <label class="theme-option">
                <input type="radio" name="theme" value="system">
                <div class="theme-preview system"></div>
                <span>System</span>
              </label>
            </div>
            <h4 class="settings-section-title mt-4">Accent Color</h4>
            <div class="accent-colors">
              <div class="accent-color selected" style="background: #0075ff;" data-color="blue"></div>
              <div class="accent-color" style="background: #28a745;" data-color="green"></div>
              <div class="accent-color" style="background: #6f42c1;" data-color="purple"></div>
              <div class="accent-color" style="background: #e83e8c;" data-color="pink"></div>
              <div class="accent-color" style="background: #fd7e14;" data-color="orange"></div>
              <div class="accent-color" style="background: #17a2b8;" data-color="teal"></div>
            </div>
          </div>

          <!-- Security Tab -->
          <div class="settings-tab" id="settings-security" style="display: none;">
            <h4 class="settings-section-title">Security Settings</h4>
            <div class="settings-toggle-item">
              <div>
                <div class="fw-600">Password</div>
                <div class="text-muted fs-sm">Change your account password</div>
              </div>
              <button class="btn btn-outline btn-sm">Change</button>
            </div>
            <div class="settings-toggle-item">
              <div>
                <div class="fw-600">Windows Hello</div>
                <div class="text-muted fs-sm">Use fingerprint or face to sign in</div>
              </div>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider"></span>
              </label>
            </div>
            <div class="settings-toggle-item">
              <div>
                <div class="fw-600">File Encryption</div>
                <div class="text-muted fs-sm">Encrypt all data files with AES-256</div>
              </div>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider"></span>
              </label>
            </div>
            <div class="settings-toggle-item">
              <div>
                <div class="fw-600">Auto-lock</div>
                <div class="text-muted fs-sm">Lock after 15 minutes of inactivity</div>
              </div>
              <label class="switch">
                <input type="checkbox">
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary modal-cancel">Cancel</button>
        <button class="btn btn-outline" id="settings-apply-btn">Apply</button>
        <button class="btn btn-primary" id="settings-save-btn">Save</button>
      </div>
    </div>
  </div>
  `;

  const settingsModalStyles = `
  <style id="settings-modal-styles">
    .settings-modal .modal-body {
      overflow: hidden;
    }
    .settings-sidebar {
      width: 180px;
      background: var(--gray-50);
      border-right: 1px solid var(--border-color);
      padding: 16px 0;
      flex-shrink: 0;
    }
    .settings-nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 20px;
      color: var(--text-secondary);
      text-decoration: none;
      transition: all 0.2s;
    }
    .settings-nav-item:hover {
      background: var(--gray-100);
      color: var(--text-primary);
    }
    .settings-nav-item.active {
      background: var(--primary-light);
      color: var(--primary-color);
      border-right: 3px solid var(--primary-color);
    }
    .settings-nav-item i {
      width: 18px;
      font-size: 14px;
    }
    .settings-nav-item span {
      font-size: 14px;
    }
    .settings-content {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
    }
    .settings-section-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border-color);
    }
    .settings-toggle-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: var(--gray-50);
      border-radius: var(--radius);
      margin-bottom: 8px;
    }
    .theme-options {
      display: flex;
      gap: 16px;
    }
    .theme-option {
      cursor: pointer;
      text-align: center;
    }
    .theme-option input {
      display: none;
    }
    .theme-preview {
      width: 80px;
      height: 50px;
      border-radius: var(--radius);
      border: 2px solid var(--border-color);
      margin-bottom: 8px;
      transition: border-color 0.2s;
    }
    .theme-option.selected .theme-preview,
    .theme-option input:checked + .theme-preview {
      border-color: var(--primary-color);
    }
    .theme-preview.light {
      background: linear-gradient(135deg, #f5f7fa 50%, #1e2a3a 50%);
    }
    .theme-preview.dark {
      background: linear-gradient(135deg, #1a1a2e 50%, #16213e 50%);
    }
    .theme-preview.system {
      background: linear-gradient(135deg, #f5f7fa 33%, #1e2a3a 33%, #1e2a3a 66%, #0075ff 66%);
    }
    .accent-colors {
      display: flex;
      gap: 12px;
    }
    .accent-color {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      border: 3px solid transparent;
      transition: transform 0.2s, border-color 0.2s;
    }
    .accent-color:hover {
      transform: scale(1.1);
    }
    .accent-color.selected {
      border-color: var(--text-primary);
    }
  </style>
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
    document.head.insertAdjacentHTML('beforeend', settingsModalStyles);
    document.body.insertAdjacentHTML('beforeend', userPanelHTML);
    document.body.insertAdjacentHTML('beforeend', profileModalHTML);
    document.body.insertAdjacentHTML('beforeend', settingsModalHTML);
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

    // Settings button
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    if (settingsBtn && settingsModal) {
      settingsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        userPanel.classList.remove('active');
        settingsModal.classList.add('active');
      });

      // Settings modal close handlers
      const settingsCloseBtn = settingsModal.querySelector('.modal-close');
      const settingsCancelBtn = settingsModal.querySelector('.modal-cancel');
      const settingsApplyBtn = document.getElementById('settings-apply-btn');
      const settingsSaveBtn = document.getElementById('settings-save-btn');

      if (settingsCloseBtn) {
        settingsCloseBtn.addEventListener('click', () => settingsModal.classList.remove('active'));
      }
      if (settingsCancelBtn) {
        settingsCancelBtn.addEventListener('click', () => settingsModal.classList.remove('active'));
      }
      if (settingsApplyBtn) {
        settingsApplyBtn.addEventListener('click', () => {
          showToast('Settings applied', 'success');
        });
      }
      if (settingsSaveBtn) {
        settingsSaveBtn.addEventListener('click', () => {
          settingsModal.classList.remove('active');
          showToast('Settings saved', 'success');
        });
      }

      settingsModal.addEventListener('click', function(e) {
        if (e.target === settingsModal) {
          settingsModal.classList.remove('active');
        }
      });

      // Settings tab navigation
      const settingsNavItems = settingsModal.querySelectorAll('.settings-nav-item');
      settingsNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
          e.preventDefault();
          const tabId = this.getAttribute('data-settings-tab');

          // Update nav items
          settingsNavItems.forEach(nav => nav.classList.remove('active'));
          this.classList.add('active');

          // Update tabs
          settingsModal.querySelectorAll('.settings-tab').forEach(tab => {
            tab.style.display = 'none';
          });
          document.getElementById('settings-' + tabId).style.display = 'block';
        });
      });

      // Theme options
      const themeOptions = settingsModal.querySelectorAll('.theme-option');
      themeOptions.forEach(option => {
        option.addEventListener('click', function() {
          themeOptions.forEach(opt => opt.classList.remove('selected'));
          this.classList.add('selected');
        });
      });

      // Accent colors
      const accentColors = settingsModal.querySelectorAll('.accent-color');
      accentColors.forEach(color => {
        color.addEventListener('click', function() {
          accentColors.forEach(c => c.classList.remove('selected'));
          this.classList.add('selected');
        });
      });
    }

    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
      if (!userPanel.contains(e.target) && !userMenu.contains(e.target)) {
        userPanel.classList.remove('active');
      }
    });
  }

  function showToast(message, type = 'info') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 8px;';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'var(--success-color)' : 'var(--gray-800)';
    toast.style.cssText = `background: ${bgColor}; color: white; padding: 12px 20px; border-radius: 8px; font-size: 14px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); animation: slideIn 0.3s ease; display: flex; align-items: center; gap: 8px;`;
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    toastContainer.appendChild(toast);

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
      injectPanel();
      initializePanel();
    });
  } else {
    injectPanel();
    initializePanel();
  }
})();
