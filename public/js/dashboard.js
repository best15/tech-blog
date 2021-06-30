// const newPost = document.querySelector('.newpost-btn').value.trim();
// const editPost = document.querySelector('.editpost-btn').value.trim();
// const deletePost = document.querySelector('.deletepost-btn').value.trim();


document
    .querySelector('.newpost-btn')
    .addEventListener('click', createNewPost);



function createNewPost() {
    document.location.replace('/createpost');
}

