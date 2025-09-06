# Sistema de Notas con API para Vercel

Sistema completo de gestión de información con API para guardar y mostrar información como un bloc de notas.

## 🚀 Características

### API de Notas
- **POST** `/api/save-note` - Guardar información
- **GET** `/api/get-notes` - Obtener toda la información guardada
- CORS habilitado para peticiones desde cualquier origen
- Manejo de errores robusto

### Bloc de Notas
- Interfaz moderna para visualizar información
- Actualización automática cada 30 segundos
- Formulario para enviar nuevas notas
- Modal para probar la API
- Notificaciones toast
- Totalmente responsivo

## 📁 Estructura del Proyecto

```
phishing/
├── api/
│   ├── save-note.js     # API endpoint para guardar notas
│   └── get-notes.js     # API endpoint para obtener notas
├── index.html           # Página principal del sistema de notas
├── test-api.html        # Probador visual de la API
├── notes-styles.css     # Estilos del sistema de notas
├── notes-script.js      # JavaScript del sistema de notas
├── package.json         # Dependencias del proyecto
├── vercel.json          # Configuración de Vercel
└── README.md           # Documentación

```

## 🛠️ Instalación y Uso

### 1. Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

### 2. Deploy en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# O simplemente sube el código a GitHub y conecta con Vercel
```

## 📡 API Endpoints

### Guardar Información
```javascript
POST /api/save-note
Content-Type: application/json

{
  "title": "Título opcional",
  "content": "Contenido de la nota",
  "timestamp": "2023-12-07T10:30:00Z"
}
```

**Respuesta:**
```javascript
{
  "success": true,
  "message": "Nota guardada exitosamente",
  "note": {
    "id": "1701936600000",
    "title": "Título opcional",
    "content": "Contenido de la nota",
    "timestamp": "2023-12-07T10:30:00Z",
    "createdAt": "2023-12-07T10:30:00.000Z"
  }
}
```

### Obtener Información
```javascript
GET /api/get-notes
```

**Respuesta:**
```javascript
{
  "success": true,
  "notes": [
    {
      "id": "1",
      "title": "Nota ejemplo",
      "content": "Contenido de la nota",
      "timestamp": "2023-12-07T10:30:00Z",
      "createdAt": "2023-12-07T10:30:00.000Z"
    }
  ],
  "count": 1
}
```


## 🌐 URLs del Sistema

- `/` - Sistema de notas principal
- `/test` - Probador visual de la API
- `/api/save-note` - Endpoint para guardar
- `/api/get-notes` - Endpoint para obtener

## 💡 Uso de la API

Puedes enviar información a la API desde cualquier lugar:

```javascript
// Ejemplo con fetch
fetch('https://tu-dominio.vercel.app/api/save-note', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Mi nota',
    content: 'Información importante'
  })
});
```

```bash
# Ejemplo con curl
curl -X POST https://tu-dominio.vercel.app/api/save-note \
  -H "Content-Type: application/json" \
  -d '{"title":"Nota desde curl","content":"Información enviada desde terminal"}'
```

## 🔧 Personalización

Para personalizar el sistema:

1. **Colores**: Modifica las variables CSS en los archivos de estilos
2. **API**: Agrega autenticación o base de datos real en los endpoints
3. **Funcionalidades**: Extiende el JavaScript para más características

## ⚠️ Nota Importante

Este sistema usa almacenamiento en memoria para las notas. Para producción, reemplaza el almacenamiento con una base de datos real como MongoDB, PostgreSQL, o Firebase.

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Dispositivos móviles (responsive)
- ✅ Todas las resoluciones de pantalla
