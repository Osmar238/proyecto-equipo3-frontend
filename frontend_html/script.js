// script.js

// ------------------------------------
// 1. FUNCIONALIDAD: MENÚ DE NAVEGACIÓN FIJO (Sticky Navbar)
// (Esto se queda igual)
// ------------------------------------

const mainNavbar = document.querySelector('.main-nav');
const smallNavbar = document.querySelector('.top-bar');

function stickyNavbar(navbarElement) {
    if (!navbarElement) return; 

    let stickyPosition = navbarElement.offsetTop;

    if (window.pageYOffset >= stickyPosition) {
        navbarElement.classList.add("sticky");
    } else {
        navbarElement.classList.remove("sticky");
    }
}

window.onscroll = function() {
    stickyNavbar(mainNavbar);
    stickyNavbar(smallNavbar);
};


// ------------------------------------
// 2. FUNCIONALIDAD: CONTROL DE CANTIDAD (Solo en detalle_producto.html)
// (Esto se queda igual)
// ------------------------------------

const qtyInput = document.getElementById('qty');
const btnMinus = document.querySelector('.qty-btn-minus');
const btnPlus = document.querySelector('.qty-btn-plus');

if (qtyInput && btnMinus && btnPlus) {

    btnMinus.addEventListener('click', () => {
        let currentValue = parseInt(qtyInput.value);
        let minValue = parseInt(qtyInput.min);

        if (currentValue > minValue) {
            qtyInput.value = currentValue - 1;
        }
    });

    btnPlus.addEventListener('click', () => {
        let currentValue = parseInt(qtyInput.value);
        qtyInput.value = currentValue + 1;
    });
}


// ------------------------------------
// 3. FUNCIONALIDAD: LÓGICA DEL CARRITO (INDEX)
// ------------------------------------

// --- FUNCIONES DEL CARRITO ---

/**
 * Obtiene el carrito desde localStorage.
 * @returns {Array} El carrito (una lista de productos)
 */
function getCart() {
    // Intenta obtener el carrito. Si no existe, devuelve un array vacío [].
    const cart = localStorage.getItem('panaderiaCart');
    return cart ? JSON.parse(cart) : [];
}

/**
 * Guarda el carrito en localStorage.
 * @param {Array} cart - El array del carrito que se va a guardar.
 */
function saveCart(cart) {
    localStorage.setItem('panaderiaCart', JSON.stringify(cart));
}

/**
 * Actualiza el contador del botón "CARRITO" en la navegación.
 */
function updateCartCounter() {
    const cart = getCart();
    const cartCounter = document.getElementById('cart-counter');
    
    // Suma la 'cantidad' de CADA producto en el carrito
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
    });

    if (cartCounter) {
        if (totalItems > 0) {
            cartCounter.textContent = `(${totalItems})`; // Muestra (3)
        } else {
            cartCounter.textContent = ''; // Lo deja vacío
        }
    }
}


// --- LÓGICA DE LAS TARJETAS DE PRODUCTO ---

// Seleccionar TODAS las tarjetas de producto
const allProductCards = document.querySelectorAll('.product-card');

allProductCards.forEach(card => {
    
    // Encontrar los elementos DENTRO de esta tarjeta específica
    const qtySelector = card.querySelector('.quantity-selector');
    const addButton = card.querySelector('.btn-add-index');
    const qtyInput = card.querySelector('.qty-input-index');
    
    // Si falta algún elemento, saltamos esta tarjeta
    if (!qtySelector || !addButton || !qtyInput) return;

    // 1. Evento principal: Clic en la tarjeta (para mostrar/ocultar)
    card.addEventListener('click', () => {
        // No mostramos el selector si ya está "agregado"
        if (addButton.disabled) return;
        
        // Muestra u oculta el selector de ESTA tarjeta
        qtySelector.classList.toggle('visible');
    });

    // 2. Detener propagación del selector
    // (Evita que al hacer clic en el input se cierre la tarjeta)
    qtySelector.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // 3. Evento del botón "AGREGAR" (PASO 1 y 2)
    addButton.addEventListener('click', (event) => {
        // Detenemos la propagación para que no se cierre la tarjeta
        event.stopPropagation(); 

        // --- PASO 1: GUARDAR EN MEMORIA ---

        // Leer los datos del producto
        const productName = card.querySelector('.name').textContent;
        const productPrice = card.querySelector('.price').textContent;
        const quantity = parseInt(qtyInput.value);

        // Obtener el carrito actual
        let cart = getCart();

        // Revisar si el producto YA ESTÁ en el carrito
        let itemInCart = cart.find(item => item.name === productName);

        if (itemInCart) {
            // Si ya está, solo actualiza la cantidad
            itemInCart.quantity += quantity;
        } else {
            // Si es nuevo, lo agrega como un objeto
            cart.push({
                name: productName,
                price: productPrice,
                quantity: quantity
            });
        }

        // Guardar el carrito actualizado en localStorage
        saveCart(cart);

        
        // --- PASO 2: RETROALIMENTACIÓN VISUAL (CORREGIDA) ---

        // 2a. Cambiar el botón "Agregar"
        addButton.textContent = '¡Agregado! ✔️';
        addButton.disabled = true; // Deshabilita el botón
        
        // ¡¡NO OCULTAMOS EL SELECTOR TODAVÍA!!

        // 2b. Actualizar el contador del carrito en el nav
        updateCartCounter();

        // 2c. Revertir el botón Y AHORA SÍ OCULTAR el selector (después de 2 seg)
        setTimeout(() => {
            addButton.textContent = 'Agregar';
            addButton.disabled = false;
            qtyInput.value = '1'; // Resetea la cantidad a 1
            
            // LA LÍNEA AHORA VA AQUÍ:
            qtySelector.classList.remove('visible'); // Oculta el selector

        }, 2000); // 2000 milisegundos = 2 segundos
    });
});

// --- INICIALIZACIÓN DE LA PÁGINA ---
// Al cargar la página, actualiza el contador por si ya había
// algo en el carrito de una sesión anterior.
document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
});