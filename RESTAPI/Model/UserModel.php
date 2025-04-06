
<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";

class UserModel extends Database {
  public function getUsers($limit) {
    return $this->select("SELECT * FROM users ORDER BY username ASC LIMIT ?", [$limit]);
  }

  public function createUser($username, $password) {
    $query = "INSERT INTO users (username, password) VALUES (?, ?)";
    $params = [$username, password_hash($password, PASSWORD_DEFAULT)];
    $types = "ss"; // Both are strings
    return $this->executeStatement($query, $params);
  }

  public function login($username, $password) {
    // Query the database to retrieve the user ID
    $query = "SELECT id FROM users WHERE username = ? AND password = ?";
    $params = [$username, $password];
    $result = $this->db->executeStatement($query, $params);

    // Return the user ID if the login is successful
    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      return $row['id'];
    } else {
      return null;
    }
  }

    public function getUserByUsername($username) {
    $query = "SELECT * FROM users WHERE username = ?";
    $params = [$username];
    $stmt = $this->executeStatement($query, $params);
    $result = $stmt->get_result();
    return $result->fetch_assoc();
    }

}
