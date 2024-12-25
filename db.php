<?php
$servername = "localhost"; // Имя хоста
$username = "root"; // Имя пользователя БД
$password = "956956"; // Пароль пользователя БД
$dbname = "event_planner_events"; // Название вашей базы данных

// Устанавливаем соединение с базой данных
$conn = new mysqli($localhost, $root, $956956, $event_planner_events);

// Проверяем подключение
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>