const joinNowBtn = document.querySelector("[data-join-now]");
const body = document.querySelector("body");

const perfEntries = performance.getEntriesByType("navigation");

(function () {
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  };
})();

joinNowBtn.addEventListener("click", () => {
  if (window.innerWidth >= 1440) {
    body.style.overflow = "hidden";
    joinNowBtn.classList.add("animate-join-desktop");
    setTimeout(() => {
      window.location.href = "./pages/quizes.html";
    }, 500);
  }
  if (window.innerWidth < 1440) {
    joinNowBtn.classList.add("animate-join");
    setTimeout(() => {
      window.location.href = "./pages/quizes.html";
    }, 500);
  }
});
