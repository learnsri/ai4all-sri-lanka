<?php
header("Content-Type: text/plain");
include_once "db_conn.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get filter parameters from request
$type = isset($_GET['type']) ? $_GET['type'] : 'all';
$deadline = isset($_GET['deadline']) ? $_GET['deadline'] : 'all';
$amount = isset($_GET['amount']) ? $_GET['amount'] : 'all';
$level = isset($_GET['level']) ? $_GET['level'] : 'all';
$subject = isset($_GET['subject']) ? $_GET['subject'] : 'all';
$search = isset($_GET['search']) ? $_GET['search'] : '';

// Build SQL query with filters
$sql = "SELECT * FROM scholarships WHERE 1=1";

if ($type != 'all') {
    $sql .= " AND type = '" . $conn->real_escape_string($type) . "'";
}

if ($deadline != 'all') {
    $days = (int)$deadline;
    $sql .= " AND deadline <= DATE_ADD(CURDATE(), INTERVAL $days DAY)";
}

if ($amount != 'all') {
    if ($amount == '10000+') {
        $sql .= " AND amount >= 10000";
    } else {
        $amountValue = (int)$amount;
        $sql .= " AND amount <= $amountValue";
    }
}

if ($level != 'all') {
    $sql .= " AND level = '" . $conn->real_escape_string($level) . "'";
}

if ($subject != 'all') {
    $sql .= " AND subject = '" . $conn->real_escape_string($subject) . "'";
}

if (!empty($search)) {
    $search = $conn->real_escape_string($search);
    $sql .= " AND (title LIKE '%$search%' OR provider LIKE '%$search%' OR description LIKE '%$search%')";
}

$sql .= " ORDER BY deadline ASC";

$result = $conn->query($sql);

// Format results as plain text
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Format each row with field separators and row separators
        echo "id:" . $row["id"] . "|";
        echo "title:" . $row["title"] . "|";
        echo "provider:" . $row["provider"] . "|";
        echo "type:" . $row["type"] . "|";
        echo "amount:" . $row["amount"] . "|";
        echo "deadline:" . $row["deadline"] . "|";
        echo "level:" . $row["level"] . "|";
        echo "subject:" . $row["subject"] . "|";
        echo "description:" . $row["description"] . "|";
        echo "image_url:" . $row["image_url"] . "||"; // Double pipe indicates end of row
    }
} else {
    echo "no_results";
}

$conn->close();
?>