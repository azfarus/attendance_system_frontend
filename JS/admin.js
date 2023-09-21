//get session
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

//frontend js
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
  hashdata = localStorage.getItem("myhash");
  
  // Make the AJAX request to add teacher
  $.ajax({
    url: "http://localhost:8081/admin/teacher", // Replace with your backend API endpoint
    method: "POST",
    data: jQuery.param(data),
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    headers: {
      'mysession': sessiondata,
      'Authorization': 'Basic ' + hashdata
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


sessiondata = localStorage.getItem("mysession");
hashdata = localStorage.getItem("myhash");

//teacher csv upload
$('#TeacherCSVForm').submit(function (event) {
  event.preventDefault();
  const formData = new FormData();
  const fileInput = document.getElementById('csv_file');
  formData.append('csv_file', fileInput.files[0]);
  $.ajax({
      type: 'POST',
      url: 'http://localhost:8081/api/upload-csv', // Replace with your backend API endpoint
      data: formData,
      headers: {
        'mysession': sessiondata,
        'Authorization': 'Basic ' + hashdata
      },
      processData: false, // Don't process the data
      contentType: false, // Don't set content type (it will be set automatically)
      success: function (response) {
          // Handle success response from the backend
          console.log('File uploaded successfully:', response);
          alert('File uploaded successfully.');
      },
      error: function (error) {
          // Handle error response from the backend
          console.error('Error uploading file:', error);
          alert('Error uploading file. Please try again.');
      }
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
  hashdata = localStorage.getItem("myhash");
  
  // Make the AJAX request to add course
  $.ajax({
    url: "http://localhost:8081/admin/course",
    method: "POST",
    data: jQuery.param(data),
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    headers: {
      'mysession': sessiondata,
      'Authorization': 'Basic ' + hashdata
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


sessiondata = localStorage.getItem("mysession");
hashdata = localStorage.getItem("myhash");

//Course csv upload
$('#CourseCSVForm').submit(function (event) {
  event.preventDefault();
  const formData = new FormData();
  const fileInput = document.getElementById('csv_file');
  formData.append('csv_file', fileInput.files[0]);
  $.ajax({
      type: 'POST',
      url: 'http://localhost:8081/api/upload-csv', // Replace with your backend API endpoint
      data: formData,
      headers: {
        'mysession': sessiondata,
        'Authorization': 'Basic ' + hashdata
      },
      processData: false, // Don't process the data
      contentType: false, // Don't set content type (it will be set automatically)
      success: function (response) {
          // Handle success response from the backend
          console.log('File uploaded successfully:', response);
          alert('File uploaded successfully.');
      },
      error: function (error) {
          // Handle error response from the backend
          console.error('Error uploading file:', error);
          alert('Error uploading file. Please try again.');
      }
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
  hashdata = localStorage.getItem("myhash");
  // Make the AJAX request to add student
  $.ajax({
    url: "http://localhost:8081/admin/student", // Replace with your backend API endpoint
    method: "POST",
    data: jQuery.param(data),
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    headers: {
      'mysession': sessiondata,
      'Authorization': 'Basic ' + hashdata
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
hashdata = localStorage.getItem("myhash");

//student csv upload
$('#StudentCSVForm').submit(function (event) {
    event.preventDefault();
    const formData = new FormData();
    const fileInput = document.getElementById('csv_file');
    formData.append('csv_file', fileInput.files[0]);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8081/api/upload-csv', // Replace with your backend API endpoint
        data: formData,
        headers: {
          'mysession': sessiondata,
          'Authorization': 'Basic ' + hashdata
        },
        processData: false, // Don't process the data
        contentType: false, // Don't set content type (it will be set automatically)
        success: function (response) {
            // Handle success response from the backend
            console.log('File uploaded successfully:', response);
            alert('File uploaded successfully.');
        },
        error: function (error) {
            // Handle error response from the backend
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again.');
        }
    });
});

sessiondata = localStorage.getItem("mysession");
hashdata = localStorage.getItem("myhash");

// Function to populate the department dropdown
function populateDepartmentDropdown() {
  $.ajax({
    url: "http://localhost:8081/admin/departments",
    method: "GET",
    headers: {
      'mysession': sessiondata,
      'Authorization': 'Basic ' + hashdata
    },
    success: function (data) {
      // Populate the <select> with dynamic options
      var selectElement = $("#dept_course");
      var selectElement2 = $("#dept_student");
      var selectElement3 = $("#dept_teacher");

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
        selectElement3.append($('<option>', {
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
}

// Populate the department dropdown initially
populateDepartmentDropdown();

// Function to fetch and populate courses based on selected department
function populateCoursesDropdown(dept) {
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
    headers: {
      'mysession': sessiondata,
      'Authorization': 'Basic ' + hashdata
    },
    success: function (data) {
      console.log(data);
      var selectElement = $("#courses_teacher");

      // Clear previous options
      selectElement.empty();

      // Iterate through the fetched data and create <option> elements
      for (var i = 0; i < data.length; i++) {
        var course = data[i];
        selectElement.append($('<option>', {
          value: course,
          text: course
        }));
      }
    },
    error: function (error) {
      console.error("Error fetching courses:", error);
    }
  });
}

// Add an event listener to the department dropdown
$("#dept_teacher").change(function () {
  var selectedDept = $(this).val();
  // Call the function to populate courses based on the selected department
  populateCoursesDropdown(selectedDept);
});
