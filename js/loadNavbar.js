const path = window.location.pathname;
let currentPage = "home";

if (path !== "/" && path !== "") {
  const filename = path.split("/").pop().replace(".html", "");

  // Map URL slug to data-page values (dash-to-camelCase)
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

    document.querySelectorAll(".nav-link").forEach((link) => {
      if (link.dataset.page === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });
