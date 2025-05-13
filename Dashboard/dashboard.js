document.addEventListener("DOMContentLoaded", async () => {
    const token = await getToken(); // ✅ Await here
    const reports = await GetAllReport(token);
  
    // ✅ Validate the data structure
    if (!reports || !reports.status || !reports.data || !reports.data.data) {
      console.error("Failed to fetch or parse reports:", reports);
      return;
    }
  
    const data = reports.data.data;
    const counts = await countByMonthAndCategory(data);
    const dailyCounts = await countByDay(data);
  
    if (counts) {
      // Prepare dynamic labels and data
      const monthLabels = Object.keys(counts.monthCounts);
      const monthData = Object.values(counts.monthCounts);
      const categoryLabels = Object.keys(counts.categoryCounts);
      const categoryData = Object.values(counts.categoryCounts);
      const dailyLabels = Object.keys(dailyCounts);
      const dailyData = Object.values(dailyCounts);
  
      // ✅ Line Chart for Reports Over Time
      const lineCanvas = document.getElementById('lineChart');
      if (lineCanvas) {
        const lineChart = new Chart(lineCanvas.getContext('2d'), {
          type: 'line',
          data: {
            labels: monthLabels,
            datasets: [{
              label: 'Reports Per Month',
              data: monthData,
              borderColor: '#1abc9c',
              borderWidth: 2,
              fill: false
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true
              }
            }
          }
        });
      }
  
      // ✅ Bar Chart for Crime Type Distribution
      const pieCanvas = document.getElementById('pieChart');
      if (pieCanvas) {
        const pieChart = new Chart(pieCanvas.getContext('2d'), {
          type: 'bar',
          data: {
            labels: categoryLabels,
            datasets: [{
              data: categoryData,
              backgroundColor: ['#3498db', '#e74c3c', '#9b59b6', '#f1c40f', '#2ecc71']
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'bottom'
              }
            }
          }
        });
      }
  
      // ✅ Bar Chart for Daily Distribution
      const dailyCanvas = document.getElementById('dailyChart');
      if (dailyCanvas) {
        const dailyChart = new Chart(dailyCanvas.getContext('2d'), {
          type: 'bar',
          data: {
            labels: dailyLabels,
            datasets: [{
              label: 'Reports Per Day',
              data: dailyData,
              backgroundColor: '#3498db'
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'bottom'
              }
            }
          }
        });
      }
    }
  
    // ✅ Navigation Event
    const category = document.querySelector("#category");
    if (category) {
      category.addEventListener("click", (e) => {
        e.preventDefault();
        location.href = "./Category/category.html";
      });
    }
  });
  
  // ✅ Helper Functions
  
  async function GetAllReport(token) {
    try {
      const response = await fetch("https://localhost:7240/api/Report/GetAllReports", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "content-type": "application/json"
        }
      });
  
      const resp = await response.json();
  
      if (!response.ok) {
        return { status: false, error: resp.message };
      }
  
      return { status: true, data: resp };
    } catch (error) {
      console.error("Fetch error:", error);
      return { status: false, error: error.message };
    }
  }
  
  async function getToken() {
    return localStorage.getItem('jwt');
  }
  
  async function countByMonthAndCategory(reports) {
    let monthCounts = {};
    let categoryCounts = {};
  
    reports.forEach(report => {
      let date = new Date(report.dateOccurred);
      let month = date.toLocaleString('default', { month: 'long' });
  
      // Count by month
      monthCounts[month] = (monthCounts[month] || 0) + 1;
  
      // Count by category
      let category = report.categoryName;
      if (category) {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      }
    });
  
    return { monthCounts, categoryCounts };
  }
  
  async function countByDay(data) {
    const dailyCounts = {};
  
    data.forEach(report => {
      if (report.dateOccurred) {
        const date = new Date(report.dateOccurred).toISOString().split('T')[0];
        dailyCounts[date] = (dailyCounts[date] || 0) + 1;
      }
    });
  
    return dailyCounts;
  }
  