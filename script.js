/**
 * Toggle options box on focus
 */
const searchBox = document.querySelector(".search-box");
const searchOptions = document.querySelector(".search-options");

searchBox.addEventListener("focusin", (e) => {
  searchOptions.classList.remove("hidden");
});
searchBox.addEventListener("focusout", (e) => {
  searchOptions.classList.add("hidden");
});
