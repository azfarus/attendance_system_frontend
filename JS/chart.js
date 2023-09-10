document.addEventListener("DOMContentLoaded", function () {
  var ctx = document.getElementById("myChart").getContext("2d");

  // Define your chart data
  var chartData = {
    labels: ["CSE 4107", "EEE 4181", "CSE 4105", "HUM 4147", "HUM 4145"],
    datasets: [
      {
        label: "Attendance Chart",
        data: [10, 20, 15, 30, 25],
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color
        borderColor: "rgba(75, 192, 192, 1)", // Border color
        borderWidth: 2,
      },
    ],
  };

  // Create the chart
  var myChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
    responsive: true,
    maintainAspectRatio: false, // Set to false to allow the chart to adjust to the container size
    },
  });
  
});
