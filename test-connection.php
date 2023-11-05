<?php
$dsn = 'mysql:host=localhost;dbname=Timeline1;charset=utf8mb4';
$username = 'user1';
$password = '1234';
$options = [];
try {
    $dbh = new PDO($dsn, $username, $password, $options);
    echo "Połączono z bazą danych.";
} catch (PDOException $e) {
    echo "Błąd połączenia: " . $e->getMessage();
}
/*
function displayEvents() {
    global $dbh;
    try {
        $stmt = $dbh->query('SELECT * FROM Events');
        $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($events as $event) {
            echo "Event ID: " . $event['event_id'] . "<br>";
            echo "Event Name: " . $event['event_name'] . "<br>";
            echo "Start Date: " . $event['start_date'] . "<br>";
            echo "End Date: " . $event['end_date'] . "<br>";
            echo "Description: " . $event['description'] . "<br>";
            echo "Image URL: " . $event['image_url'] . "<br>";
            echo "Category ID: " . $event['category_id'] . "<br><br>";
        }
    } catch (PDOException $e) {
        echo "Błąd zapytania: " . $e->getMessage();
    }
}


displayEvents();
*/


function updateCategory($data) {
    global $dbh;
                
    if (isset($data['category_name'], $data['graphic_feature'], $data['category_id'])) {
        $stmt = $dbh->prepare("UPDATE Categories SET category_name=?, graphic_feature=? WHERE category_id=?");
        if ($stmt->execute([$data['category_name'], $data['graphic_feature'], $data['category_id']])) {
            echo json_encode(["message" => "Category updated successfully."]);
        } else {
            echo json_encode(["message" => "Category update failed."]);
        }
    } else {
        echo json_encode(["message" => "Invalid input."]);
    }
}

// Dane do zaktualizowania
$data = [
    'category_id' => 1,
    'category_name' => 'Koncerty Rockowwwww',
    'graphic_feature' => '#F3FDE8'
];

// Wywołanie funkcji updateCategory z podstawionymi danymi
updateCategory($data);



if (session_status() == PHP_SESSION_ACTIVE) {
    echo "Sesja jest aktywna.";
} else {
    echo "Sesja nie jest aktywna.";
}
?>
