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

const loginBtn = document.getElementById("login_button");
loginBtn.addEventListener("click", () => {
  let account = document.getElementById("input_account").value;
  let password = document.getElementById("input_password").value;
  console.log("帳號:", account);
  console.log("密碼:", password);
  if (account == "" || password == "") {
    alert("帳號或密碼為空!");
    return;
  }
  checkAccountAndPassword(account, password);
});
function checkAccountAndPassword(account, password) {
  db.collection("admin_list")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const data = doc.data();
        const accountFromServer = data.account;
        const passwordFromServer = data.password;

        if (accountFromServer == account && passwordFromServer == password) {
          alert("登入成功");
          const token = generateToken();
          sendToken(token, doc.id);
        } else {
          alert("帳號或密碼錯誤!");
        }
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

function generateToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 30; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  return token;
}
async function sendToken(newToken, id) {
  db.collection("admin_list")
    .doc(id) // 使用 Namespaced SDK 的方法
    .update({
      token: newToken,
    })
    .then(() => {
      console.log("Token 更新成功！");
      const targetUrl = `../bo_page/bo_page.html?token=${encodeURIComponent(
        newToken
      )}`;
      window.location.href = targetUrl;
    })
    .catch((error) => {
      console.error("更新失敗: ", error);
    });
}
