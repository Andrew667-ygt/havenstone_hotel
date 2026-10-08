// Authentication module
const Auth = {
    apiUrl: new URL('backend/api.php', window.location.href).toString(),

    async request(action, options) {
        let response;
        try {
            response = await fetch(`${this.apiUrl}?action=${encodeURIComponent(action)}`, options);
        } catch (error) {
            return { success: false, message: 'Could not reach the PHP API. Make sure the site is running on a PHP-enabled web server.' };
        }

        let result;
        try {
            result = await response.json();
        } catch (error) {
            return {
                success: false,
                message: `The API returned a non-JSON response (HTTP ${response.status}). Check that backend/api.php exists under the web root and that PHP is enabled.`
            };
        }

        if (!result || typeof result !== 'object' || typeof result.success !== 'boolean') {
            return {
                success: false,
                message: `The API returned an invalid response (HTTP ${response.status}). Check the PHP error log and backend/api.php configuration.`
            };
        }

        return result;
    },

    // Sign up
    async signup(email, username, password, name, phone, address) {
        return this.request('signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, username, password, name, phone, address
            })
        });
    },

    // Login
    async login(email, password) {
        return this.request('login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });
    },

    // Logout
    async logout() {
        return this.request('logout', {
            method: 'GET',
            credentials: 'include'
        });
    },

    // Get profile
    async getProfile() {
        return this.request('profile', {
            method: 'GET',
            credentials: 'include'
        });
    },

    // Update profile
    async updateProfile(name, phone, address) {
        return this.request('update-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ name, phone, address })
        });
    }
};
