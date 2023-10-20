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

  $.ajax({
    url: "http://localhost:8081/teacher/sheets",
    method: "GET",
    headers: {
      'mysession': sessiondata,
      'Authorization': 'Basic ' + hashdata
    },
    data: {
      teacherId: tid
    },
    success: function (teacherCourses) {
      // Assuming teacherCourses is an array of course objects
      console.log(teacherCourses);
  
      // Get the course-blocks element
      const courseBlocks = document.querySelector(".course-blocks");
  
      // Loop through the teacherCourses array
      teacherCourses.forEach(course => {
        // Create a new course block
        const courseBlock = document.createElement("div");
        courseBlock.className = "course";
  
        // Create course code element
        const courseCode = document.createElement("div");
        courseCode.className = "course-code";
        courseCode.textContent = course.department + course.courseid +" "+"-"+" "+ course.section;
  
        // Create course name element
        const courseName = document.createElement("div");
        courseName.className = "course-name";
        courseName.textContent = course.coursename;
        courseName.style.color = "#fff398";
  
        // Create "View Sheet" button
        const viewSheetButton = document.createElement("button");
        viewSheetButton.textContent = "View Sheet";
        viewSheetButton.value = course.hid; // Set the course HID as the button value
        viewSheetButton.addEventListener("click", redirectToSheet);
  
        // Create "Take Attendance" button
        const takeAttendanceButton = document.createElement("button");
        takeAttendanceButton.textContent = "Take Attendance";
        takeAttendanceButton.value = course.hid; // Set the course HID as the button value
        takeAttendanceButton.addEventListener("click", redirectToAttendance);
  
        // Append course code, course name, "View Sheet" button, and "Take Attendance" button to the course block
        courseBlock.appendChild(courseCode);
        courseBlock.appendChild(courseName);
        courseBlock.appendChild(viewSheetButton);
        courseBlock.appendChild(takeAttendanceButton);
  
        // Append the course block to the course-blocks container
        courseBlocks.appendChild(courseBlock);
      });
    },
    error: function (error) {
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

// Function to redirect to the attendance sheet page
function redirectToSheet(event) {
  const hid = event.target.value;
  window.location.href = "AttendanceSheet.html?hid=" + hid;
}

// Function to redirect to the attendance page
function redirectToAttendance(event) {
  const hid = event.target.value;
  window.location.href = "TakeAttendance.html?hid=" + hid;
}


// Call the function to fetch teacher's data when the page loads
$(document).ready(function () {
  fetchTeacherData();
});
