<?php
include_once 'connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if(isset($data->username) && isset($data->password)){
        $username = $data->username;
        
        $stmt = $pdo->prepare('SELECT * FROM Users WHERE username = :username');
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch();
        
        if($user && password_verify($data->password, $user['password_hash'])){
            echo json_encode(["message" => "Login successful.", "user" => $user]);
        } else {
            echo json_encode(["message" => "Invalid credentials."]);
        }
    } else {
        echo json_encode(["message" => "Invalid input."]);
    }
}
?>
