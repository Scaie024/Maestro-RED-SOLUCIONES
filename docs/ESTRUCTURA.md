# 📁 ESTRUCTURA DEL PROYECTO RED SOLUCIONES

```
📁 Esta vez/                          ← Carpeta principal del proyecto
├── 📄 server-simple.js               ← ✅ SERVIDOR PRINCIPAL (Puerto 3001)
├── 📄 server.js                      ← Servidor original (no usar)
├── 📄 package.json                   ← Configuración de Node.js
├── 📄 credentials.json               ← 🔐 Credenciales de Google (NO compartir)
├── 📄 .env                          ← Variables de entorno
├── 📄 .gitignore                     ← Archivos ignorados por Git
├── 📄 start.sh                      ← Script de inicio automático
├── 📄 README.md                     ← Documentación principal
├── 📄 GUIA.md                       ← ✅ GUÍA PASO A PASO
├── 📄 ESTRUCTURA.md                 ← ✅ Este archivo
├── 📁 .github/
│   └── 📄 copilot-instructions.md   ← Instrucciones para Copilot
├── 📁 .vscode/
│   └── 📄 tasks.json               ← Tareas de VS Code
├── 📁 public/                      ← ✅ INTERFAZ WEB
│   └── 📄 index.html               ← Página principal
└── 📁 node_modules/                ← Dependencias (automático)
```

---

## 🔥 ARCHIVOS PRINCIPALES

### 1️⃣ `server-simple.js` (SERVIDOR PRINCIPAL)
- ✅ **Usa este archivo** - Puerto 3001
- Contiene toda la lógica del backend
- Se conecta a Google Sheets
- Proporciona API REST completa

### 2️⃣ `public/index.html` (INTERFAZ WEB)
- ✅ **Página principal** del sistema
- Interfaz moderna y fácil de usar
- Se abre en: `http://localhost:3001`

### 3️⃣ `.env` (CONFIGURACIÓN)
```env
PORT=3001                    ← Puerto del servidor
GOOGLE_SHEETS_ID=1OZK...     ← ID de tu Google Sheet
NODE_ENV=development         ← Entorno de desarrollo
```

### 4️⃣ `credentials.json` (CREDENCIALES GOOGLE)
- 🔐 **Archivo confidencial** - NO compartir
- Contiene las claves para acceder a Google Sheets
- Ya está configurado correctamente

---

## 🚀 CÓMO USAR EL SISTEMA

### Opción 1: Inicio Rápido
```bash
npm start
```

### Opción 2: Con Script Automático
```bash
./start.sh
```

### Opción 3: Manual
```bash
node server-simple.js
```

---

## 🌐 URLS IMPORTANTES

| URL | Descripción |
|-----|-------------|
| `http://localhost:3001` | 🏠 **Página principal** |
| `http://localhost:3001/api/health` | ❤️ **Estado del servidor** |
| `http://localhost:3001/api/sheets` | 📋 **Lista de hojas** |

---

## 📊 TUS HOJAS DE GOOGLE SHEETS

El sistema detectó **12 hojas** en tu Google Sheet:

1. **01_Clientes** (1000x26) - Gestión de clientes
2. **02_Cobranza** (1000x25) - Control de cobranza  
3. **Fallas - Reportes** (1000x22) - Reportes de fallas
4. **04_Inventario** (1000x23) - Control de inventario
5. **05_Prospectos** (1000x24) - Seguimiento de prospectos
6. **06_Desconexiones** (1000x24) - Control de desconexiones
7. **07_Proveedores** (1000x25) - Gestión de proveedores
8. **09_Dashboard** (1000x26) - Dashboard principal
9. **10_Config** (1000x26) - Configuraciones del sistema
10. **Clientes** (1000x9) - Clientes adicionales
11. **Pagos** (1000x9) - Control de pagos
12. **Inventario** (1000x10) - Inventario adicional

---

## 🔧 API REST DISPONIBLE

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/health` | ❤️ Estado del servidor |
| `GET` | `/api/sheets` | 📋 Lista todas las hojas |
| `GET` | `/api/sheets/{nombre}/data` | 📊 Datos de una hoja |
| `POST` | `/api/sheets/{nombre}/rows` | ➕ Agregar nueva fila |
| `POST` | `/api/sheets/{nombre}/update` | 🔄 Actualizar rango |

---

## 💡 EJEMPLOS PRÁCTICOS

### Ver clientes:
```bash
curl "http://localhost:3001/api/sheets/01_Clientes/data"
```

### Agregar cliente:
```bash
curl -X POST http://localhost:3001/api/sheets/01_Clientes/rows \
  -H "Content-Type: application/json" \
  -d '{"values":["Nuevo Cliente","123456","email@test.com"]}'
```

### Ver estado:
```bash
curl http://localhost:3001/api/health
```

---

## 🔐 SEGURIDAD

- ✅ Credenciales Google configuradas
- ✅ Variables de entorno protegidas
- ✅ CORS habilitado para desarrollo
- ⚠️ **NO subir `credentials.json` a repositorios públicos**

---

## 📞 SOPORTE

- 📖 **Documentación completa**: `GUIA.md`
- 🚀 **Instalación**: `README.md`
- 🔧 **Estructura**: `ESTRUCTURA.md` (este archivo)
- 💻 **Logs**: Terminal donde ejecutas `npm start`

---

**🔥 Desarrollado por Red Soluciones**
