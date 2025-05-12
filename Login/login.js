document.getElementById('loginForm').addEventListener('submit', async function(event) 
{
    event.preventDefault();

    const userEmail = document.querySelector('#userEmail').value;
    const password = document.querySelector('#user-password').value;

    console.log("Email:", userEmail);  // Logging for debugging
    console.log("Password:", password);
    
    try
    {
        const response = await fetch("https://localhost:7240/api/User/Login", {
    
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                EmailOrUserName: userEmail,
                Password: password
            })
        });        
        const data = await response.json();
        console.log(data);
        if(response.ok)
        {
            Swal.fire({

                title: "Success",
                icon: "success",
                draggable: true,
                timer: 9000,
                
              });
            localStorage.setItem('jwt', data.token);
            location.href = "../Dashboard/dashboard.html";
            
        }
        else
        {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Couldnt login",
              });            
        }

    }
    catch(error)
    {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
          });;
    }
    
})

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const messageBox = document.getElementById("logoutMessage");

  if (params.get("logout") === "success") {
    messageBox.textContent = "You have been successfully logged out.";
   
    setTimeout(() => {
      messageBox.textContent = "";
    }, 3000);
  }

});
