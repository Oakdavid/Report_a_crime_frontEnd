document.addEventListener("DOMContentLoaded", async () => {
    // Populate categories dynamically
    const categoryDropdown = document.querySelector("#category");
    const categories = await fetchCategories();
    
    if (categories.status) {
        categories.data.forEach(category => {
            const option = document.createElement("option");
            option.value = category.categoryName;
            option.textContent = category.categoryName;
            categoryDropdown.appendChild(option);
        });
    } else {
        alert(categories.message || "Failed to fetch categories.");
    }

    const form = document.getElementById("reportForm");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const category = document.querySelector("#category");
        const nameOfOffender = document.querySelector("#nameOfOffender");
        const height = document.querySelector("#heightOfOffender");
        const didHappenInPresence = document.querySelector("#didHappenInPresence");
        const reportDescription = document.querySelector("#reportDescription");
        const uploadEvidence = document.querySelector("#uploadEvidence");
        const location = document.querySelector("#location");

        
        const resp = await fetchLocation();
        if(resp.status === true) {
            location.value = resp.data.data.city
        }

        const formData = new FormData();
        formData.append("categoryName", categoryDropdown.value);
        formData.append("nameOfOffender", nameOfOffender.value);
        formData.append("location", location.value);
        formData.append("heightOfTheOffender", height.value);
        formData.append("didItHappenInYourPresence", didHappenInPresence.value);
        formData.append("reportDescription", reportDescription.value);
        
        if (uploadEvidence.files.length > 0) {
            formData.append("uploadEvidence", uploadEvidence.files[0]);
        }
        else
        {
            formData.append("uploadEvidence", null);
        }

        for (let [key, value] of formData.entries()) {
        }

        
        try {
           const token = localStorage.getItem("jwt");


            const response = await fetch("https://localhost:7240/api/Report/ReportCrime", {
                method: "POST",
                body: formData,
                headers: token ? { Authorization: `Bearer ${token}` } : undefined
            });


            const result = await response.json();
            if (response.ok) {
                Swal.fire({

                    title: "Success",
                    icon: "success",
                    draggable: true,
                    timer: 9000,
                    
               }).then(() => {
                  const token = localStorage.getItem("jwt");
                  if(token){
                    window.location.href = "/Dashboard/User/userDashboard.html";
                  }
                  else{
                    window.location.href = "/index.html";
                  }
                });
            } else {
                Swal.fire({

                    title: result.message || "Failed to create",
                    icon: "Failed",
                    draggable: true,
                    timer: 9000,
                });
            }

        } catch (error) {
            console.error("Error submitting report:", error);
            alert("An error occurred while submitting the report.");
        }
    });
});

async function fetchCategories() {
    try {
        const response = await fetch("https://localhost:7240/api/Category/AllCategories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const resp = await response.json();
            return { status: true, data: resp.data };
        } else {
            return { status: false, message: "Categories not found" };
        }
    } catch (error) {
        return { status: false, message: "An error occurred while fetching categories." };
    }
}

async function fetchLocation() {
    try {
        const response = await fetch("https://localhost:7240/api/Geolocation/GetGeolocation", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const resp = await response.json();
            return { status: true, data: resp };
        } else {
            return { status: false, message: "Location not found" };
        }
    } catch (error) {
        return { status: false, message: "An error occurred while fetching location." };
    }
}
