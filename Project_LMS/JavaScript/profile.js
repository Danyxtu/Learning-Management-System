// Profile page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const profilePicture = document.getElementById('profilePicture');
    const profilePicInput = document.getElementById('profilePicInput');
    const uploadPicBtn = document.getElementById('uploadPicBtn');
    const profileImage = document.getElementById('profileImage');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const passwordFields = document.getElementById('passwordFields');
    const profileForm = document.getElementById('profileForm');
    
    // Handle profile picture click to trigger file input
    profilePicture.addEventListener('click', function() {
        profilePicInput.click();
    });
    
    // Handle upload button click
    uploadPicBtn.addEventListener('click', function() {
        profilePicInput.click();
    });
    
    // Handle file selection for profile picture
    profilePicInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Display the selected image and hide the initial
                profileImage.src = e.target.result;
                profileImage.style.display = 'block';
                document.querySelector('.profile-initial').style.display = 'none';
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Toggle password change fields
    changePasswordBtn.addEventListener('click', function() {
        if (passwordFields.style.display === 'none') {
            passwordFields.style.display = 'block';
            changePasswordBtn.textContent = 'Cancel password change';
        } else {
            passwordFields.style.display = 'none';
            changePasswordBtn.textContent = 'Change password';
            // Clear password fields
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
        }
    });
    
    // Handle form submission
    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate form
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        
        if (!firstName || !lastName || !email) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // If password fields are visible, validate them
        if (passwordFields.style.display !== 'none') {
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (!currentPassword) {
                alert('Please enter your current password.');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('New password and confirmation do not match.');
                return;
            }
            
            if (newPassword && newPassword.length < 6) {
                alert('New password must be at least 6 characters.');
                return;
            }
        }
        
        // Simulate successful form submission
        alert('Profile updated successfully!');
        
        // In a real application, you would send this data to your server
        // using fetch or XMLHttpRequest
    });
    
    // Handle cancel button
    document.querySelector('.cancel-btn').addEventListener('click', function() {
        // Reset form or redirect
        window.location.href = 'index.html';
    });
    
    // Toggle dropdown menu in sidebar
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('active');
        dropdownMenu.classList.toggle('show');
    });
});