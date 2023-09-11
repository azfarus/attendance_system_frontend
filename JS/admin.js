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

// When the form is submitted
$("#insertTeacherForm").submit(function (event) {
  event.preventDefault(); // Prevent the default form submission
  
  // Get the form values
  var name_t = $("#name_teacher").val();
  var id_t = $("#id_teacher").val();
  var password_t = $("#password_teacher").val();
  var email_t = $("#mail_teacher").val();
  
  // Create a data object with the parameters
  var data = {
    name: name_t,
    id: id_t,
    password: password_t,
    email: email_t,
  };
  
  sessiondata = localStorage.getItem("mysession");
  // Make the AJAX request
  $.ajax({
    url: "http://localhost:8081/admin/teacher", // Replace with your backend API endpoint
    method: "POST",
    data: jQuery.param(data),
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    headers: {
      'mysession': sessiondata
    },
    success: function (response) {
      // Handle the successful response here
      alert("Teacher added successfully");
      console.log("Teacher added successfully:", response);
    },
    error: function (error) {
      // Handle any errors here
      console.error("Error adding teacher:", error.responseText);
    },
  });
});

// When the form is submitted
$("#insertCourseForm").submit(function (event) {
  event.preventDefault(); // Prevent the default form submission
  
  // Get the form values
  var department = $("#dept_course").val();
  var code = $("#code_course").val();
  var semester = $("#semester_course").val();
  var studentCountLimit = $("#student_count_limit").val();
  var section = $("#section_course").val();
  var assignTeacher = $("#assign_teacher").val();
  
  sessiondata = localStorage.getItem("mysession");
  // Create a data object with the parameters
  var data = {
    department: department,
    courseId: code,
    semester: semester,
    count: studentCountLimit,
    section: section,
    teacherId: assignTeacher,
  };
  
  sessiondata = localStorage.getItem("mysession");
  // Make the AJAX request
  $.ajax({
    url: "http://localhost:8081/admin/course", // Replace with your backend API endpoint
    method: "POST",
    data: jQuery.param(data),
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    headers: {
      'mysession': sessiondata
    },
    success: function (response) {
      // Handle the successful response here
      alert("Course added successfully");
      console.log("Course added successfully:", response);
    },
    error: function (error) {
      // Handle any errors here
      console.error("Error adding course:", error.responseText);
    },
  });
});

// When the form is submitted
$("#insertStudentForm").submit(function (event) {
  event.preventDefault(); // Prevent the default form submission
  
  // Get the form values
  var name = $("#name_student").val();
  var id = $("#id_student").val();
  var email = $("#mail_student").val();
  var guardianEmail = $("#mail_guardian").val();
  var password = $("#password_student").val();
  var department = $("#dept_student").val();
  var semester = $("#semester_student").val();
  // Create a data object with the parameters
  var data = {
    name: name,
    id: id,
    password: password,
    email: email,
    guardianEmail: guardianEmail,
    department: department,
    semester: semester,
  };
  
  sessiondata = localStorage.getItem("mysession");
  // Make the AJAX request
  $.ajax({
    url: "http://localhost:8081/admin/student", // Replace with your backend API endpoint
    method: "POST",
    data: jQuery.param(data),
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    headers: {
      'mysession': sessiondata
    },
    success: function (response) {
      // Handle the successful response here
      alert("Student added successfully");
      console.log("Student added successfully:", response);
    },
    error: function (error) {
      // Handle any errors here
      console.error("Error adding student:", error.responseText);
    },
  });
});


sessiondata = localStorage.getItem("mysession");
//Fetch department data from the backend
$.ajax({
  
  url: "http://localhost:8081/admin/departments", // Replace with your backend endpoint
  method: "GET",
  headers: {
    'mysession': sessiondata
  },
  success: function (data) {
    // Populate the <select> with dynamic options
    var selectElement = $("#dept_course");
    var selectElement2 = $("#dept_student");
    
    // Iterate through the fetched data and create <option> elements
    for (var i = 0; i < data.length; i++) {
      var department = data[i];
      selectElement.append($('<option>', {
        value: department,
        text: department
      }));
      selectElement2.append($('<option>', {
        value: department,
        text: department
      }));
    }
  },
  error: function (error) {
    // Handle errors
    console.error("Error fetching departments:", error);
  }
});