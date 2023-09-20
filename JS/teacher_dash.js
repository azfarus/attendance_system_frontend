$(document).ready(function () {
  sessiondata = localStorage.getItem("mysession");
  hashdata = localStorage.getItem("myhash");
  $.ajax({
    url: "http://localhost:8081/session/get-session-data",
    method: "GET",
    headers: {
      'mysession': sessiondata,
      'Authorization': 'Basic ' + hashdata
    },
    success: function (response) {

    },
    error: function (error) {
      // Handle any errors here
      window.location.href = "login.html";
    },
  });
});

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

  sessiondata = localStorage.getItem("mysession");
  hashdata = localStorage.getItem("myhash");
  // Make an AJAX GET request to fetch the teacher's ID from the session
  $.ajax({
    url: "http://localhost:8081/session/get-session-data", // Replace with your backend API endpoint
    method: "GET",
    async: false, // Synchronous request to wait for the response
    headers: {
      'mysession': sessiondata,
      'Authorization': 'Basic ' + hashdata
    },
    success: function (data) {
      teacherid = data; // Store the teacher's ID
    },
    error: function () {
      console.error("Error fetching teacher ID");
    },
  });

  return teacherid;
}


hashdata = localStorage.getItem("myhash");
// Function to fetch teacher's data using AJAX
function fetchTeacherData() {
  var tid = getSessionTeacherId();
  console.log(tid);
  // Make an AJAX request to fetch the teacher's data
  $.ajax({
    url: "http://localhost:8081/teacher/info", // Replace with your backend API endpoint
    method: "GET",
    headers: {
      'mysession': sessiondata,
      'Authorization': 'Basic ' + hashdata
    },
    data: {
      teacherid: tid
    },
    success: function (teacherData) {
      // Handle the successful response here
      console.log(teacherData);
      // Populate the teacher's dashboard with the retrieved data
      populateTeacherDashboard(teacherData);
    },
    error: function (error) {
      // Handle any errors here
      console.error("Error fetching teacher data:", error.responseText);
    },
  });
}

// Function to populate the teacher's dashboard with data
function populateTeacherDashboard(teacherData) {
  $("#t_id").text(teacherData.id);
  $("#t_name").text(teacherData.name);
  $("#t_mail").text(teacherData.email);
}


// Call the function to fetch teacher's data when the page loads
$(document).ready(function () {
  fetchTeacherData();
});
