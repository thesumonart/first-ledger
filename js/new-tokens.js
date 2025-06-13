// customize-Modal

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".customize-modal");
  const openModalBtn = document.querySelector(".customize-btn");
  const closeModalBtn = document.querySelector(".cust-modal-close-btn");
  const tabButtons = document.querySelectorAll(".cust-header-btns");
  const contentSections = document.querySelectorAll(".modal-content");

  openModalBtn?.addEventListener("click", () => {
    modal.classList.add("show");
  });

  closeModalBtn?.addEventListener("click", closeModal);

  function closeModal() {
    modal.classList.remove("show");
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      tabButtons.forEach((btn) =>
        btn.classList.remove("cus-modal-header-active")
      );
      this.classList.add("cus-modal-header-active");

      contentSections.forEach((section) => section.classList.remove("active"));

      const target = this.getAttribute("data-target");
      document.getElementById(target).classList.add("active");
    });
  });

  document.querySelector(".cust-header-btns.cus-modal-header-active")?.click();

  // Close modal when clicking outside content area
  modal?.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });
});

// Clicking token name-icon ref to Token-chart page

document.querySelectorAll(".token-cell").forEach((token) => {
  token.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/token-chart.html";
  });
});

//new input value
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("quick-buy-btn");
  const tokenValueSpans = document.querySelectorAll(
    ".quick-buy-token-count .token-value"
  );
  const icon = "\uE001";

  // Add icon initially if not present
  if (!input.value.endsWith(icon)) {
    input.value += " " + icon;
  }

  input.addEventListener("focus", () => {
    if (input.value.endsWith(icon)) {
      input.value = input.value.slice(0, -icon.length).trimEnd();
    }
  });

  input.addEventListener("blur", () => {
    if (input.value && !input.value.endsWith(icon)) {
      input.value += " " + icon;
    }
  });

  // Function to get input value without icon
  const getPureValue = () => {
    return input.value.endsWith(icon)
      ? input.value.slice(0, -icon.length).trimEnd()
      : input.value;
  };

  // Update all token value spans
  const updateTokenValues = () => {
    const pureValue = getPureValue();
    tokenValueSpans.forEach((span) => {
      span.textContent = pureValue;
    });
  };

  // Initial sync
  updateTokenValues();

  // On input change
  input.addEventListener("input", updateTokenValues);
});
