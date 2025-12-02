// Upgrade Modal Component
// Handles upgrade options and license key entry

(function() {
  'use strict';

  const upgradeModalHTML = `
  <div class="modal-overlay" id="upgrade-modal">
    <div class="modal" style="max-width: 600px;">
      <div class="modal-header">
        <h3 class="modal-title">Upgrade Your Plan</h3>
        <button class="modal-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <div class="upgrade-plans">
          <div class="upgrade-plan">
            <div class="plan-header">
              <div class="plan-icon premium">
                <i class="fas fa-crown"></i>
              </div>
              <div class="plan-info">
                <h4 class="plan-name">Premium</h4>
                <div class="plan-price">$49 <span>one-time</span></div>
              </div>
            </div>
            <ul class="plan-features">
              <li><i class="fas fa-check"></i> Unlimited Products</li>
              <li><i class="fas fa-check"></i> Windows Hello Security</li>
              <li><i class="fas fa-check"></i> Priority Support</li>
              <li><i class="fas fa-check"></i> Lifetime Updates</li>
            </ul>
            <button class="btn btn-outline btn-block">Select Premium</button>
          </div>
          <div class="upgrade-plan featured">
            <div class="plan-badge">Most Popular</div>
            <div class="plan-header">
              <div class="plan-icon ai">
                <i class="fas fa-robot"></i>
              </div>
              <div class="plan-info">
                <h4 class="plan-name">AI Subscription</h4>
                <div class="plan-price">$9.99 <span>/month</span></div>
              </div>
            </div>
            <ul class="plan-features">
              <li><i class="fas fa-check"></i> Everything in Premium</li>
              <li><i class="fas fa-check"></i> AI Receipt Scanning</li>
              <li><i class="fas fa-check"></i> Predictive Sales Analysis</li>
              <li><i class="fas fa-check"></i> AI Business Insights</li>
            </ul>
            <button class="btn btn-primary btn-block">Select AI Plan</button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" id="enter-key-btn">
          <i class="fas fa-key"></i>
          Enter a Key
        </button>
      </div>
    </div>
  </div>
  `;

  const enterKeyModalHTML = `
  <div class="modal-overlay" id="enter-key-modal">
    <div class="modal" style="max-width: 420px;">
      <div class="modal-header">
        <h3 class="modal-title">Enter License Key</h3>
        <button class="modal-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <p class="text-muted mb-3">Enter your license key to activate your premium features.</p>
        <div class="form-group mb-0">
          <label class="form-label">License Key</label>
          <input type="text" class="form-control" id="license-key-input" placeholder="XXXX-XXXX-XXXX-XXXX">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline modal-cancel">Cancel</button>
        <button class="btn btn-primary" id="verify-key-btn">
          <i class="fas fa-check-circle"></i>
          Verify Key
        </button>
      </div>
    </div>
  </div>
  `;

  const upgradeModalStyles = `
  <style id="upgrade-modal-styles">
    .upgrade-plans {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .upgrade-plan {
      border: 2px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 20px;
      position: relative;
      transition: all 0.2s ease;
    }

    .upgrade-plan:hover {
      border-color: var(--primary-color);
    }

    .upgrade-plan.featured {
      border-color: var(--primary-color);
      background: var(--primary-light);
    }

    .plan-badge {
      position: absolute;
      top: -10px;
      right: 16px;
      background: var(--primary-color);
      color: white;
      font-size: 11px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 20px;
    }

    .plan-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .plan-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }

    .plan-icon.premium {
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
      color: white;
    }

    .plan-icon.ai {
      background: linear-gradient(135deg, #8b5cf6, #6366f1);
      color: white;
    }

    .plan-info {
      flex: 1;
    }

    .plan-name {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 4px 0;
      color: var(--text-primary);
    }

    .plan-price {
      font-size: 20px;
      font-weight: 700;
      color: var(--primary-color);
    }

    .plan-price span {
      font-size: 13px;
      font-weight: 400;
      color: var(--text-muted);
    }

    .plan-features {
      list-style: none;
      padding: 0;
      margin: 0 0 16px 0;
    }

    .plan-features li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 0;
      font-size: 13px;
      color: var(--text-secondary);
      border-bottom: 1px solid var(--border-color);
    }

    .plan-features li:last-child {
      border-bottom: none;
    }

    .plan-features li i {
      color: var(--success-color);
      font-size: 12px;
    }

    .btn-block {
      width: 100%;
    }

    #enter-key-btn {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    #license-key-input {
      font-family: monospace;
      font-size: 16px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
  </style>
  `;

  function injectModals() {
    document.head.insertAdjacentHTML('beforeend', upgradeModalStyles);
    document.body.insertAdjacentHTML('beforeend', upgradeModalHTML);
    document.body.insertAdjacentHTML('beforeend', enterKeyModalHTML);
  }

  function initializeModals() {
    const upgradeModal = document.getElementById('upgrade-modal');
    const enterKeyModal = document.getElementById('enter-key-modal');
    const upgradeIcon = document.getElementById('upgrade-icon');
    const enterKeyBtn = document.getElementById('enter-key-btn');

    if (!upgradeModal || !enterKeyModal) return;

    // Open upgrade modal from header icon
    if (upgradeIcon) {
      upgradeIcon.addEventListener('click', function() {
        upgradeModal.classList.add('active');
      });
    }

    // Open enter key modal from upgrade modal
    if (enterKeyBtn) {
      enterKeyBtn.addEventListener('click', function() {
        upgradeModal.classList.remove('active');
        enterKeyModal.classList.add('active');
      });
    }

    // Close handlers for both modals
    [upgradeModal, enterKeyModal].forEach(modal => {
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

    // Verify key button handler (mock)
    const verifyKeyBtn = document.getElementById('verify-key-btn');
    if (verifyKeyBtn) {
      verifyKeyBtn.addEventListener('click', function() {
        const keyInput = document.getElementById('license-key-input');
        if (keyInput && keyInput.value.trim()) {
          alert('Key verification would happen here.');
          enterKeyModal.classList.remove('active');
        }
      });
    }
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
