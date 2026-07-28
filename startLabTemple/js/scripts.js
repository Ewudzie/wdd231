const openModalBtn = document.querySelector("#openModalBtn");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");

openModalBtn.addEventListener('click', () => {
    dialogBox.showModal();
});

closeButton.addEventListener('click', () => {
    dialogBox.close();
});