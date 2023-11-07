<?php
include 'config.php';

header("Access-Control-Allow-Origin: $APP_URL");
header("Access-Control-Allow-Methods: POST, OPTIONS");  // Dopuszcza tylko zapytania POST
header("Access-Control-Allow-Headers: Content-Type");  // Zezwala na nagłówki Content-Type
header("Access-Control-Allow-Credentials: true"); 

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    //  preflight request
    exit;
}

// Połączenie z bazą danych
include 'connection.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['action'])) {
    $action = $_POST['action'];
    switch ($action) {
        // Dla Events
        case 'getAllFromEvents':
            getAllFromEvents();
            break;
        case 'getEvents':
            getEvents();
            break;

        // Dla Categories
        case 'getCategories':
            getCategories();
            break;

        default:
            echo json_encode(['error' => 'Nieznana akcja']);
            break;
    }
}

// Funkcje dla operacji CRUD
//______________
// EVENTS
//
// READ
function getAllFromEvents() {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM Events");
    $stmt->execute();
    $events = $stmt->fetchAll();
    echo json_encode($events);
}

function getEvents() {
    global $pdo;
    $query = "
        SELECT 
            `Events`.`event_id`,
            `Events`.`event_name`,
            `Events`.`start_date`,
            `Events`.`end_date`,
            `Events`.`description`,
            `Events`.`image_url`,
            `Categories`.`category_id`,
            `Categories`.`category_name`,
            `Categories`.`graphic_feature`
        FROM `Events`
        JOIN `Categories` ON `Events`.`category_id` = `Categories`.`category_id`
        WHERE 1
        ORDER BY `Events`.`start_date` ASC
    ";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $events = $stmt->fetchAll();
    echo json_encode($events);
}

//______________
// CATEGORIES
//
// READ
function getCategories() {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM Categories");
    $stmt->execute();
    $categories = $stmt->fetchAll();
    echo json_encode($categories);
}

?>
