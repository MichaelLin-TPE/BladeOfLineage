function navigateToIndex(event) {
  event.preventDefault(); // 阻止默認的超連結行為
  location.replace("../index.html"); // 替換當前頁面的歷史記錄
}

// function updateItemWidth() {
//   const container = document.querySelector(".main_news_list");
//   const items = document.querySelectorAll(".item");
//   const containerWidth = container.offsetWidth;

//   // 動態計算可以顯示的列數
//   const calculateColumns = () => {
//     if (containerWidth >= 1200) return 3;
//     if (containerWidth >= 768) return 2;
//     return 1; // 小螢幕上每行一個
//   };

//   const columns = calculateColumns();
//   const gap = 20; // 假設間距為 20px
//   const itemWidth = (containerWidth - (columns - 1) * gap) / columns;

//   items.forEach((item) => {
//     // 設定寬度和最大寬度
//     item.style.width = `${itemWidth}px`;
//     item.style.maxWidth = `${itemWidth}px`;

//     // 確保圖片不會超出容器
//     const img = item.querySelector("img");
//     if (img) {
//       img.style.maxWidth = "100%";
//       img.style.height = "auto";
//       img.style.objectFit = "cover";
//     }
//   });
// }

// // 初次計算
// updateItemWidth();

// // 確保在頁面加載後重新計算
// window.addEventListener("load", updateItemWidth);
