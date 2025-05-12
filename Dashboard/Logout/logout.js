// // Clear JWT token from localStorage
// localStorage.removeItem("token");

// window.location.href = "/index.html?logout=success";


document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logoutBtn");

    if(logoutBtn)
    {
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();
            
            localStorage.removeItem('jwt');

            window.location.href = "/index.html?logout=success";
           // window.location.href = "/Login/login.html?logout=success";

        });
    }
});