// const newPost = document.querySelector('.newpost-btn').value.trim();
// const editPost = document.querySelector('.editpost-btn').value.trim();



document
    .querySelector('.newpost-btn')
    .addEventListener('click', createNewPost);

if (document.querySelector(".deletepost-btn") != null) {
    document
        .querySelector('.deletepost-btn')
        .addEventListener('click', deletepost);
}

function createNewPost() {
    document.location.replace('/createpost');
}

async function deletepost(event) {
    event.preventDefault();
    const postid = document.querySelector('.postid').innerHTML.trim();
    console.log(postid);
    const response = await fetch("/dashboard/deletepost", {
        method: "DELETE",
        body: JSON.stringify({ postid }),
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        alert("Post deleted!");
        document.location.replace("/dashboard");
    } else {
        alert("Failed to delete post.");
    }


}