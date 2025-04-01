<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Dancing Queens</title>
    <meta name = "description" content="Create an account for Dancing Queens">

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
      <h1>CREATE ACCOUNT</h1>
      <form name="form" action="" method="POST">
        <p>
          <label> New Username: </label>
          <input type="text" id="user" name="userid" required/>
        </p>

        <p>
          <label> New Password (must be at least 10 characters): </label>
          <input type="password" id="pass1" name="password1"required/>
        </p>
        <p>
          <label>Confirm New Password: </label>
          <input type="password" id="pass2" name="password2"required/>
        </p>

        <p>
          <input type="submit" id="button" value="Create Account" />
        </p>
      </form>
    </div>

    <?php
    session_start();
    include 'config.php';
    // should tell the user that they are logged in ontop of page
    if(isset($_SESSION['username'])){
      echo "<p>You are currently logged in as " . $_SESSION['username'] . "</p>";
    }
    $userid = $_POST['userid'];
    $password1 = $_POST['password1'];
    $password2 = $_POST['password2'];
    if ($password1 !== $password2) {
      echo "Passwords do not match, try again!";
      exit(); 
    }
    if (strlen($password1)<10) {
      echo "Passwords is too short, try again!";
      exit(); 
    }
    if (!empty($userid) && !empty($password1)) {
      $check_sql = "SELECT * FROM users WHERE username = ?";
      $check_stmt = mysqli_prepare($conn, $check_sql);
      mysqli_stmt_bind_param($check_stmt, "s", $userid);
      mysqli_stmt_execute($check_stmt);
      mysqli_stmt_store_result($check_stmt);

      if (mysqli_stmt_num_rows($check_stmt) > 0) {
          echo "Username already taken, try again!";
          exit();
      }
        $password = password_hash($password1, PASSWORD_DEFAULT);


        // Use placeholders ? for username and password values for the time being.
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";

        $stmt = mysqli_prepare($conn, $sql);

        mysqli_stmt_bind_param($stmt, "ss", $userid, $password);
        

        
      if (mysqli_stmt_execute($stmt)) {
          echo "Account Created Successfully"; ?>
          <html>
          <ul> <a href="logIn.php">Log In to your new account!</a></li><ul>
          </html>
          <?php
        } else {
          echo "Failure Creating Account";
        }
      } 
    ?>


  </body>

  </html>
