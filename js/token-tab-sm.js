const tabs = document.querySelectorAll(".tab-all-button span");
const contents = document.querySelectorAll(".all-tab-content > div");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs and contents
    tabs.forEach((t) => t.classList.remove("active"));
    contents.forEach((c) => c.classList.remove("active"));

    // Add active class to current tab and corresponding content
    tab.classList.add("active");
    contents[index].classList.add("active");
  });
});
