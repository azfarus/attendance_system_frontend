// Function to clear all radios
function clearAllRadios() {
    const allRadios = document.querySelectorAll('input[type="radio"]');
    allRadios.forEach((radio) => {
        radio.checked = false;
    });
}

// Add an onload event to clear all radios when the page loads
window.onload = function() {
    clearAllRadios();
};

// Function to clear radios in the same row except the clicked one
function clearOtherOptions(radios, currentRadio) {
    const row = currentRadio.closest('tr'); // Find the row containing the clicked radio
    radios.forEach((radio) => {
        if (radio !== currentRadio && radio.closest('tr') === row) {
            radio.checked = false; // Uncheck radios in the same row except the clicked one
        }
    });
}

const attendanceRadios = document.querySelectorAll('.attendance-radio');
const lateRadios = document.querySelectorAll('.late-radio');
const absentRadios = document.querySelectorAll('.absent-radio');
const toggleAllPresentButton = document.getElementById('toggle-all-present');
const toggleAllAbsentButton = document.getElementById('toggle-all-absent');

attendanceRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
        clearOtherOptions(lateRadios, radio);
        clearOtherOptions(absentRadios, radio);
    });
});

lateRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
        clearOtherOptions(attendanceRadios, radio);
        clearOtherOptions(absentRadios, radio);
    });
});

absentRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
        clearOtherOptions(attendanceRadios, radio);
        clearOtherOptions(lateRadios, radio);
    });
});

toggleAllPresentButton.addEventListener('click', () => {
    // Set all attendance radios to "Present" in the same row
    attendanceRadios.forEach((radio) => {
        if (true) {
            const row = radio.closest('tr');
            const attendanceRadio = row.querySelector('.attendance-radio');
            attendanceRadio.checked = true;
            console.log("Hello");
        }
        
    });
    // Clear all late radios and absent radios
    lateRadios.forEach((radio) => {
        radio.checked = false;
    });
    absentRadios.forEach((radio) => {
        radio.checked = false;
    });
});

toggleAllAbsentButton.addEventListener('click', () => {
    // Set all attendance radios to "Absent" in the same row
    attendanceRadios.forEach((radio) => {
        if (radio.checked) {
            const row = radio.closest('tr');
            const attendanceRadio = row.querySelector('.attendance-radio');
            attendanceRadio.checked = false;
        }
    });
    // Clear all late radios and select "Absent" for all attendees
    lateRadios.forEach((radio) => {
        radio.checked = false;
    });
    absentRadios.forEach((radio) => {
        radio.checked = true;
    });
});