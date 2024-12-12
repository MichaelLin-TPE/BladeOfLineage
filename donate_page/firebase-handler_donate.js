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

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// function addDataToRealtimeDB() {
//   db.collection("donate_list")
//     .doc()
//     .set({
//       deposit_amount: "10,000",
//       deposit_title: "查看贈品詳細",
//       deposit_content: "滿額10000",
//       createdAt: new Date().toISOString(),
//     })
//     .then(() => {
//       console.log("Document successfully written!");
//     })
//     .catch((error) => {
//       console.error("Error writing document: ", error);
//     });
// }

// // 呼叫函數新增資料
// addDataToRealtimeDB();
// addDataToRealtimeDB();
// addDataToRealtimeDB();
// addDataToRealtimeDB();
// addDataToRealtimeDB();
// addDataToRealtimeDB();
// addDataToRealtimeDB();
getNewsData();

const dialog = document.getElementById("dialog");
const amount_title = document.getElementById("amount_title");
const deposit_title = document.getElementById("deposit_title");
const deposit_content = document.getElementById("deposit_content");

function getNewsData() {
  const container = document.querySelector(".main_news_list");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  const overlayView = document.querySelector(".overlay");
  if (overlayView) {
    overlayView.remove();
  }

  db.collection("donate_list")
    .get()
    .then((querySnapshot) => {
      const container = document.querySelector(".main_news_list"); // 選取容器

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        console.log(doc.id, " => ", doc.data());
        const data = doc.data();
        const amountFromServer = data.deposit_amount;
        const depositContentFromServer = data.deposit_content;
        const titleFromServer = data.deposit_title;

        const div = document.createElement("div");
        div.className = "item"; // 添加樣式類

        div.addEventListener("click", () => {
          openDialog(
            amountFromServer,
            titleFromServer,
            depositContentFromServer
          );
        });

        // 創建標題
        const title = document.createElement("div");
        title.className = "icon-text";

        const icon = document.createElement("img");
        icon.alt = "small_icon";
        icon.src = "../images/lineage_donate_small_icon.png";

        const textSpan = document.createElement("span");
        textSpan.textContent = amountFromServer; // 設置文字內容

        // 創建內容
        const content = document.createElement("div");
        content.className = "item-content";
        const contentSpan = document.createElement("span");
        contentSpan.textContent = titleFromServer;

        const small_icon2 = document.createElement("img");
        small_icon2.className = "small_icon2";
        small_icon2.src = "../images/lineage_donate_small_icon2.png";
        content.appendChild(small_icon2);
        content.append(contentSpan);
        // 把 img 和 span 加入父容器
        title.appendChild(icon);
        title.appendChild(textSpan);
        // 將標題、內容和圖片容器添加到項目容器
        div.appendChild(title);
        div.appendChild(content);

        container.appendChild(div);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

function openDialog(
  amountFromServer,
  titleFromServer,
  depositContentFromServer
) {
  amount_title.textContent = amountFromServer;
  deposit_title.textContent = titleFromServer;
  deposit_content.innerHTML = depositContentFromServer;

  dialog.classList.remove("hidden");
}

dialog.addEventListener("click", (event) => {
  if (event.target == dialog) {
    dialog.classList.add("hidden");
  }
});
