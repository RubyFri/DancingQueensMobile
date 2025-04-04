<?php
require __DIR__ . "/inc/bootstrap.php";

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

if (!isset($uri[2]) || !isset($uri[3])) {
    header("HTTP/1.1 404 Not Found");
    exit();
}

// Determine which controller to use
if ($uri[2] === 'user') {
    require PROJECT_ROOT_PATH . "/Controller/Api/UserController.php";
    $objController = new UserController();
} elseif ($uri[2] === 'booking') {
    require PROJECT_ROOT_PATH . "/Controller/Api/BookingController.php";
    $objController = new BookingController();
} else {
    header("HTTP/1.1 404 Not Found");
    exit();
}

// Call the action method
$strMethodName = $uri[3] . 'Action';
if (method_exists($objController, $strMethodName)) {
    $objController->{$strMethodName}();
} else {
    header("HTTP/1.1 404 Not Found");
    exit();
}
