


document
    .querySelector('.update-btn')
    .addEventListener('click', updatePost);



async function updatePost() {

    const updatedContent = document.querySelector('.post-content').value.trim();
    const updatedTitle = document.querySelector('.post-title').value.trim();


    let path = window.location.href;

    const response = await fetch(path, {
        method: "PUT",
        body: JSON.stringify({ updatedTitle, updatedContent }),
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        alert("This Post has been Updated successfully !");
        document.location.replace('/dashboard');
    } else {
        alert("Failed to Update post.");
    }

}

