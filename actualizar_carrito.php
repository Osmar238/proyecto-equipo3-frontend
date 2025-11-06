<?php
// actualizar_carrito.php

session_start();

// Verificamos que tengamos los datos necesarios
if (isset($_POST['producto_id']) && isset($_POST['accion']) && isset($_SESSION['carrito'])) {

    $id_producto = $_POST['producto_id'];
    $accion = $_POST['accion'];

    // Asegurarnos de que el producto esté en el carrito
    if (isset($_SESSION['carrito'][$id_producto])) {

        switch ($accion) {
            case 'incrementar':
                $_SESSION['carrito'][$id_producto]++;
                break;
            
            case 'decrementar':
                $_SESSION['carrito'][$id_producto]--;
                // Si la cantidad llega a 0, lo eliminamos
                if ($_SESSION['carrito'][$id_producto] <= 0) {
                    unset($_SESSION['carrito'][$id_producto]);
                }
                break;
            
            case 'eliminar':
                unset($_SESSION['carrito'][$id_producto]);
                break;
        }
    }
}

// Sea cual sea la acción, regresamos al carrito
header("Location: cart.php");
exit;
?>