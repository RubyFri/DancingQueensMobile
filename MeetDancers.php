<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Dancing Queens</title>
  <!-- Preload multiple images -->
  <link rel="preload" href="Sage.avif" as="image">
  <link rel="preload" href="Yenta.avif" as="image">
  <link rel="preload" href="Ruby.avif" as="image">

    <meta name = "description" content="Business' second page. Introductions for Ruby, Yenta, and Sage with images.">

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
  <div class="dancers">
    <div id="navbar" class="navbar">
      <ul>
        <li><a href="index.php">Home Page</a></li>
        <li><a href="MeetDancers.php">Meet the Dancers</a></li>
        <li><a href="createAcc.php">Create Account</a></li>
        <li><a href="logIn.php">My Profile</a></li>
      </ul>
  </div>

    <h2 id="dancer-header">Meet the Dancers:</h2>

    <div class="flex-image">

      <div class="flex-image-ind">
        <div id="ruby">
          <h3>Ruby</h3>
          <div class="intros">
          <p>Hi I'm Ruby! I am a current a Sophomore at Wesleyan University studying Computer Science and Mathematics.
             I am honestly an awful dancer– even though I technically took Introduction to Dance (Sorry Professor Doug), 
             but that's part of the reason you should hire me! I will make you laugh
            your socks off (not in a weird way) with my not-so-groovy moves. </p></div>
          <img
            src="Ruby.avif"
            width="30%"
            height="auto"
            alt="This is a photo of our dancing queen Ruby. 
                She is smiling widely and posing beautifully with one leg up."
          />
          <p><a href="https://www.linkedin.com/in/ruby-friedman-04117b301"
            target="_self"> View Ruby's Linkedin Here! </a></p>
        </div>
      </div>
    
    <div class="flex-image-ind">
      <div id="yenta">
        <h3>Yenta</h3>

         <div class="intros">
        <p>Hello! I am Yenta, the queen among dancers. I dance hip hop, ballet, West African, Javanese and Tap.
           I also dance Contemporary, Ballroom and Swing. Oh, and also Tango. Hit me up to book. 
        </p>
      </div>
        <img
          src="Yenta.avif"
          width=30%
          height="auto"
          alt="This is a photo of our dancing queen Yenta. 
              She is smiling widely and posing beautifully with one leg up."
        />
        <p><a href="https://play2048.co"
          target="_self"> View Yenta's Favorite Game Here! </a></p>
      </div>
    </div>

    <div class="flex-image-ind">
      <div id="sage">
        <h3>Sage</h3>
        <div class="intros">
        <p>Hi I'm Sage! I'm a junior at Wesleyan University majoring in Math and Computer Science.
          Contrary to the title of this page, I don't actually dance! You should still hire me anyway
          so that I can get paid to do what I love - standing around awkwardly.</p></div>
        <img
          src="Sage.avif"
          width=30%
          height="auto"
          alt="This is a photo of our dancing queen Sage. 
              She is smiling widely and posing beautifully with one leg up."
        />
        <p><a href="https://www.instagram.com/saltman8345/"
          target="_self"> View Sage's Instagram Here! </a></p>
      </div>
    </div>

  </div>
  </div>
  <iframe src="iframe.html" style="height: 10%;width:100%;" title="An ad for Legitimate Business Incorporated's new legitimate product."></iframe>
</body>
</html>

