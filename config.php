<?php
$servername = "localhost";
$username = "root";
$password = ""; // Default is empty in XAMPP
$dbname = "app-db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>