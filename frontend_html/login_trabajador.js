// login_trabajador.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-box form');
    
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const nombreUsuario = email.split('@')[0];

        // ACTUALIZACIÓN: Guardamos también el email
        const usuario = {
            nombre: nombreUsuario,
            email: email, // <--- LÍNEA NUEVA
            rol: 'Trabajador'
        };
        localStorage.setItem('usuario', JSON.stringify(usuario));

        // Redirigimos al portal de trabajador (que crearemos después)
        window.location.href = 'portal_trabajador.html';
    });
});