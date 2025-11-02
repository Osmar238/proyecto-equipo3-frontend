// portal_trabajador.js
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SEGURIDAD: Proteger la página ---
    const usuarioJSON = localStorage.getItem('usuario');
    
    if (usuarioJSON) {
        const usuario = JSON.parse(usuarioJSON);
        
        // Si el rol NO es Trabajador, lo sacamos.
        if (usuario.rol !== 'Trabajador') {
            alert('Acceso denegado. Esta página es solo para trabajadores.');
            window.location.href = 'index.html';
        }
    } else {
        // Si no hay usuario logueado, lo sacamos.
        alert('Por favor, inicia sesión como trabajador.');
        window.location.href = 'login_trabajador.html';
    }

    // --- 2. FUNCIONALIDAD: Mostrar/Ocultar Detalles ---

    const allButtons = document.querySelectorAll('.view-details-btn');

    allButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Busca el div de detalles más cercano dentro de la misma tarjeta
            const details = button.closest('.order-card').querySelector('.order-details');
            
            // Muestra u oculta los detalles
            details.classList.toggle('hidden');

            // Cambia el texto del botón
            if (details.classList.contains('hidden')) {
                button.textContent = 'Ver Detalles ▼';
            } else {
                button.textContent = 'Ocultar Detalles ▲';
            }
        });
    });

});