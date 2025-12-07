// ==========================
// LOGIN → TERUS KE DASHBOARD
// ==========================
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    window.location.href = 'dashboard.html';
});


// ==========================
// DARK MODE TOGGLE FUNCTION
// ==========================
function setupDarkModeToggle() {
    const toggleButton = document.getElementById('darkModeToggle');
    if (!toggleButton) return;

    function updateToggleIcon() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        toggleButton.innerHTML = `<i class="fas fa-${isDarkMode ? 'sun' : 'moon'} me-1"></i> ${isDarkMode ? 'Light Mode' : 'Dark Mode'}`;
    }

    // Set initial icon
    updateToggleIcon();

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        // Save preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }

        updateToggleIcon();
    });
}


// ==========================
// ON PAGE LOAD
// ==========================
window.onload = function() {
    setupDarkModeToggle();
};
