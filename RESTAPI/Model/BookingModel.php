<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";

class BookingModel extends Database
{
    public function getBookings($limit)
    {
        return $this->select("SELECT * FROM bookings ORDER BY booking_id ASC LIMIT ?", ["i", $limit]);
    }
}
