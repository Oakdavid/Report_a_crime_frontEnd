document.getElementById('loginForm').addEventListener('submit', async function(event) 
{
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    document.querySelector('.userError').innerText = '';
    document.querySelector('.passwordError').innerText = '';
    
    try
    {
        const response = await fetch('https://localhost:7240/api/User/Login', {
    
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
            window.location.href = "../Dashboard/dashboard.html";
        }
        else
        {
            alert("Login failed: " + data.message)
            alert.console.error("Couldnt login successfully");
            
        }

        // if (response.ok) {
        //     const data = await response.json();
        //     alert("Login successful!");
        //     window.location.href = "../Dashboard/dashboard.html";
        // } else {
        //     const errorData = await response.json();
        //     alert("Login failed: " + errorData.message);
        //     console.error("Login error: ", errorData);
        // }

    }
    catch(error)
    {
        console.error("Error during fetch: ", error);
        alert("An error occured. Please try again later.");
    }
    
})