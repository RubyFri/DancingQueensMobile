<?php
require_once 'Authentication.php';
class BookingController extends BaseController
{
    /** 
* "/booking/list" Endpoint - Get list of bookings 
*/
    public function listAction()
    {   authenticate();

        // Initialize error variables
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();

        if (strtoupper($requestMethod) == 'GET') {
            try {
                // Create a new BookingModel instance
                $userModel = new BookingModel();
                $intLimit = 10;
                if (isset($arrQueryStringParams['limit']) && $arrQueryStringParams['limit']) {
                    $intLimit = $arrQueryStringParams['limit'];
                }
                // Retrieve the bookings
                $arrUsers = $userModel->getBookings($intLimit);
                // Encode the bookings as JSON
                $responseData = json_encode($arrUsers);
            } catch (Error $e) {
                // Handle unsupported request methods
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
     * "/booking/delete" Endpoint - Delete a booking by ID 
     */
    public function deleteAction() {
        authenticate();
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        
        if (strtoupper($requestMethod) == 'DELETE') {
            try {
                $inputData = json_decode(file_get_contents("php://input"), true);
                // Get the booking ID from the query string
                $bookingId = $inputData['booking_id'] ?? null;
                $bookingModel = new BookingModel();

                // Delete the booking
                $result = $bookingModel->deleteBookingById($bookingId);

                if ($result) {
                    $this->sendOutput(
                        json_encode(array('message' => 'Booking deleted successfully')),
                        array('Content-Type: application/json', 'HTTP/1.1 200 OK')
                    );
                } else {
                    $this->sendOutput(
                        json_encode(array('error' => 'Failed to delete booking')),
                        array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
                    );
                }
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';

                $this->sendOutput(
                    json_encode(array('error' => $strErrorDesc)),
                    array('Content-Type: application/json', $strErrorHeader)
                );
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';

            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }
     /** 
     * "/booking/create" Endpoint - create a booking
     */   
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
                $date = isset($userData['date']) ? $userData['date'] : null;
                $time = isset($userData['time']) ? $userData['time'] : null;
                $dancers = isset($userData['dancers']) ? $userData['dancers'] : null;

                // Validate the received data
                if (empty($username) || empty($date) || empty($time) || empty($dancers)) {
                    throw new Exception("Username, date, time and password are required.");
                }

                $bookingModel = new BookingModel();
                $result = $bookingModel->createBooking($username, $date, $time, $dancers);

                if ($result) {
                    $this->sendOutput(
                        json_encode(array('message' => 'Booking created successfully')),
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
    /** 
     * "/booking/update" Endpoint - modify an existing booking
     */
    public function updateAction() {
    authenticate();
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    
    if (strtoupper($requestMethod) == 'PUT') {
        try {
        $inputData = json_decode(file_get_contents("php://input"), true);
        
        $bookingId = $inputData['booking_id'] ?? null;
        $username = $_SESSION['username'];
        $date = $inputData['date'] ?? null;
        $time = $inputData['time'] ?? null;
        $dancers = $inputData['dancers'] ?? null;
        
        if ($bookingId === null || $username === null || $date === null || $time === null ||$dancers === null) {
            throw new Exception('Missing required parameters');
        }
        
        $bookingModel = new BookingModel();
        $result = $bookingModel->updateBooking($bookingId, $username, $date, $time, $dancers);
        
        if ($result) {
            $this->sendOutput(json_encode(array('message' => 'Booking updated successfully')), array('Content-Type: application/json', 'HTTP/1.1 200 OK'));
        } else {
            throw new Exception('Failed to update booking');
        }
        } catch (Exception $e) {
        $strErrorDesc = $e->getMessage().' Something went wrong! Please contact support.';
        $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
        $this->sendOutput(json_encode(array('error' => $strErrorDesc)), array('Content-Type: application/json', $strErrorHeader));
        }
    } else {
        $strErrorDesc = 'Method not supported';
        $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        $this->sendOutput(json_encode(array('error' => $strErrorDesc)), array('Content-Type: application/json', $strErrorHeader));
    }
    }
}