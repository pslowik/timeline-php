<?php
// Połączenie z bazą danych
$mysqli = new mysqli("localhost", "username", "password", "TimelineApp");

// Sprawdzenie połączenia
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}

// Funkcje dla operacji CRUD


//______________
// EVENTS

//

// CREATE
function createEvent($event_name, $start_date, $end_date, $description, $category_id) {
    global $mysqli;
    $stmt = $mysqli->prepare("INSERT INTO Events (event_name, start_date, end_date, description, category_id) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sss", $event_name, $start_date, $end_date, $description, $category_id);
    $stmt->execute();
    $stmt->close();
}

// READ
function getEvents() {
    global $mysqli;
    $result = $mysqli->query("SELECT * FROM Events");
    return $result->fetch_all(MYSQLI_ASSOC);
}

// UPDATE
function updateEvent($event_id, $event_name, $start_date, $end_date, $description, $category_id) {
    global $mysqli;
    $stmt = $mysqli->prepare("UPDATE Events SET event_name=?, start_date=?, end_date=?, description=?, category_id=? WHERE event_id=?");
    $stmt->bind_param("sss", $event_name, $start_date, $end_date, $description, $category_id, $event_id);
    $stmt->execute();
    $stmt->close();
}

// DELETE
function deleteEvent($event_id) {
    global $mysqli;
    $stmt = $mysqli->prepare("DELETE FROM Events WHERE event_id=?");
    $stmt->bind_param("i", $event_id);
    $stmt->execute();
    $stmt->close();
}

//______________
// CATEGORIES

//

// CREATE
function createCategory($category_name, $graphic_feature) {
    global $mysqli;
    $stmt = $mysqli->prepare("INSERT INTO Categories (category_name, graphic_feature) VALUES (?, ?)");
    $stmt->bind_param("ss", $category_name, $graphic_feature);
    $stmt->execute();
    $stmt->close();
}

// READ
function getCategories() {
    global $mysqli;
    $result = $mysqli->query("SELECT * FROM Categories");
    return $result->fetch_all(MYSQLI_ASSOC);
}

// UPDATE
function updateCategory($category_id, $category_name, $graphic_feature) {
    global $mysqli;
    $stmt = $mysqli->prepare("UPDATE Categories SET category_name=?, graphic_feature=? WHERE category_id=?");
    $stmt->bind_param("ssi", $category_name, $graphic_feature, $category_id);
    $stmt->execute();
    $stmt->close();
}

// DELETE
function deleteCategory($category_id) {
    global $mysqli;
    $stmt = $mysqli->prepare("DELETE FROM Categories WHERE category_id=?");
    $stmt->bind_param("i", $category_id);
    $stmt->execute();
    $stmt->close();
}


//______________
// USERS

//

// CREATE
function createUser($username, $password_hash, $salt, $role) {
    global $mysqli;
    $stmt = $mysqli->prepare("INSERT INTO Users (username, password_hash, salt, role) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $username, $password_hash, $salt, $role);
    $stmt->execute();
    $stmt->close();
}

// READ
function getUsers() {
    global $mysqli;
    $result = $mysqli->query("SELECT * FROM Users");
    return $result->fetch_all(MYSQLI_ASSOC);
}

// UPDATE
function updateUser($user_id, $username, $password_hash, $salt, $role) {
    global $mysqli;
    $stmt = $mysqli->prepare("UPDATE Users SET username=?, password_hash=?, salt=?, role=? WHERE user_id=?");
    $stmt->bind_param("ssssi", $username, $password_hash, $salt, $role, $user_id);
    $stmt->execute();
    $stmt->close();
}

// DELETE
function deleteUser($user_id) {
    global $mysqli;
    $stmt = $mysqli->prepare("DELETE FROM Users WHERE user_id=?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->close();
}

?>
