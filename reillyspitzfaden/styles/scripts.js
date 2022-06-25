
// Animate dropdown menu
function hamburgerToggle() {
    var x = document.getElementById("menuLinks");
    if (x.style.display === "block") {
    x.style.display = "none";
    } else {
    x.style.display = "block";
    }
}

// Switch from dropdown to menu bar if >= 640px
function hamburgerOnOff() {
    var size = window.innerWidth;
    var x = document.getElementById("menuLinks");
    if (size >= 640) {
    x.style.display = "contents";
    } else {
    x.style.display = "none";
    }
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches(".nav") && window.innerWidth < 640) {
      var dropdowns = document.getElementById("menuLinks");
      dropdowns.style.display = "none";
    }
}
// Mobile version of same
window.ontouchstart = function(event) {
    if (!event.target.matches(".nav") && window.innerWidth < 640) {
      var dropdowns = document.getElementById("menuLinks");
      dropdowns.style.display = "none";
    }
}
