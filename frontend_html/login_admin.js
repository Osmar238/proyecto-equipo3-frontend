// login_admin.js
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
            rol: 'Admin'
        };
        localStorage.setItem('usuario', JSON.stringify(usuario));

        // Redirigimos al portal de admin (que crearemos después)
        window.location.href = 'portal_admin.html';
    });
});