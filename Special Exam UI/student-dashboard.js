// student-dashboard.js

// 1. Wait for the DOM to load before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // 2. Setup Event Listeners for all dashboard cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Extract data from the clicked card
            const subjectName = card.querySelector('h3').innerText;
            const details = card.querySelector('.sub-title').innerText;
            const status = card.querySelector('.badge').innerText;

            openProgressModal(subjectName, details, status);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const notifBtn = document.getElementById('notifBtn');
    const notifDropdown = document.getElementById('notifDropdown');

    if (notifBtn && notifDropdown) {
        // Toggle dropdown on click
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!notifDropdown.contains(e.target) && e.target !== notifBtn) {
                notifDropdown.classList.add('hidden');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.getElementById('userProfileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const notifDropdown = document.getElementById('notifDropdown');

    if (profileBtn && profileDropdown) {
        // Toggle profile menu
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
            
            // Close notification dropdown if it's currently open
            if (notifDropdown) notifDropdown.classList.add('hidden');
        });

        // Global click listener to close menus when clicking elsewhere
        document.addEventListener('click', (e) => {
            // Close profile if clicking outside it
            if (!profileBtn.contains(e.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }
});

// 3. Dynamic Open Function
function openProgressModal(subject, info, status) {
    const modal = document.getElementById('progressModal');
    
    if (modal) {
        // Update Modal Text Dynamically
        modal.querySelector('h2').innerText = subject;
        modal.querySelector('.modal-header .sub-title').innerText = info;

        // Update Stepper Visuals (Example logic)
        updateStepper(status);

        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        console.log(`Opening progress for: ${subject}`);
    }
}

// 4. Stepper Logic (The extra lines that matter)
function updateStepper(status) {
    const steps = document.querySelectorAll('.step');
    
    // Reset steps first
    steps.forEach(step => step.className = 'step locked');

    // Simple logic to light up steps based on status badge
    if (status === "Submitted") {
        steps[0].className = 'step active';
    } else if (status === "Teacher Accepted") {
        steps[0].className = 'step finished';
        steps[1].className = 'step active';
    }
    // Add more conditions as your backend grows
}

// 5. Global Close Function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}