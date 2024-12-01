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
  location.replace("./index.html"); // 替換當前頁面的歷史記錄
}

//----------------------動態調整黑色背景高度-------------------------------

//----------------------滑鼠移動更改攻略圖片-------------------------------
// changeIconWhenMouseOver("news_info");
// changeIconWhenMouseOver("system_info");

// function changeIconWhenMouseOver(id) {
//   const userGuideIcon = document.getElementById(id);

//   // 滑過時替換圖片
//   userGuideIcon.addEventListener("mouseover", () => {
//     let imageId = "";
//     if (id == "news_info") {
//       imageId = "./images/lineage_news_info_icon_active.png";
//     } else if (id == "system_info") {
//       imageId = "./images/lineage_system_info_icon_active.png";
//     }
//     userGuideIcon.src = imageId;
//   });

//   // 滑出時恢復原圖
//   userGuideIcon.addEventListener("mouseout", () => {
//     let imageId = "";
//     if (id == "news_info") {
//       imageId = "./images/lineage_news_info_icon.png";
//     } else if (id == "system_info") {
//       imageId = "./images/lineage_system_info_icon.png";
//     }
//     userGuideIcon.src = imageId;
//   });
// }
