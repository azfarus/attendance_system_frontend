



//hostaddr="localhost";
hostaddr="192.168.1.66";
localStorage.setItem('host', hostaddr);

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

    let hash = btoa(id + ":" + password);
    $.ajax({
        type: 'POST',
        url: 'http://'+hostaddr+':8081/login/'+userType,
        contentType: 'application/json',
        data: JSON.stringify(requestBody),
        headers:{
            'Authorization': 'Basic ' + hash
        },

        
        success: function(data) {
            localStorage.setItem("mysession" , data);
            localStorage.setItem("myhash" , hash);
            alert('Login Successful ' + data);
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