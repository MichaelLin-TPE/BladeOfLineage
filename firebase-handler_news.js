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

//獲取上一頁的資料
const urlParams = new URLSearchParams(window.location.search);
const titleFromPeriousPage = urlParams.get("title");
const typeFromPeriousPage = urlParams.get("type");

const newsIcon = document.getElementById("news_info");
const systemIcon = document.getElementById("system_info");

let table_name = "news_info";
if (typeFromPeriousPage == "system") {
  newsIcon.src = "./images/lineage_news_info_icon.png";
  systemIcon.src = "./images/lineage_system_info_icon_active.png";
  table_name = "system_info";
}

newsIcon.addEventListener("click", () => {
  newsIcon.src = "./images/lineage_news_info_icon_active.png";
  systemIcon.src = "./images/lineage_system_info_icon.png";
  getNewsData("news_info");
});

systemIcon.addEventListener("click", () => {
  systemIcon.src = "./images/lineage_system_info_icon_active.png";
  newsIcon.src = "./images/lineage_news_info_icon.png";
  getNewsData("system_info");
});

getNewsData(table_name);

function getNewsData(id) {
  const container = document.querySelector(".main_news_list");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  const overlayView = document.querySelector(".overlay");
  if (overlayView) {
    overlayView.remove();
  }

  let tableId = "";
  if (id == "news_info") {
    tableId = "new_info";
  } else {
    tableId = "system_info";
  }

  db.collection(tableId)
    .get()
    .then((querySnapshot) => {
      const container = document.querySelector(".main_news_list"); // 選取容器
      // 創建灰色遮罩並添加到 DOM
      const overlay = document.createElement("div");
      createOverLayView(overlay);

      overlay.addEventListener("click", () => {
        overlay.style.opacity = "0";
        setTimeout(() => {
          overlay.style.display = "none";
        }, 300); // 與動畫時間一致
      });

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        console.log(doc.id, " => ", doc.data());
        const data = doc.data();
        const titleFromServer = data.title;
        const contentFromServer = data.content;
        const imageFromServer = data.image_url;
        const dateFromServer = data.date;

        const div = document.createElement("div");
        div.className = "item"; // 添加樣式類

        // 創建標題
        const title = document.createElement("div");
        title.className = "item-title";
        title.textContent = getTime(dateFromServer);

        // 創建內容
        const content = document.createElement("div");
        content.className = "item-content";
        content.textContent = titleFromServer;

        // 創建圖片容器
        const imageContainer = document.createElement("div");
        imageContainer.className = "item-image";

        // 創建圖片
        const image = document.createElement("img");
        image.src = imageFromServer;
        image.alt = "img";

        // 將圖片添加到圖片容器
        imageContainer.appendChild(image);

        // 將標題、內容和圖片容器添加到項目容器
        div.appendChild(title);
        div.appendChild(content);
        div.appendChild(imageContainer);
        // 點擊 item 顯示灰色遮罩
        div.addEventListener("click", () => {
          overlay.style.display = "block"; // 顯示遮罩
          setTimeout(() => {
            overlay.style.opacity = "1"; // 動畫漸顯
          }, 10); // 延遲確保 display 已生效
          showOverlayData(
            titleFromServer,
            contentFromServer,
            dateFromServer,
            imageFromServer
          );
        });
        // 將項目容器添加到主容器
        container.appendChild(div);

        //比對從上一頁來的資訊是否一樣
        if (titleFromPeriousPage && typeFromPeriousPage) {
          if (titleFromServer == titleFromPeriousPage) {
            overlay.style.display = "block"; // 顯示遮罩
            setTimeout(() => {
              overlay.style.opacity = "1"; // 動畫漸顯
            }, 10); // 延遲確保 display 已生效
            showOverlayData(
              titleFromServer,
              contentFromServer,
              dateFromServer,
              imageFromServer
            );
            return;
          }
        }
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

function getTime(timestampFromServer) {
  // 將 Firebase timestamp 轉換為 JavaScript 的 Date 對象
  const dateObject = timestampFromServer.toDate();

  // 格式化日期（例如 YYYY-MM-DD HH:mm）
  const formattedDate = dateObject.toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return formattedDate;
}

function showOverlayData(title, content, date, imageUrl) {
  const overlay = document.querySelector(".overlay"); // 確保找到遮罩

  // 設置日期
  const dateElement = overlay.querySelector(".overlay-date");
  dateElement.textContent = getTime(date); // 使用 getTime 格式化日期

  // 設置標題
  const titleElement = overlay.querySelector(".overlay-title");
  titleElement.textContent = title;

  // 設置內容
  const contentElement = overlay.querySelector(".overlay-content");
  contentElement.textContent = content;

  // 設置圖片
  const imageElement = overlay.querySelector(".overlay-img");
  imageElement.src = imageUrl;
  imageElement.alt = title || "圖片"; // 提供替代文字
}

function createOverLayView(overlay) {
  overlay.className = "overlay";
  overlay.style.display = "none"; // 預設隱藏
  document.body.appendChild(overlay);

  const date = document.createElement("div");
  date.className = "overlay-date";

  // 創建內容
  const title = document.createElement("div");
  title.className = "overlay-title";

  // 創建內容
  const content = document.createElement("div");
  content.className = "overlay-content";

  // 創建圖片容器
  const imageContainer = document.createElement("div");
  imageContainer.className = "overlay-image";
  const image = document.createElement("img");
  image.className = "overlay-img"; // 使用 class 而非 ID
  image.alt = "overlay image"; // 為圖片提供替代文字
  // 將圖片添加到圖片容器
  imageContainer.appendChild(image);
  // 將標題、內容和圖片容器添加到項目容器
  overlay.appendChild(date);
  overlay.appendChild(imageContainer);
  overlay.appendChild(title);
  overlay.appendChild(content);
}
