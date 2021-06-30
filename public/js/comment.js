document
    .querySelector('.comment-btn')
    .addEventListener('click', newComment);

async function newComment() {

    const usercomments = document.querySelector('.usercomments').value.trim();
    let path = window.location.href;

    const response = await fetch(path, {
        method: "POST",
        body: JSON.stringify({ usercomments }),
        headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
        alert("Comment successfull !");
        document.location.replace(path);
    } else {
        alert("Failed to sign up.");
    }
}