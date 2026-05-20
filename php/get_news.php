<?php
include_once "db_conn.php";
$mysqli = $conn;
if ($mysqli->connect_errno) {
    echo "DB connection failed";
    exit;
}

$sql = "SELECT id, title, content, images, created_at
        FROM news
        ORDER BY created_at DESC
        LIMIT 10";

$result = $mysqli->query($sql);

$news = [];
if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        if($row['images']){
            $row['images'] = array_map(fn($f) => '' . trim($f), explode(',', $row['images']));
        } else {
            $row['images'] = [];
        }
        $news[] = $row;
    }
}
echo json_encode($news);
?>
