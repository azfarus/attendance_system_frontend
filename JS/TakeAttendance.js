// AttendanceSheet.js

hostaddr=localStorage.getItem('host');


sessiondata = localStorage.getItem("mysession");
hashdata = localStorage.getItem("myhash");

// Get the current URL
var url = new URL(window.location.href);
// Get the value of the 'hid' query parameter
var hid = url.searchParams.get('hid');
console.log(hid);

let dataFromBackend = {}; // Initialize as an empty object

function getSessionTeacherId() {
    var teacherid = null;

    sessiondata = localStorage.getItem("mysession");
    hashdata = localStorage.getItem("myhash");
    // Make an AJAX GET request to fetch the teacher's ID from the session
    $.ajax({
        url: "http://"+hostaddr+":8081/session/get-session-data", // Replace with your backend API endpoint
        method: "GET",
        async: false, // Synchronous request to wait for the response
        headers: {
            'mysession': sessiondata,
            'Authorization': 'Basic ' + hashdata
            },
        success: function (data) {
            teacherid = data; // Store the teacher's ID
            },
        error: function () {
            console.error("Error fetching teacher ID");
            },
    });
    return teacherid;
}

var tid = getSessionTeacherId();
console.log(tid);
// Make an AJAX request to fetch the teacher's data
$.ajax({
    url: "http://"+hostaddr+":8081/teacher/sheets", // Replace with your backend API endpoint
    method: "GET",
    async: false, // Synchronous request to wait for the response
    headers: {
        'mysession': sessiondata,
        'Authorization': 'Basic ' + hashdata
    },
    data: {
        teacherId: tid
    },
    success: function (teacherCourses) {

    const currentDate = new Date();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const formattedDate = currentDate.getDate() + ' ' + months[currentDate.getMonth()] + ' ' + currentDate.getFullYear();

    console.log(teacherCourses);
    const hidToMatch = hid;
    for (const course of teacherCourses) {
        if (course.hid == hidToMatch) {
            document.getElementById('courseCode').textContent = course.department +" "+ course.courseid +" "+course.section;
            document.getElementById('courseName').textContent = course.coursename;
            document.getElementById("courseDate").textContent = formattedDate;
                break;
            }
        }
    },
        error: function (error) {
      // Handle any errors here
        console.error("Error fetching teacher data:", error.responseText);
    },
});



$.ajax({
    url: 'http://'+hostaddr+':8081/attendance/get-students',
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

        const imgCell = row.insertCell(2);
        const img = document.createElement("img");
        img.src = "http://"+hostaddr+":8081/student/get-photo/" + studentId;
        img.classList.add("student-image");
        imgCell.appendChild(img);

        // Create the third column with a single button for P, A, L
        const attendanceCell = row.insertCell(3);
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
            url: 'http://'+hostaddr+':8081/attendance/submit-attendance/'+hid, // Replace with your API endpoint
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(attendanceData),
            headers: {
                'mysession': sessiondata,
                'Authorization': 'Basic ' + hashdata
            },
            success: function (response) {
                console.log(attendanceData);
                alert('Attendance Taken Successfully:', response);
                window.location.href = "teacher_dash.html";
            },
            error: function (error) {
                console.error('Error submitting attendance data:', error);
            }
        });
    }

    // Attach a click event handler to a submit button
    document.getElementById("sheetSubmitBtn").addEventListener("click", submitAttendanceData);
}

const toggleImagesButton = document.getElementById('toggleImages');
let imagesVisible = false;

toggleImagesButton.addEventListener('click', function () {
    console.log('Toggle images button clicked');
    const table = document.getElementById("attendance-table");
    const columnIndex = 2;

    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const cell = row.cells[columnIndex];

        if (imagesVisible) {
            cell.style.display = "none";
        } else {
            // Show the image cell in each row
            cell.style.display = "table-cell";
        }
    }
    imagesVisible = !imagesVisible; // Toggle the visibility state
});
