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

// Fetch semester data from the backend
// $.ajax({
//     url: "http://your-backend-url/semester-endpoint", // Replace with your backend API endpoint for semesters
//     method: "GET",
//     success: function (data) {
//         // Populate the Semester dropdown with dynamic options
//         const semesterDropdown = document.getElementById("semester-dropdown");
//         data.forEach(function (semester) {
//             const option = document.createElement("a");
//             option.href = "#"; // Add the appropriate link or action
//             option.textContent = semester;
//             option.onclick = function () {
//                 changeTitle(semester, "dropbtn2"); // Call your changeTitle function
//             };
//             semesterDropdown.appendChild(option);
//         });
//     },
//     error: function (error) {
//         console.error("Error fetching semesters:", error);
//     }
// });

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


