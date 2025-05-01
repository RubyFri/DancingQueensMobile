<?php

class DancesModel extends Database {
    // Returns an array of dances
    public function getDances() {
        return $this->select("SELECT * FROM dances ORDER BY dance_id");
    }
     // Returns a PDO statement object (`$stmt`) after executing the query.
     public function createDance($username,  $dancers, $poses) {
        // Insert the new booking into the database
        $query = "INSERT INTO dances (username, dancers, poses) VALUES (?, ?, ?)";
        return $this->executeStatement($query, [$username, $dancers, $poses]);
      }
}
