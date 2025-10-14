document.addEventListener("DOMContentLoaded", function() {
  function loadMenu() {
    fetch("menu.html").then(function(r){ return r.text(); }).then(function(html){
      var container = document.getElementById("menu");
      if(!container){
        container = document.createElement("header");
        container.id = "menu";
        document.body.insertBefore(container, document.body.firstChild);
      }
      container.innerHTML = html;
      enhanceMenu(container);
    }).catch(function(e){
      console.error("Error loading menu.html:", e);
    });
  }
  function enhanceMenu(container){
    try{
      var current = window.location.pathname.split("/").pop();
      if(!current) current = "index.html";
      var anchors = container.querySelectorAll("a");
      anchors.forEach(function(a){
        if(a.getAttribute("href") === current){
          a.classList.add("active");
        }
      });
    }catch(e){}
    // dropdown behavior: use same logic as existing menus: hover + click toggle for mobile
    var drops = container.querySelectorAll(".dropdown");
    drops.forEach(function(dd){
      dd.addEventListener("click", function(ev){
        // toggle only when clicking the parent link
        var target = ev.target;
        if(target.tagName.toLowerCase()==="a" && target.parentElement === dd){
          ev.preventDefault();
          dd.classList.toggle("open");
        }
      });
      // close when clicking outside
      document.addEventListener("click", function(ev){
        if(!dd.contains(ev.target)){
          dd.classList.remove("open");
        }
      });
    });
  }
  loadMenu();
});
// Alle Dropdown-Buttons holen
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(drop => {
  const button = drop.querySelector('.dropbtn');

  button.addEventListener('click', (event) => {
    event.stopPropagation(); // verhindert, dass der Klick das Schließen auslöst
    closeAllDropdowns(); // schließe andere offene Menüs
    drop.classList.toggle('active'); // öffne oder schließe dieses Menü
  });
});

// Klick außerhalb schließt alle Menüs
document.addEventListener('click', closeAllDropdowns);

function closeAllDropdowns() {
  dropdowns.forEach(drop => drop.classList.remove('active'));
}

// -----------------------------
// SUCHFELD EIN / AUS KLAPPEN
// -----------------------------
const toggleSearchBtn = document.getElementById('toggle-search');
const searchSection = document.getElementById('search-section');

toggleSearchBtn.addEventListener('click', () => {
  searchSection.classList.toggle('hidden');
});

// -----------------------------
// CODE-VERZEICHNIS & ADMIN
// -----------------------------
const publicCodes = {
  "kapitel1": "Kapitel1.html",
  "glossar": "Glosar.html",
  "tutorial5": "Beispiel5.html#special"
};

const secretCodes = {
  "geheim01": "secret64zeichen01.html",
  "gmstart": "GM-Panel.html"
};

const ADMIN_PASSWORD = "admin-super-code";
let isAdmin = false;

// Suchfeld-Elemente
const searchForm = document.getElementById('site-search');
const searchInput = document.getElementById('searchInput');

// Dropdown dynamisch befüllen
const codeList = document.getElementById('code-list');
Object.keys(publicCodes).forEach(code => {
  const div = document.createElement('div');
  div.textContent = code;
  div.classList.add('code-item');
  codeList.appendChild(div);
});

// Suche / Codes prüfen
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const code = searchInput.value.trim().toLowerCase();

  // Admin aktivieren
  if (code === ADMIN_PASSWORD) {
    isAdmin = true;
    alert("✅ Admin-Modus aktiviert!");
    searchInput.value = '';
    return;
  }

  if (publicCodes[code]) {
    window.location.href = publicCodes[code];
  } else if (isAdmin && secretCodes[code]) {
    window.location.href = secretCodes[code];
  } else {
    alert('❌ Ungültiger Code');
  }

  searchInput.value = '';
});
