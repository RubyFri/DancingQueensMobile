
<?php
function authenticate() {
  if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(['error' => 'You must be logged in to access this resource']);
    exit;
  }
}
