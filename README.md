# DancingQueensMobile
The dancing queens is coming to iOS and android near you!
Work Division: Yenta 33%/Ruby 33%/Sage 33% (Equal)

## Final Project
We implemented some changes to our original app as well as added additional features so our users have more opportunities to engage with the Dancing Queens.

New implementations:
 - We implemented a new feature on our app so that not only do we offer dancing sessions in person, but we offer virtual dances as well!! Here’s the gist; we added a button ‘Create Virtual Dance’ and when users click on it they get to choose a dancer and specific poses, and the app auto generates a dance! This functionality requires an additional table in the - 
database and some new react concepts in order to implement.
 - We added a button ‘Virtual Dances’ on the homepage so that anyone can watch the dances that were created by different users.

Changes:
- Create Booking: In our original app, users were able to create bookings for dates that have already passed. We changed it so that users can only book for future dates. 
- View All Users Bookings: in the past, we listed all bookings including past bookings. We edited it so that only future bookings are listed.
- Buttons: we upgraded the buttons on the loginlanding homepage to be more aesthetically pleasing.


## To Set Up Environment

### XAMPP
- First, place the contents of the RESTAPI folder into your htdocs folder in XAMPP and start your servers.
- In MySQL, create a database titled mobile-app-db, then add three tables to it with the following queries:

    ```
    CREATE TABLE users (
	    username VARCHAR(255) NOT NULL,
	    password VARCHAR(255) NOT NULL,
	    UNIQUE (username),
	    PRIMARY KEY(username)
	    )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE bookings (
	    booking_id INT(11) AUTO_INCREMENT PRIMARY KEY,
	    username VARCHAR(255),
	    date DATE NOT NULL,
	    time TIME NOT NULL,
	    dancers VARCHAR(18),
	     FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE
	    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE table dances(
		dance_id INT(11) AUTO_INCREMENT PRIMARY KEY,
		username VARCHAR (255)NOT NULL,
		dancers TEXT NOT NULL,
		poses TEXT NOT NULL,
		FOREIGN KEY (username) REFERENCES users(username)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    ```


### Rest API Queries (Can be used in Postman or JS)
- Create account:
    Endpoint: POST  http://localhost:8080/index.php/user/create
    Body: { "username": "new_user2",
                      "password": "ruby"}
    Messages: 
        If account created successfully:
            {   "message": "User created successfully"}
        If missing user/pass:
            {  "error": "Username and password are required."}
        If username is already taken: 
            {"error": "Duplicate entry 'new_user2' for key 'PRIMARY'"}
- Login:
    Endpoint: POST http://localhost:8080/index.php/login
    Body: { "username": "new_user2",
            "password": "ruby"}
- Create a new booking: (must be logged in)
    Endpoint: POST http://localhost:8080/index.php/booking/create
    {  "date": "2027-07-30",
       "time": "14:30:00",
       "dancers": "yenta"}
- Modify booking: (must be logged in, users can only modify their own bookings, booking id must exist) 
    Endpoint: PUT http://localhost:8080/index.php/booking/update
    {  "booking_id": "1",
       "date": "2027-07-30",
       "time": "14:30:00",
       "dancers": "yenta"}
- Delete Booking: (must be logged in, users can only modify their own bookings, booking id must exist) 
    Endpoint: DELETE http://localhost:8080/index.php/booking/delete
	{  "booking_id": "1"}
- List the bookings: (must be logged in)
    Endpoint: GET http://localhost:8080/index.php/booking/list?limit=20. Note: we specify a limit (we dont want to list 1000 bookings)
 	No body
- List the Dances: (no need to be logged in)
    Endpoint: GET http://localhost:8080/index.php/dances/list
- Create a dance: (must be logged in)
    Endpoint: POST http://localhost:8080/index.php/dances/create
	{ "username": "project4",
	   "dancers": "Ruby",
	   "poses": "1,2,3" }

### Running the unit tests
To run the unit tests 

clone this repository on to your computer using the following command

  ```Git clone https://github.com/RubyFri/DancingQueensMobile.git```

  navigate to the proper folder

```cd DancingQueensMobile/RESTAPI```

Ensure that your backend is set up before doing this by refering to the Xampp tutorial to set up your local enviornment

Download all the dependancies listed in the <strong> PHPUnit backend unit tests </strong> section through step 6.
From there, navigate to test-project

```cd test-project```

and run the tests. Please note that ONE TEST WILL FAIL because we hardcoded in TestUser2 with password 12345678900, to allow this test to pass insert the following SQL query into your local backend 
```INSERT INTO `users`(`username`, `password`) VALUES ('TestUser2','12345678900') ```

```php vendor/bin/phpunit tests```

### Discussion on Generative AI tools and testing of the app

We wanted to test to what extent generative AI specifically ChatGPT in our case was able to write successful unit tests for us. So we sent them the following query: Here is our current unit testing code (we pasted the entirety of our StackTest.py file) using this, can you write more unit tests for this file specifically testing if posting the virtual dance works. Chat GPT returned 6 functions that we have pasted into the file StackTest.php in DancingQueensMobile/RESTAPI/test-project/tests
```
// Test Successful Virtual Dance Creation
    public function testPost_CreateVirtualDance_Success() {
      $response = $this->client->request('POST', 'dances/create', [
          'json' => [
              'username' => 'TestUser2',
              'dancers' => 'Ruby,Yenta',
              'poses' => '1,2,3'
          ]
      ]);
      $this->assertEquals(201, $response->getStatusCode());
  }
  //Missing Username
  public function testPost_CreateVirtualDance_MissingUsername() {
   try {
       $this->client->request('POST', 'dances/create', [
           'json' => [
               'dancers' => 'Ruby',
               'poses' => '1'
           ]
       ]);
       $this->fail("Expected exception not thrown");
   } catch (\GuzzleHttp\Exception\ClientException $e) {
       $this->assertEquals(400, $e->getResponse()->getStatusCode());
   }
}

//Missing Dancers
public function testPost_CreateVirtualDance_MissingDancers() {
   try {
       $this->client->request('POST', 'dances/create', [
           'json' => [
               'username' => 'TestUser2',
               'poses' => '1,2,3'
           ]
       ]);
       $this->fail("Expected exception not thrown");
   } catch (\GuzzleHttp\Exception\ClientException $e) {
       $this->assertEquals(400, $e->getResponse()->getStatusCode());
   }
}

//Invalid Pose Values (e.g., non-numeric strings)
public function testPost_CreateVirtualDance_InvalidPoses() {
   try {
       $this->client->request('POST', 'dances/create', [
           'json' => [
               'username' => 'TestUser2',
               'dancers' => 'Ruby',
               'poses' => 'banana'
           ]
       ]);
       $this->fail("Expected exception not thrown");
   } catch (\GuzzleHttp\Exception\ClientException $e) {
       $this->assertEquals(400, $e->getResponse()->getStatusCode());
   }
}
//No Poses Selected
public function testPost_CreateVirtualDance_NoPoses() {
   try {
       $this->client->request('POST', 'dances/create', [
           'json' => [
               'username' => 'TestUser2',
               'dancers' => 'Ruby',
               'poses' => ''
           ]
       ]);
       $this->fail("Expected exception not thrown");
   } catch (\GuzzleHttp\Exception\ClientException $e) {
       $this->assertEquals(400, $e->getResponse()->getStatusCode());
   }
}

//Unauthorized User Token (if auth is required)
public function testPost_CreateVirtualDance_Unauthorized() {
   try {
       $client = new GuzzleHttp\Client(['base_uri' => 'http://localhost:8080/index.php/']);
       $client->request('POST', 'dances/create', [
           'headers' => ['Authorization' => 'Bearer invalid_token'],
           'json' => [
               'username' => 'TestUser2',
               'dancers' => 'Ruby',
               'poses' => '1,2,3'
           ]
       ]);
       $this->fail("Expected exception not thrown");
   } catch (\GuzzleHttp\Exception\ClientException $e) {
       $this->assertEquals(401, $e->getResponse()->getStatusCode());
   }
}
```

These tests are entirely generated by AI and commented out because THEY DO NOT PASS. When we ran these tests, (Feel free to view the exact code for them by opening this file!) nearly every single one of them failed, this is because ChatGPT was checking for a 400 error status code to check if thing you should not be able to do failed instead of a 401 error status code. When we hardcoded in the 401 instead of 400 to 5 of these tests, all 5 passed. The one test that still did not pass was to Test Successful Virtual Dance Creation, and it did not work because it did not log in the user first (the user must be logged in to create a virtual dance). Overall, when we looked through this unit code, we found it to be very promising! Clearly, the AI in ChatGPT is not perfect because 5/6 unit tests that should have passed, failed, HOWEVER, once reading the error messages for why they failed it was extremely easy to tailor the functions so that they worked and passed. You are welcome to uncomment these tests and run them with 400s or 401s to see the difference changing one number in each function has, (the first test could also easily be fixed by adding a session id). So we believe that AI is a very promising tool for creating unit tests, as long as you give ChatGPT the file for context (so that it knows the API links and what the body should be formatted as) and as long as you read carefully over and test to see why things aren't passing.


### Running the ios simulator
To run our app using your already downloaded ios simulator do the following once you have set up your local backend
  
- Navigate to the Dancing Queens directory using the following commands

  ```cd DancingQueensMobile/DancingQueens/```
  
- install npm to get all of the relevant Node.js packages

   ```npm install```
  
- Finally start the ios simulator

   ```npx expo start --ios```

This should begin the ios simulation!



Please feel free to create an account and log in to view the CRUD functionality. 

The user can create bookings (Create)

All bookings of all users are listed once the user logs in. (Read)

The user can modify bookings that they have created (Update)

The user can delete bookings that they have created (Delete)

The user can create a virtual dance (Create)

The user can view dances that other dancers have created (Read)


### Notes on Use
- Access to CRUD functionality is through the Login Landing page, available once you have created an account and logged in
- When choosing dancers during Create or Modify Booking, remember to tap elsewhere on the page to close the MultiPicker before pressing the button
- When creating a virutal dance, select the poses you would like to be included in the dance and scroll all the way down to submit. Once submitted, you can view it by navigating to the 'Virtual Dances' button.


## Screenshots
- Sage's XAMPP still does not allow for MySQL, so her queries would not work, but she set up Postman anyway
Sage:
![alt text](get-screenshot-sage.png "Sage's Get Query")
![alt text](post-screenshot-sage.png "Sage's Post Query")
Yenta:
![alt text](get-screenshot-yenta.jpeg "Yenta's Get Query")
![alt text](post-screenshot-yenta.jpeg "Yenta's Post Query")
Ruby:
![alt text](RubyGet.jpg "Ruby's Get Query")
![alt text](RubyPost.png "Ruby's Get Query")

## Testing ....
