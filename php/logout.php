<?php
include 'config.php';

header("Access-Control-Allow-Origin: $APP_URL");
header("Access-Control-Allow-Methods: POST, OPTIONS");  // Dopuszcza tylko zapytania POST
header("Access-Control-Allow-Headers: Content-Type");  // Zezwala na nagłówki Content-Type
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");  // Dodana linia
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Respond to the preflight request
    exit;
}

include 'connection.php';
// Rozpocznij sesję, jeśli jeszcze nie została rozpoczęta
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Usuń wszystkie zmienne sesji
session_unset();

// Zniszcz sesję
session_destroy();

// Odpowiedz z komunikatem o powodzeniu
echo json_encode(['message' => 'Logged out successfully']);
?>
