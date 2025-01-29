document.addEventListener("DOMContentLoaded", async () => {
  const token = await getToken();
  console.log("Token:", token);
  const dataFetched = await fetchReports(token);
  console.log("Fetched Data:", dataFetched);

  if (dataFetched.status) {
    const newData = dataFetched.data.data
      renderReports(newData);
  } else {
      console.error("Error fetching reports:", dataFetched.error);
  }
});

async function fetchReports(token) {
  try {
      const response = await fetch('https://localhost:7240/api/Report/GetAllReports', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      });

      const resp = await response.json();

      if (!response.ok) {
          return { status: false, error: resp.message };
      }

      return { status: true, data: resp };
  } catch (error) {
      return { status: false, error: "Failed to fetch reports" };
  }
}

function renderReports(reports) {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = ""; // Clear any existing rows

  if (Array.isArray(reports) && reports.length > 0) {
      reports.forEach(report => {
          const row = document.createElement("tr");

          row.appendChild(createCell(report.reportId));
          row.appendChild(createCell(report.dateOccurred));
          row.appendChild(createCell(report.categoryName));

          row.appendChild(createCell(report.location));
          row.appendChild(createCell(report.heightOfTheOffender));
          row.appendChild(createCell(report.didItHappenInYourPresence));
          row.appendChild(createCell(report.reportDescription));
          row.appendChild(createCell(report.uploadEvidenceUrl ? "View Evidence" : "No Evidence"));

          // Actions column
          const actionsCell = document.createElement("td");
          // const viewButton = createButton("View", "view-btn", () => viewReport(report.reportId));
          const deleteButton = createButton("Delete", "delete-btn", () => deleteReport(report.reportId));
          
          // actionsCell.appendChild(viewButton);
          actionsCell.appendChild(deleteButton);
          row.appendChild(actionsCell);

          tableBody.appendChild(row);
      });
  } else {
      tableBody.innerHTML = "<tr><td colspan='8'>No reports found</td></tr>";
  }
}

// Helper function to create table cells
function createCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

// Helper function to create buttons
function createButton(text, className, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.className = className;
  button.addEventListener("click", onClick);
  return button;
}

// View report function
function viewReport(id) {
  alert(`Viewing report with ID: ${id}`);
  // Redirect or fetch details logic here
}

// Delete report function (to be implemented)
function deleteReport(id) {
  alert(`Deleting report with ID: ${id}`);
  // Implement deletion logic here
}