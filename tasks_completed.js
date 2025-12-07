//  DARK MODE TOGGLE FUNCTIONALITY (Reused from script.js)
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

// --- TASK MANAGEMENT LOGIC ---

// 1. Logic for Clear All Button (Fully English strings)
document.getElementById('clearCompletedBtn').addEventListener('click', function() {
    // Get table body
    const tableBody = document.getElementById('completedTasksBody');
    
    // Check if there are rows to clear
    if (tableBody.children.length > 0) {
        // Clear all content
        tableBody.innerHTML = ''; 
        
        // Show success message
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        document.getElementById('successModalMessage').textContent = `All completed tasks have been successfully cleared.`;
        successModal.show();
        
        console.log('All completed tasks cleared.');
    } else {
        // Show message if list is already empty
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        document.getElementById('successModalMessage').textContent = `The completed tasks list is already empty.`;
        successModal.show();
    }
});

// Logic for Delete Single Task (If implemented in HTML)
document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
        const taskId = this.getAttribute('data-task-id');
        this.closest('tr').remove();
        
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        document.getElementById('successModalMessage').textContent = `Task ID ${taskId} has been successfully deleted.`;
        successModal.show();
    });
});


// Function for Logout (Must be present on every page)
document.getElementById('logoutButton').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html'; 
});


// --- RUNTIME ---
window.onload = function() {
    setupDarkModeToggle(); 
}