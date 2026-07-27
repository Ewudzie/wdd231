const openModalBtn = document.getElementById('openModalBtn');
const infoModal = document.getElementById('infoModal');
const closeModalBtn = document.getElementById('closeModalBtn');

openModalBtn.addEventListener('click', () => {
    infoModal.showModal();
});

closeModalBtn.addEventListener('click', () => {
    infoModal.close();
});