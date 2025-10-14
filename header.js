document.addEventListener("DOMContentLoaded", function() {
  function loadMenu() {
    fetch("menu.html")
      .then(r => r.text())
      .then(html => {
        let container = document.getElementById("menu");
        if (!container) {
          container = document.createElement("header");
          container.id = "menu";
          document.body.insertBefore(container, document.body.firstChild);
        }
        container.innerHTML = html;
        enhanceMenu(container);  // <--- Menü erst JETZT im DOM!
        initDropdowns();         // <--- Dropdowns und Suche erst hier aktivieren
        initSearch();
      })
      .catch(e => console.error("Error loading menu.html:", e));
  }

  function enhanceMenu(container){
    try {
      var current = window.location.pathname.split("/").pop() || "index.html";
      container.querySelectorAll("a").forEach(a => {
        if (a.getAttribute("href") === current) a.classList.add("active");
      });
    } catch(e){}
  }

  function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(drop => {
      const button = drop.querySelector('.dropbtn');
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        closeAllDropdowns();
        drop.classList.toggle('active');
      });
    });
    document.addEventListener('click', closeAllDropdowns);
    function closeAllDropdowns() {
      dropdowns.forEach(drop => drop.classList.remove('active'));
    }
  }

  function initSearch() {
    const toggleSearchBtn = document.getElementById('toggle-search');
    const searchSection = document.getElementById('search-section');
    if (!toggleSearchBtn || !searchSection) return;

    toggleSearchBtn.addEventListener('click', () => {
      searchSection.classList.toggle('hidden');
    });

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
    const searchForm = document.getElementById('site-search');
    const searchInput = document.getElementById('searchInput');
    const codeList = document.getElementById('code-list');
    if (!searchForm || !searchInput || !codeList) return;

    Object.keys(publicCodes).forEach(code => {
      const div = document.createElement('div');
      div.textContent = code;
      div.classList.add('code-item');
      codeList.appendChild(div);
    });

    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const code = searchInput.value.trim().toLowerCase();
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
  }

  loadMenu(); // Start loading!
});


