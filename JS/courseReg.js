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

document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('search-bar');
    const itemList = document.getElementById('item-list');

    searchBar.addEventListener('input', function () {
        const searchTerm = searchBar.value.toLowerCase();
        const courseItems = itemList.querySelectorAll('.item');

        courseItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const isMatch = text.includes(searchTerm);

            if (searchTerm === '') {
                item.style.display = 'none'; // Hide all items when search bar is empty
            } else if (isMatch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
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

sessiondata = localStorage.getItem("mysession");
const dept = document.getElementById('dropbtn').textContent;
console.log("hello");
// Fetch course data from the backend
$.ajax({
    url: "http://localhost:8081/course/get-course-by-dept", // Replace with your backend API endpoint for courses
    method: "GET",
    headers: {
        'mysession': sessiondata
    },
    data:{
        department: dept
    },
    success: function (data) {
        console.log(data);
        // Populate the Offered Courses dropdown with dynamic options
        const coursesDropdown = document.getElementById("courses-dropdown");
        data.forEach(function (course) {
            const option = document.createElement("a");
            option.href = "#"; // Add the appropriate link or action
            option.textContent = course;
            option.onclick = function () {
                changeTitle(course, "dropbtn3"); // Call your changeTitle function
            };
            coursesDropdown.appendChild(option);
        });
    },
    error: function (error) {
        console.error("Error fetching courses:", error);
    }
});
});
