let userData = [
    { id: 1, name: "Juan Dela Cruz", role: "Program Head", status: "Active", email: "jdc@365.edu.ph", subjects: ["IT101", "CS202"], accountStatus: "Connected" },
    { id: 2, name: "Prof. Maria Rodriguez", role: "Teacher", status: "Active", email: "m.rod@365.edu.ph", subjects: ["Programming 1", "SIA"], accountStatus: "Connected" },
    { id: 3, name: "Dr. Roberto Cruz", role: "Program Head", status: "Active", email: "r.cruz@365.edu.ph", subjects: ["Capstone Advisor"], accountStatus: "Connected" },
    { id: 4, name: "Pedro Santos", role: "Teacher", status: "Inactive", email: "p.santos@365.edu.ph", subjects: ["Networking"], accountStatus: "Suspended" }
];

let selectedUserId = null;

// Render Table Rows cite: e49964
function renderTable() {
    const tbody = document.getElementById('userTableBody');
    if (!tbody) return;

    tbody.innerHTML = userData.map(user => `
        <tr>
            <td><div class="profile-circle">${getInitials(user.name)}</div></td>
            <td class="name-cell" onclick="viewDetails(${user.id})">${user.name}</td>
            <td><span class="role-badge ${user.role.replace(' ', '-')}">${user.role}</span></td>
            <td><span class="status-badge ${user.status === 'Active' ? 'active-status' : 'inactive-status'}">${user.status}</span></td>
            <td>
                <button class="action-btn" onclick="openEdit(${user.id})"><i class="fa-solid fa-pencil"></i></button>
                <button class="action-btn remove" onclick="openDelete(${user.id})"><i class="fa-solid fa-user-xmark"></i></button>
            </td>
        </tr>
    `).join('');
}

// Dropdown Toggle Logic cite: e51167, e511ab
function setupDropdowns() {
    const notifBell = document.getElementById('notifBell');
    const userTrigger = document.getElementById('userProfileTrigger');

    notifBell.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('notifDropdown').classList.toggle('active-dropdown');
        document.getElementById('userDropdown').classList.remove('active-dropdown');
    });

    userTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('userDropdown').classList.toggle('active-dropdown');
        document.getElementById('notifDropdown').classList.remove('active-dropdown');
    });

    window.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.remove('active-dropdown'));
    });
}

function logout() {
    // Optional: Clear session or local storage if you are using them
    // localStorage.clear();
    // sessionStorage.clear();

    // Redirect to the landing page
    window.location.href = 'index.html'; 
}

// User Actions (Details, Edit, Delete) cite: e514cc, e514e8
function viewDetails(id) {
    const user = userData.find(u => u.id === id);
    document.getElementById('userDetailsContent').innerHTML = `
        <p><strong>Full Name:</strong> ${user.name}</p>
        <p><strong>Account:</strong> ${user.email}</p>
        <p><strong>Role:</strong> ${user.role}</p>
    `;
    document.getElementById('detailsModal').classList.remove('hidden');
}

function openEdit(id) {
    selectedUserId = id;
    const user = userData.find(u => u.id === id);
    document.getElementById('editRole').value = user.role;
    document.getElementById('editStatus').value = user.status;
    document.getElementById('editModal').classList.remove('hidden');
}

function saveUserEdit() {
    const user = userData.find(u => u.id === selectedUserId);
    user.role = document.getElementById('editRole').value;
    user.status = document.getElementById('editStatus').value;
    closeModal('editModal');
    renderTable();
}

function openDelete(id) {
    selectedUserId = id;
    document.getElementById('deleteModal').classList.remove('hidden');
}

function confirmDelete() {
    userData = userData.filter(u => u.id !== selectedUserId);
    closeModal('deleteModal');
    renderTable();
}

// --- ADD USER LOGIC ---

// 1. Open the Modal
function openAddUser() {
    document.getElementById('newName').value = '';
    document.getElementById('newEmail').value = '';
    
    // Explicitly set the default role to Teacher whenever the modal opens
    document.getElementById('newRole').value = 'Teacher'; 
    
    document.getElementById('addModal').classList.remove('hidden');
}
// 2. Save the New User
function saveNewUser() {
    const name = document.getElementById('newName').value;
    const email = document.getElementById('newEmail').value;
    const role = document.getElementById('newRole').value;

    if (!name || !email) {
        alert("Please fill in all fields");
        return;
    }

    // Create new user object
    const newUser = {
        id: userData.length + 1, // Simple ID generation
        name: name,
        role: role,
        status: "Active",
        email: email,
        subjects: [],
        accountStatus: "Connected"
    };

    // Push to array and refresh
    userData.push(newUser);
    closeModal('addModal');
    renderTable();
}

// Helpers
function getInitials(name) { return name.split(' ').map(n => n[0]).join('').toUpperCase(); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

window.onload = () => {
    renderTable();
    setupDropdowns();
};