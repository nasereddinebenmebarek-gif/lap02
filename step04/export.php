<?php
$conn = new mysqli("localhost", "root", "", "uni_gpa_project");

header('Content-Type: text/csv');
header('Content-Disposition: attachment;filename=gpa_data.csv');

$output = fopen("php://output", "w");

fputcsv($output, ["Student", "Semester", "GPA", "Date"]);

$result = $conn->query("SELECT * FROM gpa_records");

while($row = $result->fetch_assoc()) {
    fputcsv($output, [
        $row['student_name'],
        $row['semester'],
        $row['gpa'],
        $row['created_at']
    ]);
}

fclose($output);
?>
