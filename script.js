let currentPage = "semua";

const semuaPage =
document.getElementById("semuaPage");

const starlightPage =
document.getElementById("starlightPage");

const wdpPage =
document.getElementById("wdpPage");

const skinPage =
document.getElementById("skinPage");

function showPage(page,button){

  currentPage = page;

  document
  .querySelectorAll(".queue-list")
  .forEach(item=>{
    item.classList.add("hidden");
  });

  document
  .getElementById(page + "Page")
  .classList.remove("hidden");

  document
  .querySelectorAll(".menu-btn")
  .forEach(btn=>{
    btn.classList.remove("active");
  });

  if(button){
    button.classList.add("active");
  }

  const navbar =
  document.querySelector(".topbar");

  const title =
  document.querySelector(".status-title");

  const desc =
  document.querySelector(".order-desc");

  // STARLIGHT

  if(page == "starlight"){

    navbar.style.background =
    "#2563eb";

    title.innerHTML =
    'Antrean <span>Starlight</span>';

    desc.innerHTML =
    'Realtime order kategori starlight';

  }

  // WDP

  else if(page == "wdp"){

    navbar.style.background =
    "#7c3aed";

    title.innerHTML =
    'Antrean <span>WDP</span>';

    desc.innerHTML =
    'Realtime order kategori WDP';

  }

  // SKIN

  else if(page == "skin"){

    navbar.style.background =
    "#16a34a";

    title.innerHTML =
    'Antrean <span>Skin</span>';

    desc.innerHTML =
    'Realtime order kategori skin';

  }

  // SEMUA

  else{

    navbar.style.background =
    "#a5ad14";

    title.innerHTML =
    'Status <span>Antrian</span>';

    desc.innerHTML =
    'Semua order realtime';

  }

}

function renderCard(item,index){

  return `

    <div class="queue-card">

      <div class="queue-top">

        <div class="tag">
          #${index + 1}
        </div>

        <div class="status ${item.status}">
          ${item.status.toUpperCase()}
        </div>

      </div>

      <div class="info-grid">

        <div class="info">
          <small>NAMA</small>
          <h3>${item.nama}</h3>
        </div>

        <div class="info">
          <small>PRODUK</small>
          <h3>${item.produk}</h3>
        </div>

        <div class="info">
          <small>ID SERVER</small>
          <h3>${item.server}</h3>
        </div>

        <div class="info">
          <small>NICKNAME</small>
          <h3>${item.nickname}</h3>
        </div>

        <div class="info">
          <small>KATEGORI</small>
          <h3>${item.kategori}</h3>
        </div>

      </div>

    </div>

  `;

}

function ambilData(){

  const dataAntrian =
  JSON.parse(localStorage.getItem("antrian")) || [];

  semuaPage.innerHTML = "";
  starlightPage.innerHTML = "";
  wdpPage.innerHTML = "";
  skinPage.innerHTML = "";

  let starlightCount = 0;
  let wdpCount = 0;
  let skinCount = 0;

  // STATUS PER KATEGORI

  let starlightWaiting = 0;
  let starlightProcess = 0;
  let starlightDone = 0;

  let wdpWaiting = 0;
  let wdpProcess = 0;
  let wdpDone = 0;

  let skinWaiting = 0;
  let skinProcess = 0;
  let skinDone = 0;

  // STATUS SEMUA

  let waiting = 0;
  let process = 0;
  let done = 0;

  dataAntrian.forEach((item,index)=>{

    // STATUS SEMUA

    if(item.status === "menunggu"){
      waiting++;
    }

    if(item.status === "diproses"){
      process++;
    }

    if(item.status === "selesai"){
      done++;
    }

    // SEMUA PAGE

    semuaPage.innerHTML +=
    renderCard(item,index);

    // STARLIGHT

    if(item.kategori === "starlight"){

      starlightCount++;

      if(item.status === "menunggu"){
        starlightWaiting++;
      }

      if(item.status === "diproses"){
        starlightProcess++;
      }

      if(item.status === "selesai"){
        starlightDone++;
      }

      starlightPage.innerHTML +=
      renderCard(item,index);

    }

    // WDP

    if(item.kategori === "wdp"){

      wdpCount++;

      if(item.status === "menunggu"){
        wdpWaiting++;
      }

      if(item.status === "diproses"){
        wdpProcess++;
      }

      if(item.status === "selesai"){
        wdpDone++;
      }

      wdpPage.innerHTML +=
      renderCard(item,index);

    }

    // SKIN

    if(item.kategori === "skin"){

      skinCount++;

      if(item.status === "menunggu"){
        skinWaiting++;
      }

      if(item.status === "diproses"){
        skinProcess++;
      }

      if(item.status === "selesai"){
        skinDone++;
      }

      skinPage.innerHTML +=
      renderCard(item,index);

    }

  });

  // TOTAL SEMUA

  const totalSemua =
  starlightCount +
  wdpCount +
  skinCount;

  // HALAMAN SEMUA

  if(currentPage === "semua"){

    document.getElementById("total").innerText =
    totalSemua;

    document.getElementById("waiting").innerText =
    waiting;

    document.getElementById("process").innerText =
    process;

    document.getElementById("done").innerText =
    done;

  }

  // HALAMAN STARLIGHT

  if(currentPage === "starlight"){

    document.getElementById("total").innerText =
    starlightCount;

    document.getElementById("waiting").innerText =
    starlightWaiting;

    document.getElementById("process").innerText =
    starlightProcess;

    document.getElementById("done").innerText =
    starlightDone;

  }

  // HALAMAN WDP

  if(currentPage === "wdp"){

    document.getElementById("total").innerText =
    wdpCount;

    document.getElementById("waiting").innerText =
    wdpWaiting;

    document.getElementById("process").innerText =
    wdpProcess;

    document.getElementById("done").innerText =
    wdpDone;

  }

  // HALAMAN SKIN

  if(currentPage === "skin"){

    document.getElementById("total").innerText =
    skinCount;

    document.getElementById("waiting").innerText =
    skinWaiting;

    document.getElementById("process").innerText =
    skinProcess;

    document.getElementById("done").innerText =
    skinDone;

  }

}

ambilData();

setInterval(()=>{

  ambilData();

},1000);

function loginAdmin(){

  const username =
  prompt("Masukkan Username");

  const password =
  prompt("Masukkan Password");

  if(
    username === "zhishustore" &&
    password === "zhishustore2026"
  ){

    window.location.href =
    "admin.html";

  }

  else{

    alert(
      "Username atau Password salah"
    );

  }

}