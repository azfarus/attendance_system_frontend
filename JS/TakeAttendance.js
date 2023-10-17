// AttendanceSheet.js
sessiondata = localStorage.getItem("mysession");
hashdata = localStorage.getItem("myhash");

// Get the current URL
var url = new URL(window.location.href);
// Get the value of the 'hid' query parameter
var hid = url.searchParams.get('hid');
console.log(hid);

let dataFromBackend = {}; // Initialize as an empty object

$.ajax({
    url: 'http://localhost:8081/attendance/get-students', // Replace with the actual API endpoint
    method: 'GET',
    dataType: 'json',
    headers: {
        'mysession': sessiondata,
        'Authorization': 'Basic ' + hashdata
    },
    data: {
        hid: hid
    },
    success: function (data) {
      console.log(data);
      dataFromBackend = data; // Populate dataFromBackend with the fetched data
      displayAttendanceData(); // Call a function to display data after it's fetched
    },
    error: function (error) {
      // Handle any errors
      console.error('Error fetching data:', error);
    }
});

function displayAttendanceData() {
    const table = document.getElementById("attendance-table");

    students = Object.keys(dataFromBackend);

    const attendanceData = {}; // Initialize an object to store attendance data

    students.forEach((studentId) => {
        const row = table.insertRow();

        // Display Student ID in the first column
        row.insertCell(0).textContent = studentId;

        const studentName = dataFromBackend[studentId];

        // Display Student Name in the second column
        row.insertCell(1).textContent = studentName;

        // Create the third column with a single button for P, A, L
        const attendanceCell = row.insertCell(2);

        const button = document.createElement("button");
        button.textContent = "P"; // Set the initial value to "P"
        button.classList.add("P");
        button.value = studentId;
        button.addEventListener("click", toggleAttendance);
        attendanceCell.appendChild(button);

        // Initialize the attendance data object with "P" for each student
        attendanceData[studentId] = "P";
    });

    function toggleAttendance(event) {
        const button = event.target;
        const attendanceStates = ["P", "A", "L"];
        let currentIndex = attendanceStates.indexOf(button.textContent);
        button.classList.remove(attendanceStates[currentIndex]);
        currentIndex = (currentIndex + 1) % attendanceStates.length;
        button.textContent = attendanceStates[currentIndex];
        button.classList.add(attendanceStates[currentIndex]);
        // Update the attendance data object with the new status
        const studentId = button.value;
        attendanceData[studentId] = attendanceStates[currentIndex];
    }

    // Function to submit attendance data
    function submitAttendanceData() {
        $.ajax({
            url: 'http://localhost:8081/attendance/submit-attendance', // Replace with your API endpoint
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(attendanceData),
            headers: {
                'mysession': sessiondata,
                'Authorization': 'Basic ' + hashdata
            },
            success: function (response) {
                console.log(attendanceData);
                console.log('Attendance data submitted successfully:', response);
            },
            error: function (error) {
                console.error('Error submitting attendance data:', error);
            }
        });
    }

    // Attach a click event handler to a submit button
    document.getElementById("sheetSubmitBtn").addEventListener("click", submitAttendanceData);
}

function sheetSubmitBtn() {
    //window.location.href = "teacher_dash.html";
}