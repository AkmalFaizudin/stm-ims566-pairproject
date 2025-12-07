//  DARK MODE TOGGLE FUNCTIONALITY 
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

// Simulated unique ID generator
let nextTaskId = 3; 

// Function to generate new task table row 
function createNewTaskRow(id, title, course, dueDate, priority) {
    let priorityClass = 'bg-primary'; // Low (Default)
    if (priority === 'High') {
        priorityClass = 'bg-danger';
    } else if (priority === 'Medium') {
        priorityClass = 'bg-warning text-dark'; // Need text-dark for contrast
    }
    
    // Format date for display
    const formattedDate = new Date(dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/,/g, '');

    return `
        <tr data-task-id="${id}">
            <th scope="row">${id}</th>
            <td>${title}</td>
            <td>${course}</td>
            <td>${formattedDate}</td>
            <td><span class="badge ${priorityClass}">${priority}</span></td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-success mark-done-btn" data-task-id="${id}">
                    <i class="fas fa-check"></i> Done
                </button>
                <button class="btn btn-sm btn-outline-info edit-btn" data-bs-toggle="modal" data-bs-target="#editTaskModal" data-task-id="${id}">
                    <i class="fas fa-edit"></i> Edit
                </button>
            </td>
        </tr>
    `;
}

// Global function to attach Event Listeners (Used for initial load and after adding new task)
function attachTaskActionListeners() {
    // Logic for Mark as Done Button
    document.querySelectorAll('.mark-done-btn').forEach(button => {
        button.addEventListener('click', function() {
            const taskId = this.getAttribute('data-task-id');
            // Remove row from active tasks
            this.closest('tr').remove();
            
            // Show Success Modal
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            document.getElementById('successModalMessage').textContent = `Task ID ${taskId} has been marked as DONE.`;
            successModal.show();
        });
    });
    
    // Logic for Edit Button (Simplified prototype)
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const taskId = this.getAttribute('data-task-id');
            console.log(`Open edit modal for Task ID: ${taskId}`);
            // In a full application, this would populate the #editTaskModal fields
        });
    });
}


// Logic for Add New Task Form Submission
document.getElementById('addTaskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const title = document.getElementById('newTaskTitle').value;
    const course = document.getElementById('newTaskCourse').value;
    const dueDate = document.getElementById('newTaskDueDate').value;
    const priority = document.getElementById('newTaskPriority').value; 
    
    // Generate new ID and row
    const newId = nextTaskId++;
    const newRowHTML = createNewTaskRow(newId, title, course, dueDate, priority);
    
    // Insert into table
    document.getElementById('activeTasksBody').insertAdjacentHTML('beforeend', newRowHTML);
    
    // Re-attach listeners to include the new row
    attachTaskActionListeners();

    // Close Modal and show success message
    const addTaskModal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
    addTaskModal.hide();

    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    document.getElementById('successModalMessage').textContent = `New Task (ID ${newId}) created successfully: ${title}.`;
    successModal.show();
    
    // Reset form
    this.reset();
});

// Function for Logout (Must be present on every page for consistent navigation)
document.getElementById('logoutButton').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html'; 
});


// --- RUNTIME ---
window.onload = function() {
    setupDarkModeToggle(); 
    attachTaskActionListeners(); // Attach listeners for initial tasks
}