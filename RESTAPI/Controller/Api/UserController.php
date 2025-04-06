<?php
require_once 'Authentication.php';
class UserController extends BaseController
{
    /** 
* "/user/list" Endpoint - Get list of users 
*/
    public function listAction()
    {
        authenticate();
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $userModel = new UserModel();
                $intLimit = 10;
                if (isset($arrQueryStringParams['limit']) && $arrQueryStringParams['limit']) {
                    $intLimit = $arrQueryStringParams['limit'];
                }
                $arrUsers = $userModel->getUsers($intLimit);
                $responseData = json_encode($arrUsers);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

/** 
* "/user/create" Endpoint - creates a new user .ie. creates a new account.
*/

    public function createAction() {

        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'POST') {
            try {
                $userData = json_decode(file_get_contents('php://input'), true);
                 // Check if JSON parsing was successful
                if (json_last_error() !== JSON_ERROR_NONE) {
                    throw new Exception("Invalid JSON format.");
                }
                // Extract username and password from POST data
                $username = isset($userData['username']) ? $userData['username'] : null;
                $password = isset($userData['password']) ? $userData['password'] : null;

                // Validate the received data
                if (empty($username) || empty($password)) {
                    throw new Exception("Username and password are required.");
                }

                $userModel = new UserModel();
                $result = $userModel->createUser($username, $password);

                if ($result) {
                    $this->sendOutput(
                        json_encode(array('message' => 'User created successfully')),
                        array('Content-Type: application/json', 'HTTP/1.1 201 Created')
                    );
                } else {
                    $this->sendOutput(
                        json_encode(array('error' => 'Failed to create user')),
                        array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
                    );
                }
            } catch (Exception $e) {
                // Handle exceptions and send error response
                $strErrorDesc = $e->getMessage();
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
    
                $this->sendOutput(
                    json_encode(array('error' => $strErrorDesc)),
                    array('Content-Type: application/json', $strErrorHeader)
                );
            }
        } else {
            // Method not supported error
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
}
}
