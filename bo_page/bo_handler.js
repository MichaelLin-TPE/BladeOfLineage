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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");
checkToken();
function checkToken() {
  db.collection("admin_list")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        const data = doc.data();
        const tokenFromServer = data.token;

        if (tokenFromServer != token) {
          alert("無任何帳號資訊,退出頁面!");
          window.location.href = "../bo_home/index.html"; // 跳轉到其他頁面
        }
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

const btn_news = document.getElementById("btn_news");
const btn_system = document.getElementById("btn_system");
const btn_donate = document.getElementById("btn_donate");
const btn_item = document.getElementById("btn_item");
const btn_skill = document.getElementById("btn_skill");
const iframe = document.querySelector("iframe");
btn_news.addEventListener("click", () => {
  iframe.src = "../data_management/news_page.html";
});
btn_system.addEventListener("click", () => {
  iframe.src = "../data_management/system_info_page.html";
});
btn_donate.addEventListener("click", () => {
  iframe.src = "../data_management/donate_page.html";
});
btn_item.addEventListener("click", () => {
  iframe.src = "../data_management/item_introduce.html";
});
btn_skill.addEventListener("click", () => {
  iframe.src = "../data_management/skill_introduce.html";
});
