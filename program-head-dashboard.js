let currentTab = 'first';
let currentRowId = null;

// Mock Data for both approaches
const studentData = {
    first: [
        { id: 'row1', name: 'Juan Dela Cruz', sub: 'Mathematics 101', tea: 'Prof. Rodriguez', date: '2026-03-28' },
        { id: 'row2', name: 'Maria Santos', sub: 'Data Structures', tea: 'Prof. Garcia', date: '2026-03-29' }
    ],
    final: [
        { id: 'row3', name: 'Carlos Lopez', sub: 'Database Management', tea: 'Prof. Santos', date: '2026-03-27' },
        { id: 'row4', name: 'Sofia Martinez', sub: 'Web Development', tea: 'Prof. Reyes', date: '2026-03-28' },
        { id: 'row5', name: 'Ricardo Dalisay', sub: 'Networking 1', tea: 'Prof. Cruz', date: '2026-03-29' }
    ]
};

const masterData = {
    paidSpecialExam: [
        { dateApplied: "20/02/2026", studentName: "Gole Cruz, Holly Klein D.", section: "BSHM 2-203", subject: "Science, Technology, and Society", code: "GEDC1013", program: "BSIT" },
        { dateApplied: "24/02/2026", studentName: "Sumayao, Clarenz Josef", section: "BSIT 2-202", subject: "Systems Integration and Architecture", code: "INTE1021", program: "BSIT" },
        { dateApplied: "24/02/2026", studentName: "Martinez, Marc Erman D.", section: "BSIT 3-203", subject: "Mobile Systems and Technologies", code: "INTE1022", program: "BSIT" },
        { dateApplied: "25/02/2026", studentName: "Orogo, Nicholas E.", section: "BSCS 2-201", subject: "Ethics", code: "GEDC1009", program: "BSIT" },
        { dateApplied: "24/02/2026", studentName: "Monterola, Elaine E.", section: "BSAIS 2-201", subject: "Accounting Information System", code: "ACCT1007", program: "BSAIS" }
    ],
    waivedFee: [
        { dateApplied: "20/02/2026", studentName: "rjames delossantos", section: "BSHM 2-204", subject: "Science, Technology, and Society", code: "GEDC1013", program: "BSHM", reason: "Diagnosed with Acute Tonsillopharyngitis (Medical Certificate)" },
        { dateApplied: "24/02/2026", studentName: "richie lumits", section: "BSTM 3-203", subject: "Strategic Management", code: "CBMC1003", program: "BSTM", reason: "Death of Grandfather (Death Certificate)" }
    ],
    summary: [
        { code: "ACCT1002", subject: "Conceptual Framework and Accounting Standards", count: 1 },
        { code: "CBMC1003", subject: "Strategic Management", count: 3 },
        { code: "CTHC1006", subject: "Philippine Culture and Tourism Geography", count: 10 },
        { code: "GEDC1009", subject: "Ethics", count: 8 }
    ]
};



window.onload = () => switchTab('first');

function switchTab(tab) {
    currentTab = tab;
    // Update active tab UI
    document.getElementById('tabFirst').classList.toggle('active', tab === 'first');
    document.getElementById('tabFinal').classList.toggle('active', tab === 'final');
    renderGrid();
}

document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.getElementById('userProfileBtn');
    const dropdown = document.getElementById('profileDropdown');

    // Toggle dropdown on click
    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    window.addEventListener('click', (e) => {
        if (!profileBtn.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
});

// Logout logic
function logout() {
    // You can add session clearing logic here
    console.log("Redirecting to login...");
}

function renderGrid() {
    const grid = document.getElementById('gridContent');
    const count = studentData[currentTab].length;
    
    // Using your existing card design
    grid.innerHTML = `
        <div class="dept-card" onclick="openDept('BSIT')">
            <div class="card-badge">${count}</div>
            <div class="dept-icon">BS</div>
            <h3>BSIT</h3>
            <p>Bachelor of Science in Information Technology</p>
            <span class="${currentTab === 'first' ? 'pending-tag' : ''}" 
                  style="color: ${currentTab === 'first' ? '#ff4d4d' : '#2ecc71'}; font-weight: 600;">
                ${count} ${currentTab === 'first' ? 'pending approvals' : 'ready for final approval'}
            </span>
        </div>
    `;
}

function openDept(dept) {
    document.getElementById('deptGrid').classList.add('hidden');
    document.getElementById('appView').classList.remove('hidden');
    document.getElementById('currentDeptTitle').innerText = `${dept} - ${currentTab === 'first' ? 'First Approach' : 'Final Approval'}`;
    renderTable();
}

function renderTable() {
    const tbody = document.getElementById('appTableBody');
    const data = studentData[currentTab];
    
    tbody.innerHTML = data.map(item => `
        <tr id="${item.id}" style="transition: 0.3s">
            <td>${item.name}</td>
            <td>${item.sub}</td>
            <td>${item.tea}</td>
            <td>${item.date}</td>
            <td class="action-cell">
                <button class="${currentTab === 'first' ? 'btn-approve' : 'btn-final-approve'}" 
                        onclick="handleVanish('${item.id}')">
                    ${currentTab === 'first' ? 'Approve' : 'Final Approve'}
                </button>
                <button class="btn-reject" onclick="handleReject('${item.id}')">Reject</button>
            </td>
        </tr>
    `).join('');
}

// Function to make row vanish
function handleVanish(id) {
    const row = document.getElementById(id);
    row.style.opacity = "0";
    setTimeout(() => {
        row.remove();
        // Remove from local data to update counts
        studentData[currentTab] = studentData[currentTab].filter(i => i.id !== id);
        updateCounts();
    }, 300);
}

function updateCounts() {
    document.querySelector('#tabFirst .count').innerText = studentData.first.length;
    document.querySelector('#tabFinal .count').innerText = studentData.final.length;
}

function handleReject(rowId) {
    currentRowId = rowId;
    document.getElementById('rejectModal').classList.remove('hidden');
}

function confirmReject() {
    const reason = document.getElementById('rejectReasonInput').value;
    if (reason.trim() !== "") {
        handleVanish(currentRowId);
        closeRejectModal();
    }
}

// Your existing utility functions
function closeRejectModal() {
    document.getElementById('rejectModal').classList.add('hidden');
    document.getElementById('rejectReasonInput').value = '';
}

function closeDept() {
    document.getElementById('appView').classList.add('hidden');
    document.getElementById('deptGrid').classList.remove('hidden');
}

function toggleNotifs() {
    document.getElementById('notifDropdown').classList.toggle('hidden');
}

// Adding Master Data (Simulating your Excel image)


function switchTab(tab) {
    currentTab = tab;
    // UI Reset
    document.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
    document.getElementById('appView').classList.add('hidden');
    document.getElementById('termSelection').classList.add('hidden');
    document.getElementById('masterListView').classList.add('hidden');
    document.getElementById('deptGrid').classList.add('hidden');

    if (tab === 'dept') {
        document.getElementById('tabDept').classList.add('active');
        document.getElementById('termSelection').classList.remove('hidden');
    } else {
        const tabId = tab === 'first' ? 'tabFirst' : 'tabFinal';
        document.getElementById(tabId).classList.add('active');
        document.getElementById('deptGrid').classList.remove('hidden');
        renderGrid();
    }
}

function openMasterList(term) {
    document.getElementById('termSelection').classList.add('hidden');
    document.getElementById('masterListView').classList.remove('hidden');
    document.getElementById('masterListTitle').innerText = `${term} - Completed Applications`;
    
    const tbody = document.getElementById('masterTableBody');
    tbody.innerHTML = masterData.map(item => `
        <tr>
            <td>${item.date}</td>
            <td><strong>${item.name}</strong></td>
            <td>${item.sec}</td>
            <td>${item.sub}</td>
            <td><span class="dept-tag">${item.prog}</span></td>
        </tr>
    `).join('');
}

function backToTerms() {
    document.getElementById('masterListView').classList.add('hidden');
    document.getElementById('termSelection').classList.remove('hidden');
}




/* --- Schedule Management Logic --- */

// Update your existing switchTab to include these views
function switchTab(tab) {
    // Reset all tabs
    document.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
    
    // Hide ALL possible views
    const allViews = [
        'appView', 'termSelection', 'masterListView', 'deptGrid', 
        'schedMainView', 'scheduleFormView'
    ];
    allViews.forEach(view => {
        const el = document.getElementById(view);
        if(el) el.classList.add('hidden');
    });

    if (tab === 'sched') {
        document.getElementById('tabSched').classList.add('active');
        document.getElementById('schedMainView').classList.remove('hidden');
    } else if (tab === 'dept') {
        document.getElementById('tabDept').classList.add('active');
        document.getElementById('termSelection').classList.remove('hidden');
    } else {
        // First or Final Approach logic
        const tabId = tab === 'first' ? 'tabFirst' : 'tabFinal';
        document.getElementById(tabId).classList.add('active');
        document.getElementById('deptGrid').classList.remove('hidden');
        renderGrid(); 
    }
}

// Show the Add Schedule Form
function showAddSchedForm() {
    document.getElementById('schedMainView').classList.add('hidden');
    document.getElementById('scheduleFormView').classList.remove('hidden');
}

// Back to the Schedule Table
function backToSchedMain() {
    document.getElementById('scheduleFormView').classList.add('hidden');
    document.getElementById('schedMainView').classList.remove('hidden');
}

// Show Full Details Modal when a row is clicked
function showSchedDetails(schedId) {
    const modal = document.getElementById('detailsModal');
    const content = document.getElementById('detailBodyContent');
    
    // In a real app, you'd find the data by schedId. 
    // Here is a template for the layout:
    content.innerHTML = `
        <div class="detail-item">
            <span class="detail-label">Schedule ID:</span>
            <span class="detail-value">${schedId}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Date:</span>
            <span class="detail-value">October 24, 2026</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Subject:</span>
            <span class="detail-value">Web Development</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Venue:</span>
            <span class="detail-value">Computer Laboratory 1</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Proctor:</span>
            <span class="detail-value">Prof. Rodriguez</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Status:</span>
            <span class="detail-value" style="color: #2e7d32;">Confirmed</span>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeDetailsModal() {
    document.getElementById('detailsModal').classList.add('hidden');
}

// Function for Save Button
function saveSchedule() {
    const date = document.getElementById('examDate').value;
    const venue = document.getElementById('examVenue').value;

    if(!date || !venue) {
        alert("Please fill in the Date and Venue.");
        return;
    }

    // Logic for saving (e.g., pushing to an array or database)
    alert(`Schedule confirmed for ${date} at ${venue}. Teachers and students will be notified.`);
    
    // Reset view
    backToSchedMain();
}

  /**
         * EXPORT LOGIC: One File, Three Sheets
         */

 

        function exportMasterListToExcel() {
            const wb = XLSX.utils.book_new();
            
            // Create sheets from the three different tables
            const wsPaid = XLSX.utils.table_to_sheet(document.getElementById('paidTable'));
            const wsSummary = XLSX.utils.table_to_sheet(document.getElementById('summaryTable'));
            const wsWaived = XLSX.utils.table_to_sheet(document.getElementById('waivedTable'));
            
            // Append to workbook with proper sheet names
            XLSX.utils.book_append_sheet(wb, wsPaid, "PAID SPECIAL EXAM");
            XLSX.utils.book_append_sheet(wb, wsSummary, "SUMMARY");
            XLSX.utils.book_append_sheet(wb, wsWaived, "WAIVED FEE (VALID REASON)");
            
            // Trigger download
            XLSX.writeFile(wb, "Special_Exam_Master_List_2026.xlsx");
        }

       /**
 * EXAMPASS - Integrated Export and Record Logic
 * Targets: STI College Santa Maria - Capstone Project
 */

// 1. TEST DATA (Based on your school records)

// 2. DATA LOADING FUNCTIONS (Ensures info is in the HTML table)
function loadPaidData() {
    const tbody = document.getElementById('paidBody');
    if (!tbody) return;
    tbody.innerHTML = masterData.paidSpecialExam.map(item => `
        <tr>
            <td>${item.dateApplied}</td>
            <td><strong>${item.studentName}</strong></td>
            <td>${item.section}</td>
            <td>${item.subject}</td>
            <td>${item.code}</td>
            <td>${item.program}</td>
        </tr>
    `).join('');
}

function loadWaivedData() {
    const tbody = document.getElementById('waivedBody');
    if (!tbody) return;
    tbody.innerHTML = masterData.waivedFee.map(item => `
        <tr>
            <td>${item.dateApplied}</td>
            <td>${item.studentName}</td>
            <td>${item.section}</td>
            <td>${item.subject}</td>
            <td>${item.code}</td>
            <td>${item.program}</td>
            <td>${item.reason}</td>
        </tr>
    `).join('');
}

function loadSummaryData() {
    const tbody = document.getElementById('summaryBody');
    if (!tbody) return;
    tbody.innerHTML = masterData.summary.map(item => `
        <tr>
            <td>${item.code}</td>
            <td>${item.subject}</td>
            <td>${item.count}</td>
        </tr>
    `).join('');
}

// 3. UI TOGGLE LOGIC (For the Sub-Tabs)
function showMasterFeature(feature, element) {
    // Hide all views
    document.querySelectorAll('.feature-view').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.sub-tab').forEach(el => el.classList.remove('active'));
    
    // Activate clicked tab
    if (element) element.classList.add('active');

    // Show selected section and load its specific data
    if (feature === 'paid') {
        document.getElementById('featurePaid').classList.remove('hidden');
        loadPaidData();
    } else if (feature === 'summary') {
        document.getElementById('featureSummary').classList.remove('hidden');
        loadSummaryData();
    } else if (feature === 'waived') {
        document.getElementById('featureWaived').classList.remove('hidden');
        loadWaivedData();
    }
}

// 4. EXPORT LOGIC: One File, Three Sheets
function exportMasterListToExcel() {
    // CRITICAL: Load all data before export so sheets aren't empty
    loadPaidData();
    loadWaivedData();
    loadSummaryData();

    const wb = XLSX.utils.book_new();
    
    // Create sheets from the hidden or visible tables
    const wsPaid = XLSX.utils.table_to_sheet(document.getElementById('paidTable'));
    const wsSummary = XLSX.utils.table_to_sheet(document.getElementById('summaryTable'));
    const wsWaived = XLSX.utils.table_to_sheet(document.getElementById('waivedTable'));
    
    // Append to workbook with sheet names matching your Excel image
    XLSX.utils.book_append_sheet(wb, wsPaid, "PAID SPECIAL EXAM");
    XLSX.utils.book_append_sheet(wb, wsSummary, "SUMMARY");
    XLSX.utils.book_append_sheet(wb, wsWaived, "WAIVED FEE (VALID REASON)");
    
    // Trigger download
    XLSX.writeFile(wb, "Special_Exam_Master_List_2026.xlsx");
}

function renderGrid() {
    const grid = document.getElementById('gridContent');
    if (!grid) return;

    // Define the list of courses/cards you want to show
    const departments = [
        { id: 'BSIT', name: 'Bachelor of Science in Information Technology', short: 'BS' },
        { id: 'BSCS', name: 'Bachelor of Science in Computer Science', short: 'CS' },
        { id: 'BSHM', name: 'Bachelor of Science in Hospitality Management', short: 'HM' }
    ];

    grid.innerHTML = departments.map(dept => {
        // This looks at your studentData to see how many requests exist for this specific card
        const count = studentData[currentTab].filter(s => s.dept === dept.id).length;

        return `
            <div class="dept-card" onclick="openDept('${dept.id}')">
                <div class="card-badge">${count}</div>
                <div class="dept-icon">${dept.short}</div>
                <h3>${dept.id}</h3>
                <p>${dept.name}</p>
                <span class="${currentTab === 'first' ? 'pending-tag' : ''}" 
                      style="color: ${currentTab === 'first' ? '#ff4d4d' : '#2ecc71'}; font-weight: 600;">
                    ${count} ${currentTab === 'first' ? 'pending approvals' : 'ready for final approval'}
                </span>
            </div>
        `;
    }).join('');
}

function openDept(dept) {
    // Hide the cards and show the table view
    document.getElementById('deptGrid').classList.add('hidden');
    document.getElementById('appView').classList.remove('hidden');

    // This line updates the <h2> you asked about
    document.getElementById('currentDeptTitle').innerText = `${dept} - Applications`;
    
    renderTable(); // Loads the students for that specific department
}

