const openModalBtn1 = document.querySelector("#openModalBtn1");
const openModalBtn2 = document.querySelector("#openModalBtn2");
const openModalBtn3 = document.querySelector("#openModalBtn3");
const infoModal = document.querySelector("#infoModal");
const dialogBoxText = document.querySelector("#dialogBox div");
const closeModalBtn = document.querySelector("#closeModalBtn");

openModalBtn1.addEventListener('click', () => {
    dialogBoxText.innerHTML = "An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today.";
    infoModal.showModal();
});

openModalBtn2.addEventListener('click', () => {
    dialogBoxText.innerHTML = "An orange has 62 calories, 15 grams of carbohydrates, and 3 grams of fiber. Oranges are a good source of vitamin C and folate.";
    infoModal.showModal();
});

openModalBtn3.addEventListener('click', () => {
    dialogBoxText.innerHTML = "A banana is a long, curved fruit with a yellow skin and soft, sweet flesh inside. Bananas are a good source of potassium and vitamin B6.";
    infoModal.showModal();
});

closeModalBtn.addEventListener('click', () => {
    infoModal.close();
});