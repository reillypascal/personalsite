
// Animate dropdown menu
function hamburgerToggle() {
    let x = document.getElementById("menuLinks");
    if (x.style.display === "block") {
    x.style.display = "none";
    } else {
    x.style.display = "block";
    }
}

// Switch from dropdown to menu bar if >= 900px
function hamburgerOnOff() {
    // get window width and font rem size
    let size = window.innerWidth;
    const documentHTML = document.querySelector("html");
    const remSize = window.getComputedStyle(documentHTML).fontSize.replace("px", "");
    
    // get menu div
    let x = document.getElementById("menuLinks");

    // calculate window size in rem; show/hide nav
    if (size >= 56.25 * remSize) { // was 900px
    x.style.display = "contents";
    } else {
    x.style.display = "none";
    }
}

function showDropdown(dropdownID) {
    document.getElementById(dropdownID).classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}