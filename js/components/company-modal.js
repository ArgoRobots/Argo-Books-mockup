// Company Modal Component
// Injects the Switch Company modal into the page and handles all related interactions

(function() {
  'use strict';

  const modalHTML = `
  <div class="modal-overlay" id="company-modal">
    <div class="modal company-modal">
      <div class="modal-header">
        <h3 class="modal-title">Switch Company</h3>
        <button class="modal-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <div class="company-list">
          <div class="company-item active">
            <div class="company-logo">
              <i class="fas fa-building"></i>
            </div>
            <div class="company-details">
              <div class="company-name">My Company Inc.</div>
              <div class="company-email">contact@mycompany.com</div>
            </div>
          </div>
          <div class="company-item">
            <div class="company-logo">
              <i class="fas fa-store"></i>
            </div>
            <div class="company-details">
              <div class="company-name">Side Business LLC</div>
              <div class="company-email">info@sidebusiness.com</div>
            </div>
          </div>
        </div>

        <div class="company-divider">or</div>

        <button class="add-company-btn">
          <i class="fas fa-plus"></i>
          Create New Company
        </button>

        <div class="company-info-section mt-3" style="display: none;" id="company-info-form">
          <h4 class="fw-600 mb-3">Company Information</h4>
          <div class="company-logo-upload">
            <div class="company-logo-preview">
              <i class="fas fa-building"></i>
            </div>
            <button class="btn btn-outline btn-sm">Upload Logo</button>
          </div>
          <div class="form-group">
            <label class="form-label">Company Name</label>
            <input type="text" class="form-control" placeholder="Enter company name">
          </div>
          <div class="form-group">
            <label class="form-label">Business Email</label>
            <input type="email" class="form-control" placeholder="contact@company.com">
          </div>
          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input type="tel" class="form-control" placeholder="(555) 123-4567">
          </div>
          <div class="form-group">
            <label class="form-label">Address</label>
            <textarea class="form-control" placeholder="Enter business address"></textarea>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline modal-cancel">Cancel</button>
        <button class="btn btn-primary">Switch Company</button>
      </div>
    </div>
  </div>
  `;

  function injectModal() {
    // Inject modal HTML at the end of body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  function initializeModalHandlers() {
    const companyModal = document.getElementById('company-modal');
    const sidebarHeader = document.querySelector('.sidebar-header.clickable');

    if (!companyModal) return;

    // Open modal when clicking sidebar header
    if (sidebarHeader) {
      sidebarHeader.addEventListener('click', function() {
        companyModal.classList.add('active');
      });
    }

    // Company item selection
    const companyItems = companyModal.querySelectorAll('.company-item');
    companyItems.forEach(item => {
      item.addEventListener('click', function() {
        companyItems.forEach(ci => ci.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Close modal handlers
    const closeBtn = companyModal.querySelector('.modal-close');
    const cancelBtn = companyModal.querySelector('.modal-cancel');

    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        companyModal.classList.remove('active');
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', function() {
        companyModal.classList.remove('active');
      });
    }

    // Close when clicking overlay
    companyModal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
      }
    });

    // Add company button - show form
    const addCompanyBtn = companyModal.querySelector('.add-company-btn');
    const companyInfoForm = companyModal.querySelector('#company-info-form');

    if (addCompanyBtn && companyInfoForm) {
      addCompanyBtn.addEventListener('click', function() {
        companyInfoForm.style.display = companyInfoForm.style.display === 'none' ? 'block' : 'none';
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      injectModal();
      initializeModalHandlers();
    });
  } else {
    // DOM already loaded
    injectModal();
    initializeModalHandlers();
  }
})();
