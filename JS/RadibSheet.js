// attendance.js

const dataFromBackend = {
    "Student1": {
        "L1": "P",
        "L2": "A",
        "L3": "L"
    },
    "Student2": {
        "L1": "P",
        "L2": "P",
        "L3": "A"
    },
    "Student3": {
        "L1": "L",
        "L2": "A",
        "L3": "P"
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("attendance-table");
    const students = Object.keys(dataFromBackend);

    students.forEach((student) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = student;

        const attendanceData = dataFromBackend[student];
        const columns = ["L1", "L2", "L3", "Today"];

        columns.forEach((column, index) => {
            const cell = row.insertCell(index + 1);
            const button = document.createElement("button");
            button.textContent = attendanceData[column] || "P"; // Set initial value from JSON data or default to "P"
            button.id = student;
            button.classList.add(attendanceData[column] || "P"); // Assign class based on initial status or default to "P"
            button.addEventListener("click", toggleAttendance);
            cell.appendChild(button);
        });
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
