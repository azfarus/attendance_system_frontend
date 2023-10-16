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
      console.log(error);
      alert(error);
      //window.location.href = "login.html";
    },
  });
});

// Fetch department data from the backend
sessiondata = localStorage.getItem("mysession");
hashdata = localStorage.getItem("myhash");
$.ajax({
  url: "http://localhost:8081/student/departments", // Replace with your backend API endpoint for departments
  method: "GET",
    headers: {
      'mysession': sessiondata,
      'Authorization': 'Basic ' + hashdata
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
          'mysession': sessiondata,
          'Authorization': 'Basic ' + hashdata
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
    var studentid = null;
  
    sessiondata = localStorage.getItem("mysession");
    hashdata = localStorage.getItem("myhash");
    // Make an AJAX GET request to fetch the Student's ID from the session
    $.ajax({
      url: "http://localhost:8081/session/get-session-data", // Replace with your backend API endpoint
      method: "GET",
      async: false, // Synchronous request to wait for the response
      headers: {
        'mysession': sessiondata,
        'Authorization': 'Basic ' + hashdata
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
        'mysession': sessiondata,
        'Authorization': 'Basic ' + hashdata
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


            let getID;
            // JavaScript function to change the dropdown title
            function changeTitle(newTitle, dropdownId) {
                document.getElementById(dropdownId).textContent = newTitle;
            }
            
            sessiondata = localStorage.getItem("mysession");
            hashdata = localStorage.getItem("myhash");
            
                  $.ajax({
                    url: "http://localhost:8081/session/get-session-data", // Replace with your backend API endpoint
                    method: "GET",
                    headers: {
                      'mysession': sessiondata,
                      'Authorization': 'Basic ' + hashdata
                    },
                    success: function (response) {
                        getID = response;
                        console.log(getID);
                    },
                    error: function (error) {
                      // Handle any errors here
                      alert(error);
                      window.location.href = "login.html";
                    },
                  });
    
            // JavaScript function to add selected items to the "Selected Items" division
            function btn() {
                const selectedItems = document.querySelectorAll('.selected-item');

                // Create an array to store course information
                const courses = [];

                selectedItems.forEach(item => {
                    const courseInfo = item.textContent;
                    const courseInfoWithoutRemove = courseInfo.replace('Remove', '');
                    courses.push(courseInfoWithoutRemove);
                    
                });

                courses.forEach(course => {
                    const [dept, courseCode] = course.split(' ');
                    const coursesJSON = JSON.stringify(courses);
                // Send the JSON data to your backend API using AJAX

                sessiondata = localStorage.getItem("mysession");
                hashdata = localStorage.getItem("myhash");
                $.ajax({
                    url: "http://localhost:8081/course/register", // Replace with your backend API endpoint for course registration
                    method: "POST",
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    headers: {
                    'mysession': sessiondata,
                    'Authorization': 'Basic ' + hashdata
                    },
                    data:{
                        department:dept,
                        course: courseCode,
                        stud_id: getID
                    },
                    success: function (response) {
                        // Handle success response
                        console.log("Courses registered successfully:", response);
                        alert("Courses registered successfully!");
                    },
                    error: function (error) {
                        // Handle error response
                        console.error("Error registering courses:", error);
                        alert("Error registering courses. Please try again.");
                    }
                });
                });
                console.log(courses);

                // Create a JSON object with the selected courses
            }
            function selectItem() {
                const departmentValue = document.getElementById('dropbtn').textContent;
                const offeredCoursesValue = document.getElementById('dropbtn3').textContent;
            
                if (departmentValue === 'Department' || offeredCoursesValue === 'Offered courses') {
                    // Display an alert and return without adding the item
                    alert('Please select both department and course.');
                    return;
                }
            
                const selectedItems = document.querySelectorAll('.selected-item');
            
                // Check if the selected course is already in the list
                let isDuplicate = false;
                selectedItems.forEach(item => {
                    const courseInfo = item.textContent;
                    const courseInfoWithoutRemove = courseInfo.replace('Remove', '');
                    const [dept, courseCode] = courseInfoWithoutRemove.split(' ');
                    if (departmentValue === dept && offeredCoursesValue === courseCode) {
                        isDuplicate = true;
                        alert('Course already selected');
                    }
                });
            
                if (!isDuplicate) {
                    const selectedItemsDiv = document.getElementById('selected-items');
                    const department = document.getElementById('dropbtn').textContent;
                    const offeredCourses = document.getElementById('dropbtn3').textContent;
                    const courseInfo = `${department} ${offeredCourses}`;
            
                    const selectedItem = document.createElement('div');
                    selectedItem.className = 'selected-item';
                    selectedItem.textContent = courseInfo;
            
                    const removeButton = document.createElement('button');
                    removeButton.className = 'remove-button';
                    removeButton.textContent = 'Remove';
                    removeButton.addEventListener('click', function () {
                        selectedItem.remove();
                        // Re-add the event listener to the "Select" button
                        document.getElementById('select-button').addEventListener('click', selectItem);
                    });
            
                    selectedItem.appendChild(removeButton);
                    selectedItemsDiv.appendChild(selectedItem);
            
                    // Remove the event listener after adding the item
                    document.getElementById('select-button').removeEventListener('click', selectItem);
                    document.getElementById('dropbtn3').textContent = "Offered courses";
                }
            }


