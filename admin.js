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

// get the courses from the backend
$(document).ready(function () {
  // Fetch data from the backend API (replace with your actual API URL)
  $.ajax({
    url: "/api/courses",
    method: "GET",
    success: function (data) {
      // Assuming data is an array of objects with 'value' and 'label' properties
      data.forEach(function (option) {
        // Create a new option element
        var newOption = new Option(option.label, option.value);

        // Append the new option to the multi-select dropdown
        $("#courses_teacher").append(newOption);
      });
    },
    error: function (error) {
      console.error("Error fetching data from API:", error);
    },
  });
});

// JavaScript (admin.js)
$(document).ready(function() {
    // Function to submit the Insert Course form
    $('#addCourseButton').click(function() {
        var formData = $('#insertCourseForm').serialize();
        
        axios.post('/api/insert-course', formData)
            .then(function(response) {
                // Handle success, e.g., show a success message
                console.log('Course added successfully');
            })
            .catch(function(error) {
                // Handle error, e.g., show an error message
                console.error('Error adding course:', error);
            });
    });

    // Function to submit the Insert Teacher form
    $('#addTeacherButton').click(function() {
        var formData = $('#insertTeacherForm').serialize();

        axios.post('/api/insert-teacher', formData)
            .then(function(response) {
                // Handle success, e.g., show a success message
                console.log('Teacher added successfully');
            })
            .catch(function(error) {
                // Handle error, e.g., show an error message
                console.error('Error adding teacher:', error);
            });
    });

    // Function to submit the Insert Student form
    $('#addStudentButton').click(function() {
        var formData = $('#insertStudentForm').serialize();

        axios.post('/api/insert-student', formData)
            .then(function(response) {
                // Handle success, e.g., show a success message
                console.log('Student added successfully');
            })
            .catch(function(error) {
                // Handle error, e.g., show an error message
                console.error('Error adding student:', error);
            });
    });
});

