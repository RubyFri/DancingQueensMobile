<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dancing Queens</title>
    <meta name = "description" content="Business' landing page. Mission statement and group image.">

    <link rel="preload" href="team.jpeg" as="image">
    <link rel="stylesheet" href="stylesheet.css">
  </head>
  
  <body>
    <?php 
      session_start();
      // should tell the user that they are logged in ontop of page
      if(isset($_SESSION['username'])){
        echo "You are currently logged in as " . $_SESSION['username'];
      }
    ?>
    <div id="navbar" class="navbar">
        <ul>
          <li><a href="index.php">Home Page</a></li>
          <li><a href="MeetDancers.php">Meet the Dancers</a></li>
          <li><a href="createAcc.php">Create Account</a></li>
          <li><a href="logIn.php">My Profile</a></li>
        </ul>
    </div>
  
    <h1>
      Feeling
      <span id = "blue-text">Blue?</span> 
      Hire Our Crew! We'll Dance For You!&#x1F483; &#x1F57A; &#x2728;
    </h1>

    <div class=flex-image-grp>
      <img
        src="team.jpeg"
        alt="This is a photo of our dancing team!"
        />

    </div>
    <div class="mission">
      <h2>Our Mission</h2>
      <p>
        Sometimes, people are sad, and that sucks a lot. But do you know what
        doesn't suck? Dancing! That's why we created the Dancing Queens (and we
        are not even 17!) Essentially, you pay us the very very low cheap and
        affordable rate of 400 dollars per hour to dance for you until you feel
        cheered up again! We do not offer financial aid for our services because
        of how super cheap they are.
      </p>
      
      <h2>Book Our Services!</h2>
        <p> Create or log in to an account to get started on booking a dance service! </p>
      </div>
      <p> This site was designed and published as part of the COMP 333 Software Engineering class at Wesleyan University. This is an exercise.
          However, if you think this is a good business venture please do let us know and we will maybe make it happen! Peace and love. 
      </p>
      <p> Photo credit to Sebastian Zimmeck (<a href="https://www.linkedin.com/in/sebastianzimmeck">view Linkedin here</a>)</p>
    </div>
</html>
