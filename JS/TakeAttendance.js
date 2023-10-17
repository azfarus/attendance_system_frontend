// AttendanceSheet.js
const dataFromBackend = {
    200041122: "Radib Bin Kabir",
    200041101: "Abu Hena Shadid",
    200041102: "Tawsif Dipto",
    200041103: "Jarin Hridy",
    200041104: "Helo Abrar",
    200041105: "Rahim Abrar",
    200041106: "Asif Abrar",
    200041107: "Desi Abrar",
    200041108: "Bidesi Abrar",
    200041109: "Kamrul Abrar",
    200041110: "Ayman Abrar",
    200041111: "Karim Abrar",
    200041142: "Sami Shajeed",
    200041113: "Ehsanul Haque",
    200041114: "Tanbir Choudhury",
    200041144: "Tanvir Dihan",
    200041116: "Iftekhar Ifty",
    200041126: "Abdullah",
    200041139: "Zannatul Samarukh",
    200041119: "Samin Yeasir",
    200041120: "Arian Inan",
    200041121: "Shofiq Kaiser",
    200041130: "Samnun Azfar",
};


document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("attendance-table");
    const students = Object.keys(dataFromBackend);

    students.forEach((student) => {
        const row = table.insertRow();

        // Display Student ID in the first column
        row.insertCell(0).textContent = student;

        const studentName = dataFromBackend[student];

        // Display Student Name in the second column
        row.insertCell(1).textContent = studentName;

        // Create the third column with a single button for P, A, L
        const attendanceCell = row.insertCell(2);

        const button = document.createElement("button");
        button.textContent = "P"; // Set the initial value to "P"
        button.classList.add("P");
        button.addEventListener("click", toggleAttendance);
        attendanceCell.appendChild(button);
    });

    function toggleAttendance(event) {
        const button = event.target;
        const attendanceStates = ["P", "A", "L"];
        let currentIndex = attendanceStates.indexOf(button.textContent);
        currentIndex = (currentIndex + 1) % attendanceStates.length;
        button.textContent = attendanceStates[currentIndex];

        // Remove existing class and add class based on the new status
        button.classList.remove("P", "A", "L");
        button.classList.add(attendanceStates[currentIndex]);
    }
});

function sheetSubmitBtn() {
    window.location.href = "teacher_dash.html";
}
