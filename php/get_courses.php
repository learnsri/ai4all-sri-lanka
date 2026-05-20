<?php
header('Content-Type: text/plain');
include_once 'db_conn.php';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error: Connection failed");
}

$year = isset($_GET['year']) ? $_GET['year'] : 'all';
$month = isset($_GET['month']) ? $_GET['month'] : 'all';
$coordinator = isset($_GET['coordinator']) ? $_GET['coordinator'] : 'all';
$tag = isset($_GET['tag']) ? $_GET['tag'] : 'all';
$language = isset($_GET['language']) ? $_GET['language'] : 'all';
$search = isset($_GET['search']) ? $_GET['search'] : '';

$sql = "SELECT * FROM courses WHERE 1=1";

if ($year !== 'all') {
    $sql .= " AND year = '" . $conn->real_escape_string($year) . "'";
}

if ($month !== 'all') {
    $sql .= " AND month = '" . $conn->real_escape_string($month) . "'";
}

if ($coordinator !== 'all') {
    $sql .= " AND coordinator = '" . $conn->real_escape_string($coordinator) . "'";
}

if ($tag !== 'all') {
    $sql .= " AND tags LIKE '%" . $conn->real_escape_string($tag) . "%'";
}

if ($language !== 'all') {
    $sql .= " AND language = '" . $conn->real_escape_string($language) . "'";
}

if (!empty($search)) {
    $sql .= " AND (title LIKE '%" . $conn->real_escape_string($search) . "%' OR description LIKE '%" . $conn->real_escape_string($search) . "%')";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo $row['id'] . '|' . 
             $row['title'] . '|' . 
             $row['description'] . '|' . 
             $row['image'] . '|' . 
             $row['year'] . '|' . 
             $row['month'] . '|' . 
             $row['coordinator'] . '|' . 
             $row['coordinator_name'] . '|' . 
             $row['duration'] . '|' . 
             $row['credits'] . '|' . 
             $row['tags'] . '|' . 
             $row['language'] . "\n";
    }
} else {
    echo "No courses found";
}

$conn->close();
?>