//---------------------Import FirebaseSDK-------------------------------------

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwqydxvsEBPHuijTsiM6VicY4d-GcOd7s",
  authDomain: "bladeoflineage.firebaseapp.com",
  projectId: "bladeoflineage",
  storageBucket: "bladeoflineage.firebasestorage.app",
  messagingSenderId: "33531551193",
  appId: "1:33531551193:web:6dff1b1d24d0cd82054dc8",
  measurementId: "G-CL2G21H2T4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//---------------------Import FirebaseSDK-------------------------------------

//----------------------動態調整黑色背景高度-------------------------------

function adjustOverlayHeight() {
  const windowHeight = window.innerHeight;
  const newHeight = windowHeight - 320;
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
