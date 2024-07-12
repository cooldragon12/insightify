<?php


$db_servername = "sql6.freesqldatabase.com";
$db_username = "sql6700012";
$db_password = "D3gevjgE4F";
$dbname = "sql6700012";


// Create connection
$conn = new mysqli($db_servername, $db_username, $db_password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

?>


