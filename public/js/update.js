


document
    .querySelector('.update-btn')
    .addEventListener('click', updatePost);



async function updatePost() {

    const updatedContent = document.querySelector('.post-content').value.trim();
    const updatedTitle = document.querySelector('.post-title').value.trim();
    console.log(updatedContent, "updatedTitle:", updatedTitle);

    let path = window.location.href;

    const response = await fetch(path, {
        method: "POST",
        body: JSON.stringify({ updatedTitle, updatedContent }),
        headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
        alert("This Post has been Updated successfully !");
        document.location.replace('/dashboard');
    } else {
        alert("Failed to Update post.");
    }

}

