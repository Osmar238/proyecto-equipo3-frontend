<?php
// procesar_crear_trabajador.php

session_start();
require 'db_connect.php';

// 1. Seguridad: Verificar que el usuario sea Admin
if (!isset($_SESSION['usuario_rol']) || $_SESSION['usuario_rol'] != 'Admin') {
    header("Location: login.php?error=acceso_denegado");
    exit;
}

// 2. Verificar que los datos lleguen por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 3. Obtener los datos del formulario
    $nombre = $_POST['worker-name'];
    $email = $_POST['worker-email'];
    $password_plana = $_POST['worker-pass'];

    // 4. VALIDACIÓN: ¿El email ya existe?
    $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        // El email ya está registrado
        $stmt->close();
        header("Location: portal_admin.php?vista=workers&error=email_existe");
        exit;
    }
    $stmt->close();

    // 5. Encriptar la contraseña
    $password_hash = password_hash($password_plana, PASSWORD_DEFAULT);

    // 6. Insertar el nuevo usuario en la base de datos CON ROL DE TRABAJADOR
    $stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, 'Trabajador')");
    $stmt->bind_param("sss", $nombre, $email, $password_hash);
    
    if ($stmt->execute()) {
        // 7. Si fue exitoso, regresa al portal de admin
        header("Location: portal_admin.php?vista=workers&exito=trabajador_creado");
        exit;
    } else {
        // Si falló la base de datos
        header("Location: portal_admin.php?vista=workers&error=db_error");
        exit;
    }
    
    $stmt->close();
    $conn->close();

} else {
    // Si alguien intenta acceder a este archivo directamente
    header("Location: portal_admin.php");
    exit;
}
?>