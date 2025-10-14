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