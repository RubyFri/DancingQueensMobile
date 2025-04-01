<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Dancing Queens</title>
    <meta name = "description" content="Log out of account for Dancing Queens">
    <link rel="stylesheet" href="stylesheet.css">
  </head>

<body>
    <?php
        session_start();
        $_SESSION = array();
        session_destroy();
    ?>

    <div class = "mission">
    <p> Logged Out </p>
    <p> <a href="index.php">Return to Home Page</a> </p>
    </div>
</body>
</html>