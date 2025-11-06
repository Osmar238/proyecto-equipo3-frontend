<?php
// gestionar_carrito.php

// 1. Iniciar la sesión para poder acceder a $_SESSION
session_start();

// 2. Verificar que los datos lleguen por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 3. Obtener los datos del formulario
    $producto_id = $_POST['producto_id'];
    $cantidad = (int)$_POST['cantidad']; // Convertir a número entero

    // 4. Validar los datos (básico)
    if ($producto_id > 0 && $cantidad > 0) {

        // 5. Inicializar el carrito en la sesión si no existe
        // $_SESSION['carrito'] será un array asociativo [id_producto => cantidad]
        if (!isset($_SESSION['carrito'])) {
            $_SESSION['carrito'] = [];
        }

        // 6. Lógica para agregar al carrito
        if (isset($_SESSION['carrito'][$producto_id])) {
            // Si el producto ya está en el carrito, suma la nueva cantidad
            $_SESSION['carrito'][$producto_id] += $cantidad;
        } else {
            // Si es un producto nuevo, lo añade al carrito
            $_SESSION['carrito'][$producto_id] = $cantidad;
        }
    }
}

// 7. Redirigir de vuelta al index.php
// El usuario no verá esta página en blanco, será redirigido
// tan rápido que no se dará cuenta.
header("Location: index.php");
exit;
?>