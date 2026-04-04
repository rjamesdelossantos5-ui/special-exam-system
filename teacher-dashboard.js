document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. DROPDOWN LOGIC (Navbar) --- */
    const teacherNotifBtn = document.getElementById('notifBtn');
    const teacherNotifMenu = document.getElementById('notifDropdown');
    const teacherProfileBtn = document.getElementById('userProfileBtn');
    const teacherProfileMenu = document.getElementById('profileDropdown');

    if (teacherNotifBtn && teacherNotifMenu) {
        teacherNotifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            teacherNotifMenu.classList.toggle('hidden');
            if (teacherProfileMenu) teacherProfileMenu.classList.add('hidden');
        });
    }

    if (teacherProfileBtn && teacherProfileMenu) {
        teacherProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            teacherProfileMenu.classList.toggle('hidden');
            if (teacherNotifMenu) teacherNotifMenu.classList.add('hidden');
        });
    }

    /* --- 2. TABLE ACTIONS (Accept/Reject) --- */
    const acceptButtons = document.querySelectorAll('.btn-accept');
    const rejectButtons = document.querySelectorAll('.btn-reject');
    const modal = document.getElementById('rejectModal');
    const closeModal = document.getElementById('closeModal');
    const confirmReject = document.querySelector('.btn-confirm-reject');
    
    let activeRow = null; 

    // Accept Logic: Vanish immediately
    acceptButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const row = e.target.closest('.student-row');
            row.style.opacity = '0';
            row.style.transform = 'translateX(20px)';
            row.style.transition = '0.3s ease';
            
            setTimeout(() => {
                row.remove();
            }, 300);
        });
    });

    // Reject Logic: Show modal first
    rejectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            activeRow = e.target.closest('.student-row');
            modal.classList.remove('hidden');
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.add('hidden');
            activeRow = null;
        });
    }

    if (confirmReject) {
        confirmReject.addEventListener('click', () => {
            const reason = modal.querySelector('textarea').value;
            if (reason.trim() === "") {
                alert("Please enter a reason.");
                return;
            }
            if (activeRow) {
                activeRow.remove(); // Vanish after reason is submitted
                modal.classList.add('hidden');
                modal.querySelector('textarea').value = "";
            }
        });
    }

    /* --- 3. GLOBAL CLICK (Close everything) --- */
    document.addEventListener('click', (e) => {
        if (teacherNotifMenu && !teacherNotifMenu.contains(e.target) && e.target !== teacherNotifBtn) {
            teacherNotifMenu.classList.add('hidden');
        }
        if (teacherProfileMenu && !teacherProfileMenu.contains(e.target) && !teacherProfileBtn.contains(e.target)) {
            teacherProfileMenu.classList.add('hidden');
        }
    });
});
