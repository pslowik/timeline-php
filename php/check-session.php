<?php
include 'config.php';

header("Access-Control-Allow-Origin: $APP_URL");
header("Access-Control-Allow-Methods: POST, OPTIONS");  // Dopuszcza tylko zapytania POST
header("Access-Control-Allow-Headers: Content-Type");  // Zezwala na nagłówki Content-Type
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

include 'connection.php';

$response = ['isAuthenticated' => false, 'user' => null];

if(isset($_SESSION['user_id']) && isset($_SESSION['username']) && $_SESSION['user_id'] !== '' && $_SESSION['username'] !== '') {
    $response['isAuthenticated'] = true;
    $response['user'] = [
        'user_id' => $_SESSION['user_id'],
        'username' => $_SESSION['username']
    ];
}
echo json_encode($response);
?>
