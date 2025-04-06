<?php
class BookingModel extends Database {

    // Returns an array of booking records, limited to `$limit` number of records.
    public function getBookings($limit) {
        $query = "SELECT * FROM bookings ORDER BY booking_id ASC LIMIT ?";
        $params = [$limit];
        return $this->select($query, $params);
    }
     
    // Returns a PDO statement object (`$stmt`) after executing the query.
    public function createBooking($username, $date, $time, $dancers) {
        // Insert the new booking into the database
        $query = "INSERT INTO bookings (username, date, time, dancers) VALUES (?, ?, ?, ?)";
        return $this->executeStatement($query, [$username, $date, $time, $dancers]);
      }

    // Returns a PDO statement object (`$stmt`) after executing the query.
    public function updateBooking($bookingId, $username, $date, $time, $dancers) {
        // first ensures that only users can only updat their own booking
        $query = "SELECT username FROM bookings WHERE booking_id = ?";
        $params = [$bookingId];
        $result = $this->select($query, $params);
        // $username = $_SESSION['username'];
        
        if ($result[0]['username'] !== $username) {
          throw new Exception('You can only update your own bookings');
        }
        $query = "UPDATE bookings SET username = ?, date = ?, time = ?, dancers = ? WHERE booking_id = ?";
        return $this->executeStatement($query, [$username, $date, $time, $dancers, $bookingId]);
        }
         // Returns a PDO statement object (`$stmt`) after executing the query.
        public function deleteBookingById($bookingId) {
        // first ensures that only users can only delete their own booking
        $query = "SELECT username FROM bookings WHERE booking_id = ?";
        $params = [$bookingId];
        $result = $this->select($query, $params);
        $username = $_SESSION['username'];
        
        if ($result[0]['username'] !== $username) {
          throw new Exception('You can only delete your own bookings');
        }
        // Proceed with deleting the booking
        $query = "DELETE FROM bookings WHERE booking_id = ?";
        $params = [$bookingId];

        try {
            $stmt = $this->executeStatement($query, $params);
            $stmt->close();
            return true; // Return true if the booking was successfully deleted
        } catch (Exception $e) {
            throw new Exception('Error deleting booking: ' . $e->getMessage());
        }
}
}
