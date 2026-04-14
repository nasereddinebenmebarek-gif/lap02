<?php
$conn = new mysqli("localhost", "root", "", "uni_gpa_project");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data['student'] || !$data['semester']) {
    echo "Error";
    exit;
}

$stmt = $conn->prepare("INSERT INTO gpa_records (student_name, semester, gpa) VALUES (?, ?, ?)");
$stmt->bind_param("ssd", $data['student'], $data['semester'], $data['gpa']);
$stmt->execute();

echo "Saved";
?>
