<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LOGIN</title>
    <link rel="icon" href="../Project_LMS/IMAGE/ccs-logo.png" type="image/x-icon/jpeg/png" />
    <link rel="stylesheet" href="../Project_LMS/CSS/login.css" />
</head>

<body>
    <!-- Left side with background image -->
    <div class="background-container">
        <!-- No content -->
    </div>

    <!-- Right side with login form -->
    <div class="login-container">
        <!-- Logo -->
        <img src="../Project_LMS/IMAGE/ccs-logo.png" alt="CCS Logo" class="logo" />

        <!-- Main title -->
        <div class="title">
            <h1>CCS Learn:</h1>
            <h2>Your Digital Classroom</h2>
        </div>

        <!-- Role selection section -->
        <div class="role-selection">
            <p>Choose your role</p>

            <!-- Role options container -->
            <div class="role-options">
                <!-- Student role button -->
                <label class="role-button">
                    <input type="radio" name="role" value="student" id="roleStudent" />
                    <div class="role-card">
                        <div class="role-icon">
                            <img src="IMAGE/student-role.png" alt="Student Icon" />
                        </div>
                        <p>Student</p>
                    </div>
                </label>

                <!-- Teacher role button -->
                <label class="role-button">
                    <input type="radio" name="role" value="teacher" id="roleTeacher" />
                    <div class="role-card">
                        <div class="role-icon teacher-icon">
                            <img src="IMAGE/teacher-role.png" alt="Teacher Icon" />
                        </div>
                        <p>Teacher</p>
                    </div>
                </label>
            </div>
        </div>

        <!-- Login form -->
        <form class="login-form" action="../Project_LMS/PHP/CLASS/login_api.php" method="POST">
            <!-- Hidden input for selected role -->
            <input type="hidden" name="role" id="selectedRole" value="student" />

            <!-- Email input -->
            <input type="email" id="email" name="email" placeholder="Email" pattern="^[a-zA-Z0-9._%+-]+@wmsu\.edu\.ph$" required />

            <!-- Password input -->
            <input type="password" name="password" placeholder="Password" required />

            <!-- Login button -->
            <button type="submit" class="login-btn">LOG IN</button>

            <!-- Additional links -->
            <div class="form-links">
                <a href="createacc.html" class="create-account">Create an Account</a>
                <a href="forgotpass.html" class="forgot-password">Forgot Password?</a>
            </div>
        </form>
    </div>

    <!-- JavaScript to handle form submission -->
    <script>
        // Event listener for role selection
        document.getElementById('roleStudent').addEventListener('click', function() {
            document.getElementById('selectedRole').value = 'student';  // Update hidden input value to 'student'
        });

        document.getElementById('roleTeacher').addEventListener('click', function() {
            document.getElementById('selectedRole').value = 'teacher';  // Update hidden input value to 'teacher'
        });

        // Event listener for form submission
        document.querySelector('form').addEventListener('submit', function (e) {
            const email = document.getElementById('email').value;
            const role = document.querySelector('input[name="role"]:checked');
            
            // Ensure role is selected
            if (!role) {
                alert('Please choose your role.');
                e.preventDefault();
                return;
            }

            // Set hidden role field
            document.getElementById('selectedRole').value = role.value;

            // Validate email domain
            if (!email.endsWith('@wmsu.edu.ph')) {
                alert('Please use your @wmsu.edu.ph email address.');
                e.preventDefault();
            }
        });
    </script>
</body>

</html>
