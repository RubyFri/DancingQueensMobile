<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Dancing Queens</title>
    <meta name = "description" content="Page for when the user is logged in">

    <link rel="stylesheet" href="stylesheet.css">
  </head>
  <body>
  <div id="navbar" class="navbar">
        <ul>
        <li><a href="index.php">Home Page</a></li>
        <li><a href="MeetDancers.php">Meet the Dancers</a></li>
        </ul>
    </div>
    <?php
    session_start();
    if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
    echo "<h2>You are currently logged in as, $username</h2>";
    echo '<div class="options">
    <a href="createBooking.php" class="option-card">
        <h3>Create Booking</h3>
    </a>
    <a href="deleteBooking.php" class="option-card">
        <h3>Delete Booking</h3>
    </a>
    <a href="changeBooking.php" class="option-card">
        <h3>Modify Booking</h3>
    </a>
    <a href="logout.php" class="option-card">
        <h3>Log Out</h3>
    </a>
  </div>';
} else {
    echo "<h2>Please log in</h2>";
    exit();
}

include 'config.php';

// SQL query to fetch all bookings
$query = "SELECT * FROM bookings";
$result = mysqli_query($conn, $query);
$numrows = mysqli_num_rows($result);

if ($result) {
    // Check if there are bookings
    if ($numrows > 0) {
        echo "<table border='1'>
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Customer Name</th>
                        <th>Booking Date</th>
                        <th>Booking Time</th>
                        <th>Dancers Booked</th>
                    </tr>
                </thead>
                <tbody>";

        // Loop through and output the bookings
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            echo "<tr>
                    <td>" . htmlspecialchars($row['b_id']) . "</td>
                    <td>" . htmlspecialchars($row['b_username']) . "</td>
                    <td>" . htmlspecialchars($row['b_date']) . "</td>
                    <td>" . htmlspecialchars($row['b_time']) . "</td>
                    <td>" . htmlspecialchars($row['b_dancers']) . "</td>
                </tr>";
        }

        echo "</tbody></table>";
    } else {
        echo "<p>No bookings found.</p>";
    }
} else {
    // If there was an error in the result, show the error
    echo "<p>Error fetching data.</p>";
}
?>


</body>
</html>
