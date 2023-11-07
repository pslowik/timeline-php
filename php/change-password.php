<?php
include 'config.php';

header("Access-Control-Allow-Origin: $APP_URL");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

include_once 'connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if(isset($data->username) && isset($data->currentPassword) && isset($data->newPassword)){
        $username = $data->username;
        $currentPassword = $data->currentPassword;
        $newPassword = password_hash($data->newPassword, PASSWORD_BCRYPT);
        
        $stmt = $pdo->prepare('SELECT password_hash FROM Users WHERE username = :username');
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($currentPassword, $user['password_hash'])) {
            $stmt = $pdo->prepare('UPDATE Users SET password_hash = :password WHERE username = :username');
            if($stmt->execute([':username' => $username, ':password' => $newPassword])){
                echo json_encode(["message" => "Password updated successfully."]);
            } else {
                echo json_encode(["message" => "Password update failed."]);
            }
        } else {
            echo json_encode(["message" => "Incorrect current password."]);
        }
    } else {
        echo json_encode(["message" => "Invalid input."]);
    }
}
?>
