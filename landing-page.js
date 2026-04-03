// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('loginModal');
    const openBtn = document.getElementById('openLoginModal');
    const closeBtn = document.getElementById('closeLoginModal');

    // 1. Open Modal when "Log in" is clicked
    openBtn.addEventListener('click', () => {
        loginModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevents background scrolling
    });

    // 2. Close Modal when "X" is clicked
    closeBtn.addEventListener('click', () => {
        loginModal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Re-enables scrolling
    });

    // 3. Close Modal if user clicks outside the modal box
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
});