// Stats Date Range Component
// Injects a date range control above the stats-grid on each page
// Changing the value persists across all pages

(function() {
  'use strict';

  const STORAGE_KEY = 'argo-stats-date-range';

  const dateRangeHTML = `
    <div class="stats-date-range">
      <i class="fas fa-calendar-alt"></i>
      <select id="stats-date-range-select">
        <option value="this-month">This Month</option>
        <option value="last-month">Last Month</option>
        <option value="this-quarter">This Quarter</option>
        <option value="last-quarter">Last Quarter</option>
        <option value="this-year">This Year</option>
        <option value="last-year">Last Year</option>
        <option value="all-time">All Time</option>
      </select>
    </div>
  `;

  const dateRangeStyles = `
  <style id="stats-date-range-styles">
    .stats-date-range {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      background: var(--white);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      margin-bottom: 16px;
    }
    .stats-date-range i {
      color: var(--text-secondary);
      font-size: 14px;
    }
    .stats-date-range select {
      border: none;
      background: transparent;
      color: var(--text-primary);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
    }
    .stats-date-range select:focus {
      outline: none;
    }
  </style>
  `;

  function injectDateRange() {
    const statsGrid = document.querySelector('.stats-grid');
    if (!statsGrid) return;

    // Skip if page already has a date-range control (e.g., analytics page)
    if (document.querySelector('.date-range-control')) return;

    // Inject styles
    document.head.insertAdjacentHTML('beforeend', dateRangeStyles);

    // Inject the date range control before the stats grid
    statsGrid.insertAdjacentHTML('beforebegin', dateRangeHTML);

    // Restore saved value
    const select = document.getElementById('stats-date-range-select');
    const savedValue = localStorage.getItem(STORAGE_KEY);
    if (savedValue && select) {
      select.value = savedValue;
    }

    // Save value on change
    if (select) {
      select.addEventListener('change', function() {
        localStorage.setItem(STORAGE_KEY, this.value);
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectDateRange);
  } else {
    injectDateRange();
  }
})();
