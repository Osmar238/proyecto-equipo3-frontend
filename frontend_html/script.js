// script.js

// ------------------------------------
// 1. FUNCIONALIDAD: MENÚ DE NAVEGACIÓN FIJO (Sticky Navbar)
// Funciona en index.html y detalle_producto.html
// ------------------------------------

// Selectores para el menú principal (index.html) y el menú pequeño (detalle_producto.html)
const mainNavbar = document.querySelector('.main-nav');
const smallNavbar = document.querySelector('.top-bar');

function stickyNavbar(navbarElement) {
    if (!navbarElement) return; // Salir si el elemento no existe en esta página

    let stickyPosition = navbarElement.offsetTop;

    if (window.pageYOffset >= stickyPosition) {
        navbarElement.classList.add("sticky");
    } else {
        navbarElement.classList.remove("sticky");
    }
}

// Asignar la función de scroll para ambos menús (solo funcionará en la página donde exista)
window.onscroll = function() {
    // Si estás en index.html, usa el mainNavbar.
    stickyNavbar(mainNavbar);
    // Si estás en detalle_producto.html, usa el smallNavbar.
    stickyNavbar(smallNavbar);
};


// ------------------------------------
// 2. FUNCIONALIDAD: CONTROL DE CANTIDAD (Solo en detalle_producto.html)
// ------------------------------------

// Obtener elementos
const qtyInput = document.getElementById('qty');
const btnMinus = document.querySelector('.qty-btn-minus');
const btnPlus = document.querySelector('.qty-btn-plus');

// Comprobar que los elementos existen antes de añadir eventos (solo en página de detalle)
if (qtyInput && btnMinus && btnPlus) {

    // Función para decrementar la cantidad
    btnMinus.addEventListener('click', () => {
        let currentValue = parseInt(qtyInput.value);
        let minValue = parseInt(qtyInput.min);

        if (currentValue > minValue) {
            qtyInput.value = currentValue - 1;
        }
    });

    // Función para incrementar la cantidad
    btnPlus.addEventListener('click', () => {
        let currentValue = parseInt(qtyInput.value);
        qtyInput.value = currentValue + 1;
    });
}