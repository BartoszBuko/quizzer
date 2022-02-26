const joinNowBtn = document.querySelector("[data-join-now]");
const body = document.querySelector("body");

joinNowBtn.addEventListener("click", () => {
  if (window.innerWidth >= 1440) {
    joinNowBtn.href = "#";
    body.style.overflow = "hidden";
    joinNowBtn.classList.add("animate-join-desktop");
    setTimeout(() => {
      window.location.href = "./pages/quizes.html";
    }, 500);
  }
  joinNowBtn.classList.add("animate-join");
});
