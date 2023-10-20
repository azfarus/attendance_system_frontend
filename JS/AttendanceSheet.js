// attendance.js

const dataFromBackend = {
    "200041122": ["Radib Bin Kabir","P", "A", "L","P","P","P","P","P","P","P","P","P","P"],
    "200041101": ["Abu Hena Shadid","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041102": ["Tawsif Dipto","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041103": ["Jarin Hridy","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041104": ["Helo Abrar","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041105": ["Rahim Abrar","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041106": ["Asif Abrar","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041107": ["Desi Abrar","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041108": ["Bidesi Abrar","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041109": ["Kamrul Abrar","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041110": ["Ayman Abrar","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041111": ["Karim Abrar","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041142": ["Sami Shajeed","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041113": ["Ehsanul Haque","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041114": ["Tanbir Choudhury","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041144": ["Tanvir Dihan","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041116": ["Iftekhar Ifty","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041126": ["Abdullah","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041139": ["Mosammat Zannatul Samarukh","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041119": ["Samin Yeasir","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041120": ["Arian Inan","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041121": ["Shofiq Kaiser","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041130": ["Samnun Azfar","L", "A", "P","P","P","P","P","P","P","P","P","P","P"]
};

// Get the current URL
var url = new URL(window.location.href);
// Get the value of the 'hid' query parameter
var hid = url.searchParams.get('hid');
console.log(hid);

function getSessionTeacherId() {
    var teacherid = null;

    sessiondata = localStorage.getItem("mysession");
    hashdata = localStorage.getItem("myhash");
    // Make an AJAX GET request to fetch the teacher's ID from the session
    $.ajax({
        url: "http://localhost:8081/session/get-session-data", // Replace with your backend API endpoint
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
    url: "http://localhost:8081/teacher/sheets", // Replace with your backend API endpoint
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
    console.log(teacherCourses);
    const hidToMatch = hid;
    for (const course of teacherCourses) {
        if (course.hid == hidToMatch) {
            document.getElementById('courseCode').textContent = course.department +" "+ course.courseid +" "+course.section;
            document.getElementById('courseName').textContent = course.coursename;
            break;
        }
    }
    },
        error: function (error) {
      // Handle any errors here
        console.error("Error fetching teacher data:", error.responseText);
    },
});


document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("attendance-table");
    const students = Object.keys(dataFromBackend);

    students.forEach((student) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = student;

        const attendanceData = dataFromBackend[student];
        for (let i = 0; i < 14; i++) {
            const cell = row.insertCell(i + 1);
            cell.textContent = attendanceData[i];
        }
    });
});

function sheetSubmitBtn() {
    window.location.href = "teacher_dash.html";
}

