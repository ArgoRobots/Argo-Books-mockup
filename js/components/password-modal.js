// Password Change Modal Component
// Injects the change password modal and handles interactions

(function() {
  'use strict';

  const passwordModalHTML = `
  <div class="modal-overlay" id="password-modal">
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title">Change Password</h3>
        <button class="modal-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Current Password</label>
          <input type="password" class="form-control" placeholder="Enter current password">
        </div>
        <div class="form-group">
          <label class="form-label">New Password</label>
          <input type="password" class="form-control" placeholder="Enter new password">
        </div>
        <div class="form-group">
          <label class="form-label">Confirm New Password</label>
          <input type="password" class="form-control" placeholder="Confirm new password">
        </div>
        <div class="mt-3 p-3" style="background: var(--gray-100); border-radius: var(--radius);">
          <h5 class="fw-600 mb-2">Password Requirements:</h5>
          <ul class="text-muted fs-sm" style="padding-left: 20px; list-style: disc;">
            <li>At least 8 characters</li>
            <li>At least one uppercase letter</li>
            <li>At least one lowercase letter</li>
            <li>At least one number</li>
            <li>At least one special character</li>
          </ul>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline modal-cancel">Cancel</button>
        <button class="btn btn-primary">Update Password</button>
      </div>
    </div>
  </div>
  `;

  function injectModal() {
    document.body.insertAdjacentHTML('beforeend', passwordModalHTML);
  }

  function initializeModalHandlers() {
    const modal = document.getElementById('password-modal');
    const openBtn = document.getElementById('change-password-btn');

    if (!modal) return;

    // Open modal
    if (openBtn) {
      openBtn.addEventListener('click', function() {
        modal.classList.add('active');
      });
    }

    // Close handlers
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

    // Close when clicking overlay
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      injectModal();
      initializeModalHandlers();
    });
  } else {
    injectModal();
    initializeModalHandlers();
  }
})();
