const newPost = document.querySelector('.newpost-btn').value.trim();


document
    .querySelector('.newpost-btn')
    .addEventListener('click', createNewPost);


function createNewPost() {
    document.location.replace('/createpost');
}