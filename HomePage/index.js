// { <script>
//     function showReportForm() {
//         var reportSection = document.getElementById("report");
//         reportSection.style.display = "block";
//     };

// </script> }



// REGISTER FORM
/* <script>
    document.getElementById("register").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default anchor behavior
        document.getElementById("registerForm").style.display = "block";
    });

    async function submitForm(event) {
        event.preventDefault();

        const formData = 
        
            userName: document.getElementById("userName").value,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            phoneNumber: document.getElementById("phoneNumber").value,
            isAnonymous: document.getElementById("isAnonymous").value
        
    

        try {
            const response = await fetch('/api/register',
                 { // Adjust the URL based on your routing setup
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.Message); // Show success message
                // Redirect to a success page or perform other actions
                window.location.href = "success.html"; // Change this as needed
            } else {
                alert(result.Message); // Show error message
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.'); // Show generic error message
        }
    }

    document.getElementById("registerForm").addEventListener("submit",submitForm);
</script> */
// }








// // Submit Report Form
// document.getElementById('crimeForm').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const formData = new FormData(this);
    
//     fetch('https://api.yourdomain.com/report', {
//         method: 'POST',
//         body: formData,
//         headers: {
//             'Authorization': 'Bearer your-token-here'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         alert('Crime report submitted successfully!');
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('An error occurred while submitting the report.');
//     });
// });

// // Submit Share With Us Form
// document.getElementById('shareForm').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const formData = new FormData(this);
    
//     fetch('https://api.yourdomain.com/share', {
//         method: 'POST',
//         body: formData,
//         headers: {
//             'Authorization': 'Bearer your-token-here'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         alert('Thank you for sharing!');
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('An error occurred while submitting the information.');
//     });
// });
