<?php

if (session_status() == PHP_SESSION_NONE) {
    // Ustawienia sesji
    ini_set('session.cookie_lifetime', 600); // 10 minut
    ini_set('session.gc_maxlifetime', 600); // 10 minut
    //ini_set('session.cookie_secure', '1');

    

    // Inicjowanie sesji
    //session_start();
}
session_start();
$host = 'localhost';  // Adres hosta bazy danych, zazwyczaj jest to localhost lub 127.0.0.1
$db   = 'Timeline1';  // Nazwa Twojej bazy danych
$user = 'user1';  // Twoja nazwa użytkownika dla bazy danych
$pass = '1234';  // Twoje hasło dla bazy danych
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