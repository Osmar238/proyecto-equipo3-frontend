// portal_admin.js
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SEGURIDAD: Proteger la página ---
    const usuarioJSON = localStorage.getItem('usuario');
    
    if (usuarioJSON) {
        const usuario = JSON.parse(usuarioJSON);
        
        // Si el rol NO es Admin, lo sacamos.
        if (usuario.rol !== 'Admin') {
            alert('Acceso denegado. Esta página es solo para administradores.');
            window.location.href = 'index.html';
        }
    } else {
        // Si no hay usuario logueado, lo sacamos.
        alert('Por favor, inicia sesión como administrador.');
        window.location.href = 'login_admin.html';
    }

    // --- 2. FUNCIONALIDAD: Navegación por Pestañas ---
    const tabs = document.querySelectorAll('.admin-tab');
    const views = document.querySelectorAll('.admin-view');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();

            // 1. Quitar 'active' a todas las pestañas y vistas
            tabs.forEach(t => t.classList.remove('active'));
            views.forEach(v => {
                v.classList.remove('active');
                v.classList.add('hidden');
            });

            // 2. Añadir 'active' a la pestaña clicada
            tab.classList.add('active');

            // 3. Mostrar la vista correspondiente
            const viewId = tab.getAttribute('data-view');
            const targetView = document.getElementById(viewId);
            if (targetView) {
                targetView.classList.remove('hidden');
                targetView.classList.add('active');
            }
        });
    });

    // --- 3. FUNCIONALIDAD: Simular creación de trabajador ---
    const createWorkerForm = document.getElementById('create-worker-form');
    if (createWorkerForm) {
        createWorkerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('worker-name').value;
            alert(`¡Trabajador "${name}" creado exitosamente! (Simulación)`);
            // Limpia el formulario
            createWorkerForm.reset();
        });
    }

});