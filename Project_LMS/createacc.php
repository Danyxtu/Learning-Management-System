<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Page title -->
    <title>Create Account - CCS Learn</title>
    <!-- Favicon for the browser tab -->
    <link
        rel="icon"
        href="IMAGE/ccs-logo.png"
        type="image/x-icon/jpeg/png" />
    <!-- Link to the external CSS file -->
    <link rel="stylesheet" href="CSS/createacc.css" />
</head>

<body>
    <!-- Left side with background image -->
    <div class="background-container">
        <!-- Background image is set in CSS -->
    </div>

    <!-- Right side with create account form -->
    <div class="form-container">
        <!-- Logo -->
        <img src="IMAGE/ccs-logo.png" alt="CCS Logo" class="logo" />

        <!-- Main title -->
        <div class="title">
            <h1>Create your account</h1>
        </div>

        <!-- Role selection section -->
        <div class="role-selection">
            <p>Choose your role</p>

            <!-- Role options container -->
            <div class="role-options">
                <!-- Student role button -->
                <div class="role-option" data-role="student">
                    <div class="role-card">
                        <div class="role-icon student-icon">
                            <img
                                src="IMAGE/student-role.png"
                                alt="Student Icon" />
                        </div>
                        <p>Student</p>
                    </div>
                </div>

                <!-- Teacher role button -->
                <div class="role-option" data-role="teacher">
                    <div class="role-card">
                        <div class="role-icon teacher-icon">
                            <img
                                src="IMAGE/teacher-role.png"
                                alt="Teacher Icon" />
                        </div>
                        <p>Teacher</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Create account form -->
        <form class="signup-form" action="../Project_LMS/PHP/CLASS/signup_api.php" method="POST" id="signupForm">
            <!-- Hidden input for selected role -->
            <input type="hidden" name="selectedRole" id="selectedRole" value="" />

            <!-- Email input -->
            <input type="email" placeholder="Email" name="email" required class="full-width" />

            <!-- Name inputs - row with two columns -->
            <div class="input-row">
                <input type="text" placeholder="First Name" name="firstName" required />
                <input class="lastname" type="text" name="lastName" placeholder="Last Name" required />
            </div>

            <!-- Password input -->
            <input type="password" placeholder="Password" name="password" required class="full-width" />

            <!-- Confirm Password input -->
            <input type="password" placeholder="Confirm Password" name="confirmPassword" required class="full-width" />

            <!-- Submit button -->
            <button type="submit" class="submit-btn">Create Account</button>

            <!-- Login link -->
            <p class="login-link">
                Already have an account? <a href="login.html">Log in</a>
            </p>
        </form>
    </div>

    <script src="../Project_LMS/JavaScript/signup.js"></script>
</body>

</html>
