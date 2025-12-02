// Account Modals Component
// Switch Account modal and Login modal

(function() {
  'use strict';

  const switchAccountModalHTML = `
  <div class="modal-overlay" id="switch-account-modal">
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title">Switch Account</h3>
        <button class="modal-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <div class="account-list">
          <div class="account-item" data-account="john">
            <div class="account-avatar">JD</div>
            <div class="account-details">
              <div class="account-name">John Doe</div>
              <div class="account-role">Administrator</div>
            </div>
            <span class="badge badge-success">Active</span>
          </div>
          <div class="account-item" data-account="sarah">
            <div class="account-avatar" style="background: #8b5cf6;">SM</div>
            <div class="account-details">
              <div class="account-name">Sarah Miller</div>
              <div class="account-role">Accountant</div>
            </div>
          </div>
          <div class="account-item" data-account="mike">
            <div class="account-avatar" style="background: #22c55e;">MJ</div>
            <div class="account-details">
              <div class="account-name">Mike Johnson</div>
              <div class="account-role">Accountant</div>
            </div>
          </div>
          <div class="account-item" data-account="emily">
            <div class="account-avatar" style="background: #f97316;">EB</div>
            <div class="account-details">
              <div class="account-name">Emily Brown</div>
              <div class="account-role">Bookkeeper</div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline modal-cancel">Cancel</button>
      </div>
    </div>
  </div>
  `;

  const loginModalHTML = `
  <div class="modal-overlay" id="login-modal">
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title">Sign In</h3>
        <button class="modal-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <div class="login-account-info">
          <div class="login-avatar" id="login-avatar">SM</div>
          <div class="login-name" id="login-name">Sarah Miller</div>
        </div>
        <div class="form-group">
          <label class="form-label">Username</label>
          <input type="text" class="form-control" id="login-username" placeholder="Enter username">
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" placeholder="Enter password">
        </div>
        <div class="login-divider">
          <span>or</span>
        </div>
        <button class="btn btn-windows-hello">
          <i class="fas fa-fingerprint"></i>
          Sign in with Windows Hello
        </button>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline modal-cancel">Cancel</button>
        <button class="btn btn-primary">Sign In</button>
      </div>
    </div>
  </div>
  `;

  const accountModalStyles = `
  <style id="account-modal-styles">
    .account-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .account-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--bg-secondary);
      border-radius: var(--radius);
      cursor: pointer;
      transition: background-color 0.2s ease, box-shadow 0.2s ease;
    }

    .account-item:hover {
      background: var(--gray-200);
    }

    .account-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
      flex-shrink: 0;
    }

    .account-details {
      flex: 1;
      min-width: 0;
    }

    .account-name {
      font-weight: 600;
      color: var(--text-primary);
      font-size: 14px;
    }

    .account-role {
      font-size: 12px;
      color: var(--text-muted);
    }

    .login-account-info {
      text-align: center;
      margin-bottom: 24px;
    }

    .login-avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 24px;
      margin: 0 auto 12px;
    }

    .login-name {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .login-divider {
      display: flex;
      align-items: center;
      margin: 20px 0;
    }

    .login-divider::before,
    .login-divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border-color);
    }

    .login-divider span {
      padding: 0 16px;
      color: var(--text-muted);
      font-size: 14px;
    }

    .btn-windows-hello {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 12px 20px;
      background: var(--gray-900);
      color: white;
      border: none;
      border-radius: var(--radius);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .btn-windows-hello:hover {
      background: var(--gray-800);
    }

    .btn-windows-hello i {
      font-size: 18px;
    }
  </style>
  `;

  // Account data for login modal
  const accounts = {
    john: { initials: 'JD', name: 'John Doe', color: 'var(--primary-color)', username: 'john.doe' },
    sarah: { initials: 'SM', name: 'Sarah Miller', color: '#8b5cf6', username: 'sarah.miller' },
    mike: { initials: 'MJ', name: 'Mike Johnson', color: '#22c55e', username: 'mike.johnson' },
    emily: { initials: 'EB', name: 'Emily Brown', color: '#f97316', username: 'emily.brown' }
  };

  function injectModals() {
    document.head.insertAdjacentHTML('beforeend', accountModalStyles);
    document.body.insertAdjacentHTML('beforeend', switchAccountModalHTML);
    document.body.insertAdjacentHTML('beforeend', loginModalHTML);
  }

  function initializeModals() {
    const switchAccountModal = document.getElementById('switch-account-modal');
    const loginModal = document.getElementById('login-modal');
    const switchAccountBtn = document.getElementById('switch-account-btn');

    if (!switchAccountModal || !loginModal) return;

    // Open switch account modal from user panel
    if (switchAccountBtn) {
      switchAccountBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('user-panel')?.classList.remove('active');
        switchAccountModal.classList.add('active');
      });
    }

    // Account item click - open login modal
    const accountItems = switchAccountModal.querySelectorAll('.account-item');
    accountItems.forEach(item => {
      item.addEventListener('click', function() {
        const accountId = this.dataset.account;
        const account = accounts[accountId];

        if (account) {
          // Update login modal with account info
          const avatar = loginModal.querySelector('#login-avatar');
          const name = loginModal.querySelector('#login-name');
          const username = loginModal.querySelector('#login-username');

          if (avatar) {
            avatar.textContent = account.initials;
            avatar.style.background = account.color;
          }
          if (name) name.textContent = account.name;
          if (username) username.value = account.username;
        }

        switchAccountModal.classList.remove('active');
        loginModal.classList.add('active');
      });
    });

    // Close handlers for both modals
    [switchAccountModal, loginModal].forEach(modal => {
      const closeBtn = modal.querySelector('.modal-close');
      const cancelBtn = modal.querySelector('.modal-cancel');

      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          modal.classList.remove('active');
        });
      }

      if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
          modal.classList.remove('active');
        });
      }

      modal.addEventListener('click', function(e) {
        if (e.target === this) {
          this.classList.remove('active');
        }
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      injectModals();
      initializeModals();
    });
  } else {
    injectModals();
    initializeModals();
  }
})();
