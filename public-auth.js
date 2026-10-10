document.addEventListener('DOMContentLoaded', async () => {
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');
    const profileLink = document.getElementById('profileLink');
    const logoutLink = document.getElementById('logoutLink');

    if (!loginLink || !signupLink || !profileLink || !logoutLink) {
        return;
    }

    const result = await Auth.getProfile();
    if (result.success && result.user) {
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        profileLink.style.display = 'inline-block';
        logoutLink.style.display = 'inline-block';
    }

    logoutLink.addEventListener('click', async (event) => {
        event.preventDefault();
        const logoutResult = await Auth.logout();
        if (logoutResult.success) {
            window.location.reload();
        } else {
            window.alert('Logout failed: ' + (logoutResult.message || 'Unknown error'));
        }
    });
});
