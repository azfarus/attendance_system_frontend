$(document).ready(function () {
    sessiondata = localStorage.getItem("mysession");
    $.ajax({
      url: "http://localhost:8081/session/get-session-data", // Replace with your backend API endpoint
      method: "GET",
      headers: {
        'mysession': sessiondata
      },
      success: function (response) {
  
      },
      error: function (error) {
        // Handle any errors here
        window.location.href = "login.html";
      },
    });
  });

// Fetch department data from the backend
sessiondata = localStorage.getItem("mysession");
$.ajax({
    url: "http://localhost:8081/admin/departments", // Replace with your backend API endpoint for departments
    method: "GET",
    headers: {
        'mysession': sessiondata
    },
    success: function (data) {
        // Populate the Department dropdown with dynamic options
        const departmentDropdown = document.getElementById("department-dropdown");
        console.log(data);
        data.forEach(function (department) {
            const option = document.createElement("a");
            option.href = "#"; // Add the appropriate link or action
            option.textContent = department;
            option.onclick = function () {
                changeTitle(department, "dropbtn"); // Call your changeTitle function
            };
            departmentDropdown.appendChild(option);
        });
    },
    error: function (error) {
        console.error("Error fetching departments:", error);
    }
});


document.getElementById('dropbtn3').textContent = "Offered courses";
const deptdrop = document.getElementById("department-dropdown");
deptdrop.addEventListener('click', function () {
    const sessiondata = localStorage.getItem("mysession");
    const dept = document.getElementById('dropbtn').textContent;
    const coursesDropdown = document.getElementById("courses-dropdown");

    // Clear previous options in the "Offered Courses" dropdown
    while (coursesDropdown.firstChild) {
        coursesDropdown.removeChild(coursesDropdown.firstChild);
    }

    // Fetch course data from the backend based on the selected department
    $.ajax({
        url: "http://localhost:8081/course/get-course-by-dept",
        method: "GET",
        headers: {
            'mysession': sessiondata
        },
        data: {
            department: dept
        },
        success: function (data) {
            console.log(data);
            // Populate the "Offered Courses" dropdown with dynamic options
            data.forEach(function (course) {
                const option = document.createElement("a");
                option.href = "#"; // Add the appropriate link or action
                option.textContent = course;
                option.onclick = function () {
                    changeTitle(course, "dropbtn3"); // Call your changeTitle function
                    // Reset the "Offered Courses" dropdown by clearing its selected option
                    coursesDropdown.selectedIndex = -1;
                };
                coursesDropdown.appendChild(option);
            });
        },
        error: function (error) {
            console.error("Error fetching courses:", error);
        }
    });
});

function getSessionStudentId() {
    var Studentid = null;
  
    sessiondata = localStorage.getItem("mysession");
    // Make an AJAX GET request to fetch the Student's ID from the session
    $.ajax({
      url: "http://localhost:8081/session/get-session-data", // Replace with your backend API endpoint
      method: "GET",
      async: false, // Synchronous request to wait for the response
      headers: {
        'mysession': sessiondata
      },
      success: function (data) {
        studentid = data; // Store the Student's ID
      },
      error: function () {
        console.error("Error fetching Student ID");
      },
    });
  
    return studentid;
  }
  
  
  // Function to fetch Student's data using AJAX
  function fetchStudentData() {
    var sid = getSessionStudentId();
    console.log("session data fetched");
    // Make an AJAX request to fetch the Student's data
    $.ajax({
      url: "http://localhost:8081/student/info", // Replace with your backend API endpoint
      method: "GET",
      headers: {
        'mysession': sessiondata
      },
      data: {
        studentid: sid
      },
      success: function (StudentData) {
        // Handle the successful response here
        console.log(StudentData);
        // Populate the Student's dashboard with the retrieved data
        populateStudentDashboard(StudentData);
      },
      error: function (error) {
        // Handle any errors here
        console.error("Error fetching Student data:", error.responseText);
      },
    });
  }
  
  // Function to populate the Student's dashboard with data
  function populateStudentDashboard(StudentData) {
    $("#s_id").text(StudentData.id);
    $("#s_name").text(StudentData.name);
    $("#s_mail").text(StudentData.email);
  }
  
  
  // Call the function to fetch Student's data when the page loads
  $(document).ready(function () {
    fetchStudentData();
  });


