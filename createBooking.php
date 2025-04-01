<?php
// Start session only once
session_start();

include "config.php";

// Initialize variables
$date = $time = $dancers = "";
$message = "";

// Display the logged-in username at the top of the page
if (isset($_SESSION['username'])) {
    echo "You are currently logged in as " . $_SESSION['username'];
}

// If the user submits the form via POST, process the input
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = $_POST["date"] ?? "";
    $time = $_POST["time"] ?? "";
    $dancers = $_POST["dancers"] ?? "";
    $username = $_SESSION['username'] ?? ""; // Retrieve the username from session

    if (!empty($date) && !empty($time) && !empty($dancers) && !empty($username)) {
        // Corrected Prepared Statement
        $sql_query = "INSERT INTO bookings (b_username, b_date, b_time, b_dancers) VALUES (?, ?, ?, ?)";
        $insert_stmt = mysqli_prepare($conn, $sql_query);
        
        if ($insert_stmt) {
            // Bind parameters: all values are strings, so we use "ssss"
            mysqli_stmt_bind_param($insert_stmt, "ssss", $username, $date, $time, $dancers);

            // Execute the prepared statement
            if (mysqli_stmt_execute($insert_stmt)) {
                $message = "<p style='color: green;'>Successfully booked.</p>";
            } else {
                $message = "<p style='color: red;'>Error executing statement: " . mysqli_error($conn) . "</p>";
            }

            // Close the statement
            mysqli_stmt_close($insert_stmt);
        } else {
            $message = "<p style='color: red;'>Error in preparing the statement.</p>";
        }
    } else {
        $message = "<p style='color: red;'>All fields are required.</p>";
    }
}

// Close the database connection
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="application/x-www-form-urlencoded">
    <link rel="stylesheet" href="stylesheet.css">
    <title>Booking Form</title>
</head>
<body>
  <div id="navbar" class="navbar">
      <ul>
          <li><a href="index.php">Home Page</a></li>
          <li><a href="MeetDancers.php">Meet the Dancers</a></li>
          <li><a href="loginLanding.php">My Profile</a></li>
      </ul>
  </div>

  <!-- Booking Form -->
  <div id="form">
      <h1>CREATE BOOKING</h1>
      <form name="form" action="" method="POST">

        <!-- Date input box -->
        <p>
           <label for="date">Booking Date</label>
           <input type="date" id="date" name="date" required value="<?php echo isset($date) ? $date : ''; ?>"/>
        </p>

        <!-- Time input box -->
        <p>
           <label for="time">Booking Time</label>
           <input type="time" id="time" name="time" required value="<?php echo isset($time) ? $time : ''; ?>"/>
        </p>

        <!-- Dancer selection dropdown -->
        <p>
            <label for="dancers">Dancers Selection</label>
            <select id="dancers" name="dancers" required>
                <option value="" disabled <?php echo empty($dancers) ? 'selected' : ''; ?>>Select Dancers</option>
                <option value="sage" <?php echo ($dancers === 'sage') ? 'selected' : ''; ?>>Sage</option>
                <option value="Ruby" <?php echo ($dancers === 'Ruby') ? 'selected' : ''; ?>>Ruby</option>
                <option value="Yenta" <?php echo ($dancers === 'Yenta') ? 'selected' : ''; ?>>Yenta</option>
                <option value="Sage & Yenta" <?php echo ($dancers === 'Sage & Yenta') ? 'selected' : ''; ?>>Sage & Yenta</option>
                <option value="Sage & Ruby" <?php echo ($dancers === 'Sage & Ruby') ? 'selected' : ''; ?>>Sage & Ruby</option>
                <option value="Yenta & Ruby" <?php echo ($dancers === 'Yenta & Ruby') ? 'selected' : ''; ?>>Yenta & Ruby</option>
                <option value="Yenta, Sage & Ruby" <?php echo ($dancers === 'Yenta, Sage & Ruby') ? 'selected' : ''; ?>>Yenta, Sage & Ruby</option>
            </select>
            <span id="error-message" style="color: red; display: none;">Please select a valid option.</span>
        </p>

        <input type="submit" id="button" value="Create Booking" />

      </form>

      <!-- Display success/error message below the form -->
      <?php echo $message; ?>
  </div>
</body>
</html>
