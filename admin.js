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


// JavaScript (admin.js)
// Function to submit the form with data as parameters
function submitForm(formId, endpoint) {
  var formData = $(formId).serializeArray(); // Serialize form data as an array

  // Convert serialized data to an object
  var dataObject = {};
  formData.forEach(function (item) {
    dataObject[item.name] = item.value;
  });

  // Send a POST request with data as URL parameters
  axios
    .post(endpoint, null, {
      params: dataObject,
    })
    .then(function (response) {
      // Handle success, e.g., show a success message
      console.log("Form submitted successfully");
    })
    .catch(function (error) {
      // Handle error, e.g., show an error message
      console.error("Error submitting form:", error);
    });
}

$(document).ready(function () {
  // Event listeners for form submissions
  $("#addCourseButton").click(function () {
    submitForm("#insertCourseForm", "/api/insert-course"); // Replace with your API endpoint
  });

  $("#addTeacherButton").click(function () {
    submitForm("#insertTeacherForm", "/api/insert-teacher"); // Replace with your API endpoint
  });

  $("#addStudentButton").click(function () {
    submitForm("#insertStudentForm", "/api/insert-student"); // Replace with your API endpoint
  });
});
