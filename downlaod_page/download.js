function navigateToIndex(event) {
  event.preventDefault(); // 阻止默認的超連結行為
  location.replace("../home_page/index.html"); // 替換當前頁面的歷史記錄
}
