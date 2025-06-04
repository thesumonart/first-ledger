// Table Action menu
document.addEventListener("DOMContentLoaded", () => {
  const actionMenu = document.querySelector(".action-menu");
  if (actionMenu) {
    actionMenu.style.display = "none";

    const actionMenuWrappers = document.querySelectorAll(
      ".lp-action-menu-wrapper"
    );
    actionMenuWrappers.forEach((wrapper) => {
      wrapper.appendChild(actionMenu.cloneNode(true));

      wrapper.addEventListener("click", (event) => {
        // Close any other open menus
        actionMenuWrappers.forEach((otherWrapper) => {
          if (otherWrapper !== wrapper) {
            const otherMenu = otherWrapper.querySelector(".action-menu");
            if (otherMenu) otherMenu.style.display = "none";
          }
        });

        // Close dropdowns
        closeAllDropdowns();

        const menu = wrapper.querySelector(".action-menu");
        if (menu) {
          menu.style.display = menu.style.display === "block" ? "none" : "block";
        }
        event.stopPropagation(); // Prevents immediate closing when clicking the button
      });
    });

    // Close the menu when clicking outside
    document.addEventListener("click", (event) => {
      actionMenuWrappers.forEach((wrapper) => {
        const menu = wrapper.querySelector(".action-menu");
        if (menu && !wrapper.contains(event.target) && !menu.contains(event.target)) {
          menu.style.display = "none";
        }
      });
    });
  }

  // Initialize other functions after DOM is loaded
  displayRowCount();
  handleDropdownTransform();
});

// Table row count
const countTableRowsWithoutTH = (tableId) => {
  const table = document.getElementById(tableId);
  if (!table) return 0;

  const bodyRows =
    table.querySelector("tbody")?.getElementsByTagName("tr") || [];
  let count = 0;

  for (let row of bodyRows) {
    if (!row.querySelector("th")) {
      count++;
    }
  }

  return count;
};

const displayRowCount = () => {
  const count = countTableRowsWithoutTH("my-pools-table");
  const rowCountElement = document.getElementById("rowCount");
  if (rowCountElement) {
    rowCountElement.textContent = `${count}`;
  }
};

// Customize Dropdown
const customizeDropdown = document.getElementById("customizeDropdown");
const customizeOptions = document.getElementById("customize-options");
const customizeArrow = document.getElementById("customize-arrow");
const selectedCustomizeOption = document.getElementById(
  "selected-customize-option"
);

if (customizeDropdown && customizeOptions && customizeArrow) {
  customizeDropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = customizeOptions.classList.contains("show");
    closeAllDropdowns();
    closeAllActionMenus();
    if (!isOpen) {
      customizeOptions.classList.toggle("show");
      customizeArrow.classList.toggle("open");
    }
  });
}

document.addEventListener("click", () => {
  closeAllDropdowns();
});

// Wallet dropdown
const walletDropdown = document.getElementById("walletDropdown");
const walletOptions = document.getElementById("options");
const arrow = document.getElementById("arrow");
const selectedWalletOption = document.getElementById("selected-option");

if (walletDropdown && walletOptions && arrow) {
  walletDropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = walletOptions.classList.contains("show");
    closeAllDropdowns();
    closeAllActionMenus();
    if (!isOpen) {
      walletOptions.classList.toggle("show");
      arrow.classList.toggle("open");
    }
  });

  walletOptions.addEventListener("click", (e) => {
    if (e.target.type === "checkbox") {
      const checkboxes = walletOptions.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      e.target.checked = true;

      const selected = e.target
        .closest(".option")
        .querySelector(".wallet-name").textContent;
      if (selectedWalletOption) {
        selectedWalletOption.textContent = selected;
      }
    }
  });
}

const closeAllDropdowns = () => {
  if (customizeOptions) customizeOptions.classList.remove("show");
  if (customizeArrow) customizeArrow.classList.remove("open");
  if (walletOptions) walletOptions.classList.remove("show");
  if (arrow) arrow.classList.remove("open");
  if (typeof applyTransform === 'function') applyTransform(); // Ensure wallet dropdown returns to its previous position
};

const closeAllActionMenus = () => {
  const actionMenuWrappers = document.querySelectorAll(
    ".lp-action-menu-wrapper"
  );
  actionMenuWrappers.forEach((wrapper) => {
    const menu = wrapper.querySelector(".action-menu");
    if (menu) menu.style.display = "none";
  });
};

// Filter Sidebar
const overlay = document.querySelector(".filter-sidebar-overlay");
const sidebar = document.querySelector(".filter-sidebar");
const closeBtn = document.querySelector(".close-sidebar-btn");

if (overlay && sidebar) {
  document.addEventListener("click", (e) => {
    if (e.target.closest(".filters-button")) {
      overlay.classList.add("active");
      sidebar.classList.add("active");
    }

    if (e.target.closest(".close-sidebar-btn") || e.target === overlay) {
      overlay.classList.remove("active");
      sidebar.classList.remove("active");
    }
  });

  const handleSidebarOnResize = () => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) {
      overlay.classList.remove("active");
      sidebar.classList.remove("active");
    }
  };

  window.addEventListener("resize", handleSidebarOnResize);
}

// Filter sidebar buttons opening closing transformation
const handleDropdownTransform = () => {
  const mediaQuery = window.matchMedia("(max-width: 767px)");

  const applyTransform = () => {
    if (mediaQuery.matches && walletDropdown && customizeOptions) {
      walletDropdown.style.transition = "transform 0.3s ease";
      walletDropdown.style.transform = customizeOptions.classList.contains(
        "show"
      )
        ? "translateY(165px)"
        : "translateY(0)";
    } else if (walletDropdown) {
      walletDropdown.style.transition = "";
      walletDropdown.style.transform = "";
    }
  };

  if (customizeDropdown) {
    customizeDropdown.addEventListener("click", applyTransform);
  }
  window.addEventListener("resize", applyTransform);
  return applyTransform; // Return the function so it can be used elsewhere
};

const applyTransform = handleDropdownTransform();

// ===== TAB SWITCHING FUNCTIONALITY =====
// Tab switching functionality for My Positions and Explore Pools
document.addEventListener('DOMContentLoaded', function() {
  const myPositionsTab = document.getElementById('my-positions-tab');
  const explorePoolsTab = document.getElementById('explore-pools-tab');
  const myPositionsSection = document.getElementById('my-positions-section');
  const explorePoolsSection = document.getElementById('explore-pools-section');
  
  // Alternative selectors in case the IDs are different
  const myPositionsTabAlt = document.querySelector('[data-tab="positions"]') || 
                            document.querySelector('.tab-button[data-tab="positions"]') ||
                            document.querySelector('.table-section-title:first-child');
  const explorePoolsTabAlt = document.querySelector('[data-tab="explore"]') || 
                             document.querySelector('.tab-button[data-tab="explore"]') ||
                             document.querySelector('.table-section-title:last-child');
  
  // Use primary selectors or fallback to alternatives
  const positionsTab = myPositionsTab || myPositionsTabAlt;
  const exploreTab = explorePoolsTab || explorePoolsTabAlt;
  
  // Section selectors with alternatives
  const positionsSection = myPositionsSection || 
                           document.getElementById('positions-table') ||
                           document.querySelector('.my-pools-main') ||
                           document.querySelector('[data-section="positions"]');
  const exploreSection = explorePoolsSection || 
                         document.getElementById('explore-table') ||
                         document.querySelector('.best-pools-main') ||
                         document.querySelector('[data-section="explore"]');
  
  // Function to switch tabs
  function switchTab(activeTab, inactiveTab, activeSection, inactiveSection) {
    if (!activeTab || !inactiveTab || !activeSection || !inactiveSection) {
      console.warn('Tab switching: Some elements not found');
      return;
    }
    
    // Close any open dropdowns and action menus when switching tabs
    closeAllDropdowns();
    closeAllActionMenus();
    
    // Update tab styling
    activeTab.classList.add('active');
    inactiveTab.classList.remove('active');
    
    // Show/hide sections
    activeSection.classList.remove('hidden-section', 'hidden');
    activeSection.style.display = '';
    
    inactiveSection.classList.add('hidden-section');
    // Alternative hiding methods for different implementations
    if (inactiveSection.style) {
      inactiveSection.style.display = 'none';
    }
    
    // Update row count if switching to My Positions
    if (activeTab === positionsTab) {
      setTimeout(displayRowCount, 100); // Small delay to ensure DOM is updated
    }
  }
  
  // Set up click handlers
  if (positionsTab && exploreTab && positionsSection && exploreSection) {
    positionsTab.addEventListener('click', function(e) {
      e.preventDefault();
      switchTab(positionsTab, exploreTab, positionsSection, exploreSection);
    });
    
    exploreTab.addEventListener('click', function(e) {
      e.preventDefault();
      switchTab(exploreTab, positionsTab, exploreSection, positionsSection);
    });
    
    // Initialize with My Positions tab active
    switchTab(positionsTab, exploreTab, positionsSection, exploreSection);
    
    console.log('Tab switching initialized successfully');
  } else {
    console.warn('Tab switching: Required elements not found', {
      positionsTab: !!positionsTab,
      exploreTab: !!exploreTab,
      positionsSection: !!positionsSection,
      exploreSection: !!exploreSection
    });
  }
  
  // Additional event listeners for different tab implementations
  // Handle clicks on elements with data-tab attributes
  document.addEventListener('click', function(e) {
    const tabElement = e.target.closest('[data-tab]');
    if (tabElement) {
      const tabType = tabElement.getAttribute('data-tab');
      
      if (tabType === 'positions' && positionsTab && exploreTab && positionsSection && exploreSection) {
        e.preventDefault();
        switchTab(positionsTab, exploreTab, positionsSection, exploreSection);
      } else if (tabType === 'explore' && positionsTab && exploreTab && positionsSection && exploreSection) {
        e.preventDefault();
        switchTab(exploreTab, positionsTab, exploreSection, positionsSection);
      }
    }
  });
});

// ===== UTILITY FUNCTIONS FOR TAB SWITCHING =====
// Function to manually switch to My Positions tab
window.switchToMyPositions = function() {
  const positionsTab = document.getElementById('my-positions-tab') || 
                       document.querySelector('[data-tab="positions"]');
  if (positionsTab) {
    positionsTab.click();
  }
};

// Function to manually switch to Explore Pools tab
window.switchToExplorePools = function() {
  const exploreTab = document.getElementById('explore-pools-tab') || 
                     document.querySelector('[data-tab="explore"]');
  if (exploreTab) {
    exploreTab.click();
  }
};

// Function to get current active tab
window.getCurrentActiveTab = function() {
  const activeTab = document.querySelector('.table-section-title.active') ||
                    document.querySelector('.tab-button.active') ||
                    document.querySelector('[data-tab].active');
  
  if (activeTab) {
    return activeTab.getAttribute('data-tab') || 
           (activeTab.textContent.toLowerCase().includes('position') ? 'positions' : 'explore');
  }
  return null;
};

// ===== TOKEN DETAILS MODAL FUNCTIONALITY =====
function openTokenModal(token1, token2) {
  const modal = document.getElementById('token-details-modal');
  const tokenName = document.getElementById('modal-token-name');
  const tokenPair = document.getElementById('modal-token-pair');
  
  // Update modal content with token information
  tokenName.textContent = `${token1} / ${token2}`;
  tokenPair.textContent = '';
  
  // You can add more dynamic content here based on the token parameters
  // For example, fetch real token data and update the modal
  
  modal.classList.add('show');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeTokenModal() {
  const modal = document.getElementById('token-details-modal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto'; // Restore scrolling
}

function buyToken() {
  alert('Buy token functionality would be implemented here');
  // Add your buy token logic here
}

function sellToken() {
  alert('Sell token functionality would be implemented here');
  // Add your sell token logic here
}

function addToWatchlist() {
  alert('Add to watchlist functionality would be implemented here');
  // Add your watchlist logic here
}

// Close modal when clicking outside of it
document.getElementById('token-details-modal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeTokenModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeTokenModal();
  }
});