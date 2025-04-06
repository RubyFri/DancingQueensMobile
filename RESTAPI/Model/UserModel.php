<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class UserModel extends Database
{
    public function getUsers($limit)
    {
        return $this->select("SELECT * FROM users ORDER BY username ASC LIMIT ?", [ $limit]);
    }
    public function createUser($username, $password) {
        $query = "INSERT INTO users (username, password) VALUES (?, ?)";
        $params = [$username, password_hash($password, PASSWORD_DEFAULT)];  // Make sure these are passed correctly
        $types = "ss";  // Both are strings
        return $this->executeStatement($query, $params);

    }
}