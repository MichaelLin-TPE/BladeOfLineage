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
