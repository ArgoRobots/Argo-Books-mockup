// Notification Panel Component
// Injects the notification panel and handles interactions

(function() {
  'use strict';

  const notificationPanelHTML = `
  <div class="notification-panel" id="notification-panel">
    <div class="notification-panel-header">
      <h3>Notifications</h3>
      <button class="btn-link text-primary fs-sm">Mark all as read</button>
    </div>
    <div class="notification-panel-body">
      <div class="notification-item unread">
        <div class="notification-icon blue">
          <i class="fas fa-file-invoice-dollar"></i>
        </div>
        <div class="notification-content">
          <div class="notification-text">New invoice <strong>#INV-2024-089</strong> has been created</div>
          <div class="notification-time">5 minutes ago</div>
        </div>
      </div>
      <div class="notification-item unread">
        <div class="notification-icon green">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="notification-content">
          <div class="notification-text">Payment of <strong>$1,250.00</strong> received from Acme Corp</div>
          <div class="notification-time">1 hour ago</div>
        </div>
      </div>
      <div class="notification-item unread">
        <div class="notification-icon orange">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="notification-content">
          <div class="notification-text">Low stock alert: <strong>Widget Pro X</strong> (3 remaining)</div>
          <div class="notification-time">2 hours ago</div>
        </div>
      </div>
      <div class="notification-item">
        <div class="notification-icon purple">
          <i class="fas fa-user-plus"></i>
        </div>
        <div class="notification-content">
          <div class="notification-text">New customer <strong>Jane Smith</strong> registered</div>
          <div class="notification-time">Yesterday</div>
        </div>
      </div>
      <div class="notification-item">
        <div class="notification-icon blue">
          <i class="fas fa-sync"></i>
        </div>
        <div class="notification-content">
          <div class="notification-text">Data backup completed successfully</div>
          <div class="notification-time">2 days ago</div>
        </div>
      </div>
    </div>
    <div class="notification-panel-footer">
      <a href="#" class="btn-link">View all notifications</a>
    </div>
  </div>
  `;

  const notificationPanelStyles = `
  <style id="notification-panel-styles">
    .notification-panel {
      position: fixed;
      top: 60px;
      right: 60px;
      width: 360px;
      background: var(--white);
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
    }

    .notification-panel.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .notification-panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-color);
    }

    .notification-panel-header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .notification-panel-body {
      max-height: 400px;
      overflow-y: auto;
    }

    .notification-item {
      display: flex;
      gap: 12px;
      padding: 14px 20px;
      border-bottom: 1px solid var(--border-color);
      transition: background-color 0.2s ease;
      cursor: pointer;
    }

    .notification-item:hover {
      background-color: var(--bg-secondary);
    }

    .notification-item.unread {
      background-color: rgba(37, 99, 235, 0.05);
    }

    .notification-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .notification-icon.blue {
      background-color: rgba(37, 99, 235, 0.1);
      color: #2563eb;
    }

    .notification-icon.green {
      background-color: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }

    .notification-icon.orange {
      background-color: rgba(249, 115, 22, 0.1);
      color: #f97316;
    }

    .notification-icon.purple {
      background-color: rgba(139, 92, 246, 0.1);
      color: #8b5cf6;
    }

    .notification-content {
      flex: 1;
      min-width: 0;
    }

    .notification-text {
      font-size: 14px;
      color: var(--text-primary);
      line-height: 1.4;
    }

    .notification-time {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 4px;
    }

    .notification-panel-footer {
      padding: 12px 20px;
      text-align: center;
      border-top: 1px solid var(--border-color);
    }

    .btn-link {
      background: none;
      border: none;
      color: var(--primary-color);
      cursor: pointer;
      font-size: 14px;
      text-decoration: none;
    }

    .btn-link:hover {
      text-decoration: underline;
    }

    #notification-icon.active {
      background-color: var(--bg-secondary);
    }
  </style>
  `;

  function injectPanel() {
    document.head.insertAdjacentHTML('beforeend', notificationPanelStyles);
    document.body.insertAdjacentHTML('beforeend', notificationPanelHTML);
  }

  function initializePanel() {
    const notificationIcon = document.getElementById('notification-icon');
    const notificationPanel = document.getElementById('notification-panel');

    if (!notificationIcon || !notificationPanel) return;

    // Toggle panel on icon click
    notificationIcon.addEventListener('click', function(e) {
      e.stopPropagation();
      notificationPanel.classList.toggle('active');
      notificationIcon.classList.toggle('active');

      // Close other panels
      document.getElementById('help-panel')?.classList.remove('active');
      document.getElementById('help-icon')?.classList.remove('active');
      document.getElementById('user-panel')?.classList.remove('active');
    });

    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
      if (!notificationPanel.contains(e.target) && !notificationIcon.contains(e.target)) {
        notificationPanel.classList.remove('active');
        notificationIcon.classList.remove('active');
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
