
// Animate dropdown menu
function hamburgerToggle() {
    var x = document.getElementById("menuLinks");
    if (x.style.display === "block") {
    x.style.display = "none";
    } else {
    x.style.display = "block";
    }
}

// Switch from dropdown to menu bar if >= 760px
function hamburgerOnOff() {
    var size = window.innerWidth;
    var x = document.getElementById("menuLinks");
    if (size >= 760) {
    x.style.display = "contents";
    } else {
    x.style.display = "none";
    }
}

// submit conmment handler - thisPostURL is defined in page
const handleSubmitComment = async (event) => {
    event.preventDefault();

    const myForm = event.target;
    const formData = new FormData(myForm);
    const formObject = {
        name: formData.get("name"),
        email: formData.get("email"),
        postURL: thisPostURL,
        comment: formData.get("comment")
    };

    const response = await fetch('/.netlify/functions/set_comment', {
        method: "POST",
        body: JSON.stringify(formObject)
    })
        .then(response => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error);
            console.log(response);
        });
};

// retrieve conmment handler - thisPostURL is defined in page
const handleGetComments = async (event) => {
    event.preventDefault();

    const response = await fetch('/.netlify/functions/get_comment', {
        method:'POST',
        body: JSON.stringify({
            postURL: thisPostURL
        })
    })
        .then(response => response.json())
        .then(json => {
            const parentDiv = document.getElementById('comment-section');
            parentDiv.innerHTML = '';

            for (let element of json) {
                // make new div, children
                let commentDiv = document.createElement('div');
                let commenterName = document.createElement('h3');
                let commentDate = document.createElement('p');
                let thisComment = document.createElement('p');
                let commentBreak = document.createElement('br');

                // set up children
                commentDiv.className = 'comment';
                commenterName.textContent = element.name;
                commentDate.textContent = "Date: " + element.created_at;
                thisComment.textContent = element.comment;

                // add children to div
                commentDiv.appendChild(commenterName);
                commentDiv.appendChild(commentDate);
                commentDiv.appendChild(thisComment);

                // add to document
                parentDiv.appendChild(commentBreak);
                parentDiv.appendChild(commentDiv);
            }
        })
        .catch((error) => {
            alert(error);
            console.log(error);
            console.log(response);
        });
}