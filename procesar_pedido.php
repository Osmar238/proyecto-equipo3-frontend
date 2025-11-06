<?php
// procesar_pedido.php

session_start();
require 'db_connect.php';

// 1. Seguridad: Verificar que el usuario está logueado
if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit;
}

// 2. Seguridad: Verificar que el carrito no esté vacío
if (empty($_SESSION['carrito'])) {
    header("Location: index.php?error=carrito_vacio");
    exit;
}

// 3. Verificar que los datos del formulario llegaron
if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST['pickup_time'])) {
    
    $usuario_id = $_SESSION['usuario_id'];
    $hora_recoleccion = $_POST['pickup_time'];
    $total_general = 0;
    
    // 4. (Re-calculo) Obtener productos y calcular total (¡Importante! Nunca confíes en el total del frontend)
    $ids_producto = array_map('intval', array_keys($_SESSION['carrito']));
    $ids_string = implode(',', $ids_producto);
    
    $productos_db = [];
    if (!empty($ids_string)) {
        $sql = "SELECT * FROM productos WHERE id IN ($ids_string)";
        $resultado = $conn->query($sql);
        while($fila = $resultado->fetch_assoc()) {
            $productos_db[$fila['id']] = $fila;
        }
    }

    // Calcular el total en el servidor
    foreach ($_SESSION['carrito'] as $id_producto => $cantidad) {
        if (isset($productos_db[$id_producto])) {
            $total_general += $productos_db[$id_producto]['precio'] * $cantidad;
        }
    }
    
    // 5. Iniciar la "Transacción" (para seguridad de la base de datos)
    $conn->begin_transaction();
    
    try {
        // 6. Insertar en la tabla 'pedidos' (la orden general)
        $sql_pedido = "INSERT INTO pedidos (usuario_id, hora_recoleccion, total) VALUES (?, ?, ?)";
        $stmt_pedido = $conn->prepare($sql_pedido);
        $stmt_pedido->bind_param("isd", $usuario_id, $hora_recoleccion, $total_general);
        $stmt_pedido->execute();
        
        // 7. Obtener el ID del pedido que acabamos de crear
        $pedido_id = $conn->insert_id;

        // 8. Insertar cada producto en la tabla 'pedidos_detalle'
        $sql_detalle = "INSERT INTO pedidos_detalle (pedido_id, producto_id, cantidad) VALUES (?, ?, ?)";
        $stmt_detalle = $conn->prepare($sql_detalle);
        
        foreach ($_SESSION['carrito'] as $id_producto => $cantidad) {
            $stmt_detalle->bind_param("iii", $pedido_id, $id_producto, $cantidad);
            $stmt_detalle->execute();
        }
        
        // 9. Si todo salió bien, confirma los cambios
        $conn->commit();
        
        // 10. Limpiar el carrito de la sesión
        unset($_SESSION['carrito']);
        
        // 11. Redirigir a la página de confirmación
        // Le pasamos el ID del pedido para que la página de gracias pueda mostrarlo
        header("Location: confirmacion.php?pedido_id=" . $pedido_id);
        exit;
        
    } catch (mysqli_sql_exception $exception) {
        // 9b. Si algo falló, deshace todos los cambios
        $conn->rollback();
        // Manejar el error (ej. redirigir a una página de error)
        echo "Error al procesar el pedido. Por favor, inténtalo de nuevo.";
        // O redirigir:
        // header("Location: checkout_step1.php?error=procesamiento");
        // exit;
    }

} else {
    // Si no enviaron la hora de recolección
    header("Location: checkout_step1.php?error=falta_horario");
    exit;
}
?>