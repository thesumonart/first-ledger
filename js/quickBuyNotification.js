const quickBuyActBtn = document.querySelectorAll(".quick-buy-action");

async function loadNotificationComponent() {
  const response = await fetch("../components/notification.html");
  if (!response.ok) {
    throw new Error("Failed to load notification component");
  }
  const htmlText = await response.text();
  const container = document.createElement("div");
  container.innerHTML = htmlText.trim();
  return container.firstElementChild;
}

async function handleQuickBuyClick(e) {
  e.preventDefault();
  const clickedBtn = e.currentTarget;

  // Load notification from external file
  const notification = await loadNotificationComponent();

  // Append notification to body
  document.body.appendChild(notification);

  const loadIcon = notification.querySelector(".load");
  const dismissIcon = notification.querySelector(".close-icon-wrapper");

  // Show pending state
  notification.style.display = "flex";
  notification.querySelector(".status-message").textContent =
    "Quick Buy Pending";
  loadIcon.style.display = "inline-block";
  notification.querySelector(".success").style.display = "none";
  notification.style.bottom = "38px";
  notification.style.opacity = "1";

  // Handle dismiss
  dismissIcon.addEventListener("click", () => {
    notification.remove();
  });

  // Disable other buttons except clicked one
  quickBuyActBtn.forEach((btn) => {
    btn.classList.toggle("pending", btn === clickedBtn);
    btn.classList.toggle("disabled", btn !== clickedBtn);
  });

  // After 2 seconds show success notification (clone and modify)
  setTimeout(() => {
    clickedBtn.classList.remove("pending");

    // Clone notification for success
    const successNotification = notification.cloneNode(true);
    successNotification.classList.add("success-notification");
    successNotification.querySelector(".status-message").textContent =
      "Quick Buy Successful";
    successNotification.querySelector(".message").innerHTML = `Swapped 10
      <span class="xrp-logo-wrapper">
        <img src="./public/images/xrp-logo.svg" alt="XRP-logo" class="table-xrp-logo" />
      </span>
      for 0000 TOKEN`;

    // Show success icon, hide load icon
    successNotification.querySelector(".load").style.display = "none";
    successNotification.querySelector(".success").style.display =
      "inline-block";

    // Style success notification position
    successNotification.style.bottom = "38px";
    successNotification.style.display = "flex";
    notification.style.bottom = "88px";
    notification.style.opacity = "0.3";

    // Add dismiss handler for success notification
    const successDismissIcon = successNotification.querySelector(
      ".close-icon-wrapper"
    );
    successDismissIcon.addEventListener("click", () => {
      successNotification.remove();
      notification.style.opacity = "1";
      notification.style.bottom = "38px";
    });

    document.body.appendChild(successNotification);

    // Enable all buttons back
    quickBuyActBtn.forEach((btn) => btn.classList.remove("disabled"));
  }, 2000);
}

// Attach event listener to each Quick Buy button
quickBuyActBtn.forEach((btn) => {
  btn.addEventListener("click", handleQuickBuyClick);
});
