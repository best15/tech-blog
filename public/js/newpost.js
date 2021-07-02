const postBlog = document.querySelector('.post-btn').value.trim();

document
    .querySelector('.post-btn')
    .addEventListener('click', postNewBlog);

async function postNewBlog() {
    const postTitle = document.querySelector('.post-title').value.trim();
    const postContent = document.querySelector('.post-content').value.trim();

    const response = await fetch("/createpost", {
        method: "POST",
        body: JSON.stringify({ postTitle, postContent }),
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        alert("Post created successfully!!");
        document.location.replace("/dashboard");
    } else {
        alert("Failed to create mew post.");
    }
}