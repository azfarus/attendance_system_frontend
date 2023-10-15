// attendance.js

const dataFromBackend = {
    "Student1": ["P", "A", "L"],
    "Student2": ["P", "P", "A"],
    "Student3": ["L", "A", "P"]
};

document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("attendance-table");
    const students = Object.keys(dataFromBackend);

    students.forEach((student) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = student;

        const attendanceData = dataFromBackend[student];
        for (let i = 0; i < 3; i++) {
            const cell = row.insertCell(i + 1);
            cell.textContent = attendanceData[i];
        }

        const todayCell = row.insertCell(4);
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
