// Wallet Dropdown
document.querySelectorAll(".wallet-dropdown").forEach((dropdown) => {
  const walletOptions = dropdown.querySelector(".dropdown-options");
  const arrow = dropdown.querySelector(".arrow-icon");
  const selectedWalletOption = dropdown.querySelector(
    ".selected-wallet-option"
  );

  const closeWalletDropdown = () => {
    walletOptions.classList.remove("show");
    arrow.classList.remove("open");
  };

  dropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    preventMultipleOpen(walletOptions);
    walletOptions.classList.toggle("show");
    arrow.classList.toggle("open");
  });

  walletOptions.addEventListener("click", (e) => {
    if (e.target.type === "checkbox") {
      walletOptions
        .querySelectorAll('input[type="checkbox"]')
        .forEach((checkbox) => {
          checkbox.checked = false;
        });
      e.target.checked = true;
      selectedWalletOption.textContent = e.target
        .closest(".option")
        .querySelector(".wallet-name").textContent;
      closeWalletDropdown();
    }
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown-options.show").forEach((dropdown) => {
    dropdown.classList.remove("show");
    const parentDropdown = dropdown.closest(
      ".wallet-dropdown, #portfolioCustomizeDropdown"
    );
    if (parentDropdown) {
      const arrow = parentDropdown.querySelector(
        ".arrow-icon, #portfolioCustomizeArrow"
      );
      if (arrow) arrow.classList.remove("open");
    }
  });
});

const preventMultipleOpen = (currentDropdown) => {
  document.querySelectorAll(".dropdown-options.show").forEach((dropdown) => {
    if (dropdown !== currentDropdown) {
      dropdown.classList.remove("show");
      const parentDropdown = dropdown.closest(
        ".wallet-dropdown, #portfolioCustomizeDropdown"
      );
      if (parentDropdown) {
        const arrow = parentDropdown.querySelector(
          ".arrow-icon, #portfolioCustomizeArrow"
        );
        if (arrow) arrow.classList.remove("open");
      }
    }
  });
};

// Table Action menu

document.addEventListener("DOMContentLoaded", function () {
  const actionMenu = document.createElement("div");
  actionMenu.className = "action-menu";
  actionMenu.style.display = "none";

  actionMenu.innerHTML = `
                  <a class="tx-history-button">Tx History</a>
                  <a class="share-button" >Share</a>
                  <a class="hide-button" >Hide</a>
                  <a class="burn-button" >Burn</a>`;

  const actionMenuWrappers = document.querySelectorAll(".action-menu-wrapper");
  actionMenuWrappers.forEach((wrapper) => {
    wrapper.appendChild(actionMenu.cloneNode(true));

    wrapper.addEventListener("click", function (event) {
      actionMenuWrappers.forEach((otherWrapper) => {
        if (otherWrapper !== wrapper) {
          const otherMenu = otherWrapper.querySelector(".action-menu");
          otherMenu.style.display = "none";
        }
      });

      const menu = this.querySelector(".action-menu");
      menu.style.display = menu.style.display === "block" ? "none" : "block";
      event.stopPropagation();
    });
  });

  document.addEventListener("click", function (event) {
    actionMenuWrappers.forEach((wrapper) => {
      const menu = wrapper.querySelector(".action-menu");
      if (!wrapper.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = "none";
      }
    });
  });
});

// Modals

//Trade Modal

document.addEventListener("DOMContentLoaded", function () {
  // Modal Elements
  const tradeModalOverlay = document.getElementById("tradeModalOverlay");
  const buyButton = document.getElementById("buyButton");
  const sellButton = document.getElementById("sellButton");
  const amountInput = document.getElementById("amountInput");
  const quickActionButton = document.getElementById("quickActionButton");
  const firstInnerContent = document.querySelector(".first-inner-content");
  const secondInnerContent = document.querySelector(".second-inner-content");
  const seeTransactionText = document.querySelector(".see-transaction");
  const sendingLabelText = document.querySelector(".sending-label");
  const receivingLabelText = document.querySelector(".receiving-label");
  const cancelButton = document.querySelector(".cancel-btn");
  const confirmButton = document.querySelector(".confirm-btn");
  const doneButton = document.querySelector(".done-btn");
  const cancelConfirmWrapper = document.querySelector(
    ".cancel-confirm-btn-wrapper"
  );

  let currentMode = "buy";

  quickActionButton.addEventListener("click", function () {
    firstInnerContent.style.display = "none";
    secondInnerContent.style.display = "block";

    quickActionButton.style.display = "none";
    cancelConfirmWrapper.style.display = "flex";
  });

  cancelButton.addEventListener("click", function () {
    resetModalState();
  });

  confirmButton.addEventListener("click", function () {
    cancelButton.setAttribute("disabled", true);
    confirmButton.setAttribute("disabled", true);
    cancelButton.classList.add("disabled");
    confirmButton.classList.add("disabled");
    setTimeout(() => {
      cancelConfirmWrapper.style.display = "none";
      doneButton.style.display = "block";
      cancelButton.removeAttribute("disabled", true);
      confirmButton.removeAttribute("disabled", true);
      cancelButton.classList.remove("disabled");
      confirmButton.classList.remove("disabled");
      seeTransactionText.style.display = "Flex";

      sendingLabelText.innerHTML = `You Sent <span><img src="../public/images/check-mark-round.svg" alt="Check-mark-icon" /></span>`;
      sendingLabelText.style.color = "var(--textPositiveSecondary)";

      receivingLabelText.innerHTML = `You Received <span><img src="../public/images/check-mark-round.svg" alt="Check-mark-icon" /></span>`;
      receivingLabelText.style.color = "var(--textPositiveSecondary)";
    }, 2000);
  });

  doneButton.addEventListener("click", function () {
    closeModal();
  });

  function resetModalState() {
    firstInnerContent.style.display = "block";
    secondInnerContent.style.display = "none";

    quickActionButton.style.display = "flex";
    cancelConfirmWrapper.style.display = "none";
    doneButton.style.display = "none";

    seeTransactionText.style.display = "none";

    sendingLabelText.innerHTML = "You're Sending";
    sendingLabelText.style.color = "";

    receivingLabelText.innerHTML = "To Receive";
    receivingLabelText.style.color = "";

    slippageInput.value = "";
  }

  function closeModal() {
    resetModalState();
    tradeModalOverlay.classList.remove("active");
  }

  document.querySelectorAll(".change-pnl-icon").forEach((pnlBtn) => {
    pnlBtn.addEventListener("click", () => {
      const wrapper = pnlBtn.closest(".token-change");
      const pnlText = wrapper?.querySelector(".change-pnl");

      if (!pnlText) return;

      const currentText = pnlText.innerText.trim().toLowerCase();
      pnlText.innerText = currentText === "pnl" ? "24H Change" : "PnL";
    });
  });

  function openModal() {
    resetModalState();
    tradeModalOverlay.classList.add("active");
    updateButtonDisplay(currentMode);
  }

  function closeModal() {
    tradeModalOverlay.classList.remove("active");
  }

  function updateButtonDisplay(mode) {
    const quickBuyToggleBtn = document.getElementById("quickBuyToggleBtn");
    const isToggleChecked = quickBuyToggleBtn && quickBuyToggleBtn.checked;

    if (mode === "buy") {
      buyButton.classList.remove("button-inactive");
      buyButton.classList.add("buy-active");
      sellButton.classList.remove("sell-active");
      sellButton.classList.add("button-inactive");
      quickActionButton.classList.remove("sell-active");
      quickActionButton.classList.add("buy-active");

      if (isToggleChecked) {
        quickActionButton.innerHTML = `
          <figure>
            <img src="./public/images/arrow-icon.svg" alt="arrow-icon" />
          </figure>
          Review Buy TOKEN
        `;
      } else {
        quickActionButton.innerHTML = `
          <figure>
            <img src="./public/images/zap-icon.svg" alt="zap-icon" />
          </figure>
          Quick Buy TOKEN
        `;
      }

      amountInput.placeholder = "Amount to Buy (XRP)";
    } else {
      sellButton.classList.remove("button-inactive");
      sellButton.classList.add("sell-active");
      buyButton.classList.remove("buy-active");
      buyButton.classList.add("button-inactive");
      quickActionButton.classList.remove("buy-active");
      quickActionButton.classList.add("sell-active");

      if (isToggleChecked) {
        quickActionButton.innerHTML = `
          <figure>
            <img src="./public/images/arrow-icon.svg" alt="arrow-icon" />
          </figure>
          Review Sell TOKEN
        `;
      } else {
        quickActionButton.innerHTML = `
          <figure>
            <img src="./public/images/zap-icon.svg" alt="zap-icon" />
          </figure>
          Quick Sell TOKEN
        `;
      }

      amountInput.placeholder = "Amount to Sell (XRP)";
    }
  }

  function setMode(mode) {
    currentMode = mode;
    updateButtonDisplay(mode);
  }

  function setAmount(xrp) {
    amountInput.value = xrp;
  }

  const quickBuyToggleBtn = document.getElementById("quickBuyToggleBtn");
  if (quickBuyToggleBtn) {
    quickBuyToggleBtn.addEventListener("change", function () {
      updateButtonDisplay(currentMode);
    });
  }

  document.querySelectorAll(".trade-button").forEach((tradeButton) => {
    tradeButton.addEventListener("click", openModal);
  });

  tradeModalOverlay.addEventListener("click", function (event) {
    if (event.target === tradeModalOverlay) {
      closeModal();
    }
  });

  const presetCustomizeButton = document.querySelector(".preset-customize-btn");
  const presetInputs = document.querySelectorAll(".preset-btn");
  const mainAmountInput = document.querySelector(".amount-input");

  let isEditMode = false;
  let originalIcon = presetCustomizeButton.querySelector("img").src;

  presetInputs.forEach((input) => {
    let parentWrapper = input.closest(".preset-btn-wrapper");
    if (parentWrapper) {
      let initialValue = input.placeholder || "0";
      parentWrapper.setAttribute("data-value", initialValue);
    }
  });

  presetCustomizeButton.addEventListener("click", function () {
    isEditMode = !isEditMode;

    presetInputs.forEach((input) => {
      if (isEditMode) {
        input.removeAttribute("readonly");
        input.classList.add("editable");
        input.style.backgroundColor = "var(--bgDefaultPrimary)";
      } else {
        input.setAttribute("readonly", "true");
        input.classList.remove("editable");
        input.style.backgroundColor = "";

        let parentWrapper = input.closest(".preset-btn-wrapper");
        if (parentWrapper) {
          parentWrapper.setAttribute(
            "data-value",
            input.value || input.placeholder
          );
        }
      }
    });

    if (isEditMode) {
      presetCustomizeButton.classList.add("active");
      presetCustomizeButton.querySelector("img").src =
        "./public/images/check-mark-white.svg";
      presetCustomizeButton.style.backgroundColor = "var(--bgBrandDefault)";
    } else {
      presetCustomizeButton.classList.remove("active");
      presetCustomizeButton.querySelector("img").src = originalIcon;
      presetCustomizeButton.style.backgroundColor = "";
    }
  });

  document.querySelectorAll(".preset-btn-wrapper").forEach((wrapper) => {
    wrapper.addEventListener("click", function () {
      if (!isEditMode) {
        let storedValue = wrapper.getAttribute("data-value");
        if (storedValue) {
          mainAmountInput.value = storedValue;
        }
      }
    });
  });

  const slippageInput = document.querySelector(".slippage-input");

  slippageInput.addEventListener("blur", function () {
    let value = this.value.trim();

    if (value !== "" && !value.includes("%")) {
      this.value = value + "%";
    }
  });

  slippageInput.addEventListener("focus", function () {
    this.value = this.value.replace("%", "");
  });

  function toggleSubWallets(tr) {
    const subWalletsWrapper = tr.querySelector(".sub-wallets-wrapper");
    const downArrowIcon = tr.querySelector(".down-arrow-icon");

    if (subWalletsWrapper) {
      subWalletsWrapper.classList.toggle("visible");

      if (subWalletsWrapper.classList.contains("visible")) {
        downArrowIcon.style.transform = "rotate(180deg)";
      } else {
        downArrowIcon.style.transform = "rotate(0deg)";
      }
    }
  }

  function setupInteractions() {
    const isMobile = window.innerWidth < 768;

    // Table Row Wrapper Click Logic (for mobile)
    if (isMobile) {
      document.querySelectorAll(".table-row-wrapper").forEach((tr) => {
        tr.addEventListener("click", function (event) {
          const subWalletsWrapper = this.querySelector(".sub-wallets-wrapper");
          if (subWalletsWrapper) {
            toggleSubWallets(this);
          } else {
            openModal();
          }
        });
      });
    } else {
      document.querySelectorAll(".table-row-wrapper").forEach((tr) => {
        tr.removeEventListener("click", function () {});
      });
    }

    // Multi-wallet Logic (for mobile and desktop)
    document.querySelectorAll(".multi-wallet").forEach((multiWallet) => {
      multiWallet.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleSubWallets(this.closest(".table-row-wrapper"));
      });
    });

    if (isMobile) {
      document.querySelectorAll(".sub-wallet").forEach((subWallet) => {
        subWallet.addEventListener("click", function (event) {
          event.stopPropagation();
          openModal();
        });
      });
    }

    // Handle Click for .token-cell
    document.querySelectorAll(".token-cell").forEach((tokenCell) => {
      tokenCell.addEventListener("click", (event) => {
        // Stop the click event from propagating to .table-row-wrapper
        event.stopPropagation();
        // Redirect to the token chart page
        window.location.href = "./token-chart.html";
      });
    });
  }

  setupInteractions();

  setMode("buy");

  window.openModal = openModal;
  window.closeModal = closeModal;
  window.setMode = setMode;
  window.setAmount = setAmount;
});

// Trade Modal

// Share Modal

const modal = document.getElementById("modal-share");

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".share-button").forEach((shareButton) => {
    shareButton.addEventListener("click", () => {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

document.querySelectorAll(".close-share-modal").forEach((closeModalBtn) => {
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });
});

// Share Modal

// History Modal

const historyModal = document.querySelector(".history-modal-overlay");

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".tx-history-button, .tradeHistoryBtn")
    .forEach((openModalButton) => {
      openModalButton.addEventListener("click", () => {
        historyModal.style.display = "flex";
        document.body.style.overflow = "hidden";
      });
    });
});

const closeHistoryModal = () => {
  historyModal.style.display = "none";
};

document
  .querySelectorAll(".history-modal-close-btn, .history-modal-back-btn")
  .forEach((button) => {
    button.addEventListener("click", () => {
      closeHistoryModal();
    });
  });

document.querySelectorAll("tr").forEach((tr) => {
  const logos = tr.querySelectorAll(".table-xrp-logo");
  logos.forEach((logo) => {
    if (tr.classList.contains("buy")) {
      logo.src = "./public/images/xrp-logo-green.svg";
    } else if (tr.classList.contains("sell")) {
      logo.src = "./public/images/xrp-logo-red.svg";
    } else {
      logo.src = "./public/images/xrp-logo-green.svg";
    }
  });
});

document.querySelectorAll(".close-button").forEach((closeModalBtn) => {
  closeModalBtn.addEventListener("click", () => {
    historyModal.style.display = "none";
    document.body.style.overflow = "auto";
  });
});

window.addEventListener("click", (e) => {
  if (e.target === historyModal) {
    historyModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// History Modal

// Customize Modal

// wallet selection

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".wallet-option").forEach((option) => {
    const input = option.querySelector(".view-input");

    if (input.checked) {
      option.classList.add("checked");
    } else {
      option.classList.remove("checked");
    }

    input.addEventListener("change", () => {
      if (input.checked) {
        option.classList.add("checked");
      } else {
        option.classList.remove("checked");
      }

      const isAllWallet = option.classList.contains("all-wallet");
      const allWalletInput = document.querySelector(".all-wallet .view-input");

      if (isAllWallet && input.checked) {
        document
          .querySelectorAll(".wallet-option:not(.all-wallet)")
          .forEach((opt) => {
            const inp = opt.querySelector(".view-input");
            inp.checked = false;
            opt.classList.remove("checked");
          });
      } else if (!isAllWallet && input.checked) {
        allWalletInput.checked = false;
        document
          .querySelector(".wallet-option.all-wallet")
          .classList.remove("checked");
      }
    });
  });
});

// wallet selection

// Filters selection

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".filter-option").forEach((option) => {
    const input = option.querySelector(".view-input");

    if (input.checked) {
      option.classList.add("checked");
    } else {
      option.classList.remove("checked");
    }

    input.addEventListener("change", () => {
      if (input.checked) {
        option.classList.add("checked");
      } else {
        option.classList.remove("checked");
      }
    });
  });
});

// Filters selection

// Modal open & close
document.addEventListener("DOMContentLoaded", () => {
  const portfolioCustomizeBtn = document.querySelector(
    ".portfolio-customize-btn"
  );
  const portfolioCustomizeModal = document.querySelector(
    ".customize-modal-overlay"
  );
  const pCustModalCloseBtn = document.querySelector(".customize-modal-close");

  if (portfolioCustomizeBtn && portfolioCustomizeModal && pCustModalCloseBtn) {
    portfolioCustomizeBtn.addEventListener("click", () => {
      portfolioCustomizeModal.classList.add("active");
    });

    pCustModalCloseBtn.addEventListener("click", () => {
      portfolioCustomizeModal.classList.remove("active");
    });

    portfolioCustomizeModal.addEventListener("click", (event) => {
      if (event.target === portfolioCustomizeModal) {
        portfolioCustomizeModal.classList.remove("active");
      }
    });
  } else {
    console.warn("Modal elements not found in DOM.");
  }
});
// Modal open & close

// Customize Modal

// Modals
