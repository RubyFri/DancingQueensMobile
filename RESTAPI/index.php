<?php
session_start();
// Allow all origins (for testing purposes)
header("Access-Control-Allow-Origin: *");
// Allow specific methods (GET, POST, DELETE, PUT, OPTIONS)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Allow specific headers (you can include more headers as needed)
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
// Allow credentials (if you need cookies, etc.)
header("Access-Control-Allow-Credentials: true");

// If it's a preflight request (OPTIONS), just return a 200 status with the correct headers
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

ini_set('display_errors', 1);
error_reporting(E_ALL);

require __DIR__ . "/inc/bootstrap.php";

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', trim($uri, '/')); // Trim to avoid leading/trailing slashes
// Ensure at least a controller is requested
if (!isset($uri[1])) {
    header("HTTP/1.1 404 Not Found");
    echo json_encode(["error" => "Endpoint not found"]);
    exit();
}

// Handle routing for different HTTP methods
$requestMethod = $_SERVER["REQUEST_METHOD"];

// Route to appropriate controller
switch ($uri[1]) {
    case 'booking':
        require PROJECT_ROOT_PATH . "/Controller/Api/BookingController.php";
        $objController = new BookingController();
        break;
    case 'user':
        require PROJECT_ROOT_PATH . "/Controller/Api/UserController.php";
        $objController = new UserController();
        break;
    case 'login':
    case 'logout':
        require PROJECT_ROOT_PATH . "/Controller/Api/LoginLogoutController.php";
        $objController = new LoginLogoutController();
        break;
    default:
        header("HTTP/1.1 404 Not Found");
        echo json_encode(["error" => "Invalid API endpoint"]);
        exit();
}

// Handle POST requests for creating new resources
if ($requestMethod == 'POST') {
    if ($uri[1] == 'login') {
        $strMethodName = 'loginAction'; 
    } elseif ($uri[1] == 'logout') {
        $strMethodName = 'logoutAction'; 
    } else {
        $strMethodName = $uri[2] . 'Action'; 
    }
    
    // Check if method exists in the controller
    if (method_exists($objController, $strMethodName)) {
        // Call the appropriate method
        $objController->{$strMethodName}();
    } else {
        header("HTTP/1.1 404 Not Found");
        echo json_encode(["error" => "Method not found"]);
        exit();
    }
} elseif ($requestMethod == 'DELETE') {
    //$bookingId = $uri[2]; // The booking ID should be in the second segment for DELETE requests
    // Check if the method exists in the controller for deleting the booking
    if (method_exists($objController, 'deleteAction')) {
        // Call the deleteAction method and pass the booking ID
        $objController->deleteAction();
    } else {
        header("HTTP/1.1 404 Not Found");
        echo json_encode(["error" => "Method not found"]);
        exit();
    }
} else {
    // For other methods like GET, PUT, etc.
    $strMethodName = $uri[2] . 'Action';
    // Check if method exists in the controller
    if (method_exists($objController, $strMethodName)) {
        // Call the appropriate method
        $objController->{$strMethodName}();
    } else {
        header("HTTP/1.1 404 Not Found");
        echo json_encode(["error" => "Method not found"]);
        exit();
    }
}