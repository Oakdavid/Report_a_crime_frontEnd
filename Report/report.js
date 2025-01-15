document.addEventListener("DOMContentLoaded", () => {
    // Populate categories dynamically (Fetch from API)
    fetch("https://localhost:7240/api/Category") // Replace with your category endpoint
        .then(response => response.json())
        .then(categories => {
            const categorySelect = document.getElementById("category");
            categories.forEach(category => {
                const option = document.createElement("option");
                option.value = category.categoryId;
                option.textContent = category.categoryName;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching categories:", error));

    // Fetch location dynamically
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                // Reverse geocoding or use these coordinates directly
                fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
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
        const reportData = {
            categoryId: formData.get("categoryId"),
            nameOfTheOffender: formData.get("nameOfTheOffender"),
            heightOfTheOffender: formData.get("heightOfTheOffender"),
            didItHappenInYourPresence: formData.get("didItHappenInYourPresence") === "true",
            reportDescription: formData.get("reportDescription"),
            location: formData.get("location"),
        };

        if (formData.get("uploadEvidence")) {
            reportData.uploadEvidence = formData.get("uploadEvidence");
        }

        try {
            const response = await fetch("https://localhost:7240/api/Report", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reportData),
            });

            const result = await response.json();
            if (result.status) {
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
