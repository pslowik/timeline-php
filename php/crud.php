<?php

header("Access-Control-Allow-Origin: http://localhost:8001");  // Zastąp 8001 portem, na którym działa Twoja aplikacja React
header("Access-Control-Allow-Methods: POST, OPTIONS");  // Dopuszcza tylko zapytania POST
header("Access-Control-Allow-Headers: Content-Type");  // Zezwala na nagłówki Content-Type
header("Access-Control-Allow-Credentials: true"); 

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Respond to the preflight request
    exit;
}

// Połączenie z bazą danych
include 'connection.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['action'])) {
    $action = $_POST['action'];
    switch ($action) {
        // Dla Events
        case 'createEvent':
            echo createEvent($_POST['data']);
            break;
        case 'getAllFromEvents':
            getAllFromEvents();
            break;
        case 'getEvents':
            getEvents();
            break;
        case 'updateEvent':
            updateEvent($_POST['data']);
            break;
        case 'deleteEvent':
            deleteEvent($_POST['event_id']);
            break;

        // Dla Categories
        case 'createCategory':
            createCategory($_POST['data']);
            break;
        case 'getCategories':
            getCategories();
            break;
        case 'updateCategory':
            $data = json_decode(file_get_contents('php://input'), true);  // Dekoduj dane JSON na tablicę PHP

            updateCategory($data);//($_POST['data']);
            break;
        case 'deleteCategory':
            deleteCategory($_POST['category_id']);
            break;

        // Dla Users
        case 'createUser':
            createUser($_POST['data']);
            break;
        case 'getUsers':
            getUsers();
            break;
        case 'updateUser':
            updateUser($_POST['data']);
            break;
        case 'deleteUser':
            deleteUser($_POST['user_id']);
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

            // CREATE
            function createEvent($data) {
                global $pdo;
                $stmt = $pdo->prepare("INSERT INTO Events (event_name, start_date, end_date, description, category_id) VALUES (?, ?, ?, ?, ?)");
                if ($stmt->execute([$data['event_name'], $data['start_date'], $data['end_date'], $data['description'], $data['category_id']])) {
                    echo json_encode(["message" => "Event created successfully."]);
                } else {
                    echo json_encode(["message" => "Event creation failed."]);
                }
            }

            // READ
            function getAllFromEvents() {
                global $pdo;
                $result = $pdo->query("SELECT * FROM Events");
                $events = $result->fetchAll();
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
                $result = $pdo->query($query);
                $events = $result->fetchAll();
                echo json_encode($events);
            }




            // UPDATE
            function updateEvent($data) {
                global $pdo;
                
                if (isset($data['id'], $data['category_id'], $data['name'], $data['start_date'], $data['end_date'], $data['description'], $data['image_url'])) {
                    $stmt = $pdo->prepare("
                        UPDATE Events 
                        SET category_id=?, event_name=?, start_date=?, end_date=?, description=?, image_url=? 
                        WHERE event_id=?
                    ");
                    if ($stmt->execute([
                        $data['category_id'], 
                        $data['name'], 
                        $data['start_date'], 
                        $data['end_date'], 
                        $data['description'], 
                        $data['image_url'], 
                        $data['id']
                    ])) {
                        echo json_encode(["message" => "Event updated successfully."]);
                    } else {
                        echo json_encode(["message" => "Event update failed."]);
                    }
                } else {
                    echo json_encode(["message" => "Invalid input."]);
                }
            }

            // DELETE
            function deleteEvent($event_id) {
                global $pdo;
                $stmt = $pdo->prepare("DELETE FROM Events WHERE event_id=?");
                if ($stmt->execute([$event_id])) {
                    echo json_encode(["message" => "Event deleted successfully."]);
                } else {
                    echo json_encode(["message" => "Event deletion failed."]);
                }
            }

            //______________
            // CATEGORIES

            //

            // CREATE
            function createCategory($data) {
                global $pdo;
                $stmt = $pdo->prepare("INSERT INTO Categories (category_name, graphic_feature) VALUES (?, ?)");
                if ($stmt->execute([$data['category_name'], $data['graphic_feature']])) {
                    echo json_encode(["message" => "Category created successfully."]);
                } else {
                    echo json_encode(["message" => "Category creation failed."]);
                }
            }

            // READ
            function getCategories() {
                global $pdo;
                $result = $pdo->query("SELECT * FROM Categories");
                $categories = $result->fetchAll();
                echo json_encode($categories);
            }

            // UPDATE
            function updateCategory($data) {
                global $pdo;
                
                if (isset($data['category_name']) && isset($data['graphic_feature']) && isset($data['category_id'])) {
                    $stmt = $pdo->prepare("UPDATE Categories SET category_name=?, graphic_feature=? WHERE category_id=?");
                    if ($stmt->execute([$data['category_name'], $data['graphic_feature'], $data['category_id']])) {
                        echo json_encode(["message" => "Category updated successfully."]);
                    } else {
                        echo json_encode(["message" => "Category update failed."]);
                    }
                } else {
                    echo json_encode(["message" => "Invalid input."]);
                }
            }
            

            // DELETE
            function deleteCategory($category_id) {
                global $pdo;
                $stmt = $pdo->prepare("DELETE FROM Categories WHERE category_id=?");
                if ($stmt->execute([$category_id])) {
                    echo json_encode(["message" => "Category deleted successfully."]);
                } else {
                    echo json_encode(["message" => "Category deletion failed."]);
                }
            }


            //______________
            // USERS

            //

            // CREATE
            function createUser($data) {
                global $pdo;
                $stmt = $pdo->prepare("INSERT INTO Users (username, password_hash, salt, role) VALUES (?, ?, ?, ?)");
                if ($stmt->execute([$data['username'], $data['password_hash'], $data['salt'], $data['role']])) {
                    echo json_encode(["message" => "User created successfully."]);
                } else {
                    echo json_encode(["message" => "User creation failed."]);
                }
            }

            // READ
            function getUsers() {
                global $pdo;
                $result = $pdo->query("SELECT * FROM Users");
                $users = $result->fetchAll();
                echo json_encode($users);
            }

            // UPDATE
            function updateUser($data) {
                global $pdo;
                $stmt = $pdo->prepare("UPDATE Users SET username=?, password_hash=?, salt=?, role=? WHERE user_id=?");
                if ($stmt->execute([$data['username'], $data['password_hash'], $data['salt'], $data['role'], $data['user_id']])) {
                    echo json_encode(["message" => "User updated successfully."]);
                } else {
                    echo json_encode(["message" => "User update failed."]);
                }
            }

            // DELETE
            function deleteUser($user_id) {
                global $pdo;
                $stmt = $pdo->prepare("DELETE FROM Users WHERE user_id=?");
                if ($stmt->execute([$user_id])) {
                    echo json_encode(["message" => "User deleted successfully."]);
                } else {
                    echo json_encode(["message" => "User deletion failed."]);
                }
            }
            ?>

