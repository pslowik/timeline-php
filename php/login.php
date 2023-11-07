<?php
include 'config.php';

header("Access-Control-Allow-Origin: $APP_URL");
header("Access-Control-Allow-Methods: POST, OPTIONS");  // Dopuszcza tylko zapytania POST
header("Access-Control-Allow-Headers: Content-Type");  // Zezwala na nagłówki Content-Type
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // odpowiedz na preflight request
    exit;
}

include_once 'connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if(isset($data->username) && isset($data->password)){
        $username = $data->username;
        
        $stmt = $pdo->prepare('SELECT * FROM Users WHERE username = :username');
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch();
        
        if($user && password_verify($data->password, $user['password_hash'])){
            //ustawianie session 
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['username'] = $user['username'];
            echo json_encode(["message" => "Login successful.", "user" => $user]);
        } else {
            echo json_encode(["message" => "Invalid credentials."]);
        }
    } else {
        echo json_encode(["message" => "Invalid input."]);
    }
}
?>
