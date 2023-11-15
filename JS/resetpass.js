var url = new URL(window.location.href);
var token = url.searchParams.get('token');

hostaddr=url.searchParams.get('server');


document.getElementById("resetpass").addEventListener("click" , ()=>{
    newpass=document.getElementById("newPassword").value;
    newpassconfirm=document.getElementById("confirmPassword").value;
    
        if(newpass===newpassconfirm){
            
            $.ajax({
                type: 'POST',
                url: 'http://'+hostaddr+':8081/forgotpass/exec-change',
                contentType: 'application/x-www-form-urlencoded',
                data: {
                    password:newpass,
                    token:token

                },
                
        
                
                success: function(data) {
                    alert('YES YES YES');
                },
                error: function() {
                    // Handle login error
                    alert('Login failed. Please check your credentials.');
                }
            });
        }
        alert("stop");    
    });
