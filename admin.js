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

  // Make the AJAX request
  $.ajax({
    url: "http://localhost:8081/admin/teacher", // Replace with your backend API endpoint
    method: "POST",
    data: jQuery.param(data),
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
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
  var studentCountLimit = $("#student_count_limit").val();
  var section = $("#section_course").val();
  var assignTeacher = $("#assign_teacher").val();

  // Create a data object with the parameters
  var data = {
    department: department,
    courseId: code,
    count: studentCountLimit,
    section: section,
    teacherId: assignTeacher,
  };

  // Make the AJAX request
  $.ajax({
    url: "http://localhost:8081/admin/course", // Replace with your backend API endpoint
    method: "POST",
    data: jQuery.param(data),
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
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
  var password = $("#password_student").val();
  var email = $("#mail_student").val();
  var guardianEmail = $("#mail_guardian").val();

  // Create a data object with the parameters
  var data = {
    name: name,
    id: id,
    password: password,
    email: email,
    guardianEmail: guardianEmail,
  };

  // Make the AJAX request
  $.ajax({
    url: "???", // Replace with your backend API endpoint
    method: "POST",
    data: jQuery.param(data),
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
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
