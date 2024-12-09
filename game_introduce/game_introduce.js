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

getItemIntroduceList();

const ivItemIntroduce = document.getElementById("equid_introduce");
ivItemIntroduce.addEventListener("click", () => {
  getItemIntroduceList();
});

const ivSkillIntroduce = document.getElementById("skill_introduce");
ivSkillIntroduce.addEventListener("click", () => {
  getSkillIntroduceList();
});

function getSkillIntroduceList() {
  db.collection("skill_introduce_list")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        console.log(doc.id, " => ", doc.data());
        const data = doc.data();
        const attack = data.attack;
        const closeHit = data.closeHit;
        const description = data.description;
        const extraAttack = data.extraAttack;
        const grip = data.grip;
        const imageUrl = data.imageUrl;
        const itemName = data.itemName;
        const material = data.material;
        const position = data.position;
        const source = data.source;
        const stability = data.stability;
        const weight = data.weight;
        addItemRow(
          position,
          itemName,
          imageUrl,
          attack,
          grip,
          stability,
          material,
          weight,
          closeHit,
          extraAttack,
          source,
          description
        );
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

function getItemIntroduceList() {
  db.collection("item_introduce_list")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        console.log(doc.id, " => ", doc.data());
        const data = doc.data();
        const attack = data.attack;
        const closeHit = data.closeHit;
        const description = data.description;
        const extraAttack = data.extraAttack;
        const grip = data.grip;
        const imageUrl = data.imageUrl;
        const itemName = data.itemName;
        const material = data.material;
        const position = data.position;
        const source = data.source;
        const stability = data.stability;
        const weight = data.weight;
        addItemRow(
          position,
          itemName,
          imageUrl,
          attack,
          grip,
          stability,
          material,
          weight,
          closeHit,
          extraAttack,
          source,
          description
        );
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

function adjustOverlayHeight() {
  const windowHeight = window.innerHeight - 0;
  const newHeight = windowHeight - 200;
  const blackOverlay = document.querySelector(".main_news_list");
  if (blackOverlay) {
    blackOverlay.style.height = `${newHeight}px`;
  }
}
window.addEventListener("load", adjustOverlayHeight);
window.addEventListener("resize", adjustOverlayHeight);

function navigateToIndex(event) {
  event.preventDefault(); // 阻止默認的超連結行為
  location.replace("../home_page/index.html"); // 替換當前頁面的歷史記錄
}

function addItemRow(
  position,
  itemName,
  itemImageSrc,
  attack,
  grip,
  stability,
  material,
  weight,
  closeHit,
  extraAttack,
  source,
  description
) {
  // 選擇 main_news_list
  const mainNewsList = document.querySelector(".main_news_list");
  while (mainNewsList.firstChild) {
    mainNewsList.removeChild(mainNewsList.firstChild);
  }
  // 建立 item_row 的外層 div
  const itemRow = document.createElement("div");
  itemRow.classList.add("item_row");

  // 建立 main_view 區域
  const mainView = document.createElement("div");
  mainView.classList.add("main_view");

  // 添加 position
  const positionDiv = document.createElement("div");
  positionDiv.classList.add("position");
  positionDiv.textContent = position;

  // 添加 item_name
  const itemNameDiv = document.createElement("div");
  itemNameDiv.classList.add("item_name");
  const itemNameImg = document.createElement("img");
  itemNameImg.src = "../images/lineage_item_background.png";
  itemNameImg.alt = "";
  const itemNameSpan = document.createElement("span");
  itemNameSpan.textContent = itemName;
  itemNameDiv.appendChild(itemNameImg);
  itemNameDiv.appendChild(itemNameSpan);

  // 添加 item_image
  const itemImageDiv = document.createElement("div");
  itemImageDiv.classList.add("item_image");
  const itemImage = document.createElement("img");
  itemImage.src = itemImageSrc.trim();
  itemImage.alt = "";
  itemImageDiv.appendChild(itemImage);

  // 添加 basic_property_area
  const basicPropertyArea = document.createElement("div");
  basicPropertyArea.classList.add("basic_property_area");
  basicPropertyArea.innerHTML = `
    <div>攻擊: ${attack}</div>
    <div>握拿: ${grip}</div>
    <div>安定: ${stability}</div>
    <div>材料: ${material}</div>
    <div>重量: ${weight}</div>
  `;

  // 添加 others_property_area
  const othersPropertyArea = document.createElement("div");
  othersPropertyArea.classList.add("others_property_area");
  othersPropertyArea.innerHTML = `
    <div>近距離命中+${closeHit}</div>
    <div>額外攻擊點數+${extraAttack}</div>
  `;

  // 把以上內容加入 main_view
  mainView.appendChild(positionDiv);
  mainView.appendChild(itemNameDiv);
  mainView.appendChild(itemImageDiv);
  mainView.appendChild(basicPropertyArea);
  mainView.appendChild(othersPropertyArea);

  // 添加 where_to_get_area
  const whereToGetArea = document.createElement("div");
  whereToGetArea.classList.add("where_to_get_area");
  const leftAlignSpan = document.createElement("span");
  leftAlignSpan.classList.add("left_align");
  leftAlignSpan.textContent = source;
  const descriptionSpan = document.createElement("span");
  descriptionSpan.classList.add("description");
  descriptionSpan.textContent = description;
  whereToGetArea.appendChild(leftAlignSpan);
  whereToGetArea.appendChild(descriptionSpan);

  // 把 main_view 和 where_to_get_area 加入 item_row
  itemRow.appendChild(mainView);
  itemRow.appendChild(whereToGetArea);

  // 把 item_row 加入 main_news_list
  mainNewsList.appendChild(itemRow);
}
