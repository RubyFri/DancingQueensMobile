<?php
class BookingModel extends Database {

    public function getBookings($limit) {
        $query = "SELECT * FROM bookings ORDER BY booking_id ASC LIMIT ?";
        $params = [$limit];
        return $this->select($query, $params);
    }

    public function deleteBookingById($bookingId) {
        $query = "DELETE FROM bookings WHERE booking_id = ?";
        $params = [$bookingId];
        try {
            $stmt = $this->executeStatement($query, $params);
            $stmt->close();
            return true;
        } catch (Exception $e) {
            throw New Exception($e->getMessage());
        }
        return false;
    }
    public function createBooking($username, $dancers) {
        $query = "INSERT INTO bookings (username, dancers) VALUES (?, ?)";
        return $this->executeStatement($query, [$username, $dancers]);
      }
    public function updateBooking($bookingId, $username, $dancers) {
    $query = "UPDATE bookings SET username = ?, dancers = ? WHERE booking_id = ?";
    return $this->executeStatement($query, [$username, $dancers, $bookingId]);
    }
}
