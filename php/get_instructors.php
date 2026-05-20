<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include_once "db_conn.php";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Connection failed"]));
}

$search = isset($_GET['search']) ? $conn->real_escape_string($_GET['search']) : '';

$sql = "SELECT name, title, image_url, expertise, email, linkedin, created_at FROM instructors";
if (!empty($search)) {
    $sql .= " WHERE name LIKE '%$search%' OR expertise LIKE '%$search%' OR title LIKE '%$search%'";
}

$result = $conn->query($sql);
if (!$result) {
    http_response_code(500);
    die(json_encode(["error" => "Query failed"]));
}

$instructors = [];
while($row = $result->fetch_assoc()) {
    $row['expertise'] = array_map('trim', explode(',', $row['expertise']));
    $instructors[] = $row;
}

echo json_encode($instructors);
$conn->close();
?>