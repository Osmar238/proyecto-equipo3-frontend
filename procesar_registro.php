<?php
// procesar_registro.php

// 1. Iniciar sesión y conectarse a la DB
session_start();
require 'db_connect.php';

// 2. Verificar que los datos lleguen por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 3. Obtener los datos del formulario
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $password_plana = $_POST['password'];
    $password_confirm = $_POST['password_confirm'];

    // 4. VALIDACIÓN: ¿Las contraseñas coinciden?
    if ($password_plana !== $password_confirm) {
        // Si no coinciden, regresa al registro con un error
        header("Location: registro.php?error=pass_no_coinciden");
        exit;
    }

    // 5. VALIDACIÓN: ¿El email ya existe?
    $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        // El email ya está registrado
        $stmt->close();
        header("Location: registro.php?error=email_existe");
        exit;
    }
    $stmt->close();

    // 6. Si todo está bien, encriptar la contraseña (¡MUY IMPORTANTE!)
    $password_hash = password_hash($password_plana, PASSWORD_DEFAULT);

    // 7. Insertar el nuevo usuario en la base de datos
    $stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, 'Cliente')");
    $stmt->bind_param("sss", $nombre, $email, $password_hash);
    
    if ($stmt->execute()) {
        // 8. Si fue exitoso, redirige al login con un mensaje de éxito
        header("Location: login.php?exito=registro_completo");
        exit;
    } else {
        // Si falló la base de datos
        header("Location: registro.php?error=db_error");
        exit;
    }
    
    $stmt->close();
    $conn->close();

} else {
    // Si alguien intenta acceder a este archivo directamente
    header("Location: registro.php");
    exit;
}
?>