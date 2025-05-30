// Load watchlist bar HTML, initialize Swiper slider, and setup switch button toggle
function loadWatchlistBar() {
  fetch("/components/watchlistBar.html")
    .then((res) => res.text())
    .then((html) => {
      const container = document.getElementById("watchlist-bar");
      if (!container) throw new Error("Element #watchlist-bar not found");

      // Inject HTML content
      container.innerHTML = html;

      // Initialize Swiper slider
      new Swiper(".watchlist-slider", {
        slidesPerView: "auto",
        grabCursor: true,
        loop: true,
        freeMode: true,
        mousewheel: true,
      });

      // Setup switch button toggle behavior
      const buttons = container.querySelectorAll(".switch-btn");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          buttons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");
        });
      });
    })
    .catch((error) => {
      console.error("Error loading watchlist:", error);
    });
}

// Load watchlist bar after DOM content is loaded
document.addEventListener("DOMContentLoaded", loadWatchlistBar);
