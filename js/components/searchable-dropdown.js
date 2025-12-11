/**
 * Searchable Dropdown Component
 * Converts select elements with data-searchable attribute into searchable text inputs
 * with a dropdown panel that filters as you type.
 */

class SearchableDropdown {
  constructor(container) {
    this.container = container;
    this.input = container.querySelector('.search-input');
    this.panel = container.querySelector('.dropdown-panel');
    this.hiddenInput = container.querySelector('input[type="hidden"]');
    this.items = JSON.parse(container.dataset.items || '[]');
    this.selectedValue = container.dataset.selected || '';
    this.highlightedIndex = -1;

    this.init();
  }

  init() {
    this.renderItems(this.items);

    // Set initial value if selected
    if (this.selectedValue) {
      const selectedItem = this.items.find(item => item.value === this.selectedValue);
      if (selectedItem) {
        this.input.value = selectedItem.label;
      }
    }

    this.bindEvents();
  }

  bindEvents() {
    // Focus/blur events
    this.input.addEventListener('focus', () => this.open());
    this.input.addEventListener('blur', (e) => {
      // Delay to allow click on dropdown item
      setTimeout(() => this.close(), 150);
    });

    // Input filtering
    this.input.addEventListener('input', () => {
      this.filter(this.input.value);
      this.open();
    });

    // Keyboard navigation
    this.input.addEventListener('keydown', (e) => this.handleKeydown(e));

    // Click on dropdown items
    this.panel.addEventListener('click', (e) => {
      const item = e.target.closest('.dropdown-item');
      if (item) {
        this.select(item.dataset.value, item.dataset.label || item.textContent.trim());
      }
    });
  }

  open() {
    this.container.classList.add('open');
    this.highlightedIndex = -1;
  }

  close() {
    this.container.classList.remove('open');
    this.highlightedIndex = -1;
    this.clearHighlight();
  }

  filter(query) {
    const lowerQuery = query.toLowerCase();
    const filtered = this.items.filter(item =>
      item.label.toLowerCase().includes(lowerQuery)
    );
    this.renderItems(filtered);
  }

  renderItems(items) {
    if (items.length === 0) {
      this.panel.innerHTML = '<div class="dropdown-empty">No results found</div>';
      return;
    }

    this.panel.innerHTML = items.map(item => `
      <div class="dropdown-item${item.value === this.selectedValue ? ' selected' : ''}"
           data-value="${item.value}"
           data-label="${item.label}">
        ${item.html || item.label}
      </div>
    `).join('');
  }

  select(value, label) {
    this.selectedValue = value;
    this.input.value = label;
    if (this.hiddenInput) {
      this.hiddenInput.value = value;
    }
    this.close();

    // Update selected class
    this.panel.querySelectorAll('.dropdown-item').forEach(item => {
      item.classList.toggle('selected', item.dataset.value === value);
    });

    // Dispatch change event
    this.container.dispatchEvent(new CustomEvent('dropdown-change', {
      detail: { value, label }
    }));
  }

  handleKeydown(e) {
    const items = this.panel.querySelectorAll('.dropdown-item');

    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.highlightedIndex = Math.min(this.highlightedIndex + 1, items.length - 1);
        this.updateHighlight(items);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
        this.updateHighlight(items);
        break;
      case 'Enter':
        e.preventDefault();
        if (this.highlightedIndex >= 0 && items[this.highlightedIndex]) {
          const item = items[this.highlightedIndex];
          this.select(item.dataset.value, item.dataset.label || item.textContent.trim());
        }
        break;
      case 'Escape':
        this.close();
        this.input.blur();
        break;
    }
  }

  updateHighlight(items) {
    this.clearHighlight();
    if (items[this.highlightedIndex]) {
      items[this.highlightedIndex].classList.add('highlighted');
      items[this.highlightedIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  clearHighlight() {
    this.panel.querySelectorAll('.dropdown-item').forEach(item => {
      item.classList.remove('highlighted');
    });
  }
}

// Initialize all searchable dropdowns on page load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.searchable-dropdown').forEach(container => {
    new SearchableDropdown(container);
  });
});

// Re-initialize when modals open (for dynamically shown content)
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-modal]')) {
    setTimeout(() => {
      document.querySelectorAll('.searchable-dropdown:not(.initialized)').forEach(container => {
        new SearchableDropdown(container);
        container.classList.add('initialized');
      });
    }, 100);
  }
});
