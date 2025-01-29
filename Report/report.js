document.addEventListener("DOMContentLoaded", async () => {
    // Populate categories dynamically
    const categoryDropdown = document.querySelector("#category");
    const categories = await fetchCategories();
    
    if (categories.status) {
        // Populate categories if fetched successfully
        categories.data.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            categoryDropdown.appendChild(option);
            console.log(option);
        });
    } else {
        alert(categories.message || "Failed to fetch categories.");
    }

    // Fetch location dynamically
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                 fetch("https:/api/Category/AllCategories")//(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
                    .then(response => response.json())
                    .then(data => {
                        const locationInput = document.getElementById("location");
                        locationInput.value = data.city || "Unknown location";
                    })
                    .catch(error => console.error("Error fetching location:", error));
            },
            error => console.error("Geolocation error:", error)
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }

    // Handle form submission
    const form = document.getElementById("reportForm");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch("https://localhost:7240/api/Report", {
                method: "POST",
                body: formData, // Use FormData directly
            });

            const result = await response.json();
            if (response.ok) {
                alert("Report created successfully!");
                form.reset();
            } else {
                alert(result.message || "Failed to create report.");
            }
        } catch (error) {
            console.error("Error submitting report:", error);
            alert("An error occurred while submitting the report.");
        }
    });
});

// Fetch categories function
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
        console.error("Error fetching categories:", error);
        return { status: false, message: "An error occurred while fetching categories." };
    }
}
