// Protected page authentication handler
// This script checks if a user is logged in and redirects to login if not
// It also updates the navbar to show profile/logout for authenticated users

async function checkAuthentication() {
    try {
        const result = await Auth.getProfile();
        
        if (!result.success || !result.user) {
            // User not authenticated, redirect to login
            window.location.href = 'login.html';
            return false;
        }
        
        // User is authenticated, update navbar
        updateNavbarForAuthenticated(result.user);
        return true;
    } catch (error) {
        console.error('Authentication check failed:', error);
        window.location.href = 'login.html';
        return false;
    }
}

function updateNavbarForAuthenticated(user) {
    // Hide login/signup links
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');
    const profileLink = document.getElementById('profileLink');
    const logoutLink = document.getElementById('logoutLink');
    const userNameSpan = document.getElementById('userName'); // Added for username display

    if (loginLink) loginLink.style.display = 'none';
    if (signupLink) signupLink.style.display = 'none';
    if (profileLink) profileLink.style.display = 'inline-block';
    if (logoutLink) logoutLink.style.display = 'inline-block';

    // Display username in the navbar
    if (userNameSpan) {
        userNameSpan.textContent = user.name;
        userNameSpan.style.display = 'inline';
    }

    // Set up logout button
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }
}

async function handleLogout() {
    try {
        const result = await Auth.logout();
        if (result.success) {
            // Clear any local storage or session data if needed
            window.location.href = 'index.html';
        } else {
            alert('Logout failed: ' + (result.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Logout failed:', error);
        alert('Logout failed');
    }
}

// Check authentication when DOM is ready
document.addEventListener('DOMContentLoaded', checkAuthentication);
