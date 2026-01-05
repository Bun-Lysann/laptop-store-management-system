// tokenStorage.js

const TokenStorage = {
  // Save token to localStorage
  saveToken: function(token) {
    localStorage.setItem("authToken", token);
  },

  // Get token from localStorage
  getToken: function() {
    return localStorage.getItem("authToken");
  },

  // Delete token from localStorage
  deleteToken: function() {
    localStorage.removeItem("authToken");
  },

  // Check if token exists
  isLoggedIn: function() {
    return !!localStorage.getItem("authToken");
  }
};

// Export for ES6 modules
export default TokenStorage;
