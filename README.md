# DancingQueensMobile
The dancing queens is coming to iOS and android near you!
Work Division: Yenta 35%/Ruby 35%/Sage 30%


## To Set Up Environment

### XAMPP
- First, place the contents of the RESTAPI folder into your htdocs folder in XAMPP and start your servers.
- In MySQL, create a database titled mobile-app-db, then add two tables two it with the following queries:

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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;```


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
- Modify booking: (must be logged in, users can only modify their own bookings) 
    Endpoint: PUT http://localhost:8080/index.php/booking/update
    {  "booking_id": "1",
       "date": "2027-07-30",
       "time": "14:30:00",
       "dancers": "yenta"}
- Delete Booking: 
    Endpoint: DELETE http://localhost:8080/index.php/booking/delete
	{  "booking_id": "1"}
- List the bookings:
    Endpoint: GET http://localhost:8080/index.php/booking/list?limit=20. Note: we specify a limit (we dont want to list 1000 bookings)
 	No body


### Expo
- Navigate through the terminal such that the DancingQueens folder is the active directory
- Run 'npx expo start' to run expo (if you get an error and need to install dependencies, run the install command that expo lists)
- View the app in whichever environment you choose (I ran it by scanning the QR code and opening it in Expo Go on my iPhone)


### Notes on Use
- Access to CRUD functionality is through the Login Landing page, available once you have created an account and logged in
- When choosing dancers during Create or Modify Booking, remember to tap elsewhere on the page to close the MultiPicker before pressing the button
