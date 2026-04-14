<?php
$conn = new mysqli("localhost", "root", "", "uni_gpa_project");

$result = $conn->query("SELECT * FROM gpa_records ORDER BY created_at DESC");

while($row = $result->fetch_assoc()) {
    echo "<div class='card p-2 mb-2'>
        <b>{$row['student_name']}</b> - {$row['semester']} <br>
        GPA: {$row['gpa']} <br>
        {$row['created_at']}
    </div>";
}
?>
