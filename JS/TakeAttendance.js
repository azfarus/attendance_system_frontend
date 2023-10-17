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
    "200041139": ["Zannatul Samarukh","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041119": ["Samin Yeasir","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041120": ["Arian Inan","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041121": ["Shofiq Kaiser","P", "P", "A","P","P","P","P","P","P","P","P","P","P"],
    "200041130": ["Samnun Azfar","L", "A", "P","P","P","P","P","P","P","P","P","P","P"]
};

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

        const todayCell = row.insertCell(15);
        const button = document.createElement("button");
        button.textContent = 'P'; // Set initial value from JSON data
        button.id = student;
        button.classList.add('P'); // Assign class based on initial status
        button.addEventListener("click", toggleAttendance);
        todayCell.appendChild(button);
    });

    function toggleAttendance(event) {
        const studentId = event.target.id;
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

