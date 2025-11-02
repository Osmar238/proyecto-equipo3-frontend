// login.js
document.addEventListener('DOMContentLoaded', () => {
    // Busca el formulario dentro de .login-box
    const loginForm = document.querySelector('.login-box form');
    
    loginForm.addEventListener('submit', (event) => {
        // Previene que la página se recargue
        event.preventDefault();

        const email = document.getElementById('email').value;
        const nombreUsuario = email.split('@')[0];

        // ACTUALIZACIÓN: Guardamos también el email
        const usuario = {
            nombre: nombreUsuario,
            email: email, // <--- LÍNEA NUEVA
            rol: 'Cliente'
        };
        localStorage.setItem('usuario', JSON.stringify(usuario));
        // Redirigimos al inicio
        window.location.href = 'index.html';
    });
});