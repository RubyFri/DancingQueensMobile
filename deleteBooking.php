<!--
This is a PHP script so users can cancel an existing appointment that they made.
The form requires the user to cross-reference the table given by viewing their bookings,
find the ID of the booking they want to delete, and input it in the form. Deleting the booking
should fail if the user's username does not match the username linked to the booking.
Bookings table schema:
    primary key: id, INT(11)  #
    foreign key: username, VARCHAR(255) # user's username
    Date, DATE # booking date
    Time, TIME # booking time (EST)
    Dancer, VARCHAR(15) // user chooses which dancer/s they want to book
-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Dancing Queens</title>
    <meta name = "description" content="Delete a booking for Dancing Queens">
    <link rel="stylesheet" href="stylesheet.css">
</head> 
<body>
    <div id="navbar" class="navbar">
        <ul>
        <li><a href="index.php">Home Page</a></li>
        <li><a href="MeetDancers.php">Meet the Dancers</a></li>
          <li><a href="logInLanding.php">My Profile</a></li>
        </ul>
    </div>
    <!-- The ID input form-->
    <div id="form">
      <h1>Delete Booking</h1>
      <form name="form" action="" method="POST">
        <p>
          <label> Booking ID: </label>
          <input type="number" id="id" name="bookingid"/>
          <input type="submit" id="button" value="Delete Booking" />
        </p>
      </form>
    </div>
    <!-- The PHP code -->
    <?php
        session_start();
        include "config.php";
        // should tell the user that they are logged in ontop of page
        if(isset($_SESSION['username'])){
           echo "<p>You are currently logged in as " . $_SESSION['username']. "</p>";
        }
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
          $bookingid = $_POST['bookingid'];
          $username = $_SESSION['username'];

          if (!empty($bookingid) && !empty($username)) {
            // We determine if the given ID is in the user's bookings
            $check_sql_id = "SELECT * FROM bookings WHERE b_id = ? AND b_username = ?";
            $check_stmt_id = mysqli_prepare($conn, $check_sql_id);
            mysqli_stmt_bind_param($check_stmt_id, "is", $bookingid, $username);
            mysqli_stmt_execute($check_stmt_id);
            mysqli_stmt_store_result($check_stmt_id);
            if (mysqli_stmt_num_rows($check_stmt_id) == 0) {
                echo "Booking not found. It was either made under a different username or not at all. Please check your bookings for further information.";
                  exit();
            }

            // Finally, we delete the booking
            $sql = "DELETE FROM bookings WHERE b_id = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "i", $bookingid);
            if (mysqli_stmt_execute($stmt)){
                echo "Booking deleted successfully!";
                exit();
          }
          else {
              echo "An error has occurred. Please try again.";
          }
        }
      }
    ?>

</body>
</html>
