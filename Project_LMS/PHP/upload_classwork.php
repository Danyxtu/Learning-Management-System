<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database connection
$host = 'localhost';
$db = 'CCS_Learn';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed']));
}

// Get POST data
$classworkType = $_POST['classworkType'] ?? '';
$classworkTitle = $_POST['classworkTitle'] ?? '';
$classworkInstructions = $_POST['classworkInstructions'] ?? '';
$classworkDueDate = $_POST['classworkDueDate'] ?? '';
$classworkPoints = $_POST['classworkPoints'] ?? null;

// Basic validation
if (empty($classworkTitle) || empty($classworkType) || empty($classworkDueDate)) {
    echo json_encode(['status' => 'error', 'message' => 'Required fields are missing']);
    exit;
}

// Handle file uploads
$uploadedFiles = [];
$uploadDir = 'uploads/classwork_files/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if (!empty($_FILES['classworkFiles']['name'][0])) {
    foreach ($_FILES['classworkFiles']['tmp_name'] as $index => $tmpName) {
        $originalName = basename($_FILES['classworkFiles']['name'][$index]);
        $targetPath = $uploadDir . time() . '_' . $originalName;
        
        if (move_uploaded_file($tmpName, $targetPath)) {
            $uploadedFiles[] = $targetPath;
        }
    }
}

// Convert file paths to JSON to store in DB
$filePathsJson = json_encode($uploadedFiles);

// Insert into database
$stmt = $conn->prepare("INSERT INTO classworks (type, title, instructions, due_date, points, attachments) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssis", $classworkType, $classworkTitle, $classworkInstructions, $classworkDueDate, $classworkPoints, $filePathsJson);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Classwork created']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Database insert failed']);
}

$stmt->close();
$conn->close();
?>
