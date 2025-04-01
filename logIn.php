<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Dancing Queens</title>
    <meta name = "description" content="Log in to account for Dancing Queens">

    <link rel="stylesheet" href="stylesheet.css">
  </head>
  <body>
  <div id="navbar" class="navbar">
        <ul>
        <li><a href="index.php">Home Page</a></li>
        <li><a href="MeetDancers.php">Meet the Dancers</a></li>
        </ul>
    </div>
  <div id="form">
      <h1>LOG IN</h1>
      <form name="form" action="" method="POST">
        <p>
          <label>Username: </label>
          <input type="text" id="user" name="userid" required/>
        </p>

        <p>
          <label>Password: </label>
          <input type="password" id="pass" name="password" required/>
        </p>
        <p>
        <p>
          <input type="submit" id="button" value="Log In" />
        </p>
      </form>
    </div>
    <?php
    session_start();
    if(isset($_SESSION['username'])){
      header("Location: loginLanding.php");
      exit();
    }
    else {
      include 'config.php';
      if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $userid = $_POST['userid'];
        $password1 = $_POST['password'];

        $sql = "SELECT password FROM users WHERE username = ?";
        $stmt = mysqli_prepare($conn, $sql);
        // Bind the values for username and password that the user entered to the
        // statement AS STRINGS (that is what "ss" means). In other words, the
        // user input is strictly interpreted by the server as data and not as
        // porgram code part of the SQL statement.
        mysqli_stmt_bind_param($stmt, "s", $userid);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);
        if (mysqli_stmt_num_rows($stmt) > 0) {
          mysqli_stmt_bind_result($stmt, $hashed_password);
          mysqli_stmt_fetch($stmt);
          if (password_verify($password1, $hashed_password)) {
            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $userid;
            // Redirect to landing page
            header("Location: loginLanding.php");
            exit();
            
          }
          else {
            echo "Wrong User id or password";
          }
      }
      else {
        echo "Wrong User id or password";
      }
    }
  }
  ?>

  </body>

  </html>