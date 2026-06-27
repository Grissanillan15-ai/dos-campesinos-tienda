# 🌱 Dos Campesinos - Tienda de Semillas

Tienda web moderna para la venta de semillas para plantar. Una aplicación completa con frontend responsivo y backend funcional.

## 🚀 Características

- ✅ Catálogo de semillas con descripción y precios
- ✅ Sistema de búsqueda y filtrado por precio
- ✅ Carrito de compras funcional
- ✅ Persistencia de datos en localStorage
- ✅ Diseño responsivo y moderno
- ✅ Interfaz intuitiva y amigable
- ✅ Backend con Node.js/Express
- ✅ API REST para semillas

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- Git

## 🔧 Instalación

1. **Clona el repositorio:**
```bash
git clone https://github.com/Grissanillan15-ai/dos-campesinos-tienda.git
cd dos-campesinos-tienda
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Crea el archivo .env:**
```bash
cp .env.example .env
```

4. **Edita el archivo .env con tus configuraciones:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dos-campesinos
JWT_SECRET=tu_clave_secreta_aqui
NODE_ENV=development
```

## ▶️ Uso

### Modo de desarrollo:
```bash
npm run dev
```

### Modo de producción:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:5000`

## 📁 Estructura del Proyecto

```
dos-campesinos-tienda/
├── public/
│   ├── index.html          # Página principal
│   ├── styles.css          # Estilos CSS
│   └── app.js              # Lógica JavaScript
├── server.js               # Servidor Express
├── package.json            # Dependencias
├── .env.example            # Ejemplo de variables de entorno
├── .gitignore              # Archivos a ignorar
└── README.md               # Este archivo
```

## 🛒 Funcionalidades Principales

### Catálogo de Semillas
- Visualización de productos con emojis y descripciones
- Precios claros y actualizados
- Información de disponibilidad

### Búsqueda y Filtrado
- Búsqueda en tiempo real por nombre
- Filtro por rango de precios
- Resultados instantáneos

### Carrito de Compras
- Agregar/eliminar productos
- Ajustar cantidades
- Cálculo automático de totales e impuestos
- Persistencia en localStorage

### Interfaz Responsiva
- Diseño adaptable a dispositivos móviles
- Navegación intuitiva
- Botones y controles accesibles

## 🔌 API Endpoints

### GET /api/semillas
Obtiene la lista de todas las semillas disponibles.

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Tomate Cherry",
    "descripcion": "Tomates pequeños y dulces",
    "precio": 2.99,
    "imagen": "/images/tomate-cherry.jpg",
    "cantidad": 100
  }
]
```

### GET /api/health
Verifica el estado del servidor.

## 🚀 Próximas Mejoras

- [ ] Integración con Stripe para pagos
- [ ] Sistema de autenticación de usuarios
- [ ] Base de datos MongoDB
- [ ] Panel de administración
- [ ] Confirmación de pedidos por email
- [ ] Historial de compras
- [ ] Reseñas de productos
- [ ] Wishlist

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios grandes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍🌾 Contacto

**Dos Campesinos** - Tienda de Semillas de Calidad

- Email: info@doscampesinos.com
- Teléfono: +1 (555) 123-4567

---

Hecho con ❤️ para agricultores y amantes del cultivo 🌾
