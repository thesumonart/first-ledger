function loadWatchlistBar() {
  fetch("/components/watchlistBar.html") // Path to your watchlistBar.html file
    .then((res) => res.text())
    .then((html) => {
      // Inject the content into the .watchlist-bar container
      document.getElementById("watchlist-bar").innerHTML = html;
    })
    .catch((error) => {
      console.error("Error loading watchlist:", error);
    });
}

loadWatchlistBar();
