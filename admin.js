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


// // JavaScript (admin.js)
// function captureFormData() {
//     // Get values from form fields
//     var name = document.getElementById("name_teacher").value;
//     var teacherID = document.getElementById("id_teacher").value;
//     var password = document.getElementById("password_teahcer").value;
//     var email = document.getElementById("mail_teacher").value;

//     var params = {
//         name: name,
//         id: teacherID,
//         password: password,
//         email: email
//     };


//     axios.get('http://localhost:8081/admin/teacher',{param:params } )
//         .then(function(response) {
//             console.log('Teacher added successfully');
//         })
//         .catch(function(error) {
//             console.error('Error adding teacher:', error);
//         });

//     // Create a string containing the form data
//     var formDataString = "Name: " + name + "\nTeacher ID: " + teacherID + "\nPassword: " + password + "\nE-mail Address: " + email;

//     // Output the form data as a string in the console
//     console.log(params);
// }

// // Add an event listener to the "ADD TEACHER" button
// document.getElementById("addTeacherButton").addEventListener("click", function(event) {
//     // Prevent the form from submitting (to avoid page refresh)
//     event.preventDefault();

//     // Call the captureFormData function to process the form data
//     captureFormData();
// });


// // JavaScript (admin.js)
// // $(document).ready(function() {
// //     // Function to submit the Insert Course form
// //     $('#addCourseButton').click(function() {
// //         var params = new URLSearchParams();
// //         params.append('department', $('#dept_course').val());
// //         params.append('code', $('#code_course').val());
// //         params.append('section', $('#section_course').val());
// //         params.append('student_count_limit', $('#student_count_limit').val());

// //         axios.post('/api/insert-course', params)
// //             .then(function(response) {
// //                 console.log('Course added successfully');
// //             })
// //             .catch(function(error) {
// //                 console.error('Error adding course:', error);
// //             });
// //     });

//     // Function to submit the Insert Teacher form
//     $('#addTeacherButton').click(function() {
//         var params = new URLSearchParams();
//         params.append('name_teacher', $('#name_teacher').val());
//         params.append('id_teacher', $('#id_teacher').val());
//         params.append('password_teacher', $('#password_teacher').val());
//         params.append('mail_teacher', $('#mail_teacher').val());
//         params.append('courses_teacher', $('#courses_teacher').val());

//         axios.post('/api/insert-teacher', params)
//             .then(function(response) {
//                 console.log('Teacher added successfully');
//             })
//             .catch(function(error) {
//                 console.error('Error adding teacher:', error);
//             });
//     });

// //     // Function to submit the Insert Student form
// //     $('#addStudentButton').click(function() {
// //         var params = new URLSearchParams();
// //         params.append('name_student', $('#name_student').val());
// //         params.append('id_student', $('#id_student').val());
// //         params.append('password_student', $('#password_student').val());
// //         params.append('mail_student', $('#mail_student').val());
// //         params.append('mail_guardian', $('#mail_guardian').val());

// //         axios.post('/api/insert-student', params)
// //             .then(function(response) {
// //                 console.log('Student added successfully');
// //             })
// //             .catch(function(error) {
// //                 console.error('Error adding student:', error);
// //             });
// //     });
// // });


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
