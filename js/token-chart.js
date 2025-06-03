// NavBar

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".berger-button");
  const sidebarMenu = document.getElementById("sidebarMenu");
  const closeMenu = document.getElementById("closeMenu");
  const overlay = document.getElementById("sidebarOverlay");

  const openMenu = () => {
    sidebarMenu.classList.add("active");
    overlay.classList.add("active");
  };

  const closeSidebar = () => {
    sidebarMenu.classList.remove("active");
    overlay.classList.remove("active");
  };

  menuButton.addEventListener("click", openMenu);
  closeMenu.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
});

// NavBar

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((button) => button.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      btn.classList.add("active");
      tabContents[index].classList.add("active");
    });
  });
});

// Sidebar quick trade

// Refactored Quick Trade Script for Multiple Instances

document.querySelectorAll(".side-quick-trade").forEach((tradeBlock) => {
  const elements = {
    buyButton: tradeBlock.querySelector(".action-button#buyButton"),
    sellButton: tradeBlock.querySelector(".action-button#sellButton"),
    amountInput: tradeBlock.querySelector(".amount-input"),
    firstInner: tradeBlock.querySelector(".first-inner-content"),
    secondInner: tradeBlock.querySelector(".second-inner-content"),
    seeTransaction: tradeBlock.querySelector(".see-transaction"),
    sendingLabel: tradeBlock.querySelector(".sending-label"),
    receivingLabel: tradeBlock.querySelector(".receiving-label"),
    cancelBtn: tradeBlock.querySelector(".cancel-btn"),
    confirmBtn: tradeBlock.querySelector(".confirm-btn"),
    doneBtn: tradeBlock.querySelector(".done-btn"),
    cancelConfirm: tradeBlock.querySelector(".cancel-confirm-btn-wrapper"),
    quickActionBtn: tradeBlock.querySelector(".quick-action-button"),
    slippageInput: tradeBlock.querySelector(".slippage-input"),
    presetCustomize: tradeBlock.querySelector(".preset-customize-btn"),
    presetInputs: tradeBlock.querySelectorAll(".preset-btn"),
    presetWrappers: tradeBlock.querySelectorAll(".preset-btn-wrapper"),
    quickBuyToggle: tradeBlock.querySelector("#quickBuyToggleBtn"),
  };

  let currentMode = "buy";
  let isEditMode = false;
  const originalIcon = elements.presetCustomize.querySelector("img").src;

  const setMode = (mode) => {
    currentMode = mode;
    const isQuickBuy = elements.quickBuyToggle?.checked;

    const updateButton = (btn, add, remove) => {
      btn.classList.add(add);
      btn.classList.remove(remove);
    };

    updateButton(
      elements.buyButton,
      mode === "buy" ? "buy-active" : "button-inactive",
      mode === "buy" ? "button-inactive" : "buy-active"
    );
    updateButton(
      elements.sellButton,
      mode === "sell" ? "sell-active" : "button-inactive",
      mode === "sell" ? "button-inactive" : "sell-active"
    );
    updateButton(
      elements.quickActionBtn,
      mode === "buy" ? "buy-active" : "sell-active",
      mode === "buy" ? "sell-active" : "buy-active"
    );

    const label = isQuickBuy ? "Review" : "Quick";
    elements.quickActionBtn.innerHTML = `
      <figure><img src="./public/images/${
        isQuickBuy ? "arrow-icon" : "zap-icon"
      }.svg" alt="icon" /></figure>
      ${label} ${mode === "buy" ? "Buy" : "Sell"} TOKEN
    `;

    elements.amountInput.placeholder = `Amount to ${
      mode === "buy" ? "Buy" : "Sell"
    } (XRP)`;
  };

  const resetTradeState = () => {
    elements.firstInner.style.display = "block";
    elements.secondInner.style.display = "none";
    elements.quickActionBtn.style.display = "flex";
    elements.cancelConfirm.style.display = "none";
    elements.doneBtn.style.display = "none";
    elements.seeTransaction.style.display = "none";
    elements.sendingLabel.innerHTML = "You're Sending";
    elements.sendingLabel.style.color = "";
    elements.receivingLabel.innerHTML = "To Receive";
    elements.receivingLabel.style.color = "";
    elements.slippageInput.value = "";
  };

  const toggleEditMode = () => {
    isEditMode = !isEditMode;
    elements.presetCustomize.classList.toggle("active", isEditMode);
    elements.presetCustomize.querySelector("img").src = isEditMode
      ? "./public/images/check-mark-white.svg"
      : originalIcon;
    elements.presetCustomize.style.backgroundColor = isEditMode
      ? "var(--bgBrandDefault)"
      : "";

    elements.presetInputs.forEach((input) => {
      input.readOnly = !isEditMode;
      input.classList.toggle("editable", isEditMode);
      input.style.backgroundColor = isEditMode ? "var(--bgDefaultPrimary)" : "";

      if (!isEditMode) {
        const wrapper = input.closest(".preset-btn-wrapper");
        if (wrapper)
          wrapper.setAttribute("data-value", input.value || input.placeholder);
      }
    });
  };

  const handleConfirm = () => {
    elements.cancelBtn.disabled = true;
    elements.confirmBtn.disabled = true;
    elements.cancelBtn.classList.add("disabled");
    elements.confirmBtn.classList.add("disabled");

    setTimeout(() => {
      elements.cancelConfirm.style.display = "none";
      elements.doneBtn.style.display = "block";
      elements.seeTransaction.style.display = "flex";

      elements.cancelBtn.disabled = false;
      elements.confirmBtn.disabled = false;
      elements.cancelBtn.classList.remove("disabled");
      elements.confirmBtn.classList.remove("disabled");

      const successMarkup = `<span><img src="../public/images/check-mark-round.svg" alt="Check-mark-icon" /></span>`;
      elements.sendingLabel.innerHTML = `You Sent ${successMarkup}`;
      elements.receivingLabel.innerHTML = `You Received ${successMarkup}`;
      elements.sendingLabel.style.color = "var(--textPositiveSecondary)";
      elements.receivingLabel.style.color = "var(--textPositiveSecondary)";
    }, 2000);
  };

  // Initial setup
  setMode("buy");

  // Event Listeners
  elements.buyButton.addEventListener("click", (e) => {
    e.preventDefault();
    setMode("buy");
  });

  elements.sellButton.addEventListener("click", (e) => {
    e.preventDefault();
    setMode("sell");
  });

  elements.quickBuyToggle?.addEventListener("change", () => {
    setMode(currentMode);
  });

  elements.quickActionBtn.addEventListener("click", () => {
    elements.firstInner.style.display = "none";
    elements.secondInner.style.display = "block";
    elements.quickActionBtn.style.display = "none";
    elements.cancelConfirm.style.display = "flex";
  });

  elements.cancelBtn.addEventListener("click", resetTradeState);
  elements.doneBtn.addEventListener("click", resetTradeState);
  elements.confirmBtn.addEventListener("click", handleConfirm);

  elements.presetCustomize.addEventListener("click", toggleEditMode);

  elements.presetWrappers.forEach((wrapper) => {
    wrapper.setAttribute(
      "data-value",
      wrapper.querySelector("input")?.placeholder || "0"
    );

    wrapper.addEventListener("click", () => {
      if (!isEditMode) {
        const value = wrapper.getAttribute("data-value");
        if (value) elements.amountInput.value = value;
      }
    });
  });

  elements.slippageInput.addEventListener("focus", function () {
    this.value = this.value.replace("%", "");
  });

  elements.slippageInput.addEventListener("blur", function () {
    const val = this.value.trim();
    if (val !== "" && !val.includes("%")) {
      this.value = val + "%";
    }
  });
});
