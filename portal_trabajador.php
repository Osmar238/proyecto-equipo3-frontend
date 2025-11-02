<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>La Joya - Portal de Trabajador</title>
    
    <link rel="stylesheet" href="login.css"> 
    <link rel="stylesheet" href="portal_trabajador.css">
    
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet">
</head>
<body>

    <header class="top-bar">
        <h1 class="logo-small">
            <a href="index.html">La Joya</a>
        </h1>
        <nav class="small-nav">
            <ul>
                <li class="login-item"></li>
            </ul>
        </nav>
    </header>

    <main class="portal-container">
        <h2>Pedidos Pendientes</h2>
        
        <div class="order-list">
            
            <div class="order-card">
                <div class="order-header">
                    <h3>Pedido #LJ-1901</h3>
                    <div class="order-info">
                        <span>Cliente: <strong>Osmar Arevalo</strong></span>
                        <span>Recoge: <strong>11:00 AM - 12:00 PM</strong></span>
                    </div>
                    <button class="view-details-btn">Ver Detalles ▼</button>
                    <button class="complete-btn">Marcar como Listo</button>
                </div>
                <div class="order-details hidden">
                    <ul>
                        <li><strong>2 x</strong> Concha de Chocolate</li>
                        <li><strong>1 x</strong> Cuernito</li>
                        <li><strong>4 x</strong> Dona de Azúcar</li>
                    </ul>
                </div>
            </div>

            <div class="order-card">
                <div class="order-header">
                    <h3>Pedido #LJ-1902</h3>
                    <div class="order-info">
                        <span>Cliente: <strong>Ana López</strong></span>
                        <span>Recoge: <strong>1:00 PM - 2:00 PM</strong></span>
                    </div>
                    <button class="view-details-btn">Ver Detalles ▼</button>
                    <button class="complete-btn">Marcar como Listo</button>
                </div>
                <div class="order-details hidden">
                    <ul>
                        <li><strong>6 x</strong> Puerquito</li>
                        <li><strong>2 x</strong> Bisquet</li>
                    </ul>
                </div>
            </div>

            <div class="order-card completed">
                <div class="order-header">
                    <h3>Pedido #LJ-1900</h3>
                    <div class="order-info">
                        <span>Cliente: <strong>(Cliente)</strong></span>
                        <span>Recoge: <strong>10:00 AM - 11:00 AM</strong></span>
                    </div>
                    <button class="view-details-btn">Ver Detalles ▼</button>
                    <button class="complete-btn" disabled>Listo ✔</button>
                </div>
                <div class="order-details hidden">
                    <ul>
                        <li><strong>1 x</strong> Muffin</li>
                    </ul>
                </div>
            </div>

        </div>
        
    </main>

    <script src="auth.js" defer></script>
    <script src="portal_trabajador.js" defer></script>
</body>
</html>