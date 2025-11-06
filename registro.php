<?php
// Iniciar sesión para poder leerla (si es que ya está iniciada)
session_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Cuenta | La Joya</title>
    <link rel="stylesheet" href="login.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet">
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

    <main class="login-container">
        <div class="login-box">
            <h2>Crear una Cuenta</h2>
            
            <form action="procesar_registro.php" method="POST">
                
                <div class="input-group">
                    <label for="nombre">Nombre Completo</label>
                    <input type="text" id="nombre" name="nombre" placeholder="Tu Nombre Completo" required>
                </div>
                
                <div class="input-group">
                    <label for="email">Correo Electrónico</label>
                    <input type="email" id="email" name="email" placeholder="ejemplo@correo.com" required>
                </div>
                
                <div class="input-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" placeholder="••••••••" required>
                </div>
                
                <div class="input-group">
                    <label for="password_confirm">Confirmar Contraseña</label>
                    <input type="password" id="password_confirm" name="password_confirm" placeholder="••••••••" required>
                </div>
                
                <button type="submit" class="submit-btn">
                    REGISTRARME
                </button>
                
                <p class="register-link" style="margin-top: 20px;">
                    ¿Ya tienes cuenta? <a href="login.php">Inicia Sesión aquí</a>
                </p>
                
            </form>
        </div>
    </main>
</body>
</html>