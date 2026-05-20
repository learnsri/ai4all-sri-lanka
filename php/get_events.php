<?php
header('Content-Type: text/plain');
include_once 'db_conn.php';


if ($conn->connect_error) {
    die("Error: Connection failed");
}

$sql = "SELECT * FROM events ORDER BY event_date ASC, event_time ASC";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo $row['id'] . '|' . 
             $row['title'] . '|' . 
             $row['description'] . '|' . 
             $row['image'] . '|' . 
             $row['event_date'] . '|' . 
             $row['event_time'] . '|' . 
             $row['location'] . '|' . 
             $row['organizer'] . '|' . 
             $row['organizer_name'] . '|' . 
             $row['category'] . '|' . 
             $row['tags'] . "\n";
    }
} else {
    echo "No events found";
}

$conn->close();
?>