// auth.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Revisa si hay un usuario en memoria
    const usuarioJSON = localStorage.getItem('usuario');
    
    // Si NO hay usuario, no hace nada.
    if (!usuarioJSON) {
        return;
    }

    // Si SÍ hay, lo convierte en objeto
    const usuario = JSON.parse(usuarioJSON);

    // 2. Busca el botón de login
    // Usamos querySelector para encontrarlo en cualquier tipo de nav
    const loginItem = document.querySelector('.login-item');

    if (loginItem) {
        // 3. Borra el botón azul y pone el saludo (¡AHORA CON ENLACE!)
        loginItem.innerHTML = `
            <a href="cuenta.html" class="welcome-link">
                <span class="welcome-text">¡Hola, ${usuario.nombre}!</span>
            </a>
            <a href="#" id="logout-button" class="nav-item-small">Cerrar Sesión</a>
        `;
    }

    // 4. Da funcionalidad al botón "Cerrar Sesión"
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault(); // Evita que el enlace # recargue
            
            // Borra al usuario de la memoria
            localStorage.removeItem('usuario');
            
            // Redirige al inicio
            window.location.href = 'index.html';
        });
    }
});