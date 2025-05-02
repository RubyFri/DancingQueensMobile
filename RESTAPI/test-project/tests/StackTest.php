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


   public function tearDown() : void{
      parent::tearDown();
      $this->client = null;
   }
}
?>