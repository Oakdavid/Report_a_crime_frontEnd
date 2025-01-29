document.addEventListener("DOMContentLoaded", async () => {
    const token = await getToken();
    console.log(token)
    const dataFetched = await fetchReports(token);

    if(dataFetched.status)
    {
      const data = dataFetched.data
      renderReports(data)
    }
});
  
    // // Function for viewing a report
    // window.viewReport = function(id) {
    //   alert(`Viewing report with ID: ${id}`);
    //   // Redirect to a report details page or fetch report details via API
    //   // window.location.href = `/view-report/${id}`;
    // };
  

    async function fetchReports(token) {
      const response = await fetch('https://api/Report/GetAllReports');

        if (!response.ok) {
          const resp = await response.json();
          return{status:false, error:resp.message}
        }
        else
        {
          const resp = await response.json();
          return{status:false, error:resp.message}
        }
    }

    function renderReports(reports) {
      const tableBody = document.querySelector("tbody");
      tableBody.innerHTML = ""; // Clear any existing rows
      if(reports && Array.isArray(reports))
      {
        reports.forEach(report => {
          const row = document.createElement("tr");
    
          const idCell = document.createElement("td");
          idCell.textContent = report.id;
    
          const dateOccurredCell = document.createElement("td");
          titleCell.textContent = report.dateOccurred;
    
          const locationCell = document.createElement("td");
          dateCreatedCell.textContent = report.location;

          const heightOfOffenderCell = document.createElement("td");
          dateCreatedCell.textContent = report.heightOfOffender;

          const presenceCell = document.createElement("td");
          dateCreatedCell.textContent = report.didItHappenInYourPresence;

          const descriptionCell = document.createElement("td");
          descriptionCell.textContent = report.reportDescription;

          const pictorialCell = document.createElement("td");
          descriptionCell.textContent = report.uploadEvidenceUrl;
    
          const actionsCell = document.createElement("td");
          
          const viewButton = document.createElement("button")
          viewButton.textContent = "View";
          viewButton.className = "view-btn"

          const deleteButton = document.createElement("button")
          viewButton.textContent = "Delete";
          viewButton.className = "delete-btn"

          actionsCell.appendChild(viewButton);
          actionsCell.appendChild(deleteButton);

    
          row.appendChild(idCell);
          row.appendChild(dateOccurredCell);
          row.appendChild(locationCell);
          row.appendChild(heightOfOffenderCell);
          row.appendChild(presenceCell);
          row.appendChild(descriptionCell);
          row.appendChild(pictorialCell);
          row.appendChild(actionsCell);

    
          tableBody.appendChild(row);
        })
      }
      else {
        tableBody.innerHTML = "<tr><td colspan='8'>No reports found</td></tr>";
    }
    }