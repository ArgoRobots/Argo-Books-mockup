// File Menu Component
// Injects the file menu button and panel into the header

(function() {
  'use strict';

  const importModalHTML = `
  <!-- Import Modal -->
  <div class="modal-overlay" id="importModal">
    <div class="modal" style="max-width: 600px;">
      <div class="modal-header">
        <h3 class="modal-title">Import Data</h3>
        <button class="modal-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <div class="import-upload-area" style="border: 2px dashed var(--border-color); border-radius: var(--radius-lg); padding: 40px 20px; text-align: center; cursor: pointer; transition: var(--transition); margin-bottom: 20px;">
          <i class="fas fa-cloud-upload-alt" style="font-size: 48px; color: var(--gray-400); margin-bottom: 16px;"></i>
          <h4 class="fw-600 mb-2">Drag and drop your file here</h4>
          <p class="text-muted mb-3">or click to browse</p>
          <button class="btn btn-outline">
            <i class="fas fa-folder-open"></i>
            Browse Files
          </button>
          <p class="text-muted fs-sm mt-3">Supported formats: Excel (.xlsx), CSV (.csv)</p>
          <input type="file" accept=".xlsx,.csv" style="display: none;">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Import Type</label>
            <select class="form-control form-select">
              <option>Select data type</option>
              <option>Expense Transactions</option>
              <option>Revenue Transactions</option>
              <option>Products</option>
              <option>Customers</option>
              <option>Suppliers</option>
              <option>Employees</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Date Format</label>
            <select class="form-control form-select">
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
        <div class="form-check mb-2">
          <input type="checkbox" class="form-check-input" checked>
          <label>Skip header row</label>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input">
          <label>Validate data before import</label>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary modal-cancel">Cancel</button>
        <button class="btn btn-primary" id="import-btn">
          <i class="fas fa-upload"></i>
          Start Import
        </button>
      </div>
    </div>
  </div>
  `;

  const exportModalHTML = `
  <!-- Export As Modal -->
  <div class="modal-overlay" id="exportAsModal">
    <div class="modal" style="max-width: 550px;">
      <div class="modal-header">
        <h3 class="modal-title">Export As</h3>
        <button class="modal-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <p class="text-muted mb-3">Choose how you want to export your data</p>

        <!-- Export Type Selection -->
        <div class="export-type-cards mb-4">
          <label class="export-type-card">
            <input type="radio" name="export-type" value="backup" checked>
            <div class="export-type-content">
              <div class="export-type-icon" style="background: var(--primary-light); color: var(--primary-color);">
                <i class="fas fa-database"></i>
              </div>
              <div class="export-type-info">
                <div class="fw-600">Backup File</div>
                <div class="text-muted fs-sm">Save a complete backup of all your data (.argobk)</div>
              </div>
            </div>
          </label>
          <label class="export-type-card">
            <input type="radio" name="export-type" value="spreadsheet">
            <div class="export-type-content">
              <div class="export-type-icon" style="background: #e6f7e6; color: var(--success-color);">
                <i class="fas fa-file-excel"></i>
              </div>
              <div class="export-type-info">
                <div class="fw-600">Spreadsheet</div>
                <div class="text-muted fs-sm">Export selected data as Excel or CSV file</div>
              </div>
            </div>
          </label>
        </div>

        <!-- Spreadsheet Options (shown when spreadsheet is selected) -->
        <div id="spreadsheet-options" style="display: none;">
          <div class="form-group mb-3">
            <label class="form-label">File Format</label>
            <select class="form-control form-select">
              <option value="xlsx">Excel (.xlsx)</option>
              <option value="csv">CSV (.csv)</option>
              <option value="pdf">PDF (.pdf)</option>
            </select>
          </div>

          <div class="form-group">
            <div class="d-flex justify-between align-center mb-2">
              <label class="form-label mb-0">Select Data to Export</label>
              <label class="d-flex align-center gap-2" style="cursor: pointer;">
                <input type="checkbox" class="form-check-input" id="select-all-data">
                <span class="fs-sm">Select All</span>
              </label>
            </div>
            <div class="export-data-list">
              <label class="export-data-item">
                <input type="checkbox" class="form-check-input data-checkbox" checked>
                <span>Customers</span>
                <span class="text-muted fs-sm">(156 records)</span>
              </label>
              <label class="export-data-item">
                <input type="checkbox" class="form-check-input data-checkbox" checked>
                <span>Invoices</span>
                <span class="text-muted fs-sm">(1,245 records)</span>
              </label>
              <label class="export-data-item">
                <input type="checkbox" class="form-check-input data-checkbox">
                <span>Expenses</span>
                <span class="text-muted fs-sm">(892 records)</span>
              </label>
              <label class="export-data-item">
                <input type="checkbox" class="form-check-input data-checkbox">
                <span>Products</span>
                <span class="text-muted fs-sm">(342 records)</span>
              </label>
              <label class="export-data-item">
                <input type="checkbox" class="form-check-input data-checkbox">
                <span>Inventory</span>
                <span class="text-muted fs-sm">(1,847 records)</span>
              </label>
              <label class="export-data-item">
                <input type="checkbox" class="form-check-input data-checkbox">
                <span>Payments</span>
                <span class="text-muted fs-sm">(2,156 records)</span>
              </label>
              <label class="export-data-item">
                <input type="checkbox" class="form-check-input data-checkbox">
                <span>Suppliers</span>
                <span class="text-muted fs-sm">(48 records)</span>
              </label>
              <label class="export-data-item">
                <input type="checkbox" class="form-check-input data-checkbox">
                <span>Reports</span>
                <span class="text-muted fs-sm">(Monthly summaries)</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Backup Options (shown when backup is selected) -->
        <div id="backup-options">
          <div class="card" style="background: var(--gray-50); border: 1px solid var(--border-color);">
            <div class="card-body p-3">
              <div class="d-flex align-center gap-3 mb-2">
                <i class="fas fa-shield-alt text-primary" style="font-size: 24px;"></i>
                <div>
                  <div class="fw-600">Complete Backup</div>
                  <div class="text-muted fs-sm">Includes all data, settings, and attachments</div>
                </div>
              </div>
              <label class="d-flex align-center gap-2 mt-2">
                <input type="checkbox" class="form-check-input" checked>
                <span class="fs-sm">Include file attachments</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary modal-cancel">Cancel</button>
        <button class="btn btn-primary" id="export-btn">
          <i class="fas fa-download"></i>
          Export
        </button>
      </div>
    </div>
  </div>
  `;

  const exportModalStyles = `
  <style id="export-modal-styles">
    .export-type-cards {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .export-type-card {
      display: block;
      cursor: pointer;
    }
    .export-type-card input {
      display: none;
    }
    .export-type-content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-lg);
      transition: var(--transition);
    }
    .export-type-card input:checked + .export-type-content {
      border-color: var(--primary-color);
      background: var(--primary-light);
    }
    .export-type-card:hover .export-type-content {
      border-color: var(--primary-color);
    }
    .export-type-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
    .export-type-info {
      flex: 1;
    }
    .export-data-list {
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      max-height: 250px;
      overflow-y: auto;
    }
    .export-data-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border-color);
      cursor: pointer;
      transition: var(--transition);
    }
    .export-data-item:last-child {
      border-bottom: none;
    }
    .export-data-item:hover {
      background: var(--gray-50);
    }
    .export-data-item span:first-of-type {
      flex: 1;
    }
  </style>
  `;

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
      <a href="#" class="file-menu-item" id="file-import">
        <i class="fas fa-file-arrow-up"></i>
        <span>Import...</span>
      </a>
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
      left: 320px;
      width: 260px;
      background: var(--white);
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease, left 0.2s ease;
    }

    .file-menu-panel.sidebar-collapsed {
      left: 140px;
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

      .file-menu-panel.sidebar-collapsed {
        left: 16px;
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
    document.head.insertAdjacentHTML('beforeend', exportModalStyles);

    // Inject panel and export modal into body
    document.body.insertAdjacentHTML('beforeend', fileMenuHTML);
    document.body.insertAdjacentHTML('beforeend', exportModalHTML);
    document.body.insertAdjacentHTML('beforeend', importModalHTML);

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

    // Listen for sidebar toggle to adjust panel position
    window.addEventListener('sidebarToggle', function(e) {
      if (e.detail.collapsed) {
        filePanel.classList.add('sidebar-collapsed');
      } else {
        filePanel.classList.remove('sidebar-collapsed');
      }
    });

    // Check initial sidebar state
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && sidebar.classList.contains('collapsed')) {
      filePanel.classList.add('sidebar-collapsed');
    }
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

      case 'file-import':
        const importModal = document.getElementById('importModal');
        if (importModal) {
          importModal.classList.add('active');
          initImportModal();
        }
        break;

      case 'file-export-as':
        const exportModal = document.getElementById('exportAsModal');
        if (exportModal) {
          exportModal.classList.add('active');
          initExportModal();
        }
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

  function initExportModal() {
    const exportModal = document.getElementById('exportAsModal');
    if (!exportModal) return;

    const backupOptions = document.getElementById('backup-options');
    const spreadsheetOptions = document.getElementById('spreadsheet-options');
    const exportTypeRadios = exportModal.querySelectorAll('input[name="export-type"]');
    const selectAllCheckbox = document.getElementById('select-all-data');
    const dataCheckboxes = exportModal.querySelectorAll('.data-checkbox');
    const exportBtn = document.getElementById('export-btn');

    // Toggle options based on export type
    exportTypeRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.value === 'backup') {
          backupOptions.style.display = 'block';
          spreadsheetOptions.style.display = 'none';
        } else {
          backupOptions.style.display = 'none';
          spreadsheetOptions.style.display = 'block';
        }
      });
    });

    // Select all checkbox logic
    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener('change', function() {
        dataCheckboxes.forEach(cb => cb.checked = this.checked);
      });
    }

    // Update select all when individual checkboxes change
    dataCheckboxes.forEach(cb => {
      cb.addEventListener('change', function() {
        const allChecked = Array.from(dataCheckboxes).every(c => c.checked);
        const someChecked = Array.from(dataCheckboxes).some(c => c.checked);
        if (selectAllCheckbox) {
          selectAllCheckbox.checked = allChecked;
          selectAllCheckbox.indeterminate = someChecked && !allChecked;
        }
      });
    });

    // Close modal handlers
    const closeBtn = exportModal.querySelector('.modal-close');
    const cancelBtn = exportModal.querySelector('.modal-cancel');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => exportModal.classList.remove('active'));
    }
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => exportModal.classList.remove('active'));
    }

    // Close on overlay click
    exportModal.addEventListener('click', function(e) {
      if (e.target === exportModal) {
        exportModal.classList.remove('active');
      }
    });

    // Export button action
    if (exportBtn) {
      exportBtn.addEventListener('click', function() {
        const selectedType = exportModal.querySelector('input[name="export-type"]:checked')?.value;
        exportModal.classList.remove('active');
        if (selectedType === 'backup') {
          showToast('Creating backup file...', 'success');
        } else {
          const checkedCount = Array.from(dataCheckboxes).filter(c => c.checked).length;
          showToast(`Exporting ${checkedCount} data sets...`, 'success');
        }
      });
    }
  }

  function initImportModal() {
    const importModal = document.getElementById('importModal');
    if (!importModal) return;

    const uploadArea = importModal.querySelector('.import-upload-area');
    const fileInput = importModal.querySelector('input[type="file"]');
    const importBtn = document.getElementById('import-btn');

    // Upload area click handler
    if (uploadArea && fileInput) {
      uploadArea.addEventListener('click', function(e) {
        if (e.target.tagName !== 'BUTTON') {
          fileInput.click();
        }
      });

      const browseBtn = uploadArea.querySelector('.btn');
      if (browseBtn) {
        browseBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          fileInput.click();
        });
      }

      fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
          const fileName = this.files[0].name;
          uploadArea.innerHTML = `
            <i class="fas fa-file-excel" style="font-size: 48px; color: var(--success-color); margin-bottom: 16px;"></i>
            <h4 class="fw-600 mb-2">${fileName}</h4>
            <p class="text-muted mb-3">File selected</p>
            <button class="btn btn-outline">
              <i class="fas fa-folder-open"></i>
              Choose Different File
            </button>
          `;
        }
      });
    }

    // Close modal handlers
    const closeBtn = importModal.querySelector('.modal-close');
    const cancelBtn = importModal.querySelector('.modal-cancel');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => importModal.classList.remove('active'));
    }
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => importModal.classList.remove('active'));
    }

    // Close on overlay click
    importModal.addEventListener('click', function(e) {
      if (e.target === importModal) {
        importModal.classList.remove('active');
      }
    });

    // Import button action
    if (importBtn) {
      importBtn.addEventListener('click', function() {
        importModal.classList.remove('active');
        showToast('Starting import...', 'success');
      });
    }
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
