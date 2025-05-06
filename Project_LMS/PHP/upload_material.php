<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check if file is uploaded
    if (isset($_FILES['materialFile']) && $_FILES['materialFile']['error'] == 0) {
        // Get file details
        $fileTmpPath = $_FILES['materialFile']['tmp_name'];
        $fileName = $_FILES['materialFile']['name'];
        $fileSize = $_FILES['materialFile']['size'];
        $fileType = $_FILES['materialFile']['type'];
        
        // Define upload directory (Make sure the directory exists and is writable)
        $uploadDir = 'uploads/';
        $destination = $uploadDir . basename($fileName);

        // Check for file type (optional)
        $allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'];
        if (in_array($fileType, $allowedTypes)) {
            // Move the file to the destination
            if (move_uploaded_file($fileTmpPath, $destination)) {
                // Return success message as JSON
                echo json_encode(['status' => 'success', 'message' => 'File successfully uploaded.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error moving the uploaded file.']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid file type.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No file uploaded or an error occurred.']);
    }
}
?>
