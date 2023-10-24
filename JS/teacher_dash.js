$(document).ready(function () {
  // Get session data and hash from local storage
  const sessiondata = localStorage.getItem("mysession");
  const hashdata = localStorage.getItem("myhash");

  // Function to check if the user is authenticated
  function checkAuthentication() {
    $.ajax({
      url: "http://localhost:8081/session/get-session-data",
      method: "GET",
      headers: {
        'mysession': sessiondata,
        'Authorization': 'Basic ' + hashdata
      },
      success: function () {
        // User is authenticated
        fetchTeacherData();
      },
      error: function () {
        // Handle authentication error by redirecting to the login page
        window.location.href = "login.html";
      },
    });
  }

  // Function to fetch the teacher's ID from the session
  function getSessionTeacherId() {
    let teacherId = null;

    $.ajax({
      url: "http://localhost:8081/session/get-session-data",
      method: "GET",
      async: false,
      headers: {
        'mysession': sessiondata,
        'Authorization': 'Basic ' + hashdata
      },
      success: function (data) {
        teacherId = data;
      },
      error: function () {
        console.error("Error fetching teacher ID");
      },
    });

    return teacherId;
  }

  // Function to fetch teacher data and populate the dashboard
  function fetchTeacherData() {
    const teacherId = getSessionTeacherId();
    const profilePicture = document.getElementById("profilePicture");
    profilePicture.src = "http://localhost:8081/teacher/get-photo/" + teacherId;

    $.ajax({
      url: "http://localhost:8081/teacher/info",
      method: "GET",
      headers: {
        'mysession': sessiondata,
        'Authorization': 'Basic ' + hashdata
      },
      data: {
        teacherid: teacherId
      },
      success: function (teacherData) {
        populateTeacherDashboard(teacherData);
      },
      error: function (error) {
        console.error("Error fetching teacher data:", error.responseText);
      },
    });

    $.ajax({
      url: "http://localhost:8081/teacher/sheets",
      method: "GET",
      headers: {
        'mysession': sessiondata,
        'Authorization': 'Basic ' + hashdata
      },
      data: {
        teacherId: teacherId
      },
      success: function (teacherCourses) {
        renderCourseBlocks(teacherCourses);
      },
      error: function (error) {
        console.error("Error fetching teacher data:", error.responseText);
      },
    });
  }

  // Function to populate the teacher's dashboard
  function populateTeacherDashboard(teacherData) {
    $("#t_id").text(teacherData.id);
    $("#t_name").text(teacherData.name);
    $("#t_mail").text(teacherData.email);
  }

  // Function to render course blocks
  function renderCourseBlocks(courses) {
    const courseBlocks = document.querySelector(".course-blocks");

    courses.forEach(course => {
      const courseBlock = createCourseBlock(course);
      courseBlocks.appendChild(courseBlock);
    });
  }

  // Function to create a course block
  function createCourseBlock(course) {
    const courseBlock = document.createElement("div");
    courseBlock.className = "course";

    const courseCode = document.createElement("div");
    courseCode.className = "course-code";
    courseCode.textContent = `${course.department} ${course.courseid} - ${course.section}`;

    const courseName = document.createElement("div");
    courseName.className = "course-name";
    courseName.textContent = course.coursename;
    courseName.style.color = "#fff398";

    const viewSheetButton = createButton("View Sheet", course.hid, redirectToSheet);
    const takeAttendanceButton = createButton("Take Attendance", course.hid, redirectToAttendance);

    courseBlock.appendChild(courseCode);
    courseBlock.appendChild(courseName);
    courseBlock.appendChild(viewSheetButton);
    courseBlock.appendChild(takeAttendanceButton);

    return courseBlock;
  }

  // Function to create a button element
  function createButton(label, value, clickHandler) {
    const button = document.createElement("button");
    button.textContent = label;
    button.style.fontWeight = "500";
    button.value = value;
    button.addEventListener("click", clickHandler);
    return button;
  }

  // Event listener to handle profile picture upload
  const profilePictureInput = document.getElementById("profilePictureInput");
  profilePicture.addEventListener("click", () => profilePictureInput.click());

  profilePictureInput.addEventListener("change", handleProfilePictureUpload);

  function handleProfilePictureUpload() {
    const selectedFile = profilePictureInput.files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const uploadUrl = `http://localhost:8081/teacher/upload-photo/${getSessionTeacherId()}`;

      $.ajax({
        url: uploadUrl,
        type: "POST",
        headers: {
          'mysession': sessiondata,
          'Authorization': 'Basic ' + hashdata
        },
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
          if (data && data > 0) {
            alert("Photo uploaded successfully.");
          } else {
            alert("Failed to upload photo.");
          }
        },
        error: function (error) {
          console.error("Error uploading photo:", error);
        },
      });

      const reader = new FileReader();
      reader.onload = function (e) {
        profilePicture.src = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  function redirectToSheet(event) {
    const hid = event.target.value;
    window.location.href = "AttendanceSheet.html?hid=" + hid;
  }

  function redirectToAttendance(event) {
    const hid = event.target.value;
    window.location.href = "TakeAttendance.html?hid=" + hid;
  }

  // Check user authentication on page load
  checkAuthentication();
});
