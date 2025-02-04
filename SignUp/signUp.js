async function submitForm(event){
    event.preventDefault();

    const userName = document.getElementById('userName').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password  = document.getElementById('password').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const isAnonymous = document.getElementById('isAnonymous').checked;

    const data = 
    {
        userName,
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        isAnonymous
    };

    try
    {
        const response = await fetch('https://localhost:7240/api/User/SignUp',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers:
                {
                    'Content-Type': 'application/json'
                },
            });

        const result = await response.json();

        if(response.ok)
        {
            Swal.fire({
                title: "Success!",
                icon: result.message,
                draggable: true,
                timer: 9000
              });
            location.href = "../Login/login.html";
        }
        else if(response.status === "User already exists")
        {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result.message,
              });
        }
        else
        {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result.message,
              });
        }
    }
    catch(error)
    {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'An error occured while registering. Please try again later.',
          });
    }
}