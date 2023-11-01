<?php
include_once 'connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if(isset($data->username) && isset($data->password)){
        $username = $data->username;
        $password = password_hash($data->password, PASSWORD_BCRYPT);  // Zmienione na PASSWORD_BCRYPT
        
        $stmt = $pdo->prepare('INSERT INTO Users (username, password_hash) VALUES (:username, :password)');
        if($stmt->execute([':username' => $username, ':password' => $password])){
            echo json_encode(["message" => "User registered successfully."]);
        } else {
            echo json_encode(["message" => "User registration failed."]);
        }
    } else {
        echo json_encode(["message" => "Invalid input."]);
    }
}
?>
