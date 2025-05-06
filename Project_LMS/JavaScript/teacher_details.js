//  Sample class data
 const classData = [
  { id: 1, title: "Advanced Web Development", code: "CSIT 323" },
  { id: 2, title: "Database Management", code: "CSIT 227" },
  { id: 3, title: "Programming Fundamentals", code: "CSIT 121" }
];

// Initialize with first class
document.addEventListener("DOMContentLoaded", function() {
  // Populate sidebar class list
  const sidebarClassList = document.getElementById("sidebarClassList");
classData.forEach(cls => {
  const li = document.createElement("li");
  li.classList.add("class-item", "hidden");  // Start hidden
  li.innerHTML = `<a href="#" data-class-id="${cls.id}">${cls.title}</a>`;
  li.addEventListener("click", function(e) {
    e.preventDefault();
    loadClassData(cls);
  });
  sidebarClassList.appendChild(li);
});

const dropdownToggle = document.querySelector(".dropdown-toggle");
dropdownToggle.addEventListener("click", function (e) {
  e.preventDefault();
  const items = document.querySelectorAll(".class-item");
  items.forEach(item => {
    item.classList.toggle("hidden");
  });
});

//   document.addEventListener("DOMContentLoaded", () => {
//   const dropdownToggle = document.querySelector("#classDropdown .dropdown-toggle");
//   const dropdownMenu = document.getElementById("sidebarClassList");

//   dropdownToggle.addEventListener("click", (e) => {
//     e.preventDefault(); // Prevent anchor from jumping
//     dropdownMenu.classList.toggle("show");
//     dropdownToggle.classList.toggle("active"); // Rotate arrow if needed
//   });
// });


  // Load first class by default
  loadClassData(classData[0]);

  // Setup tab switching
  const tabItems = document.querySelectorAll(".tab-item");
  tabItems.forEach(tab => {
    tab.addEventListener("click", function() {
      // Remove active class from all tabs
      tabItems.forEach(t => t.classList.remove("active"));
      // Add active class to clicked tab
      this.classList.add("active");
      
      // Show corresponding tab content
      const tabId = this.getAttribute("data-tab");
      const tabPanes = document.querySelectorAll(".tab-pane");
      tabPanes.forEach(pane => pane.classList.remove("active"));
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Setup file input handlers
  document.getElementById("postFileInput").addEventListener("change", function(e) {
    handleFileSelection(e, "selectedPostFiles");
  });
  
  document.getElementById("materialFileInput").addEventListener("change", function(e) {
    handleFileSelection(e, "selectedMaterialFile", true);
  });
  
  document.getElementById("classworkFileInput").addEventListener("change", function(e) {
    handleFileSelection(e, "selectedClassworkFiles");
  });
  
  document.getElementById("studentListFile").addEventListener("change", function(e) {
    handleFileSelection(e, "selectedStudentFile", true);
  });
});

// Load class data
function loadClassData(classObj) {
  // Update class banner
  document.getElementById("classTitle").textContent = classObj.title;
  document.getElementById("classCode").textContent = classObj.code;
  
  // Update class banner background color (randomly for demo)
  const colors = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#607D8B"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.getElementById("classBanner").style.backgroundColor = randomColor;
}

// Toggle sidebar
function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("show");
}

// Handle file selection
function handleFileSelection(event, containerId, singleFile = false) {
  const files = event.target.files;
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  
  if (files.length === 0) return;
  
  if (singleFile) {
    // Single file mode
    const file = files[0];
    const fileDiv = createFileElement(file);
    container.appendChild(fileDiv);
  } else {
    // Multiple files mode
    for (let i = 0; i < files.length; i++) {
      const fileDiv = createFileElement(files[i]);
      container.appendChild(fileDiv);
    }
  }
}

// Create file element
function createFileElement(file) {
  const fileDiv = document.createElement("div");
  fileDiv.className = "selected-file";
  
  // Determine icon based on file type
  let iconClass = "fa-file";
  if (file.type.includes("image")) iconClass = "fa-file-image";
  else if (file.type.includes("pdf")) iconClass = "fa-file-pdf";
  else if (file.type.includes("word")) iconClass = "fa-file-word";
  else if (file.type.includes("excel") || file.type.includes("sheet")) iconClass = "fa-file-excel";
  else if (file.type.includes("zip") || file.type.includes("rar")) iconClass = "fa-file-archive";
  
  fileDiv.innerHTML = `
    <i class="fa ${iconClass}"></i>
    <span>${file.name} (${formatFileSize(file.size)})</span>
  `;
  
  return fileDiv;
}

// Format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Modal functions
function openAddPostModal() {
  document.getElementById("addPostModal").style.display = "flex";
}

function openAddMaterialModal(type) {
  const title = type === 'lesson' ? 'Add Lesson Material' : 'Add Official Document';
  document.getElementById("materialModalTitle").textContent = title;
  document.getElementById("addMaterialModal").style.display = "flex";
}

function openAddClassworkModal() {
  document.getElementById("addClassworkModal").style.display = "flex";
}

function openAddStudentModal() {
  document.getElementById("addStudentModal").style.display = "flex";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Submit functions
function submitPost() {
  // Get form values
  const title = document.getElementById("postTitle").value;
  const content = document.getElementById("postContent").value;
  
  // Basic validation
  if (!title || !content) {
    showNotification("Please fill in all required fields", "error");
    return;
  }
  
  // In a real application, you would send this data to a server
  // Here we'll just show a success message and close the modal
  showNotification("Post created successfully!");
  closeModal("addPostModal");
  
  // Reset form
  document.getElementById("postTitle").value = "";
  document.getElementById("postContent").value = "";
  document.getElementById("selectedPostFiles").innerHTML = "";
}

function submitMaterial() {
  // Get form values
  const title = document.getElementById("materialTitle").value;
  
  // Basic validation
  if (!title) {
    showNotification("Please enter a material title", "error");
    return;
  }
  
  // In a real application, you would send this data to a server
  // Here we'll just show a success message and close the modal
  showNotification("Material uploaded successfully!");
  closeModal("addMaterialModal");
  
  // Reset form
  document.getElementById("materialTitle").value = "";
  document.getElementById("materialDescription").value = "";
  document.getElementById("selectedMaterialFile").innerHTML = "";
}

function submitClasswork() {
  // Get form values
  const title = document.getElementById("classworkTitle").value;
  const instructions = document.getElementById("classworkInstructions").value;
  
  // Basic validation
  if (!title || !instructions) {
    showNotification("Please fill in all required fields", "error");
    return;
  }
  
  // In a real application, you would send this data to a server
  // Here we'll just show a success message and close the modal
  showNotification("Classwork created successfully!");
  closeModal("addClassworkModal");
  
  // Reset form
  document.getElementById("classworkTitle").value = "";
  document.getElementById("classworkInstructions").value = "";
  document.getElementById("classworkDueDate").value = "";
  document.getElementById("classworkPoints").value = "";
  document.getElementById("selectedClassworkFiles").innerHTML = "";
}

function addStudent() {
  // Get form values
  const email = document.getElementById("studentEmail").value;
  const file = document.getElementById("studentListFile").files[0];
  
  // Basic validation
  if (!email && !file) {
    showNotification("Please enter an email or upload a file", "error");
    return;
  }
  
  // In a real application, you would send this data to a server
  // Here we'll just show a success message and close the modal
  showNotification("Student(s) added successfully!");
  closeModal("addStudentModal");
  
  // Reset form
  document.getElementById("studentEmail").value = "";
  document.getElementById("selectedStudentFile").innerHTML = "";
}

// Confirmation dialog for removing students
let studentToRemove = null;

function confirmRemoveStudent(studentId, studentName) {
  studentToRemove = studentId;
  document.getElementById("dialogMessage").textContent = `Are you sure you want to remove ${studentName} from this class?`;
  document.getElementById("confirmDialog").style.display = "flex";
  
  // Set up confirm button
  document.getElementById("confirmButton").onclick = function() {
    removeStudent();
  };
}

function cancelRemoveStudent() {
  studentToRemove = null;
  document.getElementById("confirmDialog").style.display = "none";
}

function removeStudent() {
  if (studentToRemove) {
    // In a real application, you would send this data to a server
    // Here we'll just remove the element from the DOM
    const studentElement = document.getElementById(studentToRemove);
    if (studentElement) {
      studentElement.remove();
      
      // Update student count
      const studentCount = document.querySelectorAll(".people-section .person-item").length - 1; // Subtract 1 for instructor
      document.getElementById("studentCount").textContent = `${studentCount} students`;
      
      showNotification("Student removed successfully!");
    }
  }
  
  // Close dialog
  cancelRemoveStudent();
}

// Notification
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.backgroundColor = type === "success" ? "#4CAF50" : "#f44336";
  notification.classList.add("show");
  
  // Hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

function openAddMaterialModal(type) {
  const title = type === 'lesson' ? 'Add Lesson Material' : 'Add Official Document';
  document.getElementById("materialModalTitle").textContent = title;
  document.getElementById("addMaterialModal").style.display = "flex";
}



// Display the file info after selecting it
function displayUploadedFile(event) {
  const file = event.target.files[0];
  const fileDisplay = document.getElementById('fileDisplay');
  
  if (file) {
      const fileDiv = document.createElement('div');
      fileDiv.classList.add('file-info');
      
      let iconClass = "fa-file";
      if (file.type.includes("image")) iconClass = "fa-file-image";
      else if (file.type.includes("pdf")) iconClass = "fa-file-pdf";
      else if (file.type.includes("word")) iconClass = "fa-file-word";
      else if (file.type.includes("excel") || file.type.includes("sheet")) iconClass = "fa-file-excel";
      
      fileDiv.innerHTML = `
          <i class="fa ${iconClass}"></i>
          <span>${file.name} (${formatFileSize(file.size)})</span>
      `;
      
      // Show the uploaded file info
      fileDisplay.style.display = 'block';
      fileDisplay.innerHTML = ''; // Clear any previous file info
      fileDisplay.appendChild(fileDiv);
  }
}

// Format the file size
function formatFileSize(bytes) {
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Handle form submission with AJAX
document.getElementById('uploadMaterialForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(this); // Collect form data (including file)
  const uploadStatus = document.getElementById('uploadStatus');

  // Show a loading message while uploading
  uploadStatus.style.display = 'block';
  uploadStatus.style.color = 'blue';
  uploadStatus.textContent = 'Uploading...';

  // Send the form data using AJAX
  fetch('PHP/upload_material.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.status === 'success') {
          uploadStatus.style.color = 'green';
          uploadStatus.textContent = 'File successfully uploaded!';
      } else {
          uploadStatus.style.color = 'red';
          uploadStatus.textContent = 'Error: ' + data.message;
      }
  })
  .catch(error => {
      uploadStatus.style.color = 'red';
      uploadStatus.textContent = 'Error uploading file: ' + error.message;
  });
});




// for student modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

function submitClasswork() {
  const formData = new FormData();
  formData.append("classworkType", document.getElementById("classworkType").value);
  formData.append("classworkTitle", document.getElementById("classworkTitle").value);
  formData.append("classworkInstructions", document.getElementById("classworkInstructions").value);
  formData.append("classworkDueDate", document.getElementById("classworkDueDate").value);
  formData.append("classworkPoints", document.getElementById("classworkPoints").value);

  const files = document.getElementById("classworkFileInput").files;
  for (let i = 0; i < files.length; i++) {
      formData.append("classworkFiles[]", files[i]);
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../PHP/upload_classwork.php", true);
  xhr.onload = function () {
      console.log(xhr.status);
      console.log(xhr.responseText);

      if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          if (response.status === 'success') {
              alert('Classwork created successfully!');
              closeModal('addClassworkModal');
          } else {
              alert('Server error: ' + response.message);
          }
      } else {
          alert('Error creating classwork. Please try again.');
      }
  };
  xhr.send(formData);
  xhr.onload = function () {
    console.log(xhr.status);               // Status code
    console.log(xhr.responseText);        // Full response text
    try {
        const res = JSON.parse(xhr.responseText);
        if (res.status === 'success') {
            alert('Classwork created successfully!');
            closeModal('addClassworkModal');
        } else {
            alert('Error: ' + res.message);
        }
    } catch (e) {
        alert('Server error. Invalid response.');
    }
};

}

