<?php
session_start();
// Obtenemos el ID del pedido desde la URL
$pedido_id = $_GET['pedido_id'] ?? 'desconocido';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Pedido Confirmado! | La Joya</title>
    <link rel="stylesheet" href="login.css"> <style>
        .confirmation-container {
            max-width: 600px;
            margin: 50px auto;
            padding: 40px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            text-align: center;
        }
        .confirmation-container h1 {
            color: #28a745;
            font-size: 32px;
            margin-top: 0;
        }
        .confirmation-container p {
            font-size: 18px;
            line-height: 1.6;
        }
        .order-number {
            font-size: 24px;
            font-weight: bold;
            color: #d9534f;
            background-color: #f9f9f9;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
            margin-top: 10px;
        }
        .back-link {
            display: inline-block;
            margin-top: 30px;
            padding: 12px 30px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
        }
    </style>
</head>
<body>

    <header class="top-bar">
        <h1 class="logo-small">
            <a href="index.php">La Joya</a>
        </h1>
        <nav class="small-nav">
            <ul>
                <li><a href="index.php" class="nav-item-small">INICIO</a></li>
                <li><a href="cart.php" class="nav-item-small">CARRITO</a></li>
                <li class="login-item">
                    <?php if (isset($_SESSION['usuario_id'])): ?>
                        <a href="cuenta.php" class="welcome-link">
                            <span class="welcome-text">¡Hola, <?php echo htmlspecialchars($_SESSION['usuario_nombre']); ?>!</span>
                        </a>
                        <a href="cerrar_sesion.php" id="logout-button" class="nav-item-small">Cerrar Sesión</a>
                    <?php else: ?>
                        <a href="login.php" class="btn-login">
                            <span class="icon-user">👤</span> INICIAR SESION
                        </a>
                    <?php endif; ?>
                </li>
            </ul>
        </nav>
    </header>

    <main class="confirmation-container">
        <h1>¡Gracias por tu compra!</h1>
        <p>Tu pedido ha sido confirmado y lo estaremos preparando.</p>
        <p>Tu número de pedido es:</p>
        <span class="order-number">#LJ-<?php echo htmlspecialchars($pedido_id); ?></span>
        <p style="margin-top: 20px;">Por favor, preséntalo al recoger tu orden.</p>
        
        <a href="index.php" class="back-link">Volver al Inicio</a>
    </main>
    
</body>
</html>