//----------------------動態調整黑色背景高度-------------------------------

function adjustOverlayHeight() {
  const windowHeight = window.innerHeight - 0;
  const newHeight = windowHeight - 200;
  const blackOverlay = document.querySelector(".main_news_list");
  if (blackOverlay) {
    blackOverlay.style.height = `${newHeight}px`;
  }
}
window.addEventListener("load", adjustOverlayHeight);
window.addEventListener("resize", adjustOverlayHeight);

function navigateToIndex(event) {
  event.preventDefault(); // 阻止默認的超連結行為
  location.replace("../index.html"); // 替換當前頁面的歷史記錄
}
