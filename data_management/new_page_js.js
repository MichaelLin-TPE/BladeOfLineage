const firebaseConfig = {
  apiKey: "AIzaSyAwqydxvsEBPHuijTsiM6VicY4d-GcOd7s",
  authDomain: "bladeoflineage.firebaseapp.com",
  projectId: "bladeoflineage",
  storageBucket: "bladeoflineage.firebasestorage.app", // 修改 storageBucket
  messagingSenderId: "33531551193",
  appId: "1:33531551193:web:6dff1b1d24d0cd82054dc8",
  measurementId: "G-CL2G21H2T4",
};

// 初始化 Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = app.storage();
const db = firebase.firestore();
const fileInput = document.getElementById("file_input");
const previewImage = document.getElementById("previewImage");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const btnSubmit = document.getElementById("btn_submit");

getData();

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      previewImage.style.display = "block"; // 顯示預覽圖片
    };
    reader.readAsDataURL(file); // 讀取圖片並顯示
  }
});
btnSubmit.addEventListener("click", () => {
  const file = fileInput.files[0];
  if (!file) {
    alert("請選擇一張照片");
    return;
  }
  const storageRef = storage.ref(`news_images/${file.name}`);
  const uploadTask = storageRef.put(file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("上傳進度:", progress + "%");
    },
    (error) => {
      console.error("上傳失敗:", error);
      alert("上傳失敗");
    },
    async () => {
      // 上傳完成後獲取下載 URL
      const downloadURL = await storageRef.getDownloadURL();
      console.log("圖片下載連結:", downloadURL);

      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      if (title == "" || content == "") {
        alert("請輸入標題或是內容");
        return;
      }
      console.log("title , content :", title + " , " + content);
      addNews(title, getContentForHtml(), downloadURL);
    }
  );
});

function getContentForHtml() {
  const content = document.getElementById("content").value;
  const htmlString = content
    .split("\n")
    .map((line) => {
      if (line === "") {
        return '<p style="color: black;">&nbsp;</p>';
      } else {
        // 將所有連續空白替換為 HTML 空白實體
        const formattedLine = line.replace(/ /g, "&nbsp;");
        return `<p style="color: black;">${formattedLine}</p>`;
      }
    })
    .join("");
  console.log("html : ", htmlString);
  return htmlString;
}

async function addNews(title, content, url) {
  db.collection("new_info")
    .add({
      title: title,
      content: content,
      image_url: url,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
      console.log("新增成功，文件 ID：", docRef.id);
      alert("新增成功!");
      fileInput.value = "";
      titleInput.value = "";
      contentInput.value = "";
      previewImage.src = "";
      getData();
    })
    .catch((error) => {
      console.error("新增失敗: ", error);
    });
}

function getData() {
  db.collection("new_info")
    .get()
    .then((querySnapshot) => {
      const listContainer = document.querySelector(".management_data");
      while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
      }
      let index = 0;
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        console.log(doc.id, " => ", doc.data());
        const data = doc.data();
        const title = data.title;
        const dateFromServer = data.date;

        // 創建 row 容器
        const row = document.createElement("div");
        row.classList.add("row");

        // 創建 title span
        const titleSpan = document.createElement("span");
        titleSpan.textContent = title;
        titleSpan.id = "titleFromServer";

        // 創建 date span
        const dateSpan = document.createElement("span");
        dateSpan.textContent = getTime(dateFromServer);
        dateSpan.id = "date";

        // 創建刪除按鈕
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "刪除";
        deleteButton.id = "btn_delete";
        deleteButton.type = "button";

        // 為刪除按鈕添加事件監聽器
        deleteButton.addEventListener("click", () => {
          openDialog(doc.id, title);
        });

        // 將所有元素添加到 row 中
        row.appendChild(titleSpan);
        row.appendChild(dateSpan);
        row.appendChild(deleteButton);

        // 將 row 添加到管理資料的容器中
        listContainer.appendChild(row);
        index++;
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
const dialogCover = document.querySelector(".dialog-overlay");
const dialog_title = document.getElementById("dialog_title");
const btnCanel = document.getElementById("btn_cancel");
const btnConfirm = document.getElementById("btn_confirm");
function openDialog(docId, title) {
  dialogCover.classList.remove("hidden");

  dialog_title.textContent = "確認刪除 " + title + "?";

  btnCanel.addEventListener("click", () => {
    dialogCover.classList.add("hidden");
  });
  btnConfirm.addEventListener("click", () => {
    deleteDocument(docId);
  });
}

function deleteDocument(docId) {
  db.collection("new_info")
    .doc(docId)
    .delete()
    .then(() => {
      console.log(`Document with ID ${docId} successfully deleted!`);
      alert("資料刪除成功");
      dialogCover.classList.add("hidden");
      // 從 DOM 中移除該 row
      getData();
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}
