<?php
class BookingController extends BaseController
{
    /** 
* "/booking/list" Endpoint - Get list of bookings 
*/
    public function listAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $userModel = new BookingModel();
                $intLimit = 10;
                if (isset($arrQueryStringParams['limit']) && $arrQueryStringParams['limit']) {
                    $intLimit = $arrQueryStringParams['limit'];
                }
                $arrUsers = $userModel->getBookings($intLimit);
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
     * "/booking/delete" Endpoint - Delete a booking by ID 
     */
    public function deleteAction() {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'DELETE') {
            try {
                $bookingId = $_GET['id'];
                $bookingModel = new BookingModel();
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
                $dancers = isset($userData['dancers']) ? $userData['dancers'] : null;

                // Validate the received data
                if (empty($username) || empty($dancers)) {
                    throw new Exception("Username and password are required.");
                }

                $bookingModel = new BookingModel();
                $result = $bookingModel->createBooking($username, $dancers);

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

    public function updateAction() {
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    
    if (strtoupper($requestMethod) == 'PUT') {
        try {
        $inputData = json_decode(file_get_contents("php://input"), true);
        
        $bookingId = $inputData['booking_id'] ?? null;
        $username = $inputData['username'] ?? null;
        $dancers = $inputData['dancers'] ?? null;
        
        if ($bookingId === null || $username === null || $dancers === null) {
            throw new Exception('Missing required parameters');
        }
        
        $bookingModel = new BookingModel();
        $result = $bookingModel->updateBooking($bookingId, $username, $dancers);
        
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