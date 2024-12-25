<?php
require_once 'db.php';

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    // Выполняем запрос к базе данных для проверки пользователя
    $sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        // Пользователь найден, устанавливаем сессию
        $_SESSION['logged_in'] = true;
        header('Location: dashboard.php'); // Переход на страницу профиля или панели управления
        exit;
    } else {
        echo "Неверная почта или пароль.";
    }
}
?>