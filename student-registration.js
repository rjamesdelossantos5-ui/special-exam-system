// Selectors
const regModal = document.getElementById('regModal');
const openBtn = document.querySelector('.btn-primary'); // The + New Registration button
const closeX = document.getElementById('closeReg');
const cancelBtn = document.getElementById('cancelReg');
const form = document.getElementById('registrationForm');

// Open Modal
openBtn.addEventListener('click', () => {
    regModal.classList.remove('hidden');
});

// Close Modal Function
const closeAll = () => {
    regModal.classList.add('hidden');
    form.reset();
};

// Event Listeners for Closing
closeX.addEventListener('click', closeAll);
cancelBtn.addEventListener('click', closeAll);

// Submit Logic
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Special Exam Application Submitted!");
    closeAll();
});

console.log("ExamPass Dashboard Scripts Loaded Successfully.");