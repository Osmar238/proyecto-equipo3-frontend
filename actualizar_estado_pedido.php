<?php
// actualizar_estado_pedido.php

session_start();
require 'db_connect.php';

// 1. Seguridad: Verificar que sea Trabajador o Admin
if (!isset($_SESSION['usuario_rol']) || ($_SESSION['usuario_rol'] != 'Trabajador' && $_SESSION['usuario_rol'] != 'Admin')) {
    header("Location: login.php?error=acceso_denegado");
    exit;
}

// 2. Verificar que recibimos los datos
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['pedido_id']) && isset($_POST['nuevo_estado'])) {

    $pedido_id = (int)$_POST['pedido_id'];
    $nuevo_estado = $_POST['nuevo_estado']; // ej. "Listo"

    // 3. Preparar la consulta para actualizar el estado del pedido
    $sql = "UPDATE pedidos SET estado = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    
    // "si" = string, integer
    $stmt->bind_param("si", $nuevo_estado, $pedido_id);
    
    // 4. Ejecutar y verificar
    if ($stmt->execute()) {
        // ¡Éxito! Regresamos al portal del trabajador
        header("Location: portal_trabajador.php?exito=pedido_actualizado");
        exit;
    } else {
        // Error
        header("Location: portal_trabajador.php?error=db_error");
        exit;
    }
    
    $stmt->close();
    $conn->close();

} else {
    // Si alguien entra aquí por error
    header("Location: portal_trabajador.php");
    exit;
}
?>