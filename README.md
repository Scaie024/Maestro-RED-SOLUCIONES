# 🚀 Sistema Maestro RED SOLUCIONES

<div align="center">

![Google Sheets](https://img.shields.io/badge/Google%20Sheets-34A853?style=for-the-badge&logo=google-sheets&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Sistema backend completo que utiliza Google Sheets como base de datos**

[Ver Demo](#-demo) • [Instalación](#-instalación) • [API Docs](#-api-rest) • [Soporte](#-soporte)

</div>

---

## 📋 Descripción

**Sistema Maestro RED SOLUCIONES** es una solución backend innovadora que convierte **Google Sheets en una base de datos funcional** con API REST completa. Ideal para empresas que necesitan un sistema de gestión rápido, confiable y fácil de usar.

### ✨ Características Principales

- 🔗 **Conexión directa** a Google Sheets API v4
- 🛡️ **Autenticación segura** con Service Account
- 🌐 **API REST completa** con endpoints documentados
- 📱 **Interfaz web moderna** y responsive
- 📊 **Gestión de múltiples hojas** en tiempo real
- 💾 **Exportación a JSON** de datos
- 🔄 **Operaciones CRUD** completas
- 📈 **Sistema escalable** y mantenible

---

## 🏢 Módulos del Sistema

El sistema gestiona **12 hojas especializadas**:

| Módulo | Descripción | Columnas |
|--------|-------------|----------|
| 📋 **01_Clientes** | Gestión completa de clientes | 26 campos |
| 💰 **02_Cobranza** | Control de cobranza y pagos | 25 campos |
| ⚠️ **Fallas - Reportes** | Sistema de reportes de fallas | 22 campos |
| 📦 **04_Inventario** | Control de inventario principal | 23 campos |
| 🎯 **05_Prospectos** | Seguimiento de prospectos | 24 campos |
| � **06_Desconexiones** | Control de desconexiones | 24 campos |
| 🏭 **07_Proveedores** | Gestión de proveedores | 25 campos |
| 📊 **09_Dashboard** | Dashboard y métricas | 26 campos |
| ⚙️ **10_Config** | Configuraciones del sistema | 26 campos |
| 👥 **Clientes** | Base de clientes adicional | 9 campos |
| 💳 **Pagos** | Registro de pagos | 9 campos |
| 📋 **Inventario** | Inventario secundario | 10 campos |

---

## 🚀 Instalación

### Prerrequisitos
- Node.js 16+ 
- npm o yarn
- Credenciales de Google Service Account

### Instalación Rápida

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/Sistema-Maestro-RED-SOLUCIONES.git
cd Sistema-Maestro-RED-SOLUCIONES

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# 4. Agregar credenciales de Google
# Colocar tu archivo credentials.json en la raíz

# 5. Iniciar el servidor
npm start
```

### Configuración Manual

1. **Variables de entorno** (`.env`):
```env
PORT=3001
GOOGLE_SHEETS_ID=tu_spreadsheet_id_aqui
NODE_ENV=development
```

2. **Credenciales Google** (`credentials.json`):
   - Crear Service Account en Google Cloud Console
   - Descargar credenciales JSON
   - Compartir Google Sheet con el email del service account

---

## 🌐 Uso del Sistema

### Interfaz Web
```
http://localhost:3001
```

### Script de Inicio Automático
```bash
./start.sh
```

### Verificación del Sistema
```bash
curl http://localhost:3001/api/health
```

---

## 🔧 API REST

### Endpoints Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/health` | ❤️ Estado del servidor |
| `GET` | `/api/sheets` | 📋 Lista todas las hojas |
| `GET` | `/api/sheets/{nombre}/data` | 📊 Obtener datos de una hoja |
| `POST` | `/api/sheets/{nombre}/rows` | ➕ Agregar nueva fila |
| `POST` | `/api/sheets/{nombre}/update` | 🔄 Actualizar rango específico |

### Ejemplos de Uso

#### Obtener lista de hojas
```bash
curl http://localhost:3001/api/sheets
```

#### Obtener datos de clientes
```bash
curl "http://localhost:3001/api/sheets/01_Clientes/data"
```

#### Agregar nuevo cliente
```bash
curl -X POST http://localhost:3001/api/sheets/01_Clientes/rows \
  -H "Content-Type: application/json" \
  -d '{"values":["Nuevo Cliente","123456789","cliente@email.com"]}'
```

#### Actualizar inventario
```bash
curl -X POST http://localhost:3001/api/sheets/04_Inventario/update \
  -H "Content-Type: application/json" \
  -d '{"range":"A2:C2","values":[["Producto","100","Disponible"]]}'
```

---

## � Estructura del Proyecto

```
📁 Sistema-Maestro-RED-SOLUCIONES/
├── 🚀 server-simple.js          # Servidor principal
├── 📄 package.json              # Configuración Node.js
├── 🔐 credentials.json          # Credenciales Google (no incluido)
├── ⚙️ .env                      # Variables de entorno
├── 📋 .gitignore               # Archivos ignorados
├── 🔧 start.sh                 # Script de inicio
├── 📁 public/
│   └── 🌐 index.html           # Interfaz web
├── 📁 .github/
│   └── 📄 copilot-instructions.md
└── 📚 docs/
    ├── 📖 GUIA.md              # Guía completa
    ├── 📁 ESTRUCTURA.md        # Estructura detallada
    └── ✅ RESUMEN-FINAL.md     # Estado del sistema
```

---

## �️ Seguridad

- 🔐 **Service Account Authentication** con Google
- 🚫 **Credenciales no incluidas** en el repositorio
- ✅ **Variables de entorno** para configuración sensible
- 🔒 **Validación de datos** en todos los endpoints
- 🛡️ **Manejo seguro de errores** sin exposición de datos

---

## � Demo

### Interfaz Web
![Interfaz Principal](https://via.placeholder.com/800x400/667eea/ffffff?text=Interfaz+Web+Moderna)

### API Response Example
```json
{
  "success": true,
  "message": "✅ Servidor funcionando correctamente",
  "timestamp": "2025-07-18T23:29:04.099Z",
  "port": "3001",
  "googleSheets": {
    "connected": true,
    "spreadsheetId": "1OZKZIpn6U1nCfrDM_yGmC6jKj6iLH_MQz814LjEBRMQ",
    "totalSheets": 12
  }
}
```

---

## � Roadmap

- [ ] 🔐 Sistema de autenticación de usuarios
- [ ] 📊 Dashboard avanzado con gráficos
- [ ] 🔔 Notificaciones en tiempo real
- [ ] � Aplicación móvil
- [ ] 🌐 Deploy automático
- [ ] 📈 Analytics avanzados
- [ ] 🔄 Sincronización bidireccional
- [ ] 💾 Sistema de backup automático

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

---

## � Licencia

Este proyecto está bajo la Licencia ISC. Ver `LICENSE` para más detalles.

---

## 📞 Soporte

- 📧 **Email**: soporte@redsoluciones.com
- 📱 **WhatsApp**: +1234567890
- 🌐 **Web**: www.redsoluciones.com
- 📋 **Issues**: [GitHub Issues](https://github.com/tu-usuario/Sistema-Maestro-RED-SOLUCIONES/issues)

---

## 🏆 Créditos

**Desarrollado con ❤️ por el equipo de Red Soluciones**

- 🚀 **Backend**: Node.js + Express + Google Sheets API
- 🎨 **Frontend**: HTML5 + CSS3 + JavaScript
- 🔐 **Autenticación**: Google Service Account
- 📊 **Base de datos**: Google Sheets

---

<div align="center">

**⭐ ¡No olvides dar una estrella si te gustó el proyecto! ⭐**

[� Volver arriba](#-sistema-maestro-red-soluciones)

</div>
