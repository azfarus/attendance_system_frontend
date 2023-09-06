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
            email: email_t
        };
        
        // Make the AJAX request
        $.ajax({
            url: "http://localhost:8081/admin/teacher", // Replace with your backend API endpoint
            method: "POST",
            data: jQuery.param(data) ,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                // Handle the successful response here
                console.log("Teacher added successfully:", response);
            },
            error: function (error) {
                // Handle any errors here
                console.error("Error adding teacher:", error.responseText);
            }
        });
    });
