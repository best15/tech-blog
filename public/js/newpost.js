const postBlog = document.querySelector('.post-btn').value.trim();

document
    .querySelector('.post-btn')
    .addEventListener('click', postNewBlog);

async function postNewBlog() {
    const postTitle = document.querySelector('.post-title').value.trim();
    const postContent = document.querySelector('.post-content').value.trim();
    const user_id = 2;
    console.log(postTitle, postContent);

    const response = await fetch("/createpost", {
        method: "POST",
        body: JSON.stringify({ postTitle, postContent, user_id }),
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        alert("Blog posted successfully!!");
        document.location.replace("/");
    } else {
        alert("Failed to sign up.");
    }
}