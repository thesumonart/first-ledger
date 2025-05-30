const path = window.location.pathname;
let currentPage = "home";

if (path !== "/" && path !== "") {
  const filename = path.split("/").pop().replace(".html", "");

  const pageMap = {
    "new-tokens": "newTokens",
    "liquidity-pools": "pools",
    referral: "referral",
    leaderboard: "leaderboard",
    "launch-token": "launchToken",
  };

  currentPage = pageMap[filename] || filename;
}

fetch("/components/navbar.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("main-navbar").innerHTML = html;

    // Set active nav link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.dataset.page === currentPage);
    });

    // Menu open/close logic
    const menuButton = document.querySelector(".berger-button");
    const sidebarMenu = document.getElementById("sidebarMenu");
    const closeMenu = document.getElementById("closeMenu");
    const overlay = document.getElementById("sidebarOverlay");

    if (menuButton && sidebarMenu && closeMenu && overlay) {
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
    }
  })
  .catch((err) => {
    console.error("Error loading navbar:", err);
  });
