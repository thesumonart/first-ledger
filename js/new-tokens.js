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
    const tokenValueSpans = document.querySelectorAll(".quick-buy-token-count .token-value");

    // Update all token value spans
    const updateTokenValues = (value) => {
      tokenValueSpans.forEach((span) => {
        span.textContent = value;
      });
    };

    // Initial sync
    updateTokenValues(input.value);

    // On input change
    input.addEventListener("input", (e) => {
      updateTokenValues(e.target.value);
    });
  });