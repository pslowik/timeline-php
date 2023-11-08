<?php

if (session_status() == PHP_SESSION_NONE) {
    // Ustawienia sesji
    ini_set('session.cookie_lifetime', 1800); // 30 minut
    ini_set('session.gc_maxlifetime', 1800); // 30 minut
    //ini_set('session.cookie_secure', '1');
}
session_start();
$host = 'localhost';  // 
$db   = 'Timeline1';  // kef2020_pslowik Timeline1
$user = 'userPW';  // userPW          kef2020_pslowik 
$pass = 'userPW1';          // userPW1 *5-MA-n.z*ae_30W
$charset = 'utf8mb4';

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