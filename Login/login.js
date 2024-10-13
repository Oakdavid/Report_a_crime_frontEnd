document.getElementById('loginForm').addEventListener('submit', async function(event) 
{
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try
    {
        const response = await fetch('https://localhost:7240/api/User/Login', {
    
            method: 'POST',
            headers: {
                'content-Type': 'application/Json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        if(response.ok)
        {
            alert("Login successful");
            window.location.href = "../HomePage/index.html";
        }
        else
        {
            alert.console.error("Couldnt login successfully");
            
        }

    }
    catch
    {

    }
    
})

// async function login(userName, password){
//     try
//     {
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
//     }

//     function loginError(status, message)
//     {
//         switch(status)
//         {
//             case 400: alert("Bad Request: " + message);
//             break;
//             case 401: alert("Unathorized: Invalid username or password." + message);
//             console.log(error.message);
//             break;
//             case 404: alert(`Not found: The requested user was not found ${message}`);
//             break;
//             case 500: alert("Internal Server Error: Please try again later");
//             break;
//             default: alert("An unexpected error occured: " + message);
//             break;
//         }
//     }
// }