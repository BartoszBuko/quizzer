const joinNowBtn = document.querySelector("[data-join-now]");
const body = document.querySelector("body");

window.location.reload();

joinNowBtn.addEventListener("click", () => {
  if (window.innerWidth >= 1440) {
    body.style.overflow = "hidden";
    joinNowBtn.classList.add("animate-join-desktop");
    setTimeout(() => {
      window.location.href = "./pages/quizes.html";
      isVisited = true;
    }, 500);
    return;
  }
  if (window.innerWidth < 1440) {
    joinNowBtn.classList.add("animate-join");
    setTimeout(() => {
      window.location.href = "./pages/quizes.html";
      isVisited = true;
    }, 500);
  }
});
