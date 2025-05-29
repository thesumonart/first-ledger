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

const resetTradeState = () => {
  firstInnerContent.style.display = "block";
  secondInnerContent.style.display = "none";

  SBquickBuyBtn.style.display = "flex";
  cancelConfirmWrapper.style.display = "none";
  doneButton.style.display = "none";

  seeTransactionText.style.display = "none";

  sendingLabelText.innerHTML = "You're Sending";
  sendingLabelText.style.color = "";

  receivingLabelText.innerHTML = "To Receive";
  receivingLabelText.style.color = "";

  slippageInput.value = "";
};

const SBquickBuyBtn = document.querySelector(".quick-action-button");

const buyButton = document.getElementById("buyButton");
const sellButton = document.getElementById("sellButton");
const amountInput = document.getElementById("amountInput");
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

const updateButtonDisplay = (mode) => {
  const quickBuyToggleBtn = document.getElementById("quickBuyToggleBtn");
  const isToggleChecked = quickBuyToggleBtn && quickBuyToggleBtn.checked;

  if (mode === "buy") {
    buyButton.classList.remove("button-inactive");
    buyButton.classList.add("buy-active");
    sellButton.classList.remove("sell-active");
    sellButton.classList.add("button-inactive");
    SBquickBuyBtn.classList.remove("sell-active");
    SBquickBuyBtn.classList.add("buy-active");

    if (isToggleChecked) {
      SBquickBuyBtn.innerHTML = `
        <figure>
          <img src="./public/images/arrow-icon.svg" alt="arrow-icon" />
        </figure>
        Review Buy TOKEN
      `;
    } else {
      SBquickBuyBtn.innerHTML = `
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
    SBquickBuyBtn.classList.remove("buy-active");
    SBquickBuyBtn.classList.add("sell-active");

    if (isToggleChecked) {
      SBquickBuyBtn.innerHTML = `
        <figure>
          <img src="./public/images/arrow-icon.svg" alt="arrow-icon" />
        </figure>
        Review Sell TOKEN
      `;
    } else {
      SBquickBuyBtn.innerHTML = `
        <figure>
          <img src="./public/images/zap-icon.svg" alt="zap-icon" />
        </figure>
        Quick Sell TOKEN
      `;
    }

    amountInput.placeholder = "Amount to Sell (XRP)";
  }
};

const setMode = (mode) => {
  currentMode = mode;
  updateButtonDisplay(mode);
};

setMode("buy");

const setAmount = (xrp) => {
  amountInput.value = xrp;
};

const quickBuyToggleBtn = document.getElementById("quickBuyToggleBtn");
if (quickBuyToggleBtn) {
  quickBuyToggleBtn.addEventListener("change", () => {
    updateButtonDisplay(currentMode);
  });
}

SBquickBuyBtn.addEventListener("click", () => {
  firstInnerContent.style.display = "none";
  secondInnerContent.style.display = "block";

  SBquickBuyBtn.style.display = "none";
  cancelConfirmWrapper.style.display = "flex";
});

cancelButton.addEventListener("click", () => {
  resetTradeState();
});

confirmButton.addEventListener("click", () => {
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

doneButton.addEventListener("click", () => {
  resetTradeState();
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
