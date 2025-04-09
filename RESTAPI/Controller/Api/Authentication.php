
<?php
// session_start();

function authenticate()
{
    // Start the session if it's not started yet
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    // Debugging: Print session data
    // var_dump($_SESSION);

    if (!isset($_SESSION['user'])) {
        http_response_code(401);
        echo json_encode(['error' => 'You must be logged in to access this resource']);
        exit;
    }
}
