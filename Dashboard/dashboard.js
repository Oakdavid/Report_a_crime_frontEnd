// Line Chart for Crime Reports Over Time

const category = document.querySelector("#category");
category.addEventListener("click", () => {
  location.href = "./Category/category.html";
})
const lineCtx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(lineCtx, {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Reports',
      data: [10, 15, 8, 12, 18, 20, 25],
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

// Pie Chart for Crime Types Distribution
const pieCtx = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(pieCtx, {
  type: 'bar',
  data: {
    labels: ['Theft', 'Assault', 'Fraud', 'Vandalism', 'Other'],
    datasets: [{
      data: [25, 15, 20, 10, 30],
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
