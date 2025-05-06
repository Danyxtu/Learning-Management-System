<?php
// Database connection settings
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "ccs_learn"; // Replace with your actual database name

$conn = mysqli_connect($host, $user, $pass, $dbname);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Assume user_id is from session
// session_start();
// if (!isset($_SESSION['user_id'])) {
//   die("User not logged in.");
// }
// $user_id = $_SESSION['user_id'];

// Handle POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $title = mysqli_real_escape_string($conn, $_POST['materialTitle']);
  $description = mysqli_real_escape_string($conn, $_POST['materialDescription'] ?? '');

  // Handle file upload
  if (isset($_FILES['materialFile']) && $_FILES['materialFile']['error'] == 0) {
    $fileName = basename($_FILES["materialFile"]["name"]);
    $fileTmp = $_FILES["materialFile"]["tmp_name"];

    $targetDir = "../uploads/materials/";
    if (!is_dir($targetDir)) {
      mkdir($targetDir, 0777, true);
    }

    $newFileName = time() . "_" . $fileName;
    $filePath = $targetDir . $newFileName;

    if (move_uploaded_file($fileTmp, $filePath)) {
      // Save relative path to DB (remove "../" if needed depending on your structure)
      $relativePath = "uploads/materials/" . $newFileName;

      $sql = "INSERT INTO materials (title, description, file_path, user_id)
                    VALUES ('$title', '$description', '$relativePath', '$user_id')";

      if (mysqli_query($conn, $sql)) {
        echo "Material uploaded successfully!";
      } else {
        echo "Database error: " . mysqli_error($conn);
      }
    } else {
      echo "File upload failed.";
    }
  } else {
    echo "No file uploaded or file error.";
  }
}

mysqli_close($conn);
