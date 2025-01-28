document.getElementById('loginForm').addEventListener('submit', async function(event) 
{
    event.preventDefault();

    const userEmail = document.querySelector('#userEmail').value;
    const password = document.querySelector('#user-password').value;

    console.log("Email:", userEmail);  // Logging for debugging
    console.log("Password:", password);
    
    try
    {
        const response = await fetch('https://localhost:7240/api/User/Login', {
    
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

// async function login(userName, password){
//     try
//     {
//         if(!userName || !password)
//         {
//             alert("Please enter both username and pasword")
//             return;
//         }
//         const loginBody = {
//             userName: userName,
//             password: password,
//         };
//         const response = await fetch('https://localhost:7240/api/User/Login', {
//             method: 'POST',
//             body: JSON.stringify(loginBody),
//             headers: {
//                 "Content-Type": "application/json"
//             }
    
//         });
//         if(response.ok)
//         {
//             alert("Login successful");
//             // window.location.href = "../HomePage/index.html";
//         }
//         else
//         {
//             const errorData = await response.json();
//             loginError(response.status, errorData.message);
//         }

//         console.log("Response Status:", response.status);
//     }
//     catch(error)
//     {
//         alert("An error occurred. Please try again later.");
//         console.error("Login error:", error); // Log the actual error

//     }

// }

// function loginError(status, message)
// {
//     switch(status)
//     {
//         case 400: alert("Bad Request: " + message);
//         break;
//         case 401: alert("Unauthorized: Invalid username or password. " + message);
//         console.log(message);
//         break;
//         case 404: alert(`Not found: The requested user was not found ${message}`);
//         break;
//         case 500: alert("Internal Server Error: Please try again later");
//         break;
//         default: alert("An unexpected error occurred: " + message);
//         break;
//     }
// }
// document.getElementById('login').addEventListener('submit', function(event){
//     event.preventDefault();

//     const userName = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     login( userName, password);     // calling the function
// })