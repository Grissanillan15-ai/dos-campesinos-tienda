// Variables globales
let semillas = [];
let carrito = [];

// Emojis para productos
const emojisProductos = {
    'Tomate': '🍅',
    'Lechuga': '🥬',
    'Zanahoria': '🥕',
    'Pepino': '🥒',
    'Pimiento': '🌶️',
    'Cebolla': '🧅'
};

// Cargar semillas al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarSemillas();
    cargarCarritoDelLocalStorage();
    actualizarContadorCarrito();
});

// Obtener emojis para productos
function obtenerEmoji(nombre) {
    for (let key in emojisProductos) {
        if (nombre.includes(key)) {
            return emojisProductos[key];
        }
    }
    return '🌱';
}

// Cargar semillas desde el servidor
async function cargarSemillas() {
    try {
        const response = await fetch('/api/semillas');
        semillas = await response.json();
        mostrarSemillas(semillas);
    } catch (error) {
        console.error('Error al cargar semillas:', error);
        // Mostrar semillas de ejemplo si hay error
        mostrarSemillas(semillas);
    }
}

// Mostrar semillas en la grid
function mostrarSemillas(items) {
    const grid = document.getElementById('semillas-grid');
    grid.innerHTML = '';

    items.forEach(semilla => {
        const emoji = obtenerEmoji(semilla.nombre);
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <div class="producto-imagen">${emoji}</div>
            <div class="producto-info">
                <h3 class="producto-nombre">${semilla.nombre}</h3>
                <p class="producto-descripcion">${semilla.descripcion}</p>
                <p class="producto-precio">$${semilla.precio.toFixed(2)}</p>
                <div class="producto-cantidad">
                    <input type="number" class="cantidad-input" value="1" min="1" max="${semilla.cantidad}">
                </div>
                <button class="btn btn-primary agregar-carrito" onclick="agregarAlCarrito(${semilla.id}, '${semilla.nombre}', ${semilla.precio})">
                    Agregar al Carrito
                </button>
            </div>
        `;
        grid.appendChild(div);
    });
}

// Filtrar semillas
document.getElementById('buscar').addEventListener('input', (e) => {
    filtrarSemillas();
});

document.getElementById('filtro-precio').addEventListener('change', () => {
    filtrarSemillas();
});

function filtrarSemillas() {
    const busqueda = document.getElementById('buscar').value.toLowerCase();
    const rango = document.getElementById('filtro-precio').value;

    let filtradas = semillas.filter(s => {
        const coincideNombre = s.nombre.toLowerCase().includes(busqueda) || 
                               s.descripcion.toLowerCase().includes(busqueda);
        let coincidePrecio = true;

        if (rango === '0-2') coincidePrecio = s.precio < 2;
        if (rango === '2-3') coincidePrecio = s.precio >= 2 && s.precio < 3;
        if (rango === '3-5') coincidePrecio = s.precio >= 3;

        return coincideNombre && coincidePrecio;
    });

    mostrarSemillas(filtradas);
}

// Agregar al carrito
function agregarAlCarrito(id, nombre, precio) {
    const cantidad = parseInt(document.querySelector(`[onclick*="agregarAlCarrito(${id}"]`)
        .parentElement.querySelector('.cantidad-input').value);

    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({ id, nombre, precio, cantidad });
    }

    guardarCarritoEnLocalStorage();
    actualizarContadorCarrito();
    mostrarNotificacion('Producto agregado al carrito ✅');
}

// Actualizar contador del carrito
function actualizarContadorCarrito() {
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.getElementById('cart-count').textContent = total;
}

// Abrir carrito
function openCart() {
    document.getElementById('cart-modal').classList.add('active');
    mostrarCarrito();
}

// Cerrar carrito
function closeCart() {
    document.getElementById('cart-modal').classList.remove('active');
}

// Mostrar carrito
function mostrarCarrito() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    if (carrito.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666;">Tu carrito está vacío</p>';
        document.getElementById('subtotal').textContent = '0.00';
        document.getElementById('taxes').textContent = '0.00';
        document.getElementById('total').textContent = '0.00';
        return;
    }

    carrito.forEach((item, index) => {
        const subtotalItem = item.precio * item.cantidad;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-info">
                <h3>${item.nombre}</h3>
                <p>Cantidad: ${item.cantidad}</p>
            </div>
            <div class="cart-item-precio">
                $${subtotalItem.toFixed(2)}
                <button class="btn btn-danger" style="display: block; margin-top: 10px;" onclick="eliminarDelCarrito(${index})">
                    Eliminar
                </button>
            </div>
        `;
        cartItems.appendChild(div);
    });

    calcularTotales();
}

// Calcular totales
function calcularTotales() {
    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const taxes = subtotal * 0.10;
    const total = subtotal + taxes;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('taxes').textContent = taxes.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

// Eliminar del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarritoEnLocalStorage();
    actualizarContadorCarrito();
    mostrarCarrito();
    mostrarNotificacion('Producto eliminado del carrito');
}

// Checkout
function checkout() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0) * 1.10;
    alert(`Procederemos al pago de $${total.toFixed(2)}\n\nEsta es una demostración. En un ambiente real, se integraría con Stripe o similar.`);
    
    // Aquí iría la integración con Stripe o tu sistema de pagos
    carrito = [];
    guardarCarritoEnLocalStorage();
    actualizarContadorCarrito();
    closeCart();
    mostrarNotificacion('¡Pedido realizado exitosamente! 🎉');
}

// LocalStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDelLocalStorage() {
    const saved = localStorage.getItem('carrito');
    if (saved) {
        carrito = JSON.parse(saved);
    }
}

// Notificaciones
function mostrarNotificacion(mensaje) {
    const notif = document.createElement('div');
    notif.textContent = mensaje;
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// Scroll suave
function scrollToSemillas() {
    document.getElementById('semillas').scrollIntoView({ behavior: 'smooth' });
}

// Event listener para abrir carrito
document.addEventListener('DOMContentLoaded', () => {
    const cartLink = document.querySelector('.cart-link');
    if (cartLink) {
        cartLink.addEventListener('click', openCart);
    }
});

// Agregar animación de slide-in
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
