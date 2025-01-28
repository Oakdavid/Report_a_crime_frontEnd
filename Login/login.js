document.getElementById('loginForm').addEventListener('submit', async function(event) 
{
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(email);
    console.log(password)

    document.querySelector('.userError').innerText = '';
    document.querySelector('.passwordError').innerText = '';
    
    try
    {
        const response = await fetch("https://localhost:7240/api/User/Login", {
    
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmailOrUserName: email,
                password: password
                
            })
        });
        
        const data = await response.json();
        console.log(data);
        if(response.ok)
        {
            Swal.fire({
                title: "Success!",
                icon: "success",
                draggable: true,
                timer: 5000
              });
            location.href = "../Dashboard/dashboard.html";
        }
        else
        {
            alert("Login failed: " + data.message)
            alert.console.error("Couldnt login successfully");
            
        }

    }
    catch(error)
    {
        console.error("Error during fetch: ", error);
        alert("An error occured. Please try again later.");
    }
    
})