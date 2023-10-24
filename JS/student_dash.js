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
      //window.location.href = "login.html";
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

document.addEventListener("DOMContentLoaded", function () {
    var ctx = document.getElementById("myChart").getContext("2d");
  
    // Define your chart data
    var chartData = {
      labels: ["CSE 4107", "EEE 4181", "CSE 4105", "HUM 4147", "HUM 4145"],
      datasets: [
        {
          label: "Attendance Chart",
          data: [10, 20, 15, 30, 25],
          backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color
          borderColor: "rgba(75, 192, 192, 1)", // Border color
          borderWidth: 2,
        },
      ],
    };
  
    // Create the chart
    var myChart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
      responsive: true,
      maintainAspectRatio: false, // Set to false to allow the chart to adjust to the container size
      },
    });
    
  });

  // Function to get the Student's ID from the session
function getSessionStudentId() {
  var Studentid = null;
  
  sessiondata = localStorage.getItem("mysession");
  hashdata = localStorage.getItem("myhash");
  // Make an AJAX GET request to fetch the Student's ID from the session
  $.ajax({
    url: "http://localhost:8081/session/get-session-data", // Replace with your backend API endpoint
    method: "GET",
    async: false, // Synchronous request to wait for the response
    headers: {
      'mysession': sessiondata,
      'Authorization': 'Basic ' + hashdata
    },
    success: function (data) {
      Studentid = data; // Store the Student's ID
    },
    error: function () {
      console.error("Error fetching Student ID");
    },
  });
  
  return Studentid;
}


// Function to fetch Student's data using AJAX
function fetchStudentData() {
  // Get the Student's ID from the session (you might need to update this part)
  var sid = getSessionStudentId(); // Implement this function to retrieve the Student ID from the session
  console.log(sid);
  // Make an AJAX request to fetch the Student's data
  sessiondata = localStorage.getItem("mysession");
  hashdata = localStorage.getItem("myhash");
  $.ajax({
    url: "http://localhost:8081/student/info", // Replace with your backend API endpoint
    method: "GET",
    headers: {
      'mysession': sessiondata,
      'Authorization': 'Basic ' + hashdata
    },
    data: {
      studentid: sid
    },
    success: function (StudentData) {
      // Handle the successful response here
      console.log(StudentData);
      // Populate the Student's dashboard with the retrieved data
      populateStudentDashboard(StudentData);
    },
    error: function (error) {
      // Handle any errors here
      console.error("Error fetching Student data:", error.responseText);
    },
  });

  
const studentId = sid;

$.ajax({
    url: `http://localhost:8081/student/get-student-data/${studentId}`,
    method: "GET",
    headers: {
      'mysession': sessiondata,
      'Authorization': 'Basic ' + hashdata
    },
    dataType: "json",
    success: function (data) {
        console.log("Student Data:", data);

        const phoneNumber = '0' + data.phoneNumber;
        const email = data.email;
        const address = data.address;

        $("#phone_student").val(phoneNumber);
        $("#email_student").val(email);
        $("#address_student").val(address);
    },
    error: function (error) {
        console.error("Error fetching student data:", error);
    }
});

}

// Function to populate the Student's dashboard with data
function populateStudentDashboard(StudentData) {
  $("#s_id").text(StudentData.id);
  $("#s_name").text(StudentData.name);
  $("#s_mail").text(StudentData.email);

  sessiondata = localStorage.getItem("mysession");
  hashdata = localStorage.getItem("myhash");
      const profilePicture = document.getElementById('profilePicture');
      profilePicture.src = "http://localhost:8081/student/get-photo/" + StudentData.id;

  // Make a GET request to fetch the student's photo
  // $.ajax({
  //   url: "http://localhost:8081/student/get-photo/" + StudentData.id,
  //   method: 'GET',
  //   headers: {
  //     'mysession': sessiondata,
  //     'Authorization': 'Basic ' + hashdata
  //   },
  //   responseType: 'blob', // Set the response type to 'blob' to handle binary data
  //   success: function (data) {
  //     console.log(data);
  //     // Create a URL for the blob data
  //     var binaryData = [];
  //     binaryData.push(data);
  //     const imageUrl = window.URL.createObjectURL(new Blob(binaryData, { type: "image/jpeg" }));
  //     console.log(imageUrl.toString());

  //     // Display the image in an HTML element
  //   },
  //   error: function (error) {
  //     console.error('Error fetching student photo:', error);
  //   }
  // });
}


$('#updateStudentForm').submit(function(event) {
  event.preventDefault(); // Prevent the default form submission
  var sid = getSessionStudentId(); // Implement this function to retrieve the Student ID from the session
  
  var phn = $('#phone_student').val();
        phn = phn.replace(/[^0-9+]/g, "");
        // Remove any prefix like "+88" or "+sth"
        if (phn.startsWith("+88")) {
            phn = phn.slice(3,14);
            console.log(phn);
          }
          // Limit the length to 11 digits
          phn = phn.slice(0, 11);
          console.log(phn);


  // Collect form data
  var formData = {
    phonenumber: phn,
    email: $('#email_student').val(),
    address: $('#address_student').val()
  };
  
  // Create a new FormData object
  var form = new FormData();
  
  // Append form fields to FormData
  for (var key in formData) {
    form.append(key, formData[key]);
  }

  // Append the image file
  form.append('file', $('#profile_image')[0].files[0]);
  console.log(formData);

  // Make an AJAX POST request
  $.ajax({
      url: 'http://localhost:8081/student/update-data/'+sid, // Replace with your backend API endpoint
      type: 'POST',
      headers: {
        'mysession': sessiondata,
        'Authorization': 'Basic ' + hashdata
      },
      data: form,
      processData: false, // Prevent jQuery from processing the data
      contentType: false, // Prevent jQuery from setting the content type
      success: function(response) {
          // Handle the success response from the backen
          alert("Data updated successfully");
          console.log('Data sent successfully:', response);
          window.location.href = "student_dash.html";
      },
      error: function(error) {
          // Handle errors
          console.error('Error sending data:', error);
      }
  });
});


// Call the function to fetch Student's data when the page loads
$(document).ready(function () {
  fetchStudentData();
});