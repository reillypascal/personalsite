
function hamburgerToggle() {
    var x = document.getElementById("menuLinks");
    if (x.style.display === "block") {
    x.style.display = "none";
    } else {
    x.style.display = "block";
    }
}
function hamburgerOnOff() {
    var size = window.innerWidth;
    console.log(size);
    var x = document.getElementById("menuLinks");
    if (size >= 640) {
    x.style.display = "contents";
    } else {
    x.style.display = "none";
    }
}