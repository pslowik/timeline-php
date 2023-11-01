<?php

$host = '127.0.0.1';  // Adres hosta bazy danych, zazwyczaj jest to localhost lub 127.0.0.1
$db   = 'TimelineApp';  // Nazwa Twojej bazy danych
$user = 'username';  // Twoja nazwa użytkownika dla bazy danych
$pass = 'password';  // Twoje hasło dla bazy danych
$charset = 'utf8mb4';  // Zestaw znaków używany przez Twoją bazę danych

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>
