$('#loginButton').click(function() {
    const userType = $('#userType').val();
    const id = $('#email').val();
    const password = $('#password').val();
    //const remember = $('#remember').prop('checked');

    // Send login request to the server using jQuery's AJAX

    const requestBody = {
        id : Number(id),
        password : password
    }

    console.log(JSON.stringify(requestBody));
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8081/login/'+userType,
        contentType: 'application/json',
        data: JSON.stringify(requestBody),

        
        success: function() {
            alert('Login Successful');
            // Redirect to the appropriate dashboard based on the user type
            if(userType=='admin')
                window.location.href = "admin.html";
            else if(userType=='teacher')
                window.location.href = "teacher_dash.html";
            else if(userType=='student')
                window.location.href = "student_dash.html";
        },
        error: function() {
            // Handle login error
            alert('Login failed. Please check your credentials.');
        }
    });
});