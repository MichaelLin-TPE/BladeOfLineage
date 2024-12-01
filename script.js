//----------------------動態調整黑色背景高度-------------------------------

function adjustOverlayHeight() {
  const windowHeight = window.innerHeight;
  const newHeight = windowHeight - 380;
  const blackOverlay = document.querySelector(".black-overlay");
  if (blackOverlay) {
    blackOverlay.style.height = `${newHeight}px`;
  }
}
window.addEventListener("load", adjustOverlayHeight);
window.addEventListener("resize", adjustOverlayHeight);

//----------------------動態調整黑色背景高度-------------------------------

//----------------------滑鼠移動更改攻略圖片-------------------------------
// 獲取圖片元素
const userGuideIcon = document.getElementById("user_guide_icon");

// 滑過時替換圖片
userGuideIcon.addEventListener("mouseover", () => {
  userGuideIcon.src = "./images/lineage_new_user_guide_active.png";
});

// 滑出時恢復原圖
userGuideIcon.addEventListener("mouseout", () => {
  userGuideIcon.src = "./images/lineage_new_user_guide.png";
});
//----------------------滑鼠移動更改攻略圖片-------------------------------

//----------------------滑鼠移動更改技能介紹圖片-------------------------------
// 獲取圖片元素
const skillGuideIcon = document.getElementById("skill_guide_icon");

// 滑過時替換圖片
skillGuideIcon.addEventListener("mouseover", () => {
  skillGuideIcon.src = "./images/lineage_skill_guide_active.png";
});

// 滑出時恢復原圖
skillGuideIcon.addEventListener("mouseout", () => {
  skillGuideIcon.src = "./images/lineage_skill_guide.png";
});
//----------------------滑鼠移動更改技能介紹圖片-------------------------------

//----------------------滑鼠移動更改裝備介紹圖片-------------------------------
// 獲取圖片元素
const equipGuideIcon = document.getElementById("equip_guide_icon");

// 滑過時替換圖片
equipGuideIcon.addEventListener("mouseover", () => {
  equipGuideIcon.src = "./images/lineage_equip_guide_active.png";
});

// 滑出時恢復原圖
equipGuideIcon.addEventListener("mouseout", () => {
  equipGuideIcon.src = "./images/lineage_equip_guide.png";
});
//----------------------滑鼠移動更改裝備介紹圖片-------------------------------

//----------------------滑鼠移動更改贊助介紹圖片-------------------------------
// 獲取圖片元素
const depositGuideIcon = document.getElementById("deposit_guide_icon");

// 滑過時替換圖片
depositGuideIcon.addEventListener("mouseover", () => {
  depositGuideIcon.src = "./images/lineage_deposit_icon_active.png";
});

// 滑出時恢復原圖
depositGuideIcon.addEventListener("mouseout", () => {
  depositGuideIcon.src = "./images/lineage_deposit_icon.png";
});
//----------------------滑鼠移動更改贊助介紹圖片-------------------------------

//-----------------------把圖票加入時間戳-------------------------------------
const img = document.getElementsByName("title");
img.src = "../images/lineage_title.png?v=" + new Date().getTime();
//-----------------------把圖票加入時間戳-------------------------------------

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
const contactUsArea = document.querySelector(".contact_us_area");

let isDragging = false; // 用於判斷是否正在拖動

contactUsArea.addEventListener("mousedown", function (event) {
  let shiftX = event.clientX - contactUsArea.getBoundingClientRect().left;
  let shiftY = event.clientY - contactUsArea.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {
    contactUsArea.style.left = pageX - shiftX + "px";
    contactUsArea.style.top = pageY - shiftY + "px";
  }

  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", onMouseMove);

  document.addEventListener("mouseup", function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  });

  contactUsArea.ondragstart = function () {
    return false;
  };
});

// 點擊事件的處理函數
function handleClick() {
  alert("你點擊了聯繫我們的圖標！");
  // 這裡可以放其他你想要執行的功能
}
//-----------------------Floating icon---------------------------------------
