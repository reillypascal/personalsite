
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

// submit conmment handler - thisPostURL variable is defined in the page that calls this function
const handleSubmitComment = async (event) => {
    event.preventDefault();

    // reset "Comment submitted!" in div in the same line as the submit button
    const submitSuccess = document.getElementById('submit-success');
    submitSuccess.innerText = '';

    // get form data
    const myForm = event.target;
    const formData = new FormData(myForm);
    // make FormData into an object to easily send via supabase-js
    const formObject = {
        name: formData.get("name"),
        email: formData.get("email"),
        postURL: thisPostURL,
        comment: formData.get("comment")
    };

    // call the serverless function and send it 
    // formObject in the body of the request
    const response = await fetch('/.netlify/functions/set_comment', {
        method: "POST",
        body: JSON.stringify(formObject)
    })
        .then(response => {
            // reset form to indicate comment submitted
            const commentForm = document.getElementById('comment-form');
            const submitSuccess = document.getElementById('submit-success');
            
            commentForm.reset();
            submitSuccess.innerText = "Comment submitted!";
        })
        .catch(error => {
            // reset form to indicate comment submitted
            const commentForm = document.getElementById('comment-form');
            const submitSuccess = document.getElementById('submit-success');
            
            commentForm.reset();
            submitSuccess.innerText = "Error submitting comment";

            console.log(error);
            console.log(response);
        });
};

// retrieve conmment handler - thisPostURL is defined in page
const handleGetComments = async (event) => {
    event.preventDefault();

    // erase previously-loaded comments
    const parentDiv = document.getElementById('comment-section');
    parentDiv.innerHTML = '';

    // display spinner
    let spinnerBreak = document.createElement('br');
    let spinner = document.createElement('img');
    spinner.src = "../media/Rolling-1s-64px.gif";
    parentDiv.appendChild(spinnerBreak);
    parentDiv.appendChild(spinner);

    // call serverless function
    const response = await fetch('/.netlify/functions/get_comment', {
        method:'POST',
        body: JSON.stringify({
            postURL: thisPostURL
        })
    })
        .then(response => response.json()) // .json() returns a promise too, so there needs to be another .then()
        .then(json => {
            // clear spinner
            const parentDiv = document.getElementById('comment-section');
            parentDiv.innerHTML = '';

            if (Object.keys(json).length === 0) {
                let commentBreak = document.createElement('br');
                let errorParagraph = document.createElement('p');

                errorParagraph.innerText = 'No comments found';

                parentDiv.appendChild(commentBreak);
                parentDiv.appendChild(errorParagraph);
            } else {
                // iterate through comments, make divs for each
                for (let element of json) {
                    // make new div, children
                    let commentDiv = document.createElement('div');
                    let commenterName = document.createElement('h3');
                    let thisComment = document.createElement('p');
                    let commentDateHR = document.createElement('hr');
                    let commentDate = document.createElement('p');
                    let commentBreak = document.createElement('br');

                    let dateToParse = element.created_at;
                    const dateObj = new Date(dateToParse);

                    // set up children
                    commentDiv.className = 'comment';
                    commenterName.textContent = element.name;
                    thisComment.textContent = element.comment;
                    // commentDateHR.style.color = "#565973";
                    commentDate.textContent = `Date: ${dateObj.getMonth() + 1}-${dateObj.getDay()}-${dateObj.getFullYear()}`;
                    commentDate.style.fontSize = "10pt";

                    // add children to div
                    commentDiv.appendChild(commenterName);
                    commentDiv.appendChild(thisComment);
                    commentDiv.appendChild(commentDateHR);
                    commentDiv.appendChild(commentDate);

                    // add to document
                    parentDiv.appendChild(commentBreak);
                    parentDiv.appendChild(commentDiv);
                }
            }
        })
        .catch(error => {
            // alert(error);
            // clear spinner, any past comments; display error instead
            const parentDiv = document.getElementById('comment-section');
            parentDiv.innerHTML = '';

            let commentBreak = document.createElement('br');
            let errorParagraph = document.createElement('p');

            errorParagraph.innerText = 'Error retrieving comments';

            parentDiv.appendChild(commentBreak);
            parentDiv.appendChild(errorParagraph);

            console.log(error);
            console.log(response);
        });
}

const handleSubmitHeart = async (event) => {
    // event.preventDefault();

    const reactCtr = document.getElementById('react-ctr');
    reactCtr.innerText = '';

    const reactionObject = {
        heart: 1,
        postURL: thisPostURL
    };

    const response = await fetch('/.netlify/functions/set_heart', {
        method: "POST",
        body: JSON.stringify(reactionObject)
    })
        .then(response => {

        })
        .catch(error => {
            reactCtr.innerText = "error reacting to post";

            console.log(error);
            console.log(response);
        });
};