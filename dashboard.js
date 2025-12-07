// Dummy Data (Simulates data retrieval, structured to support new chart)
const taskData = {
    total: 4,
    completed: 2,
    active: 2,
    priority: {
        high: 2, 
        medium: 1, 
        low: 3, 
    },
    // BARU: Data Tugasan Sebenar (Simulasi)
    tasks: [
        { title: "Individual Assignment IMS566", due_date: "2025-12-15", priority: "High", is_completed: false },
        { title: "Group Assignment IMS564", due_date: "2025-12-09", priority: "Medium", is_completed: false },
        { title: "Article Review CTU554", due_date: "2025-12-08", priority: "Low", is_completed: false },
        { title: "Basic Web Design Exercises", due_date: "2025-12-01", priority: "Low", is_completed: true },
        { title: "CTU554 Group Presentation Slides", due_date: "2025-11-29", priority: "Medium", is_completed: true },
        { title: "Task 6 (Completed)", due_date: "2025-12-05", priority: "High", is_completed: true }
    ]
};




// 3. Load Summary Data to Cards
function loadSummaryData() {
    document.getElementById('totalTasks').textContent = taskData.total;
    document.getElementById('activeTasks').textContent = taskData.active;
    document.getElementById('completedTasks').textContent = taskData.completed;
}


// Function to get chart styling based on Dark Mode
function getChartStyle(isDarkMode) {
    return {
        fontColor: isDarkMode ? '#e0e0e0' : '#495057',
        gridColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        titleColor: isDarkMode ? '#f0f0f0' : '#1e1e1e',
        borderColor: isDarkMode ? '#1e1e1e' : '#ffffff'
    };
}


// 4. Doughnut Chart (Task Status Division) - DARK MODE AWARE
let statusChartInstance = null; 

function renderTaskStatusChart() {
    if (statusChartInstance) {
        statusChartInstance.destroy();
    }
    
    const ctx = document.getElementById('taskStatusChart').getContext('2d');
    const isDarkMode = document.body.classList.contains('dark-mode'); 
    const style = getChartStyle(isDarkMode);
    
    statusChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Active', 'Completed'],
            datasets: [{
                data: [taskData.active, taskData.completed],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.8)', // Active (Orange/Warning)
                    'rgba(75, 192, 192, 0.8)'  // Completed (Green/Success)
                ],
                hoverOffset: 8,
                borderWidth: 2,
                borderColor: style.borderColor
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, 
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: { size: 14 },
                        color: style.fontColor
                    }
                },
                title: {
                    display: true,
                    text: 'Tasks Status Division',
                    font: { size: 16, weight: 'bold' },
                    color: style.titleColor,
                    padding: { top: 10, bottom: 30 }
                }
            }
        }
    });
}


// 5. Bar Chart (Task Priority Distribution) - NEW CHART & DARK MODE AWARE
let priorityChartInstance = null;

function renderPriorityBarChart() {
    if (priorityChartInstance) {
        priorityChartInstance.destroy();
    }
    
    const ctx = document.getElementById('taskPriorityChart').getContext('2d');
    const isDarkMode = document.body.classList.contains('dark-mode');
    const style = getChartStyle(isDarkMode);

    priorityChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['High Priority', 'Medium Priority', 'Low Priority'],
            datasets: [{
                label: 'Number of Tasks',
                data: [taskData.priority.high, taskData.priority.medium, taskData.priority.low],
                backgroundColor: [
                    'rgba(220, 53, 69, 0.8)', // Danger (Red)
                    'rgba(255, 193, 7, 0.8)', // Warning (Yellow)
                    'rgba(13, 110, 253, 0.8)' // Primary (Blue)
                ],
                borderColor: style.borderColor,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Task Distribution by Priority',
                    color: style.titleColor,
                    font: { size: 16, weight: 'bold' },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: style.fontColor,
                        precision: 0 
                    },
                    grid: { color: style.gridColor }
                },
                x: {
                    ticks: { color: style.fontColor },
                    grid: { display: false }
                }
            }
        }
    });
}

// 6. DARK MODE TOGGLE FUNCTIONALITY (Reused from script.js)
function setupDarkModeToggle() {
    const desktopBtn = document.getElementById('darkModeToggleDesktop');
    const mobileBtn = document.getElementById('darkModeToggleMobile');

    function updateIcon() {
        const isDark = document.body.classList.contains('dark-mode');
        const icon = isDark ? 'sun' : 'moon';

        if (desktopBtn) desktopBtn.innerHTML = `<i class="fas fa-${icon}"></i>`;
        if (mobileBtn) mobileBtn.innerHTML = `<i class="fas fa-${icon}"></i>`;
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }

        updateIcon();
        renderTaskStatusChart();
        renderPriorityBarChart();
    }

    if (desktopBtn) desktopBtn.addEventListener('click', toggleDarkMode);
    if (mobileBtn) mobileBtn.addEventListener('click', toggleDarkMode);

    updateIcon();
}

// 7. FUNGSI BARU: PAPARKAN NOTIFIKASI KIRAAN TUGASAN AKTIF
function showActiveTasksNotification() {
    const activeCount = taskData.active; 

    const container = document.getElementById('deadlineToastContainer');
    container.innerHTML = ''; 

    const toastHtml = `
        <div class="toast align-items-center glass-toast border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="10000">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-list-check me-2"></i>
                    You have <b>${activeCount}</b> active tasks that need to be completed.
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', toastHtml);

    const toastEl = container.querySelector('.toast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}



// --- RUNTIME ---
window.onload = function() {
    loadSummaryData(); 
    // Render all charts
    renderTaskStatusChart(); 
    renderPriorityBarChart(); 
    // Setup Dark Mode
    setupDarkModeToggle();
    showActiveTasksNotification();

    // 2. Logout Function
document.getElementById('logoutButton').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html'; 
});
}