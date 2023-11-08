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
    const container = document.getElementById("attendance-container");
    students = Object.keys(dataFromBackend);

    students.forEach((studentId) => {
        const studentBlock = document.createElement("div");
        studentBlock.classList.add("student-block");

        const profileImg = document.createElement("img");
        profileImg.src = "http://" + hostaddr + ":8081/student/get-photo/" + studentId;
        profileImg.classList.add("student-image");
        studentBlock.appendChild(profileImg);

        const studentIDElement = document.createElement("div");
        studentIDElement.textContent = studentId;
        studentIDElement.classList.add("student-id");
        studentBlock.appendChild(studentIDElement);

        const attendanceButton = document.createElement("button");
        attendanceButton.textContent = "P";
        attendanceButton.classList.add("P");
        attendanceButton.value = studentId;
        attendanceButton.addEventListener("click", toggleAttendance);
        studentBlock.appendChild(attendanceButton);

        container.appendChild(studentBlock);
    });

    const studentBlocks = container.querySelectorAll(".student-block");
    studentBlocks.forEach((block) => {
        block.style.display = "inline-block";
        block.style.margin = "10px"; // Adjust the margin as needed
        block.style.textAlign = "center"; // Center-align each block
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
