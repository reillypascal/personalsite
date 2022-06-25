
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