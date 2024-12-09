//-----------------------Floating icon---------------------------------------
// 選取圖片元素
const contactUs = document.getElementById("contact_us");
const community = document.getElementById("community");
contactUs.addEventListener("click", () => {
  handleClick();
});
community.addEventListener("click", () => {
  handleClick();
});

// 點擊事件的處理函數
function handleClick() {
  alert("你點擊了聯繫我們的圖標！");
  // 這裡可以放其他你想要執行的功能
}
//-----------------------Floating icon---------------------------------------
