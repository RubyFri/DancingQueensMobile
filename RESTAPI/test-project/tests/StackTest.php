<?php

class StackTest extends PHPUnit\Framework\TestCase
{
   protected $client;

   protected function setUp() : void{
      parent::setUp();
      $this->client = new GuzzleHttp\Client(["base_uri" => "http://localhost:8080/index.php/"]);
   }

   /* testGet_UserList: request the current user list with a GET request and check that
    the server responds with a 200 response code. */
   public function testGet_UserList() {
      $response = $this->client->request('GET', 'user/list');
      $this->assertEquals(200, $response->getStatusCode());
   }

    /* testPost_CreateUser: request the creation of a user with a POST request and
    check that the server responds with a 201 response code. You can hardcode a new
    username and password into your test function.*/
   public function testPost_CreateUser() {
      $username = 'TestUser_' . uniqid(); //we want to make a new user every time so that it works every time you run this file instead of just the first time (you cant have duplicate usernames)
      $response = $this->client->request('POST', 'user/create', [ 'json'=> ['username' => $username, 'password'=> '12345678900']]);
      $this->assertEquals(201, $response->getStatusCode());
    }

    /*testPost_LoginUser: test the successful login of a user with a POST request and
    check that the server responds with a 200 response code. You can hardcode an existing
    username and password into your test function.*/
    public function testPost_LoginUser() {
        $response = $this->client->request('POST', 'login', [ 'json'=> ['username' => 'TestUser2', 'password'=> '12345678900']]); //hardcoded! this passes because I put this user into the database
        $this->assertEquals(200, $response->getStatusCode()); //responds with 200 NOT 201 since we are logging in and not creating a new resource
    }

    /* testPost_FailedLogin: test the failed login of a user with a POST request and
    check that the server responds with a 201 response code. This is a negative test */
    public function testPost_FailedLogin(){
      try {
         $response = $this->client->request('POST', 'login', ['json' => ['username' => 'IDONTEXIST', 'password' => 'mwahahahaahaha']]);
         $this->assertNotEquals(200, $response->getStatusCode());
     } catch (\GuzzleHttp\Exception\ClientException $e) {
         // This is expected for a failed login like 401 Unauthorized
         $statusCode = $e->getResponse()->getStatusCode();
         $this->assertNotEquals(200, $statusCode);
     }
    }

    /* IMPORTANT NOTE: ALL ADDITIONAL TESTS HAVE BEEN COMPLETELY CREATED WITH CHAT GPT TO TEST ADDITIONAL FUNCTIONALITY*/
    /*ENTIRELY CREATED WITH AI */
    /* Please note that these tests fail! So AI isn't entirely reliable, HOWEVER when we look at WHY they fail if we switch the 400 error codes to 401
    they pass except for the first test which fails because of lack of authentication that the user is logged in first. So clearly AI is not perfect,
    but with a little editing it creates great unit tests that are very successful as long as you look them over and fix things before submitting!

    /*
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
*/

   public function tearDown() : void{
      parent::tearDown();
      $this->client = null;
   }
}
?>