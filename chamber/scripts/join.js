document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('submission-date');
    if (dateInput) {
        dateInput.value = new Date().toISOString();
    }
});
