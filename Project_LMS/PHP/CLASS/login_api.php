<?php
// Include the Database class
include_once '../API/database.php';

// Create a new Database instance
$database = new Database();
$conn = $database->getConnection();

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Sanitize form data
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);
    $role = htmlspecialchars($_POST['role']); // Get role (student or teacher)

    // Determine the table to check based on role
    if ($role === 'student') {
        $table = 'students';
    } elseif ($role === 'teacher') {
        $table = 'teachers';
    } else {
        echo "Invalid role selected.";
        exit;
    }

    // Prepare SQL query to get user data
    $sql = "SELECT * FROM $table WHERE email = :email LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $email);
    
    // Execute the query
    if ($stmt->execute()) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Check if user exists and verify password
        if ($user && password_verify($password, $user['password'])) {
            // Start session and store user info
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['role'] = $role;
            $_SESSION['email'] = $user['email'];
            
            // Redirect to dashboard or home page
            header("Location: ../main.php"); // Replace with actual dashboard page
            exit();
        } else {
            echo "Invalid credentials. Please try again.";
        }
    } else {
        echo "Error: Could not execute the query.";
    }
}
?>
