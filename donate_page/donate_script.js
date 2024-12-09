function navigateToIndex(event) {
  event.preventDefault(); // 阻止默認的超連結行為
  location.replace("../home_page/index.html"); // 替換當前頁面的歷史記錄
}
window.addEventListener("resize", updateItemWidth);

function updateItemWidth() {
  const container = document.querySelector(".main_news_list");
  const items = document.querySelectorAll(".item");
  const containerWidth = container.offsetWidth;

  // 假設每行需要顯示 3 個項目
  const itemWidth = (containerWidth - 40) / 3; // 40 為 gap 寬度
  items.forEach((item) => {
    item.style.width = `${itemWidth}px`;
  });
}

// 初次計算
updateItemWidth();
