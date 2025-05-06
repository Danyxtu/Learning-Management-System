<?php
session_start();
$author = $_SESSION['user_id'] ?? 1; // Fallback user ID if session is not set

// Database connection
$conn = new mysqli("localhost", "root", "", "ccs_learn");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get inputs
$title = $_POST['postTitle'];
$content = $_POST['postContent'];
$uploadDir = "../uploads/";
$uploadedFiles = [];

// Handle file uploads
if (!empty($_FILES['postFiles']['name'][0])) {
    foreach ($_FILES['postFiles']['name'] as $index => $name) {
        $tmpName = $_FILES['postFiles']['tmp_name'][$index];
        $uniqueName = uniqid() . "_" . basename($name);
        $targetPath = $uploadDir . $uniqueName;

        if (move_uploaded_file($tmpName, $targetPath)) {
            $uploadedFiles[] = $uniqueName;
        }
    }
}

// Convert file list to JSON for DB
$fileListJson = json_encode($uploadedFiles);

// Insert into DB
$stmt = $conn->prepare("INSERT INTO posts (title, content, files, user_id) VALUES (?, ?, ?, ?)");
$stmt->bind_param("sssi", $title, $content, $fileListJson, $author);
if ($stmt->execute()) {
    echo "Post created successfully!";
} else {
    echo "Error: " . $stmt->error;
}
$stmt->close();
$conn->close();

// Optionally redirect or return to previous page
header("Location: ../index.php");
exit;
?>
