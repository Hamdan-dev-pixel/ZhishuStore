import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ================= FIREBASE ================= */
const firebaseConfig = {
  apiKey: "AIzaSyBvAFRVVUmx8zrfa9E8EprvaTjtDyVgM-4",
  authDomain: "order-2ed47.firebaseapp.com",
  projectId: "order-2ed47",
  storageBucket: "order-2ed47.firebasestorage.app",
  messagingSenderId: "1063088764123",
  appId: "1:1063088764123:web:0565ef484740fb6a94c8fe"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ================= STATE ================= */
let currentPage = "semua";

/* ================= ELEMENT ================= */
const semuaPage = document.getElementById("semuaPage");
const starlightPage = document.getElementById("starlightPage");
const wdpPage = document.getElementById("wdpPage");
const skinPage = document.getElementById("skinPage");

/* ================= PAGE CONTROL ================= */
window.showPage = function (page, button) {

  currentPage = page;

  document.querySelectorAll(".queue-list").forEach(el => {
    el.classList.add("hidden");
  });

  const target = document.getElementById(page + "Page");
  if (target) target.classList.remove("hidden");

  document.querySelectorAll(".menu-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  if (button) button.classList.add("active");

  const navbar = document.querySelector(".topbar");
  const title = document.querySelector(".status-title");
  const desc = document.querySelector(".order-desc");

  if (page === "starlight") {
    navbar.style.background = "#2563eb";
    title.innerHTML = 'Antrean <span>Starlight</span>';
    desc.innerHTML = 'Realtime order kategori starlight';
  }

  else if (page === "wdp") {
    navbar.style.background = "#7c3aed";
    title.innerHTML = 'Antrean <span>WDP</span>';
    desc.innerHTML = 'Realtime order kategori WDP';
  }

  else if (page === "skin") {
    navbar.style.background = "#16a34a";
    title.innerHTML = 'Antrean <span>Skin</span>';
    desc.innerHTML = 'Realtime order kategori skin';
  }

  else {
    navbar.style.background = "#a5ad14";
    title.innerHTML = 'Status <span>Antrian</span>';
    desc.innerHTML = 'Semua order realtime';
  }
};

/* ================= CARD ================= */
function renderCard(item, index) {
  return `
    <div class="queue-card">

      <div class="queue-top">
        <div class="tag">#${index + 1}</div>
        <div class="status ${item.status}">
          ${(item.status || "").toUpperCase()}
        </div>
      </div>

      <div class="info-grid">
        <div class="info"><small>NAMA</small><h3>${item.nama || "-"}</h3></div>
        <div class="info"><small>PRODUK</small><h3>${item.produk || "-"}</h3></div>
        <div class="info"><small>ID SERVER</small><h3>${item.server || "-"}</h3></div>
        <div class="info"><small>NICKNAME</small><h3>${item.nickname || "-"}</h3></div>
        <div class="info"><small>KATEGORI</small><h3>${item.kategori || "-"}</h3></div>
        <div class="info"><small>TANGGAL</small><h3>${item.tanggal || "-"}</h3></div>
        <div class="info"><small>ESTIMASI</small><h3>${item.estimasi || "-"}</h3></div>
      </div>

    </div>
  `;
}

/* ================= REALTIME FIREBASE ================= */
function ambilData() {

  const q = collection(db, "antrian");

  onSnapshot(q, (snapshot) => {

    const dataAntrian = snapshot.docs.map(doc => doc.data());

    // reset
    if (semuaPage) semuaPage.innerHTML = "";
    if (starlightPage) starlightPage.innerHTML = "";
    if (wdpPage) wdpPage.innerHTML = "";
    if (skinPage) skinPage.innerHTML = "";

    let waiting = 0;
    let process = 0;
    let done = 0;

    let starlightWaiting = 0, starlightProcess = 0, starlightDone = 0;
    let wdpWaiting = 0, wdpProcess = 0, wdpDone = 0;
    let skinWaiting = 0, skinProcess = 0, skinDone = 0;

    let starlightCount = 0;
    let wdpCount = 0;
    let skinCount = 0;

    dataAntrian.forEach((item, index) => {

      // semua status
      if (item.status === "menunggu") waiting++;
      if (item.status === "diproses") process++;
      if (item.status === "selesai") done++;

      if (semuaPage) semuaPage.innerHTML += renderCard(item, index);

      // STARLIGHT
      if (item.kategori === "starlight") {
        starlightCount++;
        if (item.status === "menunggu") starlightWaiting++;
        if (item.status === "diproses") starlightProcess++;
        if (item.status === "selesai") starlightDone++;

        if (starlightPage) {
          starlightPage.innerHTML += renderCard(item, index);
        }
      }

      // WDP
      if (item.kategori === "wdp") {
        wdpCount++;
        if (item.status === "menunggu") wdpWaiting++;
        if (item.status === "diproses") wdpProcess++;
        if (item.status === "selesai") wdpDone++;

        if (wdpPage) {
          wdpPage.innerHTML += renderCard(item, index);
        }
      }

      // SKIN
      if (item.kategori === "skin") {
        skinCount++;
        if (item.status === "menunggu") skinWaiting++;
        if (item.status === "diproses") skinProcess++;
        if (item.status === "selesai") skinDone++;

        if (skinPage) {
          skinPage.innerHTML += renderCard(item, index);
        }
      }
    });

    const total = dataAntrian.length;

    if (currentPage === "semua") {
      document.getElementById("total").innerText = total;
      document.getElementById("waiting").innerText = waiting;
      document.getElementById("process").innerText = process;
      document.getElementById("done").innerText = done;
    }

    if (currentPage === "starlight") {
      document.getElementById("total").innerText = starlightCount;
      document.getElementById("waiting").innerText = starlightWaiting;
      document.getElementById("process").innerText = starlightProcess;
      document.getElementById("done").innerText = starlightDone;
    }

    if (currentPage === "wdp") {
      document.getElementById("total").innerText = wdpCount;
      document.getElementById("waiting").innerText = wdpWaiting;
      document.getElementById("process").innerText = wdpProcess;
      document.getElementById("done").innerText = wdpDone;
    }

    if (currentPage === "skin") {
      document.getElementById("total").innerText = skinCount;
      document.getElementById("waiting").innerText = skinWaiting;
      document.getElementById("process").innerText = skinProcess;
      document.getElementById("done").innerText = skinDone;
    }

  });
}

/* ================= LOGIN ADMIN ================= */
window.loginAdmin = function () {
  const username = prompt("Masukkan Username");
  const password = prompt("Masukkan Password");

  if (
    username === "zhishustore" &&
    password === "zhishustore2026"
  ) {
    window.location.href = "admin.html";
  } else {
    alert("Username atau Password salah");
  }
};

/* ================= START ================= */
ambilData();
