document.addEventListener('DOMContentLoaded', () => {

    // --- 1. VERIFICACIÓN DE AUTENTICACIÓN ---
    const usuarioJSON = localStorage.getItem('usuario');

    // Si NO hay usuario, lo sacamos de aquí.
    if (!usuarioJSON) {
        window.location.href = 'login.html'; // Redirigir al login
        return; // Detener la ejecución del script
    }

    const usuario = JSON.parse(usuarioJSON);

    // --- 2. RELLENAR DATOS DEL USUARIO ---
    document.getElementById('name').value = usuario.nombre;
    document.getElementById('email').value = usuario.email;

    // --- 3. RENDERIZAR RESUMEN DE COMPRA ---
    const summaryList = document.getElementById('order-summary-list');
    const totalAmountElement = document.getElementById('summary-total-amount');
    
    // Obtenemos el carrito
    const cartJSON = localStorage.getItem('panaderiaCart');
    const cart = cartJSON ? JSON.parse(cartJSON) : [];

    // Filtramos solo los productos seleccionados
    const itemsToCheckout = cart.filter(item => item.isSelected === true);
    
    let total = 0;

    if (itemsToCheckout.length === 0) {
        summaryList.innerHTML = '<p>No hay productos seleccionados.</p>';
    } else {
        itemsToCheckout.forEach(item => {
            const price = parseFloat(item.price.replace('$', ''));
            const subtotal = price * item.quantity;
            total += subtotal;

            // Dibuja el item en el resumen
            const itemElement = document.createElement('p');
            itemElement.innerHTML = `${item.quantity} x ${item.name} <span>$${subtotal.toFixed(2)}</span>`;
            summaryList.appendChild(itemElement);
        });
    }

    // Actualiza el total
    totalAmountElement.textContent = `$${total.toFixed(2)}`;

    // --- 4. RENDERIZAR BOTÓN DE PAYPAL ---
    // (Esto usa la API que cargamos en el HTML)
    paypal.Buttons({
        // Aquí es donde, en un proyecto real, configurarías el pago.
        // Por ahora, solo lo mostramos.
        createOrder: function(data, actions) {
            // Esta función captura los detalles de la transacción
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        // Le decimos a PayPal el total a cobrar
                        value: total.toFixed(2)
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            // Esta función se ejecutaría si el pago es exitoso
            // Aquí llamaríamos a PHP
            alert('¡Pago simulado de PayPal exitoso!');
            // Después del pago, simulamos la confirmación
            simulateOrderConfirmation();
        }
    }).render('#paypal-button-container'); // Dibuja el botón en nuestro div

    // --- 5. LÓGICA DEL BOTÓN DE SIMULACIÓN ---
    const simButton = document.getElementById('sim-confirm-button');
    simButton.addEventListener('click', () => {
        
        // Primero, verificamos que el formulario de recolección esté lleno
        const pickupTime = document.getElementById('pickup-time').value;
        if (!pickupTime) {
            alert('Por favor, selecciona un horario de recolección.');
            return;
        }

        // Si todo está bien, simulamos el pedido
        simulateOrderConfirmation();
    });

    function simulateOrderConfirmation() {
        // Obtenemos el carrito actual
        let currentCart = JSON.parse(localStorage.getItem('panaderiaCart'));
        
        // Filtramos para QUEDARNOS solo con los items NO seleccionados
        let newCart = currentCart.filter(item => item.isSelected === false);
        
        // Guardamos el nuevo carrito (sin los items que "pagó")
        localStorage.setItem('panaderiaCart', JSON.stringify(newCart));

        // Mostramos un mensaje de éxito
        alert('¡Pedido Confirmado! Gracias por tu compra.\nTu carrito ha sido vaciado.');

        // Redirigimos al inicio
        window.location.href = 'index.html';
    }

});