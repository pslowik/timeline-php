<?php

header("Access-Control-Allow-Origin: http://localhost:8001");  // Zastąp 8001 portem, na którym działa Twoja aplikacja React
header("Access-Control-Allow-Methods: POST, OPTIONS, DELETE");  // Dopuszcza tylko zapytania POST, OPTIONS i DELETE
header("Access-Control-Allow-Headers: Content-Type");  // Zezwala na nagłówki Content-Type
header("Access-Control-Allow-Credentials: true"); 

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Respond to the preflight request
    exit;
}

// Połączenie z bazą danych
include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);  // Dekoduj dane JSON na tablicę PHP
    
    if (isset($data['action'])) {
        $action = $data['action'];
        switch ($action) {
            case 'deleteEvent': 
                deleteEvent($data);
                break;
            case 'deleteCategory' : 
                deleteCategory($data);
                break;    
            // ... inne przypadki
            default:
                echo json_encode(["message" => "Invalid action."]);
                break;
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['action'])) {
        $action = $data['action'];
        switch ($action) {
            case 'createCategory':
                createCategory($data);
                break;
            case 'createEvent': 
                createEvent($data);
                break;
            case 'updateCategory':
                updateCategory($data);
                break;
            case 'updateEvent': 
                updateEvent($data);
                break;  
            // ... inne przypadki
            default:
            echo json_encode(["message" => "Invalid action."]);
            break;
        }
    }
} else {
    echo json_encode(["message" => "Invalid request method."]);
}

function createCategory($data) { 
    global $pdo;
    
    if (isset($data['category_name'], $data['graphic_feature'])) {
        $category_name = htmlspecialchars(strip_tags($data['category_name']));
        $graphic_feature = htmlspecialchars(strip_tags($data['graphic_feature']));
        $stmt = $pdo->prepare("INSERT INTO Categories (category_name, graphic_feature) VALUES (?, ?)");
        if ($stmt->execute([$category_name, $graphic_feature])) {
            echo json_encode(["message" => "Category created successfully."]);
        } else {
            echo json_encode(["message" => "Category creation failed."]);
        }
    } else {
        echo json_encode(["message" => "Invalid input."]);
    }
}

function createEvent($data) { 
    global $pdo;
    
    if (isset($data['category_id'], $data['event_name'], $data['start_date'], $data['end_date'], $data['description'], $data['image_url'])) {
        $category_id = htmlspecialchars(strip_tags($data['category_id']));
        $event_name = htmlspecialchars(strip_tags($data['event_name']));
        $start_date = htmlspecialchars(strip_tags($data['start_date']));
        $end_date = htmlspecialchars(strip_tags($data['end_date']));
        $description = htmlspecialchars(strip_tags($data['description']));
        $image_url = htmlspecialchars(strip_tags($data['image_url']));
        $stmt = $pdo->prepare("INSERT INTO Events (category_id, event_name, start_date, end_date, description, image_url) VALUES (?, ?, ?, ?, ?, ?)");
        if ($stmt->execute([$category_id, $event_name, $start_date, $end_date, $description, $image_url])) {
            echo json_encode(["message" => "Event created successfully."]);
        } else {
            echo json_encode(["message" => "Event creation failed."]);
        }
    } else {
        echo json_encode(["message" => "Invalid input."]);
    }
}

function updateCategory($data) {
    global $pdo;
    
    if (isset($data['category_name'], $data['graphic_feature'], $data['category_id'])) {
        $category_name = htmlspecialchars(strip_tags($data['category_name']));
        $graphic_feature = htmlspecialchars(strip_tags($data['graphic_feature']));
        $category_id = htmlspecialchars(strip_tags($data['category_id']));
        $stmt = $pdo->prepare("UPDATE Categories SET category_name=?, graphic_feature=? WHERE category_id=?");
        if ($stmt->execute([$category_name, $graphic_feature, $category_id])) {
            echo json_encode(["message" => "Category updated successfully."]);
        } else {
            echo json_encode(["message" => "Category update failed."]);
        }
    } else {
        echo json_encode(["message" => "Invalid input."]);
    }
}

function updateEvent($data) { 
    global $pdo;
    
    if (isset($data['event_id'], $data['category_id'], $data['event_name'], $data['start_date'], $data['end_date'], $data['description'], $data['image_url'])) {
        $event_id = htmlspecialchars(strip_tags($data['event_id']));
        $category_id = htmlspecialchars(strip_tags($data['category_id']));
        $event_name = htmlspecialchars(strip_tags($data['event_name']));
        $start_date = htmlspecialchars(strip_tags($data['start_date']));
        $end_date = htmlspecialchars(strip_tags($data['end_date']));
        $description = htmlspecialchars(strip_tags($data['description']));
        $image_url = htmlspecialchars(strip_tags($data['image_url']));
        $stmt = $pdo->prepare("UPDATE Events SET category_id=?, event_name=?, start_date=?, end_date=?, description=?, image_url=? WHERE event_id=?");
        if ($stmt->execute([$category_id, $event_name, $start_date, $end_date, $description, $image_url, $event_id])) {
            echo json_encode(["message" => "Event updated successfully."]);
        } else {
            echo json_encode(["message" => "Event update failed."]);
        }
    } else {
        echo json_encode(["message" => "Invalid input."]);
    }
}

function deleteEvent($data) { 
    global $pdo;
    
    if (isset($data['event_id'])) {
        $event_id = htmlspecialchars(strip_tags($data['event_id']));
        $stmt = $pdo->prepare("DELETE FROM Events WHERE event_id=?");
        if ($stmt->execute([$event_id])) {
            echo json_encode(["message" => "Event deleted successfully."]);
        } else {
            echo json_encode(["message" => "Event deletion failed."]);
        }
    } else {
        echo json_encode(["message" => "Invalid input."]);
    }
}

function deleteCategory($data) { 
    global $pdo;
    
    if (isset($data['category_id'])) {
        $category_id = htmlspecialchars(strip_tags($data['category_id']));
        $stmt = $pdo->prepare("DELETE FROM Categories WHERE category_id=?");
        if ($stmt->execute([$category_id])) {
            echo json_encode(["message" => "Category deleted successfully."]);
        } else {
            echo json_encode(["message" => "Category deletion failed."]);
        }
    } else {
        echo json_encode(["message" => "Invalid input."]);
    }
}

?>
