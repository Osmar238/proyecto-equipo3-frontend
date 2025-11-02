<?php
// procesar_login.php

// 1. Iniciar la Sesión
// session_start() es la versión PHP de localStorage. 
// Le dice al servidor que "recuerde" a este usuario.
session_start();

// 2. Incluir nuestro archivo de conexión
require 'db_connect.php';

// 3. Verificar que los datos vienen por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $email = $_POST['email'];
    $password_ingresada = $_POST['password'];

    // 4. Preparar la consulta SQL para evitar inyecciones SQL
    $stmt = $conn->prepare("SELECT id, nombre, email, password, rol FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $resultado = $stmt->get_result();

    // 5. Verificar si se encontró un usuario
    if ($resultado->num_rows == 1) {
        
        $usuario = $resultado->fetch_assoc();

        // 6. Verificar la contraseña encriptada
        if (password_verify($password_ingresada, $usuario['password'])) {
            
            // ¡Contraseña correcta! Guardamos al usuario en la sesión.
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['usuario_nombre'] = $usuario['nombre'];
            $_SESSION['usuario_rol'] = $usuario['rol'];

            // 7. Redirigir según el ROL
            if ($usuario['rol'] == 'Admin') {
                header("Location: portal_admin.php");
            } else if ($usuario['rol'] == 'Trabajador') {
                header("Location: portal_trabajador.php");
            } else {
                header("Location: index.php");
            }
            exit; // Importante: detener el script después de redirigir

        } else {
            // Contraseña incorrecta
            header("Location: login.php?error=pass_incorrecta");
            exit;
        }

    } else {
        // Email no encontrado
        header("Location: login.php?error=email_no_existe");
        exit;
    }

    $stmt->close();
    $conn->close();

} else {
    // Si alguien intenta acceder a este archivo directamente
    header("Location: login.php");
    exit;
}
?>