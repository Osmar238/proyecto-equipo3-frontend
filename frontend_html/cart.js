// Espera a que todo el HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // --- SELECTORES ---
    const cartLists = document.querySelectorAll('.cart-items-list');
    const totalAmountElement = document.getElementById('cart-total-amount');

    // --- FUNCIONES DEL CARRITO ---

    /**
     * Obtiene el carrito desde localStorage y se asegura de que
     * todos los items tengan la propiedad 'isSelected'.
     */
    function getCart() {
        const cart = localStorage.getItem('panaderiaCart');
        let parsedCart = cart ? JSON.parse(cart) : [];

        // MODIFICACIÓN: Normaliza los datos
        // Asegura que todos los items tengan la propiedad 'isSelected'.
        let needsUpdate = false;
        parsedCart.forEach(item => {
            if (item.isSelected === undefined) {
                item.isSelected = true; // Por defecto, todo está seleccionado
                needsUpdate = true;
            }
        });

        // Si tuvimos que agregar la propiedad, guarda el carrito actualizado
        if (needsUpdate) {
            saveCart(parsedCart);
        }

        return parsedCart;
    }

    function saveCart(cart) {
        localStorage.setItem('panaderiaCart', JSON.stringify(cart));
    }

    // --- FUNCIÓN PRINCIPAL PARA "DIBUJAR" EL CARRITO ---
    function renderCart() {
        const cart = getCart();

        // 1. Limpiar el contenido actual
        cartLists[0].innerHTML = '';
        cartLists[1].innerHTML = '';

        // 2. Revisar si el carrito está vacío
        if (cart.length === 0) {
            cartLists[0].innerHTML = '<p style="text-align: center; color: #777;">Tu carrito está vacío.</p>';
            updateCartTotal(); 
            return;
        }

        // 3. Dividir el carrito en dos para las columnas
        const midPoint = Math.ceil(cart.length / 2);
        const firstHalf = cart.slice(0, midPoint);
        const secondHalf = cart.slice(midPoint);

        // 4. Función para crear el HTML de cada item
        const createItemHTML = (item) => {
            
            // MODIFICACIÓN: Decide qué clase e ícono usar
            const selectionClass = item.isSelected ? 'checked' : 'unchecked';
            const selectionIcon = item.isSelected ? '✔' : '○';

            // data-name="${item.name}" es crucial para saber qué item modificar
            return `
                <div class="cart-item" data-name="${item.name}">
                    
                    <div class="selection-status ${selectionClass}">${selectionIcon}</div>
                    
                    <img src="${getImageUrl(item.name)}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <p class="item-name">${item.name}</p>
                        <p class="item-price">${item.price}</p>
                    </div>
                    <div class="item-actions">
                        <button class="action-btn trash-btn">🗑</button>
                        <div class="quantity-control">
                            <button class="qty-btn qty-btn-minus">-</button>
                            <span class="qty-display">${item.quantity}</span>
                            <button class="qty-btn qty-btn-plus">+</button>
                        </div>
                    </div>
                </div>
            `;
        };

        // 5. Llenar las columnas
        firstHalf.forEach(item => {
            cartLists[0].innerHTML += createItemHTML(item);
        });
        secondHalf.forEach(item => {
            cartLists[1].innerHTML += createItemHTML(item);
        });

        // 6. Actualizar el total y agregar los eventos a los botones
        updateCartTotal();
        addCartListeners();
    }

    // --- FUNCIÓN PARA CALCULAR EL TOTAL ---
    function updateCartTotal() {
        const cart = getCart();
        let total = 0;

        // MODIFICACIÓN CLAVE:
        // Filtra el carrito PRIMERO para sumar solo los items seleccionados.
        const selectedItems = cart.filter(item => item.isSelected === true);

        selectedItems.forEach(item => {
            // Quita el '$' y convierte el precio a número
            const price = parseFloat(item.price.replace('$', ''));
            total += price * item.quantity;
        });

        // Muestra el total con 2 decimales
        totalAmountElement.textContent = `$${total.toFixed(2)}`;
    }

    // --- FUNCIÓN PARA AGREGAR EVENTOS A LOS BOTONES ---
    function addCartListeners() {
        const cartItems = document.querySelectorAll('.cart-item');

        cartItems.forEach(item => {
            const itemName = item.dataset.name; // Obtiene el nombre del data-name

            // Botón de AUMENTAR (+)
            item.querySelector('.qty-btn-plus').addEventListener('click', () => {
                handleQuantityChange(itemName, 1);
            });

            // Botón de DISMINUIR (-)
            item.querySelector('.qty-btn-minus').addEventListener('click', () => {
                handleQuantityChange(itemName, -1);
            });

            // Botón de ELIMINAR (🗑)
            item.querySelector('.trash-btn').addEventListener('click', () => {
                handleDeleteItem(itemName);
            });

            // NUEVO EVENTO: Clic en el Checkbox (✔/○)
            item.querySelector('.selection-status').addEventListener('click', () => {
                handleToggleSelected(itemName);
            });
        });
    }

    // --- LÓGICA DE EVENTOS ---

    // Maneja el AUMENTO y DISMINUCIÓN
    function handleQuantityChange(name, change) {
        let cart = getCart();
        let item = cart.find(i => i.name === name);

        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                // Si la cantidad llega a 0, elimina el item
                handleDeleteItem(name);
            } else {
                saveCart(cart);
                renderCart(); // Re-dibuja todo
            }
        }
    }

    // Maneja la ELIMINACIÓN
    function handleDeleteItem(name) {
        let cart = getCart();
        // Crea un nuevo carrito filtrando (quitando) el item eliminado
        cart = cart.filter(i => i.name !== name);
        saveCart(cart);
        renderCart(); // Re-dibuja todo
    }
    
    // NUEVA FUNCIÓN: Maneja el clic en el Checkbox
    function handleToggleSelected(name) {
        let cart = getCart();
        let item = cart.find(i => i.name === name);

        if (item) {
            // Invierte el valor de 'isSelected' (true a false, o false a true)
            item.isSelected = !item.isSelected; 
            saveCart(cart);
            renderCart(); // Re-dibuja todo para actualizar el ícono Y el total
        }
    }
    
    // --- FUNCIÓN HELPER PARA IMÁGENES ---
    function getImageUrl(name) {
        const imageMap = {
            'CONCHA DE CHOCOLATE Y VAINILLA': 'conchas.jpg',
            'PUERQUITO': 'puerquito.jpg',
            'OREJAS': 'orejas.jpg',
            'MUFFIN': 'muffin.jpg',
            'BISQUET': 'bisquet.jpg',
            'PAN DE CONCHA RELLENA': 'pan-rellena.jpg',
            'DONA DE AZÚCAR': 'dona-azucar.jpg',
            'CUERNITO': 'cuernito.jpg',
            'DONA DE CHOCOLATE': 'dona-chocolate.jpg',
            'BERLINAS': 'berlinas.jpg'
        };
        // Devuelve la imagen o una por defecto si no la encuentra
        return imageMap[name] || 'default-pan.jpg'; 
    }

    // --- 5. LÓGICA DE FINALIZAR COMPRA (CHECKOUT) ---
    
    // Seleccionamos el botón que acabamos de modificar
    const checkoutButton = document.getElementById('checkout-button');

    if (checkoutButton) {
        checkoutButton.addEventListener('click', (event) => {
            
            // 1. Detenemos la acción por defecto del enlace (el href)
            event.preventDefault();

            // 2. Revisamos si el usuario existe en la memoria
            const usuarioJSON = localStorage.getItem('usuario');

            if (usuarioJSON) {
                // 3. SÍ hay usuario: 
                // Lo dejamos pasar a la página de pago (que crearemos después).
                console.log("Usuario encontrado, yendo a checkout...");
                window.location.href = 'checkout_step1.html';
            } else {
                // 4. NO hay usuario:
                // Lo redirigimos a iniciar sesión.
                console.log("Usuario no encontrado, yendo a login...");
                window.location.href = 'login.html';
            }
        });
    }
    
    // --- INICIALIZACIÓN ---
    // Llama a renderCart() en cuanto carga la página
    renderCart();
});