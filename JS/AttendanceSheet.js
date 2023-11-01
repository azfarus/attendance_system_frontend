// attendance.js

var dataFromBackend = {
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
var globalcourse;
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
            globalcourse = course.department + course.courseid + course.section;
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



function loadPrevAttendance() {
    const table = document.getElementById("attendance-table");
    const students = Object.keys(dataFromBackend);

    // Get the existing table row by its id
    const headerRow = document.getElementById("start-row");
    const headerCell = document.createElement("th");
    headerCell.textContent = "Student ID";
    headerRow.appendChild(headerCell);

    const headers = dataFromBackend["start"];

    // Populate the table header row with headers
    headers.forEach(headerText => {
        const headerCell = document.createElement("th");
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    students.filter(student => student !== "start").forEach((student) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = student;
        
        const attendanceData = dataFromBackend[student];
            for (let i = 0; i < attendanceData.length ; i++) {
                const cell = row.insertCell(i + 1);
                cell.textContent = attendanceData[i];
                cell.style.fontWeight = "600";
                if(attendanceData[i]=="A"){
                    cell.style.backgroundColor = "#ff1e479e";
                }
                else if(attendanceData[i]=="L"){
                    cell.style.backgroundColor = "#fbff1ea9";
                }
            }
    });
}

var studentIDs = [];

document.addEventListener("DOMContentLoaded", function () {
    $.ajax({
        url: "http://localhost:8081/attendance/prev-attendance/"+hid, // Replace with your backend API endpoint
        method: "GET",
        async: false, // Synchronous request to wait for the response
        headers: {
            'mysession': sessiondata,
            'Authorization': 'Basic ' + hashdata
        },
        data: {
            teacherId: tid
        },
        success: function (response) {
            dataFromBackend=response;
            console.log(dataFromBackend);
            loadPrevAttendance();
        },
            error: function (error) {
          // Handle any errors here
            console.error("Error fetching teacher data:", error.responseText);
        },
    });
    
    // Array of student IDs

// Function to populate student IDs


    function fetchStudentIds(){
        sessiondata = localStorage.getItem("mysession");
        hashdata = localStorage.getItem("myhash");
        $.ajax({
            type: "GET",
            url: "http://localhost:8081/attendance/get-defaulters/"+hid,
            headers: {
                'mysession': sessiondata,
                'Authorization': 'Basic ' + hashdata
            },
            success: function(response) {
                studentIDs=[];
                studentIDs = response;
                populateStudentIDs()
                //alert("got the defaulters.");
            },
            error: function(xhr, status, error) {
                console.error("Error:", error);
                alert("Error sending warning emails.");
            }
        });
    }


    function populateStudentIDs() {
        const studentList = document.getElementById("studentList");
        
        // Check if the studentIDs array is empty.
        if (studentIDs == null || studentIDs.length === 0) {
            EmailBtn = document.getElementById("emailBtn");
            EmailBtn.style.backgroundColor = "#cecece8b";
            EmailBtn.style.cursor = "not-allowed";
            EmailBtn.style.color = "#0000008b";
            EmailBtn.style.transform = "scale(1.0)";
            EmailBtn.textContent = "No students";
            EmailBtn.disabled = true;
        } else {
            // Iterate through the student IDs
            for (let i = 0; i < studentIDs.length; i++) {
                // Create individual student ID elements
                const studentID = document.createElement("div");
                studentID.className = "student-id";
                studentID.textContent = studentIDs[i];
        
                studentList.appendChild(studentID);
            }
        }
    }

    fetchStudentIds();
});

function emailBtnfunc() {
    sessiondata = localStorage.getItem("mysession");
    hashdata = localStorage.getItem("myhash");
    $.ajax({
        type: "POST",
        url: "http://localhost:8081/attendance/send-warning",
        headers: {
            'mysession': sessiondata,
            'Authorization': 'Basic ' + hashdata,
            'Content-Type':'application/json'
        },
        
        data: JSON.stringify(studentIDs),
        success: function(response) {
            alert("Warning emails sent successfully.");
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
            alert("Error sending warning emails.");
        }
    });
}

function sheetSubmitBtn() {
    const table = document.getElementById("attendance-table");
    const rows = table.querySelectorAll("tr");
    let csvContent = "";

    // Iterate through table rows and cells to extract data
    rows.forEach(function (row) {
        const cols = row.querySelectorAll("td");
        let rowData = [];
        cols.forEach(function (col) {
            rowData.push(col.textContent);
        });
        if (rowData.length > 0) {
        csvContent += rowData.join(",") + "\n";
        }
    });

    // Create a Blob with the CSV data
    const blob = new Blob([csvContent], { type: "text/csv" });

    // Create a download link for the Blob
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    const dlink = "attendance-data-" + globalcourse + ".csv";
    link.download = dlink;

    // Trigger a click event on the download link
    link.click();
}

