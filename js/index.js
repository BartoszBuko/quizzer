const joinNowBtn = document.querySelector("[data-join-now]");
const body = document.querySelector("body");

if (
  joinNowBtn.classList.contains("animate-join-desktop") ||
  joinNowBtn.classList.contains("animate-join")
) {
  window.location.reload();
}
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
      isVisited = true;
    }, 500);
  }
});
