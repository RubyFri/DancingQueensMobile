<?php
session_start();


require_once PROJECT_ROOT_PATH . "/Model/UserModel.php";



class LoginLogoutController extends BaseController

{

    // Login action

    public function loginAction()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        // Check if the required fields are provided

        if (!isset($data['username']) || !isset($data['password'])) {

            header('HTTP/1.1 400 Bad Request');

            echo json_encode(['error' => 'Username and password are required']);

            exit();

        }

        $username = $data['username'];

        $password = $data['password'];



        // Create UserModel instance

        $userModel = new UserModel();



        // Fetch user from the database by username

        $user = $userModel->getUserByUsername($username);



        // Check if user exists and verify password

        if ($user && password_verify($password, $user['password'])) {

            // Password is correct, set up the session

            $_SESSION['user'] = $user; // Store user details in session

            $_SESSION['username'] = $username; // this is the username whcih can be accessed globally



            $this->sendOutput(

                json_encode(['message' => 'Login successful','session_id' => session_id()]),

                array('Content-Type: application/json', 'HTTP/1.1 200 OK')

            );

        } else {

            // Incorrect login credentials

            header('HTTP/1.1 401 Unauthorized');

            echo json_encode(['error' => 'Invalid username or password']);

        }

    }



    // Logout action

    public function logoutAction() {

      

        // Unset the user's session data

        unset($_SESSION['user']);

      

        // Destroy the session

        session_destroy();

      

        // Return a success response

        http_response_code(200);

        echo json_encode(['message' => 'Logged out successfully']);

      }

}
