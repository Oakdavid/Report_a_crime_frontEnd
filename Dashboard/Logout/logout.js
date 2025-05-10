// Clear JWT token from localStorage
localStorage.removeItem("token");

// Optionally clear other user-related data if needed
// localStorage.removeItem("userInfo"); etc.

// Redirect to login page after logout
window.location.href = "/index.html";
