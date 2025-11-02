// cuenta.js
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. AUTENTICACIÓN Y DATOS DE USUARIO ---
    
    // Obtenemos al usuario que guardamos en el login
    const usuarioJSON = localStorage.getItem('usuario');

    // Si NO hay usuario, lo sacamos de aquí.
    if (!usuarioJSON) {
        window.location.href = 'login.html'; // Redirigir al login
        return; // Detener la ejecución del script
    }

    const usuario = JSON.parse(usuarioJSON);

    // --- 2. PERSONALIZAR LA PÁGINA CON DATOS REALES ---

    // Cambiar "Hola, Ana" por "Hola, [Nombre]"
    const sidebarGreeting = document.querySelector('.account-sidebar h2');
    if (sidebarGreeting) {
        sidebarGreeting.textContent = `Hola, ${usuario.nombre}`;
    }

    // Rellenar el formulario de "Mi Perfil"
    const inputName = document.getElementById('name');
    if (inputName) {
        // Usamos el 'nombre' del login. El usuario puede cambiarlo si quiere.
        inputName.value = usuario.nombre;
    }

    const inputEmail = document.getElementById('email');
    if (inputEmail) {
        inputEmail.value = usuario.email;
    }

    // --- 3. LÓGICA DE PESTAÑAS (Movida desde tu HTML) ---
    
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            
            // Si es un enlace de "Cerrar Sesión", no hagas nada aquí
            if (this.classList.contains('logout')) {
                return;
            }

            // Si es un enlace sin vista (como "Direcciones"), no hagas nada
            const viewId = this.getAttribute('data-view');
            if (!viewId) {
                return;
            }

            e.preventDefault(); // Prevenir el salto de ancla (#)
            
            // 1. Limpiar activos del sidebar
            document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // 2. Ocultar todas las vistas de contenido
            document.querySelectorAll('.content-view').forEach(view => {
                view.classList.remove('active');
                view.classList.add('hidden');
            });

            // 3. Mostrar la vista seleccionada
            const targetView = document.getElementById(viewId);
            if (targetView) {
                targetView.classList.remove('hidden');
                targetView.classList.add('active');
            }
        });
    });

    // --- 4. LÓGICA DE CERRAR SESIÓN (Sidebar) ---
    
    const sidebarLogout = document.querySelector('.sidebar-link.logout');
    if (sidebarLogout) {
        sidebarLogout.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Borramos al usuario de la memoria
            localStorage.removeItem('usuario');
            
            // Redirigimos a la página de inicio
            window.location.href = 'index.html';
        });
    }

});