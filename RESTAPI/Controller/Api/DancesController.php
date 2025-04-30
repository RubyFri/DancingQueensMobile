<?php

require_once 'Authentication.php';

class DancesController extends BaseController
{
    public function listAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'GET') {
            try {
                $DancesModel = new DancesModel();
                $arrDances = $DancesModel->getDances();
                $responseData = json_encode($arrDances);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().' Something went wrong! Please contact support.';
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
    public function createAction() {
        authenticate();

        // Initialize error variables
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'POST') {
            try {
                $userData = json_decode(file_get_contents('php://input'), true);
                 // Check if JSON parsing was successful
                if (json_last_error() !== JSON_ERROR_NONE) {
                    throw new Exception("Invalid JSON format.");
                }
               
                $username = $_SESSION['username'];
                 // Extract username, date, time and password from POST data
                $dance = isset($userData['dance']) ? $userData['dance'] : null;

                //Validate the received data
                if (empty($username) || empty($dance)) {
                    throw new Exception("Username and dance required.");
                }

                $dancesModel = new DancesModel();
                $result = $dancesModel->createDance($username, $dance);

                if ($result) {
                    $this->sendOutput(
                        json_encode(array('message' => 'Dance created successfully')),
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
