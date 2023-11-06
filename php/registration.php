<?php

header("Access-Control-Allow-Origin: http://localhost:8001");  // Zastąp 8001 portem, na którym działa Twoja aplikacja React
header("Access-Control-Allow-Methods: POST, OPTIONS");  // Dopuszcza tylko zapytania POST
header("Access-Control-Allow-Headers: Content-Type");  // Zezwala na nagłówki Content-Type
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Respond to the preflight request
    exit;
}

include_once 'connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if(isset($data->username) && isset($data->password)){
        $username = htmlspecialchars(strip_tags($data->username));
        $password = password_hash(htmlspecialchars(strip_tags($data->password)), PASSWORD_BCRYPT);  // Zmienione na PASSWORD_BCRYPT
        
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
