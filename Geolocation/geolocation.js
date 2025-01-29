document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("geolocation-form");
    const statusMessage = document.getElementById("status-message");
    const tableBody = document.getElementById("geolocation-table").querySelector("tbody");
  
    // Submit form
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const latitude = document.getElementById("latitude").value || null;
      const longitude = document.getElementById("longitude").value || null;
      const city = document.getElementById("city").value || null;
  
      // Simulate API request
      const response = await fetch("https://localhost:7240/api/Geolocation/CreateGeolocation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude, city }),
      });
  
      const result = await response.json();
  
      if (result.status) {
        statusMessage.textContent = "Geolocation created successfully!";
        addRowToTable(result); //result.data
      } else {
        statusMessage.textContent = result.message || "Failed to create geolocation.";
      }
    });
  
    // Add row to table
    function addRowToTable(data) {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${data.id || "N/A"}</td>
      <td>${data.latitude || "N/A"}</td>
      <td>${data.longitude || "N/A"}</td>
      <td>${data.city || "N/A"}</td>
      <td>${data.ipAddress || "N/A"}</td>
      <td>${data.reportId || "N/A"}</td>
      <td>${data.status ? "Active" : "Inactive"}</td>
      `;
      tableBody.appendChild(row);
    }
  });
  