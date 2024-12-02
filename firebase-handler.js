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

const docRef = db.collection("config").doc("GameStatus");
docRef.onSnapshot(
  (doc) => {
    if (doc.exists) {
      console.log("Current data: ", doc.data());
      const data = doc.data();
      const isOnline = data.isOnline;
      const statusIcon = document.getElementById("server_status_icon");
      if (isOnline) {
        statusIcon.src = "./images/lineage_server_status_active.png";
      } else {
        statusIcon.src = "./images/lineage_server_status_disable.png";
      }
      console.log("isOnline : ", isOnline);
      // 這裡可以做你想要的處理，例如 UI 更新
    } else {
      console.log("No such document!");
    }
  },
  (error) => {
    console.log("Error getting document: ", error);
  }
);

db.collection("new_info")
  .get()
  .then((querySnapshot) => {
    const listContainer = document.getElementById("list-container");

    let index = 0;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (index <= 4) {
        console.log(doc.id, " => ", doc.data());
        const data = doc.data();
        const title = data.title;
        const content = data.content;

        const listItem = document.createElement("div");
        listItem.className = "list-item";
        listItem.textContent = title;
        listContainer.appendChild(listItem);

        listItem.addEventListener("click", () => {
          const targetUrl = `./news_info.html?title=${encodeURIComponent(
            title
          )}&type=info`;

          // 跳轉至目標 URL
          window.location.href = targetUrl;
        });
      }

      index++;
    });
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });

db.collection("system_info")
  .get()
  .then((querySnapshot) => {
    const listContainer2 = document.getElementById("list-container2");
    let index = 0;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (index <= 4) {
        console.log(doc.id, " => ", doc.data());
        const data = doc.data();
        const title = data.title;
        const content = data.content;

        const listItem2 = document.createElement("div");
        listItem2.className = "list-item2";
        listItem2.textContent = title;
        listContainer2.appendChild(listItem2);

        listItem2.addEventListener("click", () => {
          const targetUrl = `./news_info.html?title=${encodeURIComponent(
            title
          )}&type=system`;

          // 跳轉至目標 URL
          window.location.href = targetUrl;
        });
      }
      index++;
    });
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });
