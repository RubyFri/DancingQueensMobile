<?php
define("PROJECT_ROOT_PATH", __DIR__ . "/../");

// Include configuration
require_once PROJECT_ROOT_PATH . "/inc/config.php";

// Include base controller
require_once PROJECT_ROOT_PATH . "/Controller/Api/BaseController.php";

// Include models
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
require_once PROJECT_ROOT_PATH . "/Model/UserModel.php";
require_once PROJECT_ROOT_PATH . "/Model/BookingModel.php";  // ✅ Add this line
