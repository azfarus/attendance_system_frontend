const sidebarItems = document.querySelectorAll(".sidebar li");
const sections = document.querySelectorAll(".section");

sidebarItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Remove active class from all sidebar items
    sidebarItems.forEach((item) => item.classList.remove("active"));
    // Add active class to clicked item
    item.classList.add("active");
    const target = item.getAttribute("data-target");
    // Hide all sections
    sections.forEach((section) => section.classList.remove("active"));
    // Show target section
    document.querySelector(target).classList.add("active");
  });
});

// Function to get the teacher's ID from the session
function getSessionTeacherId() {
  var teacherid = null;

  // Make an AJAX GET request to fetch the teacher's ID from the session
  $.ajax({
    url: "http://localhost:8081/session/get-teacher-session-data", // Replace with your backend API endpoint
    method: "GET",
    async: false, // Synchronous request to wait for the response
    success: function (data) {
      teacherid = data; // Store the teacher's ID
      console.log("Teacher ID:", teacherid);
    },
    error: function (xhr, textStatus, errorThrown) {
      console.error("Error fetching teacher ID");
      console.log("Status: " + xhr.status);
      console.log("Response Text: " + xhr.responseText);
    },
  });

  return teacherid;
}


// Function to fetch teacher's data using AJAX
function fetchTeacherData() {
  // Get the teacher's ID from the session (you might need to update this part)
  var teacherid = getSessionTeacherId(); // Implement this function to retrieve the teacher ID from the session
  // Make an AJAX request to fetch the teacher's data
//   $.ajax({
//     url: "http://localhost:8081/teacher/" + teacherid, // Replace with your backend API endpoint
//     method: "GET",
//     success: function (teacherData) {
//       // Handle the successful response here
//       console.log(teacherData);
//       // Populate the teacher's dashboard with the retrieved data
//       populateTeacherDashboard(teacherData);
//     },
//     error: function (error) {
//       // Handle any errors here
//       console.error("Error fetching teacher data:", error.responseText);
//     },
//   });
// }

// // Function to populate the teacher's dashboard with data
// function populateTeacherDashboard(teacherData) {
//   // Example: $("#teacherName").text(teacherData.name);
}

// Call the function to fetch teacher's data when the page loads
$(document).ready(function () {
  fetchTeacherData();
});
